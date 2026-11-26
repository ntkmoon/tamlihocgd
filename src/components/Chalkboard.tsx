import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  CalendarHeart,
  BookMarked,
  CloudRain,
  Building2,
  Home,
  Globe,
  Crown,
  Briefcase,
} from 'lucide-react';
import {
  AcademicWeekInfo,
  ChoiceOption,
  ExternalEventSource,
  PedagogicalSituation,
  SituationOrigin,
  StatDelta,
  Student,
  TeacherGender,
} from '../types/game';
import { formatTeacherText } from '../data/calendar';
import { formatStudentNamesInText } from '../data/students';
import { getStaffAffectionDelta, resolveStaffForSituation } from '../data/staff';
import { StaffAvatar } from './StaffAvatar';

interface ChalkboardProps {
  weekInfo: AcademicWeekInfo;
  teacherGender: TeacherGender;
  situationIndex: number;
  totalSituationsWeek: number;
  situation: PedagogicalSituation;
  origin: SituationOrigin;
  allStudents: Student[];
  involvedStudents: Student[];
  selectedChoice: ChoiceOption | null;
  isFeedbackPhase: boolean;
  isLastOfWeek: boolean;
  onChoose: (choice: ChoiceOption) => void;
  onNext: () => void;
  onSelectStudent: (studentId: string) => void;
  onSelectStaff?: (staffId: string) => void;
}

export const Chalkboard: React.FC<ChalkboardProps> = ({
  weekInfo,
  teacherGender,
  situationIndex,
  totalSituationsWeek,
  situation,
  origin,
  allStudents,
  involvedStudents,
  selectedChoice,
  isFeedbackPhase,
  isLastOfWeek,
  onChoose,
  onNext,
  onSelectStudent,
  onSelectStaff,
}) => {
  const isExternal = situation.eventType === 'external' && Boolean(situation.externalEvent);
  const activeStaff = resolveStaffForSituation(situation);
  const isPrincipal = activeStaff?.tier === 'principal' || situation.category === 'Ban Giám Hiệu';
  const isColleague = !isPrincipal && (Boolean(activeStaff) || situation.category === 'Đồng nghiệp');

  const qualityMeta = (quality: ChoiceOption['quality']) => {
    switch (quality) {
      case 'best':
        return {
          label: 'Xử lý chuẩn sư phạm',
          color: 'text-emerald-300',
          bg: 'bg-emerald-950/60 border-emerald-400/50',
          Icon: CheckCircle2,
        };
      case 'good':
        return {
          label: 'Tạm ổn, cần sâu sát hơn',
          color: 'text-sky-300',
          bg: 'bg-sky-950/60 border-sky-400/50',
          Icon: CheckCircle2,
        };
      case 'weak':
        return {
          label: 'Chưa khéo léo',
          color: 'text-amber-300',
          bg: 'bg-amber-950/60 border-amber-400/50',
          Icon: AlertTriangle,
        };
      case 'poor':
        return {
          label: 'Phản tác dụng sư phạm',
          color: 'text-rose-300',
          bg: 'bg-rose-950/60 border-rose-400/50',
          Icon: XCircle,
        };
    }
  };

  const getExternalSourceIcon = (source: ExternalEventSource) => {
    switch (source) {
      case 'Thời tiết':
        return CloudRain;
      case 'Nhà trường':
        return Building2;
      case 'Phụ huynh':
        return Home;
      case 'Cộng đồng':
      default:
        return Globe;
    }
  };

  const renderDeltaColumn = (
    label: string,
    delta: StatDelta,
    affectionLabel: string = 'Yêu thích'
  ) => {
    const rows: Array<{ text: string; positive: boolean }> = [];
    if (delta.affection) {
      rows.push({
        text: `${delta.affection > 0 ? '+' : ''}${delta.affection} ${affectionLabel}`,
        positive: delta.affection > 0,
      });
    }
    if (delta.mood) {
      rows.push({
        text: `${delta.mood > 0 ? '+' : ''}${delta.mood} Tâm trạng`,
        positive: delta.mood > 0,
      });
    }
    if (delta.academic) {
      rows.push({
        text: `${delta.academic > 0 ? '+' : ''}${delta.academic} Học lực`,
        positive: delta.academic > 0,
      });
    }
    if (rows.length === 0) return null;

    return (
      <div className="text-xs text-emerald-100/90 tabular-nums space-y-0.5">
        <div className="font-semibold text-amber-200">{label}:</div>
        <div className="flex flex-col gap-0.5 pl-2">
          {rows.map((r, i) => (
            <span
              key={i}
              className={`font-mono font-semibold ${
                r.positive ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {r.text}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const formatSitText = (text: string) =>
    formatStudentNamesInText(
      formatTeacherText(text, teacherGender),
      allStudents,
      situation.involvedStudentIds
    );

  const activeHoliday = situation.holidayTag ?? weekInfo.holidayLabel;
  const formattedTitle = formatSitText(situation.title);
  const formattedPrompt = formatSitText(situation.prompt);

  const nextButtonLabel = !isLastOfWeek
    ? isExternal
      ? 'Ghi nhận & Tiếp tục'
      : 'Tình huống tiếp theo'
    : weekInfo.weekInMonth === 4
      ? `Tổng kết Tháng ${weekInfo.month}`
      : 'Mở Sổ đầu bài tuần mới';

  const ExternalIcon = situation.externalEvent
    ? getExternalSourceIcon(situation.externalEvent.source)
    : Globe;

  return (
    <div className="relative w-full">
      {/* Wooden Frame */}
      <div className="wood-frame rounded-2xl p-2 sm:p-3">
        {/* Chalkboard Slate */}
        <div className="chalkboard-surface rounded-xl px-4 py-3.5 sm:px-6 sm:py-4 text-slate-50 relative overflow-hidden">
          {/* Chalkboard Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/15">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-emerald-200 font-medium">
              {origin === 'record_book' ? (
                <BookMarked className="w-4 h-4 text-rose-300 shrink-0" />
              ) : isExternal ? (
                <ExternalIcon className="w-4 h-4 text-sky-300 shrink-0" />
              ) : isPrincipal ? (
                <Crown className="w-4 h-4 text-amber-300 shrink-0" />
              ) : isColleague ? (
                <Briefcase className="w-4 h-4 text-teal-300 shrink-0" />
              ) : (
                <BookOpen className="w-4 h-4 text-amber-300 shrink-0" />
              )}
              <span className="font-mono tabular-nums font-semibold text-amber-200">
                Tháng {weekInfo.month} · Tuần {weekInfo.weekInMonth}/4
              </span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span className="font-mono tabular-nums">
                Tình huống {situationIndex + 1}/{totalSituationsWeek}
              </span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span
                className={
                  origin === 'record_book'
                    ? 'text-rose-200 font-semibold'
                    : isExternal
                      ? 'text-sky-200 font-semibold'
                      : isPrincipal
                        ? 'text-amber-300 font-bold'
                        : isColleague
                          ? 'text-teal-200 font-semibold'
                          : 'text-emerald-100'
                }
              >
                {origin === 'record_book'
                  ? 'Sổ đầu bài tuần trước'
                  : isExternal && situation.externalEvent
                    ? `Tác động ngoài (${situation.externalEvent.source})`
                    : situation.category}
              </span>
              {activeHoliday && origin !== 'record_book' && !isExternal && !isPrincipal && !isColleague && (
                <>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
                    <CalendarHeart className="w-3.5 h-3.5 shrink-0" />
                    {activeHoliday}
                  </span>
                </>
              )}
            </div>

            {involvedStudents.length > 0 ? (
              <div className="flex items-center flex-wrap gap-1.5 text-xs">
                <span className="text-emerald-200/80">Học sinh liên quan:</span>
                {involvedStudents.map((stu) => (
                  <button
                    key={stu.id}
                    type="button"
                    onClick={() => onSelectStudent(stu.id)}
                    className="px-2 py-0.5 rounded bg-white/12 hover:bg-white/22 text-amber-200 font-semibold border border-white/20 transition-colors cursor-pointer whitespace-nowrap"
                    title="Click để xem thông số học sinh"
                  >
                    {stu.name}
                  </button>
                ))}
              </div>
            ) : activeStaff ? (
              <span
                className={`text-xs font-semibold ${
                  isPrincipal ? 'text-amber-300' : 'text-teal-200'
                }`}
              >
                {isPrincipal ? 'Trao đổi với Ban Giám Hiệu' : 'Trao đổi với Đồng nghiệp'}
              </span>
            ) : (
              <span className="text-xs text-emerald-200/75 italic">
                Tác động chung tới tập thể lớp
              </span>
            )}
          </div>

          {/* Active Colleague / Ban Giám Hiệu NPC Strip */}
          {activeStaff && (
            <button
              type="button"
              onClick={() => onSelectStaff?.(activeStaff.id)}
              className={`mt-2.5 w-full text-left rounded-xl border px-3 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                isPrincipal
                  ? 'bg-amber-950/45 hover:bg-amber-950/65 border-amber-400/50'
                  : 'bg-teal-950/40 hover:bg-teal-950/60 border-teal-300/35'
              }`}
              title="Click để xem hồ sơ Đồng nghiệp & Ban Giám Hiệu"
            >
              <StaffAvatar staff={activeStaff} size="xs" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-xs sm:text-sm font-bold text-amber-200">
                    {activeStaff.name}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      isPrincipal
                        ? 'bg-amber-400/25 text-amber-200 border border-amber-300/40'
                        : 'bg-teal-400/20 text-teal-100 border border-teal-300/30'
                    }`}
                  >
                    {activeStaff.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-200/85 truncate">
                  {activeStaff.subjectOrArea} · Nhấn để xem hồ sơ &amp; chỉ số yêu quý
                </p>
              </div>
            </button>
          )}

          {/* Situation Title & Prompt */}
          <div className="mt-3">
            <h2
              className="text-base sm:text-lg font-bold text-amber-200 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {formattedTitle}
            </h2>
            <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-slate-100/95">
              {formattedPrompt}
            </p>
          </div>

          {/* External Event (no A/B/C/D choices) OR Pedagogical Choices OR Feedback */}
          {isExternal && situation.externalEvent ? (
            <div className="mt-3.5 space-y-3">
              <div className="rounded-xl border border-sky-300/45 bg-sky-950/55 p-3.5">
                <div className="flex items-center gap-2">
                  <ExternalIcon className="w-5 h-5 shrink-0 text-sky-300" />
                  <span className="text-sm font-bold text-sky-200">
                    Sự kiện ngẫu nhiên ({situation.externalEvent.source}) — Không có lựa chọn cho giáo viên
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {formatSitText(situation.externalEvent.feedback)}
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/15 flex flex-wrap gap-6">
                  {involvedStudents.length > 0 &&
                    renderDeltaColumn(
                      involvedStudents.map((s) => s.name).join(', '),
                      situation.externalEvent.targetEffects
                    )}
                  {renderDeltaColumn('Cả lớp', situation.externalEvent.classEffects)}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>{nextButtonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : !isFeedbackPhase && situation.choices ? (
            <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {situation.choices.map((choice) => (
                <button
                  key={choice.label}
                  type="button"
                  onClick={() => onChoose(choice)}
                  className="group text-left flex items-start gap-2.5 p-2.5 sm:p-3 min-h-[52px] rounded-xl bg-white/8 hover:bg-white/16 active:scale-[0.99] border border-white/18 hover:border-amber-300/70 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-300"
                >
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-300/90 group-hover:bg-amber-300 text-stone-900 font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                    {choice.label}
                  </span>
                  <span className="text-xs sm:text-[13.5px] leading-snug text-slate-50/95">
                    {formatSitText(choice.text)}
                  </span>
                </button>
              ))}
            </div>
          ) : selectedChoice ? (
            <div className="mt-3.5 space-y-3">
              {(() => {
                const meta = qualityMeta(selectedChoice.quality);
                const StatusIcon = meta.Icon;
                return (
                  <div className={`rounded-xl border p-3.5 ${meta.bg}`}>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-5 h-5 shrink-0 ${meta.color}`} />
                      <span className={`text-sm font-bold ${meta.color}`}>
                        Lựa chọn {selectedChoice.label} — {meta.label}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-100 leading-relaxed">
                      {formatSitText(selectedChoice.feedback)}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-white/15 flex flex-wrap gap-6">
                      {involvedStudents.length > 0 &&
                        renderDeltaColumn(
                          involvedStudents.map((s) => s.name).join(', '),
                          selectedChoice.targetEffects
                        )}
                      {activeStaff &&
                        renderDeltaColumn(
                          activeStaff.name,
                          {
                            affection: getStaffAffectionDelta(
                              selectedChoice.quality,
                              isPrincipal
                            ),
                          },
                          'Yêu quý'
                        )}
                      {renderDeltaColumn('Cả lớp', selectedChoice.classEffects)}
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>{nextButtonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Chalk ledge with chalk & eraser */}
        <div className="flex items-center justify-between px-4 pt-1.5 pb-0.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-1.5 rounded-full bg-white/90 shadow-xs" />
            <span className="w-5 h-1.5 rounded-full bg-amber-200/90 shadow-xs" />
          </div>
          <div className="w-10 h-2.5 rounded-xs bg-stone-900 border border-stone-700 shadow-xs" title="Khăn lau bảng" />
        </div>
      </div>
    </div>
  );
};
