import React from 'react';
import { X, BookOpen, Heart, Smile, Sparkles, AlertTriangle, Clock } from 'lucide-react';
import { Student } from '../types/game';
import {
  MAX_STAT,
  TRANSFER_THRESHOLD,
  WARNING_THRESHOLD,
} from '../data/students';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  const getAcademicRank = (score: number) => {
    if (score >= 800) return 'Giỏi';
    if (score >= 650) return 'Khá';
    if (score >= 500) return 'Trung bình';
    return 'Yếu';
  };

  const getMoodLabel = (score: number) => {
    if (score >= 750) return 'Phấn khởi';
    if (score >= 500) return 'Ổn định';
    if (score >= 300) return 'Căng thẳng';
    return 'Buồn bã';
  };

  const getAffectionLabel = (score: number) => {
    if (score >= 750) return 'Rất quý mến';
    if (score >= 500) return 'Thiện cảm';
    if (score > WARNING_THRESHOLD) return 'Hơi xa cách';
    if (score > TRANSFER_THRESHOLD) return 'Nguy cơ chuyển lớp';
    return 'Đã mất niềm tin';
  };

  const isTransferred = student.status === 'transferred';
  const isAtRisk = !isTransferred && student.affection <= WARNING_THRESHOLD;

  const statRows = [
    {
      label: 'Học lực',
      value: student.academic,
      statusText: getAcademicRank(student.academic),
      Icon: BookOpen,
      barColor: student.academic >= 650 ? 'bg-sky-600' : student.academic >= 500 ? 'bg-amber-500' : 'bg-rose-600',
      textColor: student.academic >= 650 ? 'text-sky-700' : student.academic >= 500 ? 'text-amber-700' : 'text-rose-700',
    },
    {
      label: 'Tâm trạng',
      value: student.mood,
      statusText: getMoodLabel(student.mood),
      Icon: Smile,
      barColor: student.mood >= 650 ? 'bg-emerald-600' : student.mood >= 400 ? 'bg-amber-500' : 'bg-rose-600',
      textColor: student.mood >= 650 ? 'text-emerald-700' : student.mood >= 400 ? 'text-amber-700' : 'text-rose-700',
    },
    {
      label: 'Yêu thích với giáo viên',
      value: student.affection,
      statusText: getAffectionLabel(student.affection),
      Icon: Heart,
      barColor: student.affection >= 600 ? 'bg-rose-500' : student.affection > WARNING_THRESHOLD ? 'bg-amber-500' : 'bg-rose-700',
      textColor: student.affection >= 600 ? 'text-rose-600' : student.affection > WARNING_THRESHOLD ? 'text-amber-700' : 'text-rose-700',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/45"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-profile-title"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#fffdf8] border border-stone-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 bg-emerald-900 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-inner shrink-0 border border-white/25"
              style={{ backgroundColor: student.avatar.shirtAccent }}
            >
              {student.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  id="student-profile-title"
                  className="text-lg font-bold truncate"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {student.name}
                </h3>
                {student.role && (
                  <span className="text-xs text-amber-200 font-medium">
                    · {student.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-100/85 mt-0.5 tabular-nums">
                Bàn {student.col + 1} · Hàng {student.row + 1} ·{' '}
                {isTransferred
                  ? `Đã chuyển lớp (Tháng ${student.transferredMonth ?? '?'} · Tuần ${student.transferredWeek ?? '?'})`
                  : 'Đang theo học'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng thông số"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-emerald-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {isTransferred ? (
            <div className="rounded-xl bg-stone-100 border border-stone-200 p-3 text-sm text-stone-700 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">Học sinh đã chuyển lớp</p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Chỉ số yêu thích giảm xuống ngưỡng tối thiểu ({TRANSFER_THRESHOLD} điểm) khiến em xin chuyển sang lớp khác.
                </p>
              </div>
            </div>
          ) : isAtRisk ? (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-900 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Cảnh báo: Nguy cơ chuyển lớp</p>
                <p className="text-xs text-rose-800 mt-0.5">
                  Nếu sự yêu thích giảm xuống ≤ {TRANSFER_THRESHOLD}, {student.name} sẽ xin chuyển lớp và bạn sẽ bị khiển trách!
                </p>
              </div>
            </div>
          ) : null}

          {/* Personality */}
          <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Tính cách đặc trưng</span>
            </div>
            <p className="mt-1 text-sm text-stone-800 leading-snug">{student.personality}</p>
          </div>

          {/* 3 Numeric Stats (0 - 1000) */}
          <div className="space-y-3">
            {statRows.map((stat) => {
              const Icon = stat.Icon;
              return (
                <div key={stat.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                      <Icon className={`w-4 h-4 ${stat.textColor}`} />
                      <span>{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono tabular-nums">
                      <span className={`text-xs font-semibold ${stat.textColor}`}>{stat.statusText}</span>
                      <span className="text-sm font-bold text-stone-900">
                        {stat.value}/{MAX_STAT}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${stat.barColor}`}
                      style={{ width: `${Math.min(100, (stat.value / MAX_STAT) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent pedagogical history */}
          <div className="pt-2 border-t border-stone-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-2">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>Diễn biến gần đây</span>
            </div>
            {student.history.length === 0 ? (
              <p className="text-xs text-stone-500 italic">Chưa có sự kiện nào tác động tới học sinh này.</p>
            ) : (
              <ul className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {student.history.slice(0, 4).map((entry, idx) => {
                  const changes = [
                    entry.deltas.academic ? `Học lực ${entry.deltas.academic > 0 ? '+' : ''}${entry.deltas.academic}` : null,
                    entry.deltas.mood ? `Tâm trạng ${entry.deltas.mood > 0 ? '+' : ''}${entry.deltas.mood}` : null,
                    entry.deltas.affection ? `Yêu thích ${entry.deltas.affection > 0 ? '+' : ''}${entry.deltas.affection}` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <li
                      key={idx}
                      className="text-xs flex items-start justify-between gap-2 text-stone-700 bg-stone-50 rounded-lg px-2.5 py-1.5 border border-stone-200/70"
                    >
                      <span className="truncate">
                        <strong className="text-stone-900">T{entry.week} (Tháng {entry.month}):</strong> {entry.title}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] font-semibold text-stone-800 tabular-nums">
                        {changes}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
