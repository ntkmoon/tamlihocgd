import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  CalendarCheck,
  History,
  Play,
  RotateCcw,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import {
  AcademicWeekInfo,
  Student,
  TeacherGender,
  TeacherProfile,
  TransferEvent,
} from '../types/game';
import {
  MAX_REPRIMANDS,
  MAX_STAT,
  TRANSFER_THRESHOLD,
  WARNING_THRESHOLD,
} from '../data/students';
import {
  getStaffMaxTotalAffection,
  getStaffTotalAffection,
  INITIAL_STAFF_AFFECTION,
  STAFF_CHARACTERS,
} from '../data/staff';
import { formatTeacherDisplayName, getWeekInfo, TOTAL_ACADEMIC_WEEKS } from '../data/calendar';
import { SavePreviewInfo } from '../utils/saveGame';
import { TeacherAvatar } from './TeacherAvatar';

interface TitleOverlayProps {
  initialProfile: TeacherProfile;
  savePreview?: SavePreviewInfo | null;
  onStart: (profile: TeacherProfile) => void;
  onResumeSaved?: () => void;
}

export const TitleOverlay: React.FC<TitleOverlayProps> = ({
  initialProfile,
  savePreview,
  onStart,
  onResumeSaved,
}) => {
  const [gender, setGender] = useState<TeacherGender>(initialProfile.gender);
  const [rawName, setRawName] = useState<string>(initialProfile.rawName);

  const previewDisplayName = formatTeacherDisplayName(rawName, gender);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      gender,
      rawName: rawName.trim(),
      displayName: previewDisplayName,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-stone-950/55 backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#fffdf7] border-2 border-amber-900/20 shadow-2xl"
      >
        {/* Decorative chalkboard banner header */}
        <div className="chalkboard-surface px-5 py-5 text-center text-white border-b-4 border-[#834b1e]">
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-200 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lớp Học Chủ Nhiệm
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-emerald-100/90">
            Hành trình 1 năm học (Tháng 9 – Tháng 5) · Mở Sổ đầu bài đầu tuần &amp; Tổng kết cuối tháng
          </p>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* Saved Progress Resume Banner (Auto-saved locally without account/IP dependency) */}
          {savePreview && !savePreview.isFinished && onResumeSaved && (
            <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-500/60 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <History className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Tiến trình đã tự động lưu trên máy</span>
                </div>
                <p className="text-xs text-emerald-950 font-mono tabular-nums">
                  <strong>{savePreview.teacherName}</strong> · Tháng {savePreview.month} (T
                  {savePreview.weekInMonth}/4) · Tuần {savePreview.weekNumber}/
                  {TOTAL_ACADEMIC_WEEKS} · Sĩ số {savePreview.activeCount}/
                  {savePreview.totalStudents}
                </p>
              </div>
              <button
                type="button"
                onClick={onResumeSaved}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Chơi tiếp ngay</span>
              </button>
            </div>
          )}

          {/* Teacher Selection & Name Input */}
          <div className="rounded-2xl bg-stone-50/90 border border-stone-200 p-3.5 sm:p-4 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                Chọn nhân vật giáo viên chủ nhiệm
              </span>
              <span className="text-xs font-semibold text-emerald-800">
                Xưng danh: <strong className="font-bold">{previewDisplayName}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  gender === 'female'
                    ? 'bg-emerald-50 border-emerald-600 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
                }`}
              >
                <TeacherAvatar
                  mood="happy"
                  gender="female"
                  size="sm"
                  hideBubble
                  showNameplate={false}
                />
                <div className="text-center sm:text-left">
                  <div className="text-sm font-bold text-stone-900">Cô giáo</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    Ân cần · Tinh tế · Gần gũi
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-emerald-50 border-emerald-600 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
                }`}
              >
                <TeacherAvatar
                  mood="happy"
                  gender="male"
                  size="sm"
                  hideBubble
                  showNameplate={false}
                />
                <div className="text-center sm:text-left">
                  <div className="text-sm font-bold text-stone-900">Thầy giáo</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    Điềm tĩnh · Bản lĩnh · Tâm lý
                  </div>
                </div>
              </button>
            </div>

            <div>
              <label
                htmlFor="teacher-name-input"
                className="block text-xs font-bold text-stone-700 mb-1.5"
              >
                Nhập tên giáo viên của bạn
              </label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-bold shrink-0">
                  {gender === 'male' ? 'Thầy' : 'Cô'}
                </span>
                <input
                  id="teacher-name-input"
                  type="text"
                  value={rawName}
                  maxLength={24}
                  onChange={(e) => setRawName(e.target.value)}
                  placeholder={gender === 'male' ? 'VD: Minh, Hùng, Nam...' : 'VD: Ngân, Lan, Hoa...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
            </div>
          </div>

          {/* Hướng dẫn chơi game */}
          <div className="rounded-2xl bg-amber-50/75 border border-amber-200/80 p-3.5 sm:p-4 space-y-2.5 text-left">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-950">
              <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Hướng dẫn chơi game</span>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 leading-relaxed">
              <li className="rounded-xl bg-white/80 border border-amber-200/60 p-2.5">
                <strong className="text-stone-900">1. Cốt truyện ngẫu nhiên &amp; Sổ đầu bài:</strong> Trừ các ngày lễ cố định, mọi tình huống &amp; đáp án A–D đều ngẫu nhiên hoàn toàn mỗi lượt chơi. Đầu tuần mở Sổ đầu bài (0–2 sai phạm) + 2–4 sự kiện (tối đa 5/tuần).
              </li>
              <li className="rounded-xl bg-white/80 border border-amber-200/60 p-2.5">
                <strong className="text-stone-900">2. Đồng nghiệp &amp; Ban Giám Hiệu:</strong> Trong năm học bạn sẽ gặp các tình huống phối hợp cùng Đồng nghiệp và Ban Giám Hiệu; cách ứng xử ảnh hưởng đến tập thể lớp và chỉ số yêu quý.
              </li>
              <li className="rounded-xl bg-white/80 border border-amber-200/60 p-2.5">
                <strong className="text-stone-900">3. Theo dõi từng học sinh:</strong> Click vào mỗi bàn học để kiểm tra Học lực, Tính cách, Tâm trạng &amp; Yêu thích (thang <strong>{MAX_STAT}</strong>) và lưu ý học sinh cá biệt.
              </li>
              <li className="rounded-xl bg-white/80 border border-amber-200/60 p-2.5">
                <strong className="text-stone-900">4. Hoàn thành năm học:</strong> Cuối mỗi tháng mở bảng tổng kết. Giữ Yêu thích &gt; <strong>{TRANSFER_THRESHOLD}</strong> suốt 36 tuần (Tháng 9–5) để tránh học sinh chuyển lớp và bị khiển trách.
              </li>
            </ol>
          </div>

          <div className="flex flex-col items-center gap-2 pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-base shadow-lg transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>
                {savePreview && !savePreview.isFinished
                  ? `Bắt đầu năm học mới (${previewDisplayName})`
                  : `Nhận lớp chủ nhiệm (${previewDisplayName})`}
              </span>
            </button>
            <p className="text-xs text-stone-500 text-center">
              Tiến trình tự lưu trên trình duyệt này · Click học sinh xem thông số
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

interface TransferAlertModalProps {
  events: TransferEvent[];
  reprimands: number;
  onAcknowledge: () => void;
}

export const TransferAlertModal: React.FC<TransferAlertModalProps> = ({
  events,
  reprimands,
  onAcknowledge,
}) => {
  if (events.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl bg-[#fffdf8] border-2 border-rose-500 shadow-2xl overflow-hidden">
        <div className="bg-rose-700 px-5 py-4 text-white flex items-center gap-3 shrink-0">
          <AlertTriangle className="w-6 h-6 text-amber-300 shrink-0" />
          <div>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Biên bản khiển trách từ Ban Giám Hiệu
            </h3>
            <p className="text-xs text-rose-100 tabular-nums">
              Số lần bị khiển trách: {reprimands}/{MAX_REPRIMANDS} · Có {events.length} học sinh chuyển lớp
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-2.5 overflow-y-auto flex-1 min-h-0">
          {events.map((ev) => (
            <div
              key={ev.studentId}
              className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-950"
            >
              <p className="font-bold">
                Học sinh {ev.studentName} đã xin chuyển lớp! (Tháng {ev.month} · Tuần {ev.week})
              </p>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                Chỉ số yêu thích với giáo viên tụt xuống còn{' '}
                <strong className="font-mono tabular-nums">
                  {ev.finalAffection}/{MAX_STAT}
                </strong>{' '}
                (ngưỡng tối thiểu {TRANSFER_THRESHOLD}). Phụ huynh và học sinh mất niềm tin nên đã làm đơn chuyển lớp.
              </p>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-rose-200/80 bg-[#fffdf8] space-y-3 shrink-0">
          <p className="text-xs text-stone-600 leading-relaxed">
            {reprimands >= MAX_REPRIMANDS
              ? 'Bạn đã chạm giới hạn 3 lần bị khiển trách trong năm học.'
              : `Hãy chú ý quan tâm tâm trạng và sự yêu thích của các em. Nếu bị khiển trách đủ ${MAX_REPRIMANDS} lần, bạn sẽ bị đình chỉ công tác chủ nhiệm.`}
          </p>

          <button
            type="button"
            onClick={onAcknowledge}
            className="w-full py-3 min-h-[44px] rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            {reprimands >= MAX_REPRIMANDS ? 'Xem quyết định kỷ luật & Bắt đầu lại' : 'Tiếp thu và tiếp tục'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface MonthSummaryModalProps {
  weekInfo: AcademicWeekInfo;
  targetWeeks: number;
  students: Student[];
  monthBestCount: number;
  monthTotalCount: number;
  monthInfractionCount: number;
  reprimands: number;
  staffAffections: Record<string, number>;
  onNextMonth: () => void;
}

export const MonthSummaryModal: React.FC<MonthSummaryModalProps> = ({
  weekInfo,
  targetWeeks,
  students,
  monthBestCount,
  monthTotalCount,
  monthInfractionCount,
  reprimands,
  staffAffections,
  onNextMonth,
}) => {
  const active = students.filter((s) => s.status === 'active');
  const avgAcademic = active.length
    ? Math.round(active.reduce((sum, s) => sum + s.academic, 0) / active.length)
    : 0;
  const avgMood = active.length
    ? Math.round(active.reduce((sum, s) => sum + s.mood, 0) / active.length)
    : 0;
  const avgAffection = active.length
    ? Math.round(active.reduce((sum, s) => sum + s.affection, 0) / active.length)
    : 0;
  const atRiskStudents = active.filter((s) => s.affection <= WARNING_THRESHOLD);

  const totalStaffAffection = getStaffTotalAffection(staffAffections);
  const maxStaffTotal = getStaffMaxTotalAffection();

  const isFinalMonth = weekInfo.weekNumber >= targetWeeks;
  const nextWeekInfo = !isFinalMonth ? getWeekInfo(weekInfo.weekNumber + 1) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/55"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl bg-[#fffdf8] border border-stone-200 shadow-2xl overflow-hidden">
        <div className="bg-emerald-900 px-5 py-4 text-white flex items-center gap-3 shrink-0">
          <CalendarCheck className="w-6 h-6 text-amber-300 shrink-0" />
          <div className="min-w-0">
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Bảng Tổng Kết Tháng {weekInfo.month}
            </h3>
            <p className="text-xs text-emerald-100 tabular-nums">
              Hoàn thành Tuần {weekInfo.weekNumber}/{targetWeeks} · Chuẩn sư phạm:{' '}
              {monthBestCount}/{monthTotalCount} tình huống
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div className="rounded-xl bg-emerald-50/75 border border-emerald-200/80 px-3.5 py-2.5 text-xs text-emerald-950 space-y-1">
            <div className="font-bold">{weekInfo.monthTheme}</div>
            <div className="text-emerald-800 tabular-nums">
              Đã xử lý <strong>{monthInfractionCount}</strong> sai phạm Sổ đầu bài trong tháng
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="rounded-xl bg-sky-50 border border-sky-200 p-2.5">
              <div className="text-[11px] font-semibold text-sky-800">Học lực TB</div>
              <div className="text-lg font-bold font-mono tabular-nums text-sky-950 mt-0.5">
                {avgAcademic}
                <span className="text-xs font-normal text-sky-700/75">/{MAX_STAT}</span>
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5">
              <div className="text-[11px] font-semibold text-emerald-800">Tâm trạng TB</div>
              <div className="text-lg font-bold font-mono tabular-nums text-emerald-950 mt-0.5">
                {avgMood}
                <span className="text-xs font-normal text-emerald-700/75">/{MAX_STAT}</span>
              </div>
            </div>
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5">
              <div className="text-[11px] font-semibold text-rose-800">Yêu thích TB</div>
              <div className="text-lg font-bold font-mono tabular-nums text-rose-950 mt-0.5">
                {avgAffection}
                <span className="text-xs font-normal text-rose-700/75">/{MAX_STAT}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-700 space-y-1.5 tabular-nums">
            <div className="flex justify-between">
              <span>Sĩ số còn lại:</span>
              <strong className="text-stone-900">
                {active.length}/{students.length} học sinh
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Tổng yêu quý ĐN &amp; BGH:</span>
              <strong className="font-mono text-rose-700">
                {totalStaffAffection.toLocaleString('vi-VN')}/{maxStaffTotal.toLocaleString('vi-VN')}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Số lần bị khiển trách:</span>
              <strong className={reprimands > 0 ? 'text-rose-700' : 'text-emerald-700'}>
                {reprimands}/{MAX_REPRIMANDS}
              </strong>
            </div>
          </div>

          {/* Individual Staff Affections */}
          <div className="rounded-xl bg-white border border-stone-200 p-3 space-y-1.5">
            <div className="text-[11px] font-bold text-stone-800">
              Chỉ số yêu quý từng Đồng nghiệp &amp; Ban Giám Hiệu:
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-mono tabular-nums text-stone-700">
              {STAFF_CHARACTERS.map((s) => (
                <div key={s.id} className="flex justify-between gap-1">
                  <span className="font-sans truncate">{s.name}</span>
                  <strong className="text-stone-900">
                    {staffAffections[s.id] ?? INITIAL_STAFF_AFFECTION}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {atRiskStudents.length > 0 && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950">
              <p className="font-bold">Lưu ý cho tháng tới:</p>
              <p className="mt-1">
                {atRiskStudents.map((s) => `${s.name} (${s.affection}đ)`).join(', ')} đang có chỉ số yêu thích thấp, cần ứng xử khéo léo để tránh các em chuyển lớp.
              </p>
            </div>
          )}

          {nextWeekInfo && (
            <div className="rounded-xl bg-amber-50/70 border border-amber-200/70 px-3 py-2 text-xs text-amber-900">
              <strong>Tháng tiếp theo:</strong> {nextWeekInfo.monthTheme}
            </div>
          )}

        </div>

        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-stone-200 bg-[#fffdf8] shrink-0">
          <button
            type="button"
            onClick={onNextMonth}
            className="w-full py-3 min-h-[44px] rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            {isFinalMonth
              ? 'Dự Lễ Bế Giảng Năm Học'
              : `Mở Sổ đầu bài Tháng ${nextWeekInfo!.month} · Tuần 1/4`}
          </button>
        </div>
      </div>
    </div>
  );
};

interface PauseModalProps {
  teacherName: string;
  onResume: () => void;
  onRestart: () => void;
  onBackToTitle: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  teacherName,
  onResume,
  onRestart,
  onBackToTitle,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/55"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm max-h-[92vh] overflow-y-auto rounded-2xl bg-[#fffdf8] border border-stone-200 shadow-2xl p-5 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
            Tạm dừng tiết học
          </h3>
          <p className="text-xs text-emerald-800 font-semibold mt-0.5">{teacherName}</p>
        </div>

        <div className="text-xs text-stone-600 space-y-1.5 leading-relaxed bg-stone-50 rounded-xl p-3 border border-stone-200">
          <p>• Tình huống &amp; đáp án A–D ngẫu nhiên hoàn toàn mỗi lượt chơi (trừ mốc ngày lễ cố định).</p>
          <p>• Giao tiếp khéo léo với Đồng nghiệp và Ban Giám Hiệu để giữ thiện cảm và không khí lớp tích cực.</p>
          <p>
            • Thang điểm {MAX_STAT}. Yêu thích ≤ {TRANSFER_THRESHOLD} sẽ chuyển lớp (tối đa {MAX_REPRIMANDS} lần khiển trách).
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onResume}
            className="w-full py-2.5 min-h-[44px] rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm cursor-pointer"
          >
            Tiếp tục giảng dạy
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 min-h-[44px] rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset lớp &amp; Chọn lại nhân vật</span>
          </button>
          <button
            type="button"
            onClick={onBackToTitle}
            className="w-full py-2 min-h-[40px] rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium text-xs cursor-pointer"
          >
            Về màn hình chính (giữ tiến trình)
          </button>
        </div>
      </div>
    </div>
  );
};

interface EndGameModalProps {
  isVictory: boolean;
  teacherName: string;
  weekNumber: number;
  targetWeeks: number;
  students: Student[];
  bestChoicesCount: number;
  totalAnswered: number;
  reprimands: number;
  staffAffections: Record<string, number>;
  onRestart: () => void;
}

export const EndGameModal: React.FC<EndGameModalProps> = ({
  isVictory,
  teacherName,
  weekNumber,
  targetWeeks,
  students,
  bestChoicesCount,
  totalAnswered,
  reprimands,
  staffAffections,
  onRestart,
}) => {
  const active = students.filter((s) => s.status === 'active');
  const transferred = students.filter((s) => s.status === 'transferred');
  const avgAcademic = active.length
    ? Math.round(active.reduce((sum, s) => sum + s.academic, 0) / active.length)
    : 0;
  const avgAffection = active.length
    ? Math.round(active.reduce((sum, s) => sum + s.affection, 0) / active.length)
    : 0;
  const totalStaffAffection = getStaffTotalAffection(staffAffections);
  const maxStaffTotal = getStaffMaxTotalAffection();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/65"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl bg-[#fffdf8] border border-stone-200 shadow-2xl overflow-hidden">
        <div
          className={`px-6 py-4 sm:py-5 text-white text-center shrink-0 ${
            isVictory ? 'bg-emerald-800' : 'bg-rose-800'
          }`}
        >
          <div className="inline-flex w-12 h-12 rounded-2xl bg-white/15 items-center justify-center mb-2">
            {isVictory ? (
              <Award className="w-7 h-7 text-amber-300" />
            ) : (
              <ShieldAlert className="w-7 h-7 text-amber-200" />
            )}
          </div>
          <h3 className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            {isVictory ? 'Hoàn thành năm học!' : 'Bị đình chỉ chủ nhiệm'}
          </h3>
          <p className="text-xs text-white/85 mt-1">
            {isVictory
              ? `${teacherName} đã đồng hành cùng lớp trọn vẹn từ Tháng 9 đến Lễ Bế Giảng cuối Tháng 5.`
              : `${teacherName} đã nhận đủ ${MAX_REPRIMANDS} biên bản khiển trách do có quá nhiều học sinh xin chuyển lớp.`}
          </p>
        </div>

        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-2 gap-2.5 text-sm">
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
              <div className="text-xs text-stone-500">Tiến độ năm học</div>
              <div className="text-lg font-bold font-mono tabular-nums text-stone-900">
                Tuần {weekNumber}/{targetWeeks}
              </div>
            </div>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
              <div className="text-xs text-stone-500">Xử lý chuẩn sư phạm</div>
              <div className="text-lg font-bold font-mono tabular-nums text-emerald-700">
                {bestChoicesCount}/{totalAnswered}
              </div>
            </div>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
              <div className="text-xs text-stone-500">Học lực / Yêu thích TB</div>
              <div className="text-lg font-bold font-mono tabular-nums text-stone-900">
                {avgAcademic} / {avgAffection}
                <span className="text-xs font-normal text-stone-500">/{MAX_STAT}</span>
              </div>
            </div>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
              <div className="text-xs text-stone-500">Chuyển lớp / Khiển trách</div>
              <div className="text-lg font-bold font-mono tabular-nums text-rose-700">
                {transferred.length} em · {reprimands}/{MAX_REPRIMANDS}
              </div>
            </div>
            <div className="col-span-2 rounded-xl bg-rose-50/70 border border-rose-200 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-900">
                  Tổng yêu quý Đồng nghiệp &amp; Ban Giám Hiệu
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-rose-800">
                  {totalStaffAffection.toLocaleString('vi-VN')}/{maxStaffTotal.toLocaleString('vi-VN')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] font-mono tabular-nums text-stone-700">
                {STAFF_CHARACTERS.map((s) => (
                  <div key={s.id} className="flex justify-between gap-1">
                    <span className="font-sans truncate">{s.name}</span>
                    <strong className="text-stone-900">
                      {staffAffections[s.id] ?? INITIAL_STAFF_AFFECTION}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-stone-200 bg-[#fffdf8] shrink-0">
          <button
            type="button"
            onClick={onRestart}
            className={`w-full py-3 min-h-[44px] rounded-xl font-bold text-sm cursor-pointer inline-flex items-center justify-center gap-2 ${
              isVictory
                ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                : 'bg-rose-700 hover:bg-rose-600 text-white'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset lớp &amp; Chọn lại nhân vật</span>
          </button>
        </div>
      </div>
    </div>
  );
};
