import {
  ChoiceOption,
  ClassRecordEntry,
  GamePhase,
  PedagogicalSituation,
  ScheduledSituation,
  SituationOrigin,
  StaffInteractionLog,
  Student,
  TeacherMood,
  TeacherProfile,
  TransferEvent,
} from '../types/game';
import { PEDAGOGICAL_SITUATIONS } from '../data/situations';
import { getWeekInfo } from '../data/calendar';
import { normalizeStaffAffections } from '../data/staff';

const LABELS: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

export function applyChoicePermutation(
  situation: PedagogicalSituation,
  choiceOrder?: number[]
): PedagogicalSituation {
  if (
    !situation.choices ||
    !choiceOrder ||
    choiceOrder.length !== 4
  ) {
    return situation;
  }
  const baseChoices = situation.choices;
  const reordered = choiceOrder.map((origIdx, slotIdx) => {
    const ch = baseChoices[origIdx] ?? baseChoices[slotIdx];
    return {
      ...ch,
      label: LABELS[slotIdx],
    };
  }) as PedagogicalSituation['choices'];

  return {
    ...situation,
    choices: reordered,
  };
}

const STORAGE_KEY = 'lhcn_save_v2';
const SAVE_CODE_PREFIX = 'LHCN2:';

const SITUATION_MAP = new Map<string, PedagogicalSituation>(
  PEDAGOGICAL_SITUATIONS.map((s) => [s.id, s])
);

export interface SerializedRecordEntry {
  id: string;
  situationId: string;
  reporter: string;
  session: string;
}

export interface SerializedScheduledItem {
  situationId: string;
  origin: SituationOrigin;
  choiceOrder?: number[];
}

export interface SerializedSavePayload {
  version: 2;
  savedAt: number;
  phase: GamePhase;
  teacherProfile: TeacherProfile;
  weekNumber: number;
  students: Student[];
  reprimands: number;
  recordBookEntries: SerializedRecordEntry[];
  weekEventCount: number;
  weekSchedule: SerializedScheduledItem[];
  situationPoolIds: string[];
  situationIdx: number;
  selectedChoiceLabel: ChoiceOption['label'] | null;
  teacherMood: TeacherMood;
  pendingTransfers: TransferEvent[];
  monthBestCount: number;
  monthTotalCount: number;
  monthInfractionCount: number;
  totalBestCount: number;
  totalAnswered: number;
  staffLogs?: StaffInteractionLog[];
  staffAffection?: number;
  staffAffections?: Record<string, number>;
}

export interface HydratedSaveState {
  savedAt: number;
  phase: GamePhase;
  teacherProfile: TeacherProfile;
  weekNumber: number;
  students: Student[];
  reprimands: number;
  recordBookEntries: ClassRecordEntry[];
  weekEventCount: number;
  weekSchedule: ScheduledSituation[];
  situationPool: PedagogicalSituation[];
  situationIdx: number;
  selectedChoice: ChoiceOption | null;
  teacherMood: TeacherMood;
  pendingTransfers: TransferEvent[];
  monthBestCount: number;
  monthTotalCount: number;
  monthInfractionCount: number;
  totalBestCount: number;
  totalAnswered: number;
  staffLogs: StaffInteractionLog[];
  staffAffections: Record<string, number>;
}

export interface SavePreviewInfo {
  teacherName: string;
  weekNumber: number;
  month: number;
  weekInMonth: number;
  activeCount: number;
  totalStudents: number;
  reprimands: number;
  savedAt: number;
  isFinished: boolean;
}

export function serializeSaveState(params: {
  phase: GamePhase;
  teacherProfile: TeacherProfile;
  weekNumber: number;
  students: Student[];
  reprimands: number;
  recordBookEntries: ClassRecordEntry[];
  weekEventCount: number;
  weekSchedule: ScheduledSituation[];
  situationPool: PedagogicalSituation[];
  situationIdx: number;
  selectedChoice: ChoiceOption | null;
  teacherMood: TeacherMood;
  pendingTransfers: TransferEvent[];
  monthBestCount: number;
  monthTotalCount: number;
  monthInfractionCount: number;
  totalBestCount: number;
  totalAnswered: number;
  staffLogs?: StaffInteractionLog[];
  staffAffections?: Record<string, number>;
}): SerializedSavePayload {
  return {
    version: 2,
    savedAt: Date.now(),
    phase: params.phase,
    teacherProfile: params.teacherProfile,
    weekNumber: params.weekNumber,
    students: params.students,
    reprimands: params.reprimands,
    recordBookEntries: params.recordBookEntries.map((entry) => ({
      id: entry.id,
      situationId: entry.situation.id,
      reporter: entry.reporter,
      session: entry.session,
    })),
    weekEventCount: params.weekEventCount,
    weekSchedule: params.weekSchedule.map((item) => ({
      situationId: item.situation.id,
      origin: item.origin,
      choiceOrder: item.choiceOrder,
    })),
    situationPoolIds: params.situationPool.map((s) => s.id),
    situationIdx: params.situationIdx,
    selectedChoiceLabel: params.selectedChoice?.label ?? null,
    teacherMood: params.teacherMood,
    pendingTransfers: params.pendingTransfers,
    monthBestCount: params.monthBestCount,
    monthTotalCount: params.monthTotalCount,
    monthInfractionCount: params.monthInfractionCount,
    totalBestCount: params.totalBestCount,
    totalAnswered: params.totalAnswered,
    staffLogs: params.staffLogs ?? [],
    staffAffections: params.staffAffections ?? normalizeStaffAffections(),
  };
}

export function hydrateSavePayload(
  raw: unknown
): HydratedSaveState | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Partial<SerializedSavePayload>;
  if (
    data.version !== 2 ||
    !data.teacherProfile ||
    !Array.isArray(data.students) ||
    !Array.isArray(data.weekSchedule) ||
    typeof data.weekNumber !== 'number'
  ) {
    return null;
  }

  const weekSchedule: ScheduledSituation[] = [];
  for (const item of data.weekSchedule) {
    const baseSit = SITUATION_MAP.get(item.situationId);
    if (baseSit) {
      weekSchedule.push({
        situation: applyChoicePermutation(baseSit, item.choiceOrder),
        origin: item.origin,
        choiceOrder: item.choiceOrder,
      });
    }
  }
  if (weekSchedule.length === 0) return null;

  const recordBookEntries: ClassRecordEntry[] = [];
  if (Array.isArray(data.recordBookEntries)) {
    for (const entry of data.recordBookEntries) {
      const sit = SITUATION_MAP.get(entry.situationId);
      if (sit) {
        recordBookEntries.push({
          id: entry.id,
          situation: sit,
          reporter: entry.reporter,
          session: entry.session,
        });
      }
    }
  }

  const situationPool: PedagogicalSituation[] = [];
  if (Array.isArray(data.situationPoolIds)) {
    for (const id of data.situationPoolIds) {
      const sit = SITUATION_MAP.get(id);
      if (sit) situationPool.push(sit);
    }
  }

  const safeIdx = Math.max(
    0,
    Math.min(weekSchedule.length - 1, data.situationIdx ?? 0)
  );
  const currentSit = weekSchedule[safeIdx]?.situation;
  const selectedChoice =
    data.selectedChoiceLabel && currentSit?.choices
      ? currentSit.choices.find((c) => c.label === data.selectedChoiceLabel) ?? null
      : null;

  const safePhase: GamePhase =
    data.phase && data.phase !== 'TITLE' && data.phase !== 'PAUSED'
      ? data.phase
      : 'PLAYING';

  return {
    savedAt: data.savedAt ?? Date.now(),
    phase: safePhase,
    teacherProfile: data.teacherProfile,
    weekNumber: Math.max(1, data.weekNumber),
    students: data.students,
    reprimands: data.reprimands ?? 0,
    recordBookEntries,
    weekEventCount: data.weekEventCount ?? 2,
    weekSchedule,
    situationPool,
    situationIdx: safeIdx,
    selectedChoice,
    teacherMood: data.teacherMood ?? 'neutral',
    pendingTransfers: Array.isArray(data.pendingTransfers)
      ? data.pendingTransfers
      : [],
    monthBestCount: data.monthBestCount ?? 0,
    monthTotalCount: data.monthTotalCount ?? 0,
    monthInfractionCount: data.monthInfractionCount ?? 0,
    totalBestCount: data.totalBestCount ?? 0,
    totalAnswered: data.totalAnswered ?? 0,
    staffLogs: Array.isArray(data.staffLogs) ? data.staffLogs : [],
    staffAffections: normalizeStaffAffections(
      data.staffAffections,
      data.staffAffection
    ),
  };
}

export function saveGameToStorage(payload: SerializedSavePayload): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function loadGameFromStorage(): HydratedSaveState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return hydrateSavePayload(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function clearGameFromStorage(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }
}

export function getSavePreview(saved: HydratedSaveState | null): SavePreviewInfo | null {
  if (!saved) return null;
  const weekInfo = getWeekInfo(saved.weekNumber);
  const activeCount = saved.students.filter((s) => s.status === 'active').length;
  return {
    teacherName: saved.teacherProfile.displayName,
    weekNumber: saved.weekNumber,
    month: weekInfo.month,
    weekInMonth: weekInfo.weekInMonth,
    activeCount,
    totalStudents: saved.students.length,
    reprimands: saved.reprimands,
    savedAt: saved.savedAt,
    isFinished: saved.phase === 'VICTORY' || saved.phase === 'GAME_OVER',
  };
}

export function encodeSaveCode(payload: SerializedSavePayload): string {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `${SAVE_CODE_PREFIX}${btoa(binary)}`;
}

export function decodeSaveInput(input: string): HydratedSaveState | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    if (trimmed.startsWith(SAVE_CODE_PREFIX)) {
      const b64 = trimmed.slice(SAVE_CODE_PREFIX.length).trim();
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const json = new TextDecoder().decode(bytes);
      return hydrateSavePayload(JSON.parse(json));
    }
    return hydrateSavePayload(JSON.parse(trimmed));
  } catch {
    return null;
  }
}
