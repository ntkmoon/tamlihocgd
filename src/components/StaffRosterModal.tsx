import React from 'react';
import { Briefcase, Crown, X, CheckCircle2, AlertTriangle, Heart } from 'lucide-react';
import {
  getStaffAverageAffection,
  getStaffMaxTotalAffection,
  getStaffTotalAffection,
  INITIAL_STAFF_AFFECTION,
  STAFF_CHARACTERS,
} from '../data/staff';
import { MAX_STAT } from '../data/students';
import { StaffInteractionLog } from '../types/game';
import { StaffAvatar } from './StaffAvatar';

interface StaffRosterModalProps {
  isOpen: boolean;
  staffAffections: Record<string, number>;
  logs: StaffInteractionLog[];
  focusedStaffId?: string | null;
  onClose: () => void;
}

function getStaffAffectionMeta(score: number) {
  if (score >= 750) {
    return {
      label: 'Rất được quý mến',
      textColor: 'text-rose-700',
      barColor: 'bg-rose-500',
      boxBg: 'bg-rose-50/80 border-rose-200',
    };
  }
  if (score >= 550) {
    return {
      label: 'Thiện cảm tốt',
      textColor: 'text-emerald-700',
      barColor: 'bg-emerald-600',
      boxBg: 'bg-emerald-50/80 border-emerald-200',
    };
  }
  if (score >= 400) {
    return {
      label: 'Bình thường',
      textColor: 'text-amber-700',
      barColor: 'bg-amber-500',
      boxBg: 'bg-amber-50/80 border-amber-200',
    };
  }
  return {
    label: 'Căng thẳng · Cần khéo léo',
    textColor: 'text-rose-800',
    barColor: 'bg-rose-700',
    boxBg: 'bg-rose-50 border-rose-300',
  };
}

export const StaffRosterModal: React.FC<StaffRosterModalProps> = ({
  isOpen,
  staffAffections,
  logs,
  focusedStaffId,
  onClose,
}) => {
  if (!isOpen) return null;

  const principals = STAFF_CHARACTERS.filter((s) => s.tier === 'principal');
  const colleagues = STAFF_CHARACTERS.filter((s) => s.tier === 'colleague');

  const totalAffection = getStaffTotalAffection(staffAffections);
  const maxTotal = getStaffMaxTotalAffection();
  const avgAffection = getStaffAverageAffection(staffAffections);
  const principalTotal = principals.reduce(
    (sum, s) => sum + (staffAffections[s.id] ?? INITIAL_STAFF_AFFECTION),
    0
  );
  const colleagueTotal = colleagues.reduce(
    (sum, s) => sum + (staffAffections[s.id] ?? INITIAL_STAFF_AFFECTION),
    0
  );
  const affectionMeta = getStaffAffectionMeta(avgAffection);

  const renderStaffCard = (staff: (typeof STAFF_CHARACTERS)[number]) => {
    const isPrincipal = staff.tier === 'principal';
    const isFocused = focusedStaffId === staff.id;
    const personLogs = logs.filter((l) => l.staffId === staff.id);
    const goodCount = personLogs.filter(
      (l) => l.quality === 'best' || l.quality === 'good'
    ).length;
    const badCount = personLogs.length - goodCount;
    const score = staffAffections[staff.id] ?? INITIAL_STAFF_AFFECTION;
    const scoreMeta = getStaffAffectionMeta(score);

    return (
      <div
        key={staff.id}
        className={`rounded-2xl border p-3.5 space-y-2.5 transition-colors ${
          isFocused
            ? isPrincipal
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/40'
              : 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/40'
            : 'bg-white border-stone-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <StaffAvatar staff={staff} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <h4 className="text-sm font-bold text-stone-900">{staff.name}</h4>
              <span className="text-xs font-semibold text-stone-600">
                {staff.title}
              </span>
            </div>
            <p className="text-xs font-medium text-stone-600 mt-0.5">
              {staff.subjectOrArea}
            </p>
            <p className="text-xs text-stone-700 mt-1 leading-relaxed">
              {staff.personality}
            </p>
          </div>
        </div>

        {/* Individual Affection Meter */}
        <div className="rounded-xl bg-stone-50 border border-stone-200/80 px-2.5 py-2 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono tabular-nums">
            <span className="inline-flex items-center gap-1 font-sans font-semibold text-stone-800">
              <Heart className={`w-3.5 h-3.5 ${scoreMeta.textColor} fill-current`} />
              Yêu quý
            </span>
            <span>
              <span className={`font-sans text-[11px] font-semibold mr-1.5 ${scoreMeta.textColor}`}>
                {scoreMeta.label}
              </span>
              <strong className="text-stone-900">
                {score}/{MAX_STAT}
              </strong>
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${scoreMeta.barColor}`}
              style={{ width: `${Math.min(100, Math.max(0, (score / MAX_STAT) * 100))}%` }}
            />
          </div>
        </div>

        <div
          className={`rounded-xl px-2.5 py-2 text-[11px] leading-relaxed ${
            isPrincipal
              ? 'bg-amber-50/90 text-amber-950 border border-amber-200'
              : 'bg-stone-50 text-stone-700 border border-stone-200'
          }`}
        >
          {staff.powerNote}
        </div>

        {personLogs.length > 0 && (
          <div className="pt-1 border-t border-stone-100 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-600 tabular-nums">
              <span>Đã trao đổi: {personLogs.length} lần</span>
              <span className="flex items-center gap-2">
                <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> {goodCount}
                </span>
                <span className="inline-flex items-center gap-0.5 text-rose-700 font-bold">
                  <AlertTriangle className="w-3 h-3" /> {badCount}
                </span>
              </span>
            </div>
            <p className="text-[11px] text-stone-600 truncate">
              Gần nhất (T{personLogs[0].week}): {personLogs[0].title}
              {typeof personLogs[0].affectionDelta === 'number' &&
                ` (${personLogs[0].affectionDelta > 0 ? '+' : ''}${personLogs[0].affectionDelta} Yêu quý)`}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="staff-roster-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#fffdf7] border border-stone-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#243d32] px-5 py-4 text-amber-50 flex items-center justify-between gap-3 sticky top-0 z-10">
          <div>
            <h2
              id="staff-roster-title"
              className="text-lg sm:text-xl font-bold text-amber-200"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Đồng nghiệp &amp; Ban Giám Hiệu
            </h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              Chỉ số yêu quý riêng của từng thầy cô và tổng hợp toàn trường.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5 text-amber-100" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          {/* Total Staff Affection Summary */}
          <div className={`rounded-2xl border p-3.5 sm:p-4 space-y-2 ${affectionMeta.boxBg}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                <Heart className={`w-4 h-4 shrink-0 ${affectionMeta.textColor} fill-current`} />
                <span>Tổng chỉ số yêu quý (Đồng nghiệp &amp; Ban Giám Hiệu)</span>
              </div>
              <div className="flex items-center gap-2 font-mono tabular-nums">
                <span className={`text-xs font-bold ${affectionMeta.textColor}`}>
                  TB {avgAffection}/{MAX_STAT}
                </span>
                <span className="text-sm font-extrabold text-stone-900">
                  Tổng: {totalAffection.toLocaleString('vi-VN')}/{maxTotal.toLocaleString('vi-VN')}
                </span>
              </div>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/80 border border-stone-200/80 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${affectionMeta.barColor}`}
                style={{ width: `${Math.min(100, Math.max(0, (totalAffection / maxTotal) * 100))}%` }}
              />
            </div>
          </div>

          {/* Ban Giám Hiệu */}
          <section className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>Ban Giám Hiệu</span>
              </div>
              <span className="text-xs font-mono font-semibold text-amber-900 tabular-nums">
                Tổng nhóm: {principalTotal.toLocaleString('vi-VN')}/{(principals.length * MAX_STAT).toLocaleString('vi-VN')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {principals.map(renderStaffCard)}
            </div>
          </section>

          {/* Đồng nghiệp */}
          <section className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-950">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>Đồng nghiệp · Tổ chuyên môn</span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-900 tabular-nums">
                Tổng nhóm: {colleagueTotal.toLocaleString('vi-VN')}/{(colleagues.length * MAX_STAT).toLocaleString('vi-VN')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colleagues.map(renderStaffCard)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


