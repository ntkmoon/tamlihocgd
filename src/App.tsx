import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Pause,
  Volume2,
  VolumeX,
  AlertTriangle,
  Users,
  CalendarDays,
  CalendarHeart,
  Briefcase,
  Heart,
} from 'lucide-react';
import {
  createRandomizedClassStudents,
  formatStudentNamesInText,
  MAX_REPRIMANDS,
  MAX_STAT,
  TRANSFER_THRESHOLD,
} from './data/students';
import { PEDAGOGICAL_SITUATIONS } from './data/situations';
import { EXTERNAL_EVENTS } from './data/externalEvents';
import {
  createInitialStaffAffections,
  getStaffAffectionDelta,
  getStaffMaxTotalAffection,
  getStaffTotalAffection,
  INITIAL_STAFF_AFFECTION,
  resolveStaffForSituation,
} from './data/staff';
import {
  getWeekInfo,
  isStudentInfractionSituation,
  MAX_WEEKLY_SITUATIONS,
  RECORD_BOOK_REPORTERS,
  RECORD_BOOK_SESSIONS,
  TOTAL_ACADEMIC_WEEKS,
} from './data/calendar';
import {
  AcademicWeekInfo,
  ChoiceOption,
  ClassRecordEntry,
  FloatingStatPopup,
  GamePhase,
  PedagogicalSituation,
  ScheduledSituation,
  SituationOrigin,
  StaffInteractionLog,
  StatDelta,
  Student,
  TeacherMood,
  TeacherProfile,
  TransferEvent,
} from './types/game';
import { soundEngine } from './utils/audio';
import { TeacherAvatar } from './components/TeacherAvatar';
import { StudentDesk } from './components/StudentDesk';
import { Chalkboard } from './components/Chalkboard';
import { StudentDetailModal } from './components/StudentDetailModal';
import { StaffRosterModal } from './components/StaffRosterModal';
import { ClassRecordBookModal } from './components/ClassRecordBookModal';
import {
  EndGameModal,
  MonthSummaryModal,
  PauseModal,
  TitleOverlay,
  TransferAlertModal,
} from './components/GameModals';
import {
  applyChoicePermutation,
  clearGameFromStorage,
  decodeSaveInput,
  encodeSaveCode,
  getSavePreview,
  HydratedSaveState,
  loadGameFromStorage,
  saveGameToStorage,
  serializeSaveState,
} from './utils/saveGame';

function clampStat(val: number): number {
  return Math.max(0, Math.min(MAX_STAT, val));
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function isStaffSituation(sit: PedagogicalSituation): boolean {
  return (
    sit.category === 'Đồng nghiệp' ||
    sit.category === 'Ban Giám Hiệu' ||
    Boolean(sit.staffTier)
  );
}

function randomizeScheduledSituation(
  sit: PedagogicalSituation,
  origin: SituationOrigin
): ScheduledSituation {
  if (!sit.choices) {
    return { situation: sit, origin };
  }
  const choiceOrder = shuffleArray([0, 1, 2, 3]);
  return {
    situation: applyChoicePermutation(sit, choiceOrder),
    origin,
    choiceOrder,
  };
}

function rollInfractionCount(weekNumber: number): number {
  if (weekNumber === 1) return 0; // Tuần đầu tiên chưa có sai phạm tuần trước
  const r = Math.random();
  if (r < 0.28) return 0;
  if (r < 0.72) return 1;
  return 2;
}

function rollRandomEventCount(infractionTarget: number): number {
  const maxEvents = Math.min(4, MAX_WEEKLY_SITUATIONS - infractionTarget);
  if (maxEvents <= 2) return 2;
  return 2 + Math.floor(Math.random() * (maxEvents - 1));
}

function rollExternalEventCount(availableSlots: number): number {
  if (availableSlots <= 1) return 0;
  const r = Math.random();
  if (availableSlots >= 3 && r < 0.25) return 2;
  if (r < 0.72) return 1;
  return 0;
}

interface WeekPackage {
  recordEntries: ClassRecordEntry[];
  eventCount: number;
  schedule: ScheduledSituation[];
  remainingPool: PedagogicalSituation[];
}

function buildWeekPackage(
  weekNumber: number,
  currentStudents: Student[],
  currentPool: PedagogicalSituation[]
): WeekPackage {
  const weekInfo = getWeekInfo(weekNumber);
  const infractionTarget = rollInfractionCount(weekNumber);
  // Fully random 2–4 events each week, total (infraction + events) <= MAX_WEEKLY_SITUATIONS (5)
  const eventTarget = rollRandomEventCount(infractionTarget);
  // 0–1 situation per week involving Colleague or Ban Giám Hiệu
  const staffTarget = eventTarget >= 2 && Math.random() < 0.72 ? 1 : 0;
  const externalTarget = rollExternalEventCount(eventTarget - staffTarget);

  const activeIds = new Set(
    currentStudents.filter((s) => s.status === 'active').map((s) => s.id)
  );

  // Re-shuffle pool every week so no static ordering leaks across resets or devices
  let workingPool = shuffleArray(currentPool);
  if (workingPool.length < MAX_WEEKLY_SITUATIONS * 4) {
    const refill = shuffleArray(PEDAGOGICAL_SITUATIONS).filter(
      (sit) => !workingPool.some((p) => p.id === sit.id)
    );
    workingPool = shuffleArray([...workingPool, ...refill]);
  }

  const isEligible = (sit: PedagogicalSituation) =>
    sit.involvedStudentIds.length === 0 ||
    sit.involvedStudentIds.some((id) => activeIds.has(id));

  const pickedIds = new Set<string>();

  // 1. Pick 0–2 random student infraction situations for Sổ đầu bài
  const pickedInfractions: PedagogicalSituation[] = [];
  for (const sit of workingPool) {
    if (pickedInfractions.length >= infractionTarget) break;
    if (
      !pickedIds.has(sit.id) &&
      isEligible(sit) &&
      isStudentInfractionSituation(sit)
    ) {
      pickedInfractions.push(sit);
      pickedIds.add(sit.id);
    }
  }
  if (pickedInfractions.length < infractionTarget) {
    for (const sit of shuffleArray(PEDAGOGICAL_SITUATIONS)) {
      if (pickedInfractions.length >= infractionTarget) break;
      if (
        !pickedIds.has(sit.id) &&
        isEligible(sit) &&
        isStudentInfractionSituation(sit)
      ) {
        pickedInfractions.push(sit);
        pickedIds.add(sit.id);
      }
    }
  }

  const recordEntries: ClassRecordEntry[] = pickedInfractions.map((sit, idx) => ({
    id: `rb-w${weekNumber}-${idx}-${sit.id}`,
    situation: sit,
    reporter:
      RECORD_BOOK_REPORTERS[Math.floor(Math.random() * RECORD_BOOK_REPORTERS.length)],
    session:
      RECORD_BOOK_SESSIONS[Math.floor(Math.random() * RECORD_BOOK_SESSIONS.length)],
  }));

  // 2. Pick 0–1 Colleague or Ban Giám Hiệu situation
  const pickedStaff: PedagogicalSituation[] = [];
  if (staffTarget > 0) {
    const preferPrincipal = Math.random() < 0.45;
    const preferredTier = preferPrincipal ? 'principal' : 'colleague';

    const matchTier = (sit: PedagogicalSituation, exactTier: boolean) => {
      if (!isStaffSituation(sit) || pickedIds.has(sit.id) || !isEligible(sit)) {
        return false;
      }
      if (!exactTier) return true;
      const tier =
        sit.staffTier ??
        (sit.category === 'Ban Giám Hiệu' ? 'principal' : 'colleague');
      return tier === preferredTier;
    };

    for (const sit of workingPool) {
      if (matchTier(sit, true)) {
        pickedStaff.push(sit);
        pickedIds.add(sit.id);
        break;
      }
    }
    if (pickedStaff.length === 0) {
      for (const sit of shuffleArray(PEDAGOGICAL_SITUATIONS)) {
        if (matchTier(sit, true)) {
          pickedStaff.push(sit);
          pickedIds.add(sit.id);
          break;
        }
      }
    }
    if (pickedStaff.length === 0) {
      for (const sit of shuffleArray(PEDAGOGICAL_SITUATIONS)) {
        if (matchTier(sit, false)) {
          pickedStaff.push(sit);
          pickedIds.add(sit.id);
          break;
        }
      }
    }
  }

  // 3. Pick 0–2 external random events (seasonal weather respects month, others completely random)
  const pickedExternals: PedagogicalSituation[] = [];
  for (const sit of workingPool) {
    if (pickedExternals.length >= externalTarget) break;
    if (
      sit.eventType === 'external' &&
      !pickedIds.has(sit.id) &&
      isEligible(sit) &&
      (!sit.preferredMonths || sit.preferredMonths.includes(weekInfo.month))
    ) {
      pickedExternals.push(sit);
      pickedIds.add(sit.id);
    }
  }
  if (pickedExternals.length < externalTarget) {
    for (const sit of shuffleArray(EXTERNAL_EVENTS)) {
      if (pickedExternals.length >= externalTarget) break;
      if (
        !pickedIds.has(sit.id) &&
        isEligible(sit) &&
        (!sit.preferredMonths || sit.preferredMonths.includes(weekInfo.month))
      ) {
        pickedExternals.push(sit);
        pickedIds.add(sit.id);
      }
    }
  }

  // 4. Pick remaining choice-based situations:
  // Only fixed timeline holiday weeks anchor 1 holiday situation; everything else is 100% random!
  const choiceEventTarget = Math.max(
    0,
    eventTarget - pickedStaff.length - pickedExternals.length
  );
  const pickedChoiceEvents: PedagogicalSituation[] = [];

  const tryPickRegularChoice = (sit: PedagogicalSituation): boolean => {
    if (pickedChoiceEvents.length >= choiceEventTarget) return false;
    if (sit.eventType === 'external') return false;
    if (isStaffSituation(sit)) return false; // Strictly keep staff situations at 0–1 per week
    if (pickedIds.has(sit.id)) return false;
    if (!isEligible(sit)) return false;
    pickedChoiceEvents.push(sit);
    pickedIds.add(sit.id);
    return true;
  };

  // Fixed timeline milestone event (Lễ Khai Giảng, Trung Thu, 20/10, 20/11, Thi HK, Tết, 8/3, Bế giảng...)
  if (weekInfo.holidayLabel && choiceEventTarget > 0) {
    for (const sit of workingPool) {
      if (sit.holidayTag === weekInfo.holidayLabel) {
        if (tryPickRegularChoice(sit)) break;
      }
    }
    if (pickedChoiceEvents.length === 0) {
      for (const sit of shuffleArray(PEDAGOGICAL_SITUATIONS)) {
        if (sit.holidayTag === weekInfo.holidayLabel) {
          if (tryPickRegularChoice(sit)) break;
        }
      }
    }
  }

  // Completely random non-holiday situations from full pool (no fixed sequence or month lock)
  for (const sit of workingPool) {
    if (pickedChoiceEvents.length >= choiceEventTarget) break;
    if (!sit.holidayTag && !isStudentInfractionSituation(sit)) {
      tryPickRegularChoice(sit);
    }
  }
  for (const sit of workingPool) {
    if (pickedChoiceEvents.length >= choiceEventTarget) break;
    if (!sit.holidayTag) {
      tryPickRegularChoice(sit);
    }
  }

  if (pickedChoiceEvents.length < choiceEventTarget) {
    for (const sit of shuffleArray(PEDAGOGICAL_SITUATIONS)) {
      if (pickedChoiceEvents.length >= choiceEventTarget) break;
      tryPickRegularChoice(sit);
    }
  }

  // Combine weekly events randomly (regular choices + external events + 0–1 staff route)
  const weeklyEventsMixed = shuffleArray([
    ...pickedChoiceEvents,
    ...pickedExternals,
    ...pickedStaff,
  ]);

  const schedule: ScheduledSituation[] = [
    ...pickedInfractions.map((sit) =>
      randomizeScheduledSituation(sit, 'record_book')
    ),
    ...weeklyEventsMixed.map((sit) =>
      randomizeScheduledSituation(sit, 'weekly_event')
    ),
  ];

  const remainingPool = workingPool.filter((sit) => !pickedIds.has(sit.id));

  return {
    recordEntries,
    eventCount: weeklyEventsMixed.length,
    schedule,
    remainingPool,
  };
}

function getSeasonWallGradient(tone: AcademicWeekInfo['seasonTone']): string {
  switch (tone) {
    case 'festival':
      return 'from-[#f9e7dc] via-[#fdf3e7] to-[#f2dec6]';
    case 'winter':
      return 'from-[#e4ecf2] via-[#eef3f6] to-[#e3e5de]';
    case 'spring':
      return 'from-[#f7e9ef] via-[#f4f2e8] to-[#e9e3cc]';
    case 'summer':
      return 'from-[#e2f0df] via-[#f2f1e1] to-[#e9dec6]';
    case 'autumn':
    default:
      return 'from-[#efe8d5] via-[#f5efe0] to-[#e9dec6]';
  }
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('TITLE');
  const [pauseReturnPhase, setPauseReturnPhase] = useState<GamePhase>('PLAYING');
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({
    gender: 'female',
    rawName: 'Ngân',
    displayName: 'Cô Ngân',
  });
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [students, setStudents] = useState<Student[]>(() =>
    createRandomizedClassStudents()
  );
  const [reprimands, setReprimands] = useState<number>(0);

  const [initialPackage] = useState(() => {
    const freshStudents = createRandomizedClassStudents();
    const freshPool = shuffleArray(PEDAGOGICAL_SITUATIONS);
    return buildWeekPackage(1, freshStudents, freshPool);
  });

  const [situationPool, setSituationPool] = useState<PedagogicalSituation[]>(
    () => initialPackage.remainingPool
  );
  const [recordBookEntries, setRecordBookEntries] = useState<ClassRecordEntry[]>(
    () => initialPackage.recordEntries
  );
  const [weekEventCount, setWeekEventCount] = useState<number>(
    () => initialPackage.eventCount
  );
  const [weekSchedule, setWeekSchedule] = useState<ScheduledSituation[]>(
    () => initialPackage.schedule
  );
  const [situationIdx, setSituationIdx] = useState<number>(0);

  const [selectedChoice, setSelectedChoice] = useState<ChoiceOption | null>(null);
  const [teacherMood, setTeacherMood] = useState<TeacherMood>('neutral');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [staffLogs, setStaffLogs] = useState<StaffInteractionLog[]>([]);
  const [staffAffections, setStaffAffections] = useState<Record<string, number>>(
    () => createInitialStaffAffections()
  );
  const [staffRosterOpen, setStaffRosterOpen] = useState<boolean>(false);
  const [focusedStaffId, setFocusedStaffId] = useState<string | null>(null);
  const [popups, setPopups] = useState<FloatingStatPopup[]>([]);
  const [pendingTransfers, setPendingTransfers] = useState<TransferEvent[]>([]);

  // Monthly & total statistics (only count choice situations for pedagogical score ratio)
  const [monthBestCount, setMonthBestCount] = useState<number>(0);
  const [monthTotalCount, setMonthTotalCount] = useState<number>(0);
  const [monthInfractionCount, setMonthInfractionCount] = useState<number>(0);
  const [totalBestCount, setTotalBestCount] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);

  const [muted, setMuted] = useState<boolean>(false);
  const popupTimerRef = useRef<number | null>(null);

  const [storedSave, setStoredSave] = useState<HydratedSaveState | null>(() =>
    loadGameFromStorage()
  );
  const savePreview = useMemo(() => getSavePreview(storedSave), [storedSave]);

  const weekInfo = useMemo(() => getWeekInfo(weekNumber), [weekNumber]);

  const buildCurrentSavePayload = useCallback(() => {
    const effectivePhase = phase === 'PAUSED' ? pauseReturnPhase : phase;
    return serializeSaveState({
      phase: effectivePhase,
      teacherProfile,
      weekNumber,
      students,
      reprimands,
      recordBookEntries,
      weekEventCount,
      weekSchedule,
      situationPool,
      situationIdx,
      selectedChoice,
      teacherMood,
      pendingTransfers,
      monthBestCount,
      monthTotalCount,
      monthInfractionCount,
      totalBestCount,
      totalAnswered,
      staffLogs,
      staffAffections,
    });
  }, [
    monthBestCount,
    monthInfractionCount,
    monthTotalCount,
    pauseReturnPhase,
    pendingTransfers,
    phase,
    recordBookEntries,
    reprimands,
    selectedChoice,
    situationIdx,
    situationPool,
    staffAffections,
    staffLogs,
    students,
    teacherMood,
    teacherProfile,
    totalAnswered,
    totalBestCount,
    weekEventCount,
    weekNumber,
    weekSchedule,
  ]);

  useEffect(() => {
    if (phase === 'TITLE') {
      setStoredSave(loadGameFromStorage());
      return;
    }
    saveGameToStorage(buildCurrentSavePayload());
  }, [buildCurrentSavePayload, phase]);

  const applyHydratedSave = useCallback((saved: HydratedSaveState) => {
    setTeacherProfile(saved.teacherProfile);
    setWeekNumber(saved.weekNumber);
    setStudents(saved.students);
    setReprimands(saved.reprimands);
    setRecordBookEntries(saved.recordBookEntries);
    setWeekEventCount(saved.weekEventCount);
    setWeekSchedule(saved.weekSchedule);
    setSituationPool(saved.situationPool);
    setSituationIdx(saved.situationIdx);
    setSelectedChoice(saved.selectedChoice);
    setTeacherMood(saved.teacherMood);
    setPendingTransfers(saved.pendingTransfers);
    setMonthBestCount(saved.monthBestCount);
    setMonthTotalCount(saved.monthTotalCount);
    setMonthInfractionCount(saved.monthInfractionCount);
    setTotalBestCount(saved.totalBestCount);
    setTotalAnswered(saved.totalAnswered);
    setStaffLogs(saved.staffLogs);
    setStaffAffections(saved.staffAffections);
    setStaffRosterOpen(false);
    setFocusedStaffId(null);
    setSelectedStudentId(null);
    setPopups([]);
    setPauseReturnPhase(saved.phase);
    setPhase(saved.phase);
    setStoredSave(saved);
    soundEngine.playClick();
  }, []);

  const handleResumeSaved = useCallback(() => {
    const saved = storedSave ?? loadGameFromStorage();
    if (!saved) return;
    applyHydratedSave(saved);
  }, [applyHydratedSave, storedSave]);

  const handleImportSave = useCallback(
    (rawText: string): boolean => {
      const decoded = decodeSaveInput(rawText);
      if (!decoded) return false;
      applyHydratedSave(decoded);
      return true;
    },
    [applyHydratedSave]
  );

  const handleDownloadSave = useCallback(() => {
    soundEngine.playClick();
    const payload = buildCurrentSavePayload();
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lop-hoc-chu-nhiem-tuan-${payload.weekNumber}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [buildCurrentSavePayload]);

  const handleCopySaveCode = useCallback(async (): Promise<boolean> => {
    const code = encodeSaveCode(buildCurrentSavePayload());
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        return true;
      }
    } catch {
      // Fallback below for restricted iframe contexts
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }, [buildCurrentSavePayload]);

  const applyStatDeltas = useCallback(
    (
      baseStudents: Student[],
      situation: PedagogicalSituation,
      targetEffects: StatDelta,
      classEffects: StatDelta,
      activeWeekInfo: AcademicWeekInfo
    ): Student[] => {
      const targetSet = new Set(situation.involvedStudentIds);
      const newPopups: FloatingStatPopup[] = [];
      const newlyTransferred: TransferEvent[] = [];

      const updatedStudents = baseStudents.map((stu) => {
        if (stu.status === 'transferred') return stu;

        const isTarget = targetSet.has(stu.id);
        const delta: StatDelta = isTarget ? targetEffects : classEffects;

        const academicDelta = delta.academic ?? 0;
        const moodDelta = delta.mood ?? 0;
        const affectionDelta = delta.affection ?? 0;

        if (academicDelta === 0 && moodDelta === 0 && affectionDelta === 0) {
          return stu;
        }

        const nextAcademic = clampStat(stu.academic + academicDelta);
        const nextMood = clampStat(stu.mood + moodDelta);
        const nextAffection = clampStat(stu.affection + affectionDelta);

        const isStaffRoute = isStaffSituation(situation);
        if (
          isTarget ||
          isStaffRoute ||
          Math.abs(affectionDelta) >= 4 ||
          Math.abs(moodDelta) >= 4 ||
          Math.abs(academicDelta) >= 4
        ) {
          newPopups.push({
            id: `${stu.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            studentId: stu.id,
            deltas: {
              academic: academicDelta || undefined,
              mood: moodDelta || undefined,
              affection: affectionDelta || undefined,
            },
          });
        }

        const didTransfer = nextAffection <= TRANSFER_THRESHOLD;
        if (didTransfer) {
          newlyTransferred.push({
            studentId: stu.id,
            studentName: stu.name,
            finalAffection: nextAffection,
            week: activeWeekInfo.weekNumber,
            month: activeWeekInfo.month,
          });
        }

        const shouldLogHistory =
          isTarget ||
          Math.abs(academicDelta) >= 3 ||
          Math.abs(moodDelta) >= 4 ||
          Math.abs(affectionDelta) >= 4;

        const nextHistory = shouldLogHistory
          ? [
              {
                week: activeWeekInfo.weekNumber,
                month: activeWeekInfo.month,
                title: formatStudentNamesInText(
                  situation.title,
                  baseStudents,
                  situation.involvedStudentIds
                ),
                deltas: {
                  academic: academicDelta || undefined,
                  mood: moodDelta || undefined,
                  affection: affectionDelta || undefined,
                },
              },
              ...stu.history,
            ].slice(0, 8)
          : stu.history;

        return {
          ...stu,
          academic: nextAcademic,
          mood: nextMood,
          affection: nextAffection,
          status: didTransfer ? ('transferred' as const) : ('active' as const),
          transferredWeek: didTransfer ? activeWeekInfo.weekNumber : undefined,
          transferredMonth: didTransfer ? activeWeekInfo.month : undefined,
          history: nextHistory,
        };
      });

      setStudents(updatedStudents);
      setPopups(newPopups);

      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current);
      }
      popupTimerRef.current = window.setTimeout(() => {
        setPopups([]);
      }, 2600);

      if (newlyTransferred.length > 0) {
        setReprimands((prev) => prev + newlyTransferred.length);
        setPendingTransfers(newlyTransferred);
        soundEngine.playAlert();
      }

      return updatedStudents;
    },
    []
  );

  const enterSituationAt = useCallback(
    (
      idx: number,
      schedule: ScheduledSituation[],
      baseStudents: Student[],
      activeWeekInfo: AcademicWeekInfo
    ) => {
      const targetItem = schedule[idx];
      setSituationIdx(idx);
      setSelectedChoice(null);

      if (
        targetItem &&
        targetItem.situation.eventType === 'external' &&
        targetItem.situation.externalEvent
      ) {
        const ext = targetItem.situation.externalEvent;
        const netScore =
          (ext.targetEffects.academic ?? 0) +
          (ext.targetEffects.mood ?? 0) +
          (ext.targetEffects.affection ?? 0) +
          (ext.classEffects.academic ?? 0) +
          (ext.classEffects.mood ?? 0) +
          (ext.classEffects.affection ?? 0);

        if (netScore > 4) {
          soundEngine.playGoodChoice();
          setTeacherMood('happy');
        } else if (netScore < -4) {
          soundEngine.playPoorChoice();
          setTeacherMood('concerned');
        } else {
          soundEngine.playNeutralChoice();
          setTeacherMood('thoughtful');
        }

        applyStatDeltas(
          baseStudents,
          targetItem.situation,
          ext.targetEffects,
          ext.classEffects,
          activeWeekInfo
        );
        setPhase('FEEDBACK');
      } else {
        setTeacherMood('neutral');
        setPhase('PLAYING');
      }
    },
    [applyStatDeltas]
  );

  const applyWeekPackage = useCallback((pkg: WeekPackage, nextWeekNum: number) => {
    setWeekNumber(nextWeekNum);
    setRecordBookEntries(pkg.recordEntries);
    setWeekEventCount(pkg.eventCount);
    setWeekSchedule(pkg.schedule);
    setSituationPool(pkg.remainingPool);
    setSituationIdx(0);
    setSelectedChoice(null);
    setTeacherMood('neutral');
    setMonthInfractionCount((prev) => prev + pkg.recordEntries.length);
  }, []);

  const startNewGame = useCallback(
    (profile?: TeacherProfile) => {
      const activeProfile = profile ?? teacherProfile;
      if (profile) {
        setTeacherProfile(profile);
      }

      const freshStudents = createRandomizedClassStudents();
      const freshPool = shuffleArray(PEDAGOGICAL_SITUATIONS);
      const pkg = buildWeekPackage(1, freshStudents, freshPool);

      setStudents(freshStudents);
      setReprimands(0);
      setSelectedStudentId(null);
      setStaffLogs([]);
      setStaffAffections(createInitialStaffAffections());
      setStaffRosterOpen(false);
      setFocusedStaffId(null);
      setPopups([]);
      setPendingTransfers([]);
      setMonthBestCount(0);
      setMonthTotalCount(0);
      setMonthInfractionCount(pkg.recordEntries.length);
      setTotalBestCount(0);
      setTotalAnswered(0);

      setWeekNumber(1);
      setRecordBookEntries(pkg.recordEntries);
      setWeekEventCount(pkg.eventCount);
      setWeekSchedule(pkg.schedule);
      setSituationPool(pkg.remainingPool);
      setSituationIdx(0);
      setSelectedChoice(null);
      setTeacherMood('neutral');

      setPhase('CLASS_RECORD_BOOK');
      if (activeProfile.displayName) {
        soundEngine.playSchoolBell();
      }
    },
    [teacherProfile]
  );

  const handleResetToCharacterSelect = useCallback(() => {
    soundEngine.playClick();
    clearGameFromStorage();
    setStoredSave(null);

    const freshStudents = createRandomizedClassStudents();
    const freshPool = shuffleArray(PEDAGOGICAL_SITUATIONS);
    const pkg = buildWeekPackage(1, freshStudents, freshPool);

    setStudents(freshStudents);
    setReprimands(0);
    setSelectedStudentId(null);
    setStaffLogs([]);
    setStaffAffections(createInitialStaffAffections());
    setStaffRosterOpen(false);
    setFocusedStaffId(null);
    setPopups([]);
    setPendingTransfers([]);
    setMonthBestCount(0);
    setMonthTotalCount(0);
    setMonthInfractionCount(0);
    setTotalBestCount(0);
    setTotalAnswered(0);

    setWeekNumber(1);
    setRecordBookEntries(pkg.recordEntries);
    setWeekEventCount(pkg.eventCount);
    setWeekSchedule(pkg.schedule);
    setSituationPool(pkg.remainingPool);
    setSituationIdx(0);
    setSelectedChoice(null);
    setTeacherMood('neutral');
    setPhase('TITLE');
  }, []);

  const currentScheduled: ScheduledSituation | undefined =
    weekSchedule[situationIdx] ?? weekSchedule[0];
  const currentSituation = currentScheduled?.situation;

  const involvedStudents = useMemo(() => {
    if (!currentSituation) return [];
    return students.filter(
      (s) =>
        s.status === 'active' &&
        currentSituation.involvedStudentIds.includes(s.id)
    );
  }, [currentSituation, students]);

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId) ?? null,
    [students, selectedStudentId]
  );

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
  };

  const handleSelectStudent = (studentId: string) => {
    soundEngine.playClick();
    setSelectedStudentId(studentId);
  };

  const handleOpenStaffRoster = (staffId?: string) => {
    soundEngine.playClick();
    setFocusedStaffId(staffId ?? null);
    setStaffRosterOpen(true);
  };

  const handleStartWeekFromRecordBook = useCallback(() => {
    soundEngine.playClick();
    enterSituationAt(0, weekSchedule, students, weekInfo);
  }, [enterSituationAt, students, weekInfo, weekSchedule]);

  const handleChoice = useCallback(
    (choice: ChoiceOption) => {
      if (phase !== 'PLAYING' || !currentSituation) return;

      setSelectedChoice(choice);
      setMonthTotalCount((prev) => prev + 1);
      setTotalAnswered((prev) => prev + 1);

      if (choice.quality === 'best') {
        soundEngine.playGoodChoice();
        setTeacherMood('happy');
        setMonthBestCount((prev) => prev + 1);
        setTotalBestCount((prev) => prev + 1);
      } else if (choice.quality === 'good') {
        soundEngine.playNeutralChoice();
        setTeacherMood('thoughtful');
      } else {
        soundEngine.playPoorChoice();
        setTeacherMood('concerned');
      }

      const resolvedStaff = resolveStaffForSituation(currentSituation);
      if (resolvedStaff) {
        const isPrincipal = resolvedStaff.tier === 'principal';
        const affectionDelta = getStaffAffectionDelta(choice.quality, isPrincipal);
        setStaffAffections((prev) => ({
          ...prev,
          [resolvedStaff.id]: clampStat(
            (prev[resolvedStaff.id] ?? INITIAL_STAFF_AFFECTION) + affectionDelta
          ),
        }));
        setStaffLogs((prev) => [
          {
            week: weekInfo.weekNumber,
            month: weekInfo.month,
            staffId: resolvedStaff.id,
            title: currentSituation.title,
            quality: choice.quality,
            classDeltas: choice.classEffects,
            affectionDelta,
          },
          ...prev,
        ]);
      }

      applyStatDeltas(
        students,
        currentSituation,
        choice.targetEffects,
        choice.classEffects,
        weekInfo
      );

      setPhase('FEEDBACK');
    },
    [applyStatDeltas, currentSituation, phase, students, weekInfo]
  );

  const proceedEndOfSituation = useCallback(
    (currentStudentsState: Student[]) => {
      const nextIdx = situationIdx + 1;
      if (nextIdx < weekSchedule.length) {
        enterSituationAt(nextIdx, weekSchedule, currentStudentsState, weekInfo);
        return;
      }

      // End of current week: only open summary at the end of the month (weekInMonth === 4)
      if (weekInfo.weekInMonth === 4) {
        setPhase('MONTH_SUMMARY');
      } else {
        const nextWeek = weekNumber + 1;
        const pkg = buildWeekPackage(nextWeek, currentStudentsState, situationPool);
        applyWeekPackage(pkg, nextWeek);
        setPhase('CLASS_RECORD_BOOK');
        soundEngine.playSchoolBell();
      }
    },
    [
      applyWeekPackage,
      enterSituationAt,
      situationIdx,
      situationPool,
      weekInfo,
      weekNumber,
      weekSchedule,
    ]
  );

  const advanceAfterFeedback = useCallback(() => {
    soundEngine.playClick();

    if (pendingTransfers.length > 0) {
      setPhase('TRANSFER_ALERT');
      return;
    }

    if (reprimands >= MAX_REPRIMANDS) {
      setPhase('GAME_OVER');
      return;
    }

    proceedEndOfSituation(students);
  }, [pendingTransfers.length, proceedEndOfSituation, reprimands, students]);

  const handleAcknowledgeTransfer = useCallback(() => {
    soundEngine.playClick();
    setPendingTransfers([]);

    if (reprimands >= MAX_REPRIMANDS) {
      setPhase('GAME_OVER');
      return;
    }

    const activeCount = students.filter((s) => s.status === 'active').length;
    if (activeCount <= 3) {
      setPhase('GAME_OVER');
      return;
    }

    proceedEndOfSituation(students);
  }, [proceedEndOfSituation, reprimands, students]);

  const handleNextMonth = useCallback(() => {
    soundEngine.playClick();

    if (weekNumber >= TOTAL_ACADEMIC_WEEKS) {
      soundEngine.playGoodChoice();
      setPhase('VICTORY');
      return;
    }

    const nextWeek = weekNumber + 1;
    const pkg = buildWeekPackage(nextWeek, students, situationPool);
    setMonthBestCount(0);
    setMonthTotalCount(0);
    setMonthInfractionCount(0);
    applyWeekPackage(pkg, nextWeek);
    setPhase('CLASS_RECORD_BOOK');
    soundEngine.playSchoolBell();
  }, [applyWeekPackage, situationPool, students, weekNumber]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (e.key === 'Escape') {
        if (staffRosterOpen) {
          setStaffRosterOpen(false);
          return;
        }
        if (selectedStudentId) {
          setSelectedStudentId(null);
          return;
        }
        if (
          phase === 'PLAYING' ||
          phase === 'FEEDBACK' ||
          phase === 'CLASS_RECORD_BOOK'
        ) {
          setPauseReturnPhase(phase);
          setPhase('PAUSED');
        } else if (phase === 'PAUSED') {
          setPhase(pauseReturnPhase);
        }
        return;
      }

      if (selectedStudentId || staffRosterOpen || isTyping) return;

      if (phase === 'PLAYING' && currentSituation && currentSituation.choices) {
        const keyMap: Record<string, number> = {
          a: 0,
          A: 0,
          '1': 0,
          b: 1,
          B: 1,
          '2': 1,
          c: 2,
          C: 2,
          '3': 2,
          d: 3,
          D: 3,
          '4': 3,
        };
        if (e.key in keyMap) {
          e.preventDefault();
          const choice = currentSituation.choices[keyMap[e.key]];
          if (choice) handleChoice(choice);
        }
      } else if (phase === 'FEEDBACK' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        advanceAfterFeedback();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    advanceAfterFeedback,
    currentSituation,
    handleChoice,
    pauseReturnPhase,
    phase,
    selectedStudentId,
    staffRosterOpen,
  ]);

  // Classroom aggregate metrics
  const activeStudents = useMemo(
    () => students.filter((s) => s.status === 'active'),
    [students]
  );
  const avgAcademic = activeStudents.length
    ? Math.round(
        activeStudents.reduce((sum, s) => sum + s.academic, 0) / activeStudents.length
      )
    : 0;
  const avgAffection = activeStudents.length
    ? Math.round(
        activeStudents.reduce((sum, s) => sum + s.affection, 0) / activeStudents.length
      )
    : 0;
  const totalStaffAffection = useMemo(
    () => getStaffTotalAffection(staffAffections),
    [staffAffections]
  );
  const staffMaxTotal = getStaffMaxTotalAffection();

  const rows = [0, 1, 2, 3];
  const wallGradient = getSeasonWallGradient(weekInfo.seasonTone);

  return (
    <div className="min-h-screen w-full flex flex-col classroom-floor select-none overflow-x-hidden">
      {/* Compact Top Classroom HUD */}
      <header className="w-full bg-[#243d32] text-amber-50 border-b-2 border-[#162720] px-3 sm:px-5 lg:px-6 py-2 z-20">
        <div className="w-full flex items-center justify-between gap-2 sm:gap-3 min-w-0">
          {/* Left: Brand, Teacher, Academic Month/Week & Reprimands */}
          <div className="flex items-center flex-wrap gap-x-2.5 sm:gap-x-3 gap-y-1 min-w-0 flex-1">
            <span
              className="text-sm sm:text-base font-bold text-amber-200 tracking-tight whitespace-nowrap"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Lớp Học Chủ Nhiệm
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-white/30">·</span>
            <span className="text-xs sm:text-sm font-semibold text-amber-100 truncate max-w-[140px] sm:max-w-[200px]">
              {teacherProfile.displayName}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-white/30">·</span>
            <span className="text-[11px] sm:text-xs font-semibold tabular-nums text-emerald-200 whitespace-nowrap">
              Tháng {weekInfo.month} (T{weekInfo.weekInMonth}/4) · Tuần {weekNumber}/{TOTAL_ACADEMIC_WEEKS}
            </span>
            <span aria-hidden="true" className="hidden md:inline text-white/30">·</span>
            <div
              className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold tabular-nums whitespace-nowrap ${
                reprimands > 0 ? 'text-rose-300' : 'text-emerald-200/90'
              }`}
              title="Số lần bị khiển trách do học sinh chuyển lớp"
            >
              <AlertTriangle
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                  reprimands > 0 ? 'text-rose-400' : 'text-emerald-300/70'
                }`}
              />
              <span>
                Khiển trách: {reprimands}/{MAX_REPRIMANDS}
              </span>
            </div>
          </div>

          {/* Center: Live Class Averages (inline on extra-wide screens) */}
          <div className="hidden 2xl:flex items-center gap-3 text-xs font-medium text-emerald-100/90 tabular-nums whitespace-nowrap shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              Sĩ số: {activeStudents.length}/{students.length}
            </span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Học lực TB: {avgAcademic}/{MAX_STAT}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Yêu thích TB: {avgAffection}/{MAX_STAT}</span>
          </div>

          {/* Right: Staff Route, Audio & Pause Controls (always visible) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-start sm:self-center">
            <button
              type="button"
              onClick={() => handleOpenStaffRoster()}
              title={`Xem từng Đồng nghiệp & Ban Giám Hiệu (Tổng yêu quý: ${totalStaffAffection.toLocaleString('vi-VN')}/${staffMaxTotal.toLocaleString('vi-VN')})`}
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-lg bg-white/10 hover:bg-white/20 flex items-center gap-1.5 text-xs font-semibold text-amber-200 transition-colors cursor-pointer"
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">Đồng nghiệp &amp; BGH</span>
              <span className="inline-flex items-center gap-1 font-mono tabular-nums text-rose-200 pl-0.5">
                <Heart className="w-3.5 h-3.5 fill-current" />
                {totalStaffAffection.toLocaleString('vi-VN')}
              </span>
            </button>
            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-rose-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-200" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                if (
                  phase === 'PLAYING' ||
                  phase === 'FEEDBACK' ||
                  phase === 'CLASS_RECORD_BOOK'
                ) {
                  setPauseReturnPhase(phase);
                  setPhase('PAUSED');
                }
              }}
              aria-label="Tạm dừng"
              title="Tạm dừng (Esc)"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Pause className="w-4 h-4 text-amber-200" />
            </button>
          </div>
        </div>

        {/* Compact secondary stats strip for phones, tablets, and laptops (< 2xl) */}
        <div className="flex 2xl:hidden flex-wrap items-center gap-x-3 gap-y-0.5 pt-1.5 mt-1.5 border-t border-white/10 text-[11px] sm:text-xs font-medium text-emerald-100/85 tabular-nums">
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Users className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            Sĩ số: {activeStudents.length}/{students.length}
          </span>
          <span aria-hidden="true" className="text-white/25">·</span>
          <span className="whitespace-nowrap">Học lực TB: {avgAcademic}/{MAX_STAT}</span>
          <span aria-hidden="true" className="text-white/25">·</span>
          <span className="whitespace-nowrap">Yêu thích TB: {avgAffection}/{MAX_STAT}</span>
        </div>
      </header>

      {/* Main Classroom Environment */}
      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-3 sm:px-6 pt-3 pb-4 gap-3 sm:gap-4">
        {/* Sunlit Classroom Upper Wall: Month Banner + Teacher + Chalkboard */}
        <section
          aria-label="Khu vực bục giảng và bảng đen"
          className={`relative rounded-2xl bg-gradient-to-b ${wallGradient} border border-amber-900/15 p-3 sm:p-4 shadow-sm overflow-hidden transition-colors duration-500`}
        >
          {/* Decorative Sunlit Windows along upper wall */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 flex justify-between px-6 opacity-50">
            <div className="w-28 h-16 bg-gradient-to-b from-sky-200/70 to-amber-100/40 border-x-4 border-b-4 border-[#d4b88c] rounded-b-md" />
            <div className="hidden sm:block w-28 h-16 bg-gradient-to-b from-sky-200/70 to-amber-100/40 border-x-4 border-b-4 border-[#d4b88c] rounded-b-md" />
            <div className="w-28 h-16 bg-gradient-to-b from-sky-200/70 to-amber-100/40 border-x-4 border-b-4 border-[#d4b88c] rounded-b-md" />
          </div>

          {/* Monthly Calendar & Holiday Strip on Classroom Wall */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-2.5 px-2.5 py-1.5 rounded-xl bg-white/65 border border-amber-900/10 text-xs text-stone-800">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{weekInfo.monthTheme}</span>
            </div>
            {weekInfo.holidayLabel ? (
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <CalendarHeart className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>{weekInfo.holidayLabel}</span>
              </div>
            ) : (
              <span className="text-[11px] font-medium text-stone-600 tabular-nums">
                Tổng kết lớp vào cuối Tháng {weekInfo.month}
              </span>
            )}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-3 sm:gap-5">
            {/* Teacher & Flower Vase on Left */}
            <div className="flex items-end gap-2 shrink-0">
              <TeacherAvatar
                mood={teacherMood}
                gender={teacherProfile.gender}
                teacherName={teacherProfile.displayName}
              />
              {/* Small decorative flower pot on podium corner */}
              <svg
                viewBox="0 0 44 60"
                className="hidden sm:block w-9 h-auto mb-2 pointer-events-none"
                aria-hidden="true"
              >
                <path d="M 10 38 L 34 38 L 30 56 L 14 56 Z" fill="#c2410c" stroke="#9a3412" strokeWidth="1.2" />
                <ellipse cx="22" cy="38" rx="13" ry="3" fill="#ea580c" />
                <path d="M 22 36 Q 16 24 12 20" stroke="#15803d" strokeWidth="2.2" fill="none" />
                <path d="M 22 36 Q 22 20 22 14" stroke="#15803d" strokeWidth="2.2" fill="none" />
                <path d="M 22 36 Q 28 24 32 20" stroke="#15803d" strokeWidth="2.2" fill="none" />
                <circle cx="12" cy="18" r="5" fill="#fb7185" />
                <circle cx="22" cy="12" r="5.5" fill="#facc15" />
                <circle cx="32" cy="18" r="5" fill="#f472b6" />
              </svg>
            </div>

            {/* Central Chalkboard */}
            <div className="flex-1 w-full min-w-0">
              {currentSituation && currentScheduled && (
                <Chalkboard
                  weekInfo={weekInfo}
                  teacherGender={teacherProfile.gender}
                  situationIndex={situationIdx}
                  totalSituationsWeek={weekSchedule.length}
                  situation={currentSituation}
                  origin={currentScheduled.origin}
                  allStudents={students}
                  involvedStudents={involvedStudents}
                  selectedChoice={selectedChoice}
                  isFeedbackPhase={phase === 'FEEDBACK'}
                  isLastOfWeek={situationIdx + 1 >= weekSchedule.length}
                  onChoose={handleChoice}
                  onNext={advanceAfterFeedback}
                  onSelectStudent={handleSelectStudent}
                  onSelectStaff={handleOpenStaffRoster}
                />
              )}
            </div>
          </div>
        </section>

        {/* Classroom Seating Area (4 rows × 4 desks) */}
        <section aria-label="Sơ đồ chỗ ngồi học sinh" className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between px-1 mb-1.5">
            <p className="text-xs font-semibold text-stone-700">
              Sơ đồ lớp học — Click vào học sinh để xem bảng thông số (Học lực, Tính cách, Tâm trạng, Yêu thích · thang {MAX_STAT})
            </p>
            <span className="hidden sm:inline text-xs text-stone-500 font-mono tabular-nums">
              Ngưỡng chuyển lớp: Yêu thích ≤ {TRANSFER_THRESHOLD}/{MAX_STAT}
            </span>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {rows.map((rowIdx) => {
              const rowStudents = students.filter((s) => s.row === rowIdx);
              return (
                <div
                  key={rowIdx}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5"
                >
                  {rowStudents.map((student) => (
                    <StudentDesk
                      key={student.id}
                      student={student}
                      isInvolved={
                        currentSituation?.involvedStudentIds.includes(student.id) ?? false
                      }
                      isSelected={selectedStudentId === student.id}
                      popups={popups.filter((p) => p.studentId === student.id)}
                      onSelect={handleSelectStudent}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Interactive Student Stats Modal */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudentId(null)}
      />

      {/* Colleague & Ban Giám Hiệu Modal */}
      <StaffRosterModal
        isOpen={staffRosterOpen}
        staffAffections={staffAffections}
        logs={staffLogs}
        focusedStaffId={focusedStaffId}
        onClose={() => setStaffRosterOpen(false)}
      />

      {/* Game Shell Overlays */}
      {phase === 'TITLE' && (
        <TitleOverlay
          initialProfile={teacherProfile}
          savePreview={savePreview}
          onStart={startNewGame}
          onResumeSaved={handleResumeSaved}
          onImportSave={handleImportSave}
        />
      )}

      {phase === 'CLASS_RECORD_BOOK' && (
        <ClassRecordBookModal
          weekInfo={weekInfo}
          teacherName={teacherProfile.displayName}
          teacherGender={teacherProfile.gender}
          entries={recordBookEntries}
          eventCount={weekEventCount}
          students={students}
          onStartWeek={handleStartWeekFromRecordBook}
        />
      )}

      {phase === 'TRANSFER_ALERT' && (
        <TransferAlertModal
          events={pendingTransfers}
          reprimands={reprimands}
          onAcknowledge={handleAcknowledgeTransfer}
        />
      )}

      {phase === 'MONTH_SUMMARY' && (
        <MonthSummaryModal
          weekInfo={weekInfo}
          targetWeeks={TOTAL_ACADEMIC_WEEKS}
          students={students}
          monthBestCount={monthBestCount}
          monthTotalCount={monthTotalCount}
          monthInfractionCount={monthInfractionCount}
          reprimands={reprimands}
          staffAffections={staffAffections}
          onNextMonth={handleNextMonth}
        />
      )}

      {phase === 'PAUSED' && (
        <PauseModal
          teacherName={teacherProfile.displayName}
          onResume={() => {
            soundEngine.playClick();
            setPhase(pauseReturnPhase);
          }}
          onRestart={handleResetToCharacterSelect}
          onBackToTitle={() => {
            soundEngine.playClick();
            setPhase('TITLE');
          }}
          onDownloadSave={handleDownloadSave}
          onCopySaveCode={handleCopySaveCode}
          onImportSave={handleImportSave}
        />
      )}

      {(phase === 'VICTORY' || phase === 'GAME_OVER') && (
        <EndGameModal
          isVictory={phase === 'VICTORY'}
          teacherName={teacherProfile.displayName}
          weekNumber={weekNumber}
          targetWeeks={TOTAL_ACADEMIC_WEEKS}
          students={students}
          bestChoicesCount={totalBestCount}
          totalAnswered={totalAnswered}
          reprimands={reprimands}
          staffAffections={staffAffections}
          onRestart={handleResetToCharacterSelect}
        />
      )}
    </div>
  );
}
