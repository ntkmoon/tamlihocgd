import { AcademicWeekInfo, PedagogicalSituation, TeacherGender } from '../types/game';

export const TOTAL_ACADEMIC_WEEKS = 36;
export const MAX_WEEKLY_SITUATIONS = 5;

export const MONTH_THEMES: Record<number, string> = {
  9: 'Tháng 9 · Khai giảng & Ổn định nề nếp',
  10: 'Tháng 10 · Thi đua học tốt & Ngày 20/10',
  11: 'Tháng 11 · Tri ân Thầy Cô & Hội giảng 20/11',
  12: 'Tháng 12 · Truyền thống 22/12 & Ôn thi HK I',
  1: 'Tháng 1 · Sơ kết HK I & Khởi động HK II',
  2: 'Tháng 2 · Tết Nguyên Đán & Nhịp học đầu xuân',
  3: 'Tháng 3 · Quốc tế Phụ nữ 8/3 & Tháng Thanh niên',
  4: 'Tháng 4 · Giỗ Tổ Hùng Vương & Trải nghiệm 30/4',
  5: 'Tháng 5 · Ôn thi cuối năm & Lễ Bế Giảng',
};

export const ACADEMIC_YEAR_WEEKS: AcademicWeekInfo[] = [
  // Tháng 9 (Tuần 1-4)
  { weekNumber: 1, month: 9, weekInMonth: 1, monthTheme: MONTH_THEMES[9], holidayLabel: 'Lễ Khai Giảng (5/9)', eventCount: 3, seasonTone: 'autumn' },
  { weekNumber: 2, month: 9, weekInMonth: 2, monthTheme: MONTH_THEMES[9], eventCount: 3, seasonTone: 'autumn' },
  { weekNumber: 3, month: 9, weekInMonth: 3, monthTheme: MONTH_THEMES[9], eventCount: 2, seasonTone: 'autumn' },
  { weekNumber: 4, month: 9, weekInMonth: 4, monthTheme: MONTH_THEMES[9], holidayLabel: 'Tết Trung Thu', eventCount: 4, seasonTone: 'festival' },

  // Tháng 10 (Tuần 5-8)
  { weekNumber: 5, month: 10, weekInMonth: 1, monthTheme: MONTH_THEMES[10], eventCount: 3, seasonTone: 'autumn' },
  { weekNumber: 6, month: 10, weekInMonth: 2, monthTheme: MONTH_THEMES[10], eventCount: 2, seasonTone: 'autumn' },
  { weekNumber: 7, month: 10, weekInMonth: 3, monthTheme: MONTH_THEMES[10], holidayLabel: 'Ngày Phụ nữ Việt Nam (20/10)', eventCount: 3, seasonTone: 'festival' },
  { weekNumber: 8, month: 10, weekInMonth: 4, monthTheme: MONTH_THEMES[10], holidayLabel: 'Kiểm tra Giữa Học Kỳ I', eventCount: 4, seasonTone: 'autumn' },

  // Tháng 11 (Tuần 9-12)
  { weekNumber: 9, month: 11, weekInMonth: 1, monthTheme: MONTH_THEMES[11], eventCount: 3, seasonTone: 'autumn' },
  { weekNumber: 10, month: 11, weekInMonth: 2, monthTheme: MONTH_THEMES[11], holidayLabel: 'Hội diễn Văn nghệ Chào 20/11', eventCount: 3, seasonTone: 'festival' },
  { weekNumber: 11, month: 11, weekInMonth: 3, monthTheme: MONTH_THEMES[11], holidayLabel: 'Ngày Nhà giáo Việt Nam (20/11)', eventCount: 4, seasonTone: 'festival' },
  { weekNumber: 12, month: 11, weekInMonth: 4, monthTheme: MONTH_THEMES[11], holidayLabel: 'Hội giảng & Sinh hoạt chuyên môn', eventCount: 3, seasonTone: 'autumn' },

  // Tháng 12 (Tuần 13-16)
  { weekNumber: 13, month: 12, weekInMonth: 1, monthTheme: MONTH_THEMES[12], eventCount: 3, seasonTone: 'winter' },
  { weekNumber: 14, month: 12, weekInMonth: 2, monthTheme: MONTH_THEMES[12], holidayLabel: 'Ngoại khóa Ngày QĐND (22/12)', eventCount: 3, seasonTone: 'winter' },
  { weekNumber: 15, month: 12, weekInMonth: 3, monthTheme: MONTH_THEMES[12], holidayLabel: 'Ôn tập Cuối Học Kỳ I', eventCount: 2, seasonTone: 'winter' },
  { weekNumber: 16, month: 12, weekInMonth: 4, monthTheme: MONTH_THEMES[12], holidayLabel: 'Thi Cuối Học Kỳ I', eventCount: 4, seasonTone: 'winter' },

  // Tháng 1 (Tuần 17-20)
  { weekNumber: 17, month: 1, weekInMonth: 1, monthTheme: MONTH_THEMES[1], holidayLabel: 'Chào Năm Mới (1/1) & Sơ kết HK I', eventCount: 3, seasonTone: 'winter' },
  { weekNumber: 18, month: 1, weekInMonth: 2, monthTheme: MONTH_THEMES[1], holidayLabel: 'Họp Phụ huynh Sơ kết HK I', eventCount: 3, seasonTone: 'winter' },
  { weekNumber: 19, month: 1, weekInMonth: 3, monthTheme: MONTH_THEMES[1], eventCount: 2, seasonTone: 'winter' },
  { weekNumber: 20, month: 1, weekInMonth: 4, monthTheme: MONTH_THEMES[1], holidayLabel: 'Thiện nguyện Ấm áp trước Tết', eventCount: 3, seasonTone: 'festival' },

  // Tháng 2 (Tuần 21-24)
  { weekNumber: 21, month: 2, weekInMonth: 1, monthTheme: MONTH_THEMES[2], holidayLabel: 'Hội Xuân & Gói bánh đón Tết', eventCount: 3, seasonTone: 'festival' },
  { weekNumber: 22, month: 2, weekInMonth: 2, monthTheme: MONTH_THEMES[2], holidayLabel: 'Tết Nguyên Đán & Khai Xuân', eventCount: 4, seasonTone: 'festival' },
  { weekNumber: 23, month: 2, weekInMonth: 3, monthTheme: MONTH_THEMES[2], eventCount: 3, seasonTone: 'spring' },
  { weekNumber: 24, month: 2, weekInMonth: 4, monthTheme: MONTH_THEMES[2], eventCount: 2, seasonTone: 'spring' },

  // Tháng 3 (Tuần 25-28)
  { weekNumber: 25, month: 3, weekInMonth: 1, monthTheme: MONTH_THEMES[3], holidayLabel: 'Ngày Quốc tế Phụ nữ (8/3)', eventCount: 3, seasonTone: 'festival' },
  { weekNumber: 26, month: 3, weekInMonth: 2, monthTheme: MONTH_THEMES[3], eventCount: 3, seasonTone: 'spring' },
  { weekNumber: 27, month: 3, weekInMonth: 3, monthTheme: MONTH_THEMES[3], holidayLabel: 'Hội khỏe & Ngày Thành lập Đoàn (26/3)', eventCount: 4, seasonTone: 'spring' },
  { weekNumber: 28, month: 3, weekInMonth: 4, monthTheme: MONTH_THEMES[3], holidayLabel: 'Kiểm tra Giữa Học Kỳ II', eventCount: 3, seasonTone: 'spring' },

  // Tháng 4 (Tuần 29-32)
  { weekNumber: 29, month: 4, weekInMonth: 1, monthTheme: MONTH_THEMES[4], eventCount: 3, seasonTone: 'spring' },
  { weekNumber: 30, month: 4, weekInMonth: 2, monthTheme: MONTH_THEMES[4], holidayLabel: 'Giỗ Tổ Hùng Vương (10/3 ÂL)', eventCount: 3, seasonTone: 'festival' },
  { weekNumber: 31, month: 4, weekInMonth: 3, monthTheme: MONTH_THEMES[4], holidayLabel: 'Hoạt động Dã ngoại & Trải nghiệm', eventCount: 3, seasonTone: 'spring' },
  { weekNumber: 32, month: 4, weekInMonth: 4, monthTheme: MONTH_THEMES[4], holidayLabel: 'Kỷ niệm 30/4 - 1/5 & Hướng nghiệp', eventCount: 4, seasonTone: 'festival' },

  // Tháng 5 (Tuần 33-36)
  { weekNumber: 33, month: 5, weekInMonth: 1, monthTheme: MONTH_THEMES[5], eventCount: 3, seasonTone: 'summer' },
  { weekNumber: 34, month: 5, weekInMonth: 2, monthTheme: MONTH_THEMES[5], holidayLabel: 'Thi Cuối Học Kỳ II', eventCount: 4, seasonTone: 'summer' },
  { weekNumber: 35, month: 5, weekInMonth: 3, monthTheme: MONTH_THEMES[5], holidayLabel: 'Họp Phụ huynh Cuối năm & 19/5', eventCount: 3, seasonTone: 'summer' },
  { weekNumber: 36, month: 5, weekInMonth: 4, monthTheme: MONTH_THEMES[5], holidayLabel: 'Lễ Bế Giảng & Chia tay Năm học', eventCount: 4, seasonTone: 'festival' },
];

export function getWeekInfo(weekNumber: number): AcademicWeekInfo {
  const clamped = Math.max(1, Math.min(TOTAL_ACADEMIC_WEEKS, weekNumber));
  return ACADEMIC_YEAR_WEEKS[clamped - 1];
}

export function formatTeacherDisplayName(rawName: string, gender: TeacherGender): string {
  const cleaned = rawName.trim();
  const prefix = gender === 'male' ? 'Thầy' : 'Cô';
  if (!cleaned) {
    return gender === 'male' ? 'Thầy Minh' : 'Cô Ngân';
  }
  const lower = cleaned.toLowerCase();
  if (lower.startsWith('thầy ') || lower.startsWith('cô ')) {
    const rest = cleaned.replace(/^(thầy|cô)\s+/i, '').trim();
    return rest ? `${prefix} ${rest}` : `${prefix} ${gender === 'male' ? 'Minh' : 'Ngân'}`;
  }
  return `${prefix} ${cleaned}`;
}

export function formatTeacherText(text: string, gender: TeacherGender): string {
  const titleCap = gender === 'male' ? 'Thầy' : 'Cô';
  const titleLow = gender === 'male' ? 'thầy' : 'cô';
  return text
    .replace(/\{Thầy\/Cô\}/g, titleCap)
    .replace(/\{thầy\/cô\}/g, titleLow)
    .replace(/Thầy\/Cô|Cô\/Thầy/g, titleCap)
    .replace(/thầy\/cô|cô\/thầy/g, titleLow);
}

const INFRACTION_KEYWORDS = [
  'nói chuyện riêng',
  'mất trật tự',
  'ngủ gật',
  'trốn tiết',
  'nghỉ học không phép',
  'đi học muộn',
  'đi muộn',
  'đánh nhau',
  'xô xát',
  'gây gổ',
  'quay cóp',
  'gian lận',
  'phao',
  'chép bài',
  'xé bài',
  'xé trang vở',
  'điện thoại',
  'nhuộm tóc',
  'vô lễ',
  'nói tục',
  'chửi bậy',
  'chơi game',
  'đá bóng vỡ',
  'lấy bút',
  'trộm',
  'lấy cắp',
  'xả rác',
  'trực nhật',
  'bài tập',
  'không thuộc bài',
  'nhại',
  'chọc phá',
  'quậy phá',
  'bắt nạt',
  'tẩy chay',
  'nói dối',
  'giả mạo',
  'hút thuốc',
  'bỏ tiết',
];

export function isStudentInfractionSituation(sit: PedagogicalSituation): boolean {
  if (sit.eventType === 'external') return false;
  if (typeof sit.isInfraction === 'boolean') return sit.isInfraction;
  if (sit.involvedStudentIds.length === 0) return false;
  if (
    sit.category === 'Ngày lễ & Sự kiện' ||
    sit.category === 'Đồng nghiệp' ||
    sit.category === 'Ban Giám Hiệu' ||
    sit.staffTier
  ) {
    return false;
  }
  const haystack = `${sit.title} ${sit.prompt}`.toLowerCase();
  return INFRACTION_KEYWORDS.some((kw) => haystack.includes(kw));
}

export const RECORD_BOOK_REPORTERS = [
  'Giáo viên bộ môn Toán',
  'Giáo viên bộ môn Ngữ văn',
  'Giáo viên bộ môn Tiếng Anh',
  'Cờ đỏ trực tuần',
  'Ban cán sự lớp',
  'Giáo viên bộ môn Lịch sử',
  'Giáo viên Thể dục',
];

export const RECORD_BOOK_SESSIONS = [
  'Tiết 2 · Thứ Hai',
  'Tiết 3 · Thứ Ba',
  'Tiết 4 · Thứ Tư',
  'Giờ ra chơi · Thứ Năm',
  'Tiết 1 · Thứ Sáu',
  'Tiết 5 · Thứ Sáu',
];
