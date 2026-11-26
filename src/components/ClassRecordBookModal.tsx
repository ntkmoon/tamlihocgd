import React from 'react';
import { BookMarked, CalendarHeart, CheckCircle2, ClipboardList, ArrowRight } from 'lucide-react';
import {
  AcademicWeekInfo,
  ClassRecordEntry,
  Student,
  TeacherGender,
} from '../types/game';
import { formatTeacherText, MAX_WEEKLY_SITUATIONS } from '../data/calendar';
import { formatStudentNamesInText } from '../data/students';

interface ClassRecordBookModalProps {
  weekInfo: AcademicWeekInfo;
  teacherName: string;
  teacherGender: TeacherGender;
  entries: ClassRecordEntry[];
  eventCount: number;
  students: Student[];
  onStartWeek: () => void;
}

export const ClassRecordBookModal: React.FC<ClassRecordBookModalProps> = ({
  weekInfo,
  teacherName,
  teacherGender,
  entries,
  eventCount,
  students,
  onStartWeek,
}) => {
  const studentMap = new Map(students.map((s) => [s.id, s.name]));
  const totalSituations = entries.length + eventCount;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-stone-950/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-book-title"
    >
      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#fdfaf0] border-2 border-amber-900/30 shadow-2xl">
        {/* Authentic Ledger Header */}
        <div className="bg-[#7c2d12] px-5 py-4 text-amber-50 border-b-4 border-amber-400/70">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
                <BookMarked className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h2
                  id="record-book-title"
                  className="text-lg sm:text-xl font-extrabold tracking-tight text-amber-100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Sổ Đầu Bài · Tuần {weekInfo.weekInMonth}/4 — Tháng {weekInfo.month}
                </h2>
                <p className="text-xs text-amber-200/90 font-mono tabular-nums mt-0.5">
                  Tuần {weekInfo.weekNumber}/36 · GVCN: {teacherName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Content */}
        <div className="p-5 space-y-4">
          {/* Month theme & holiday */}
          <div className="rounded-xl bg-amber-50/90 border border-amber-200/80 px-3.5 py-2.5 text-xs space-y-1">
            <div className="font-bold text-amber-950">{weekInfo.monthTheme}</div>
            {weekInfo.holidayLabel && (
              <div className="flex items-center gap-1.5 font-semibold text-rose-700">
                <CalendarHeart className="w-3.5 h-3.5 shrink-0" />
                <span>Sự kiện tuần này: {weekInfo.holidayLabel}</span>
              </div>
            )}
          </div>

          {/* Recorded infractions from last week */}
          <div className="rounded-xl border border-stone-300/90 bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-stone-100 border-b border-stone-200">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                <ClipboardList className="w-4 h-4 text-rose-700" />
                <span>Ghi nhận sai phạm của học sinh tuần trước</span>
              </div>
              <span className="font-mono text-xs font-bold tabular-nums text-stone-700">
                {entries.length} mục
              </span>
            </div>

            {entries.length === 0 ? (
              <div className="p-4 flex items-start gap-3 text-sm text-emerald-900 bg-emerald-50/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">
                    {weekInfo.weekNumber === 1
                      ? 'Tuần đầu tiên của năm học mới'
                      : 'Không có sai phạm nào được ghi nhận tuần trước'}
                  </p>
                  <p className="text-xs text-emerald-800/85 mt-0.5 leading-relaxed">
                    {weekInfo.weekNumber === 1
                      ? 'Lớp bắt đầu năm học mới trong không khí háo hức. Chưa có biên bản nhắc nhở từ tuần trước.'
                      : 'Tuần qua tập thể lớp duy trì nề nếp ổn định. Thầy cô tiếp tục theo dõi các hoạt động trong tuần này.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-stone-200">
                {entries.map((entry, idx) => {
                  const targetNames = entry.situation.involvedStudentIds
                    .map((id) => studentMap.get(id))
                    .filter(Boolean)
                    .join(', ');
                  return (
                    <div key={entry.id} className="p-3.5 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-500">
                        <span className="font-bold text-rose-800">
                          Mục #{idx + 1} · {entry.session}
                        </span>
                        <span>Người ghi: {entry.reporter}</span>
                      </div>
                      <p className="text-sm font-bold text-stone-900 leading-snug">
                        {formatStudentNamesInText(
                          formatTeacherText(entry.situation.title, teacherGender),
                          students,
                          entry.situation.involvedStudentIds
                        )}
                      </p>
                      {targetNames && (
                        <p className="text-xs text-stone-700">
                          Học sinh liên quan: <strong className="text-stone-900">{targetNames}</strong>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Weekly Workload Breakdown */}
          <div className="rounded-xl bg-stone-100/80 border border-stone-200 px-3.5 py-2.5 text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2 tabular-nums">
            <span>
              Kế hoạch tuần: <strong>{entries.length}</strong> sai phạm Sổ đầu bài +{' '}
              <strong>{eventCount}</strong> sự kiện trong tuần
            </span>
            <span className="font-mono font-bold text-emerald-900">
              Tổng: {totalSituations}/{MAX_WEEKLY_SITUATIONS} tình huống
            </span>
          </div>

          <button
            type="button"
            onClick={onStartWeek}
            className="w-full inline-flex items-center justify-center gap-2 py-3 min-h-[46px] rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <span>
              {entries.length > 0
                ? 'Ký nhận Sổ đầu bài & Xử lý tình huống'
                : 'Ký nhận Sổ đầu bài & Bắt đầu tuần học'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
