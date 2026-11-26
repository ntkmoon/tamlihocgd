import { Student } from '../types/game';

export const MAX_STAT = 1000;
export const MAX_STUDENT_TOTAL = MAX_STAT * 3;
export const TRANSFER_THRESHOLD = 250;
export const WARNING_THRESHOLD = 360;
export const MAX_REPRIMANDS = 3;

export function getStudentTotalScore(student: Pick<Student, 'academic' | 'mood' | 'affection'>): number {
  return student.academic + student.mood + student.affection;
}

export const BASE_STUDENT_NAMES: Record<string, string> = {
  thien: 'Thiên',
  hoa: 'Hoa',
  thang: 'Thắng',
  hoai_linh: 'Hoài Linh',
  hong_loan: 'Hồng Loan',
  tien: 'Tiến',
  vinh: 'Vinh',
  tuan: 'Tuấn',
  dung: 'Dũng',
  hung: 'Hùng',
  ba: 'Ba',
  long: 'Long',
  lien: 'Liên',
  minh: 'Minh',
  nam: 'Nam',
  hien: 'Hiền',
};

const MALE_POPULAR_NAMES = [
  'Gia Huy',
  'Đức Anh',
  'Minh Khang',
  'Hoàng Nam',
  'Tuấn Kiệt',
  'Quang Huy',
  'Nhật Minh',
  'Anh Khoa',
  'Thành Đạt',
  'Quốc Bảo',
  'Trung Hiếu',
  'Duy Khanh',
  'Hải Đăng',
  'Thái Sơn',
  'Gia Bảo',
  'Khôi Nguyên',
  'Bảo Long',
  'Hoàng Phúc',
  'Tiến Đạt',
  'Mạnh Hùng',
  'Đình Phong',
  'Văn Khoa',
  'Xuân Trường',
  'Trọng Nghĩa',
  'Thanh Tùng',
  'Phúc Thịnh',
  'Ngọc Sơn',
  'Đăng Khoa',
  'Minh Trí',
  'Hữu Phước',
  'Quang Vinh',
  'Anh Tú',
  'Trung Kiên',
  'Hoàng Bách',
];

const FEMALE_POPULAR_NAMES = [
  'Ngọc Hân',
  'Bảo Ngọc',
  'Khánh Linh',
  'Phương Anh',
  'Minh Anh',
  'Thảo Vy',
  'Hà My',
  'Gia Linh',
  'Ngọc Diệp',
  'Thu Hà',
  'Tường Vy',
  'Quỳnh Anh',
  'Thanh Trúc',
  'Diệu Linh',
  'Hải Yến',
  'Bảo Châu',
  'Yến Nhi',
  'Minh Thư',
  'Ngọc Ánh',
  'Thùy Dương',
  'Trà My',
  'Phương Linh',
  'Ánh Dương',
  'Thảo Nguyên',
  'Cẩm Tú',
  'Mai Phương',
  'Khánh Vy',
  'Thúy An',
];

function shuffleNames(arr: string[]): string[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const INITIAL_STUDENTS: Student[] = [
  // Hàng 1 (Bàn đầu)
  {
    id: 'thien',
    name: 'Thiên',
    row: 0,
    col: 0,
    personality: 'Trầm tính, dễ hồi hộp khi đứng trước đám đông',
    academic: 560,
    mood: 540,
    affection: 550,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'parted',
      hairColor: '#2c221e',
      shirtAccent: '#2563eb',
      bagColor: '#3b82f6',
      accessory: 'glasses',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'hoa',
    name: 'Hoa',
    row: 0,
    col: 1,
    personality: 'Nhạy cảm, giàu tình cảm, dễ tổn thương',
    academic: 660,
    mood: 620,
    affection: 700,
    status: 'active',
    avatar: {
      gender: 'female',
      hairStyle: 'ponytail',
      hairColor: '#3d2817',
      shirtAccent: '#ec4899',
      bagColor: '#f472b6',
      accessory: 'ribbon',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'thang',
    name: 'Thắng',
    row: 0,
    col: 2,
    role: 'Lớp phó học tập',
    personality: 'Chăm chỉ, thẳng thắn, tôn trọng sự công bằng',
    academic: 760,
    mood: 640,
    affection: 660,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'short',
      hairColor: '#1f1b18',
      shirtAccent: '#0d9488',
      bagColor: '#14b8a6',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'hoai_linh',
    name: 'Hoài Linh',
    row: 0,
    col: 3,
    personality: 'Giàu nghị lực nhưng mặc cảm hoàn cảnh khó khăn',
    academic: 460,
    mood: 480,
    affection: 580,
    status: 'active',
    avatar: {
      gender: 'female',
      hairStyle: 'pigtails',
      hairColor: '#281d18',
      shirtAccent: '#f59e0b',
      bagColor: '#d97706',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },

  // Hàng 2
  {
    id: 'hong_loan',
    name: 'Hồng Loan',
    row: 1,
    col: 0,
    role: 'Học sinh cá biệt',
    personality: 'Cá biệt: Bướng bỉnh, hay cãi tay đôi, dễ nổi nóng xô xát khi bị nhắc trước lớp',
    academic: 430,
    mood: 460,
    affection: 360,
    status: 'active',
    avatar: {
      gender: 'female',
      hairStyle: 'bob',
      hairColor: '#4a2c2a',
      shirtAccent: '#e11d48',
      bagColor: '#fb7185',
      accessory: 'headband',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'tien',
    name: 'Tiến',
    row: 1,
    col: 1,
    role: 'Học sinh cá biệt',
    personality: 'Cá biệt: Nóng nảy, hay gây gổ đánh nhau, từng xé bài kiểm tra và chống đối',
    academic: 350,
    mood: 420,
    affection: 320,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'spiky',
      hairColor: '#1c1917',
      shirtAccent: '#dc2626',
      bagColor: '#ef4444',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'vinh',
    name: 'Vinh',
    row: 1,
    col: 2,
    personality: 'Lanh lợi, hóm hỉnh, hay trêu chọc bạn bè',
    academic: 600,
    mood: 680,
    affection: 610,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'parted',
      hairColor: '#3b2618',
      shirtAccent: '#0284c7',
      bagColor: '#0ea5e9',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'tuan',
    name: 'Tuấn',
    row: 1,
    col: 3,
    personality: 'Bộc trực, thích thể hiện bản thân, dễ bị kích động khi va chạm',
    academic: 510,
    mood: 560,
    affection: 450,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'short',
      hairColor: '#292524',
      shirtAccent: '#ea580c',
      bagColor: '#f97316',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },

  // Hàng 3
  {
    id: 'dung',
    name: 'Dũng',
    row: 2,
    col: 0,
    personality: 'Cẩn thận, cầu toàn, rất để tâm thành tích thi đua',
    academic: 670,
    mood: 580,
    affection: 570,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'short',
      hairColor: '#1e1b18',
      shirtAccent: '#4f46e5',
      bagColor: '#6366f1',
      accessory: 'glasses',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'hung',
    name: 'Hùng',
    row: 2,
    col: 1,
    role: 'Học sinh cá biệt',
    personality: 'Cá biệt: Hay tụ tập ngoài cổng trường, trốn tiết chơi game và tham gia đánh nhau',
    academic: 370,
    mood: 450,
    affection: 340,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'spiky',
      hairColor: '#2e1f18',
      shirtAccent: '#16a34a',
      bagColor: '#22c55e',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'ba',
    name: 'Ba',
    row: 2,
    col: 2,
    personality: 'Tự ti vì học yếu, dễ bị bạn xấu rủ rê bỏ học',
    academic: 380,
    mood: 440,
    affection: 370,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'parted',
      hairColor: '#29201c',
      shirtAccent: '#64748b',
      bagColor: '#475569',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'long',
    name: 'Long',
    row: 2,
    col: 3,
    personality: 'Thật thà, bộc phát, dễ hoảng hốt khi gặp sự cố',
    academic: 550,
    mood: 560,
    affection: 560,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'short',
      hairColor: '#36261d',
      shirtAccent: '#0891b2',
      bagColor: '#06b6d4',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },

  // Hàng 4 (Cuối lớp)
  {
    id: 'lien',
    name: 'Liên',
    row: 3,
    col: 0,
    role: 'Lớp trưởng',
    personality: 'Gương mẫu, học giỏi nhưng đôi lúc hơi nghiêm khắc',
    academic: 800,
    mood: 620,
    affection: 700,
    status: 'active',
    avatar: {
      gender: 'female',
      hairStyle: 'ponytail',
      hairColor: '#1c1917',
      shirtAccent: '#7c3aed',
      bagColor: '#8b5cf6',
      accessory: 'glasses',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'minh',
    name: 'Minh',
    row: 3,
    col: 1,
    role: 'Học sinh cá biệt',
    personality: 'Cá biệt: Thích quậy phá giờ học, trêu thầy cô, thường gây gổ bắt nạt bạn',
    academic: 400,
    mood: 520,
    affection: 350,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'spiky',
      hairColor: '#38251a',
      shirtAccent: '#ca8a04',
      bagColor: '#eab308',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'nam',
    name: 'Nam',
    row: 3,
    col: 2,
    personality: 'Hòa đồng, sức học trung bình nhưng đang cố gắng vươn lên',
    academic: 500,
    mood: 570,
    affection: 580,
    status: 'active',
    avatar: {
      gender: 'male',
      hairStyle: 'parted',
      hairColor: '#261e1a',
      shirtAccent: '#059669',
      bagColor: '#10b981',
      accessory: 'none',
      redScarf: true,
    },
    history: [],
  },
  {
    id: 'hien',
    name: 'Hiền',
    row: 3,
    col: 3,
    personality: 'Chăm ngoan, lo xa, hay để ý nhận xét của thầy cô',
    academic: 710,
    mood: 560,
    affection: 650,
    status: 'active',
    avatar: {
      gender: 'female',
      hairStyle: 'bob',
      hairColor: '#2c1e16',
      shirtAccent: '#db2777',
      bagColor: '#f43f5e',
      accessory: 'ribbon',
      redScarf: true,
    },
    history: [],
  },
];

export function createRandomizedClassStudents(): Student[] {
  const malePool = shuffleNames(MALE_POPULAR_NAMES);
  const femalePool = shuffleNames(FEMALE_POPULAR_NAMES);
  let maleIdx = 0;
  let femaleIdx = 0;

  return INITIAL_STUDENTS.map((s) => {
    const jitter = () => Math.floor(Math.random() * 25) - 12;
    const assignedName =
      s.avatar.gender === 'female'
        ? femalePool[femaleIdx++] ?? s.name
        : malePool[maleIdx++] ?? s.name;

    return {
      ...s,
      name: assignedName,
      academic: Math.max(260, Math.min(820, s.academic + jitter())),
      mood: Math.max(260, Math.min(800, s.mood + jitter())),
      affection: Math.max(TRANSFER_THRESHOLD + 45, Math.min(800, s.affection + jitter())),
      history: [],
    };
  });
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COMPOUND_AFTER_GUARDS: Record<string, RegExp> = {
  Hùng: /^\s+Vương/u,
  Tuấn: /^\s+Anh/u,
  Hoa: /^\s+(?:quả|hồng|cúc|đào|mai|hậu)/iu,
  Liên: /^\s+(?:hoan|hệ|kết|quan|trường|tục)/iu,
  Tiến: /^\s+(?:bộ|hành|tới|lên)/iu,
  Minh: /^\s+(?:chứng|họa|bạch)/iu,
  Long: /^\s+(?:trọng|lanh)/iu,
  Hiền: /^\s+(?:lành|hậu|thảo)/iu,
  Ba: /^\s+(?:mẹ|má|lần|buổi|tiết|tháng|năm|tuần)/iu,
};

export function formatStudentNamesInText(
  text: string,
  students: Student[],
  involvedStudentIds?: string[]
): string {
  if (!text || !involvedStudentIds || involvedStudentIds.length === 0) {
    return text;
  }

  const studentById = new Map(students.map((s) => [s.id, s]));
  const pairs = involvedStudentIds
    .map((id) => {
      const base = BASE_STUDENT_NAMES[id];
      const stu = studentById.get(id);
      if (!base || !stu || base === stu.name) return null;
      return { base, actual: stu.name };
    })
    .filter((x): x is { base: string; actual: string } => x !== null)
    .sort((a, b) => b.base.length - a.base.length);

  if (pairs.length === 0) return text;

  let result = text;
  for (const { base, actual } of pairs) {
    const pattern = new RegExp(
      `(^|[^\\p{L}\\p{N}])(${escapeRegex(base)})(?=$|[^\\p{L}\\p{N}])`,
      'gu'
    );
    result = result.replace(
      pattern,
      (fullMatch, prefix: string, matchedName: string, offset: number, source: string) => {
        const before = source.slice(0, offset) + prefix;
        const after = source.slice(offset + fullMatch.length);

        if (base === 'Nam' && /Việt\s+$/u.test(before)) return fullMatch;
        if (base === 'Tuấn' && /Thầy\s+$/u.test(before) && /^\s+Anh/u.test(after)) {
          return fullMatch;
        }
        const afterGuard = COMPOUND_AFTER_GUARDS[base];
        if (afterGuard && afterGuard.test(after)) return fullMatch;

        void matchedName;
        return `${prefix}${actual}`;
      }
    );
  }

  return result;
}
