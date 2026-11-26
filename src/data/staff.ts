import { PedagogicalSituation, StaffCharacter } from '../types/game';
import { buildSituation, CompactSituationInput } from './situationBuilder';

export const INITIAL_STAFF_AFFECTION = 550;

export function createInitialStaffAffections(): Record<string, number> {
  const result: Record<string, number> = {};
  for (const staff of STAFF_CHARACTERS) {
    const jitter = Math.floor(Math.random() * 25) - 12; // 538..562
    result[staff.id] = INITIAL_STAFF_AFFECTION + jitter;
  }
  return result;
}

export function normalizeStaffAffections(
  raw?: Record<string, number> | null,
  fallbackSingle?: number
): Record<string, number> {
  const baseValue =
    typeof fallbackSingle === 'number' ? fallbackSingle : INITIAL_STAFF_AFFECTION;
  const normalized: Record<string, number> = {};
  for (const staff of STAFF_CHARACTERS) {
    const val = raw && typeof raw[staff.id] === 'number' ? raw[staff.id] : baseValue;
    normalized[staff.id] = Math.max(0, Math.min(1000, Math.round(val)));
  }
  return normalized;
}

export function getStaffTotalAffection(affections: Record<string, number>): number {
  return STAFF_CHARACTERS.reduce(
    (sum, s) => sum + (affections[s.id] ?? INITIAL_STAFF_AFFECTION),
    0
  );
}

export function getStaffMaxTotalAffection(): number {
  return STAFF_CHARACTERS.length * 1000;
}

export function getStaffAverageAffection(affections: Record<string, number>): number {
  if (STAFF_CHARACTERS.length === 0) return INITIAL_STAFF_AFFECTION;
  return Math.round(getStaffTotalAffection(affections) / STAFF_CHARACTERS.length);
}

export function getStaffAffectionDelta(
  quality: 'best' | 'good' | 'weak' | 'poor',
  isPrincipal: boolean
): number {
  if (isPrincipal) {
    switch (quality) {
      case 'best':
        return 26;
      case 'good':
        return 10;
      case 'weak':
        return -28;
      case 'poor':
        return -58;
    }
  }
  switch (quality) {
    case 'best':
      return 18;
    case 'good':
      return 8;
    case 'weak':
      return -18;
    case 'poor':
      return -38;
  }
}

export const STAFF_CHARACTERS: StaffCharacter[] = [
  // Ban Giám Hiệu
  {
    id: 'bgh_hieu_truong',
    name: 'Thầy Quốc Việt',
    title: 'Hiệu trưởng',
    tier: 'principal',
    subjectOrArea: 'Quản lý chung & Kỷ cương toàn trường',
    personality: 'Quyết đoán, nguyên tắc, đặt danh tiếng và thành tích tập thể trường lên hàng đầu.',
    powerNote:
      'Phụ trách điều hành chung nhà trường, trực tiếp chỉ đạo công tác thi đua, nề nếp và khen thưởng.',
    gender: 'male',
    hairColor: '#374151',
    shirtColor: '#1e3a5f',
    glasses: true,
  },
  {
    id: 'bgh_hieu_pho',
    name: 'Cô Thanh Mai',
    title: 'Phó Hiệu trưởng',
    tier: 'principal',
    subjectOrArea: 'Phụ trách Chuyên môn & Nề nếp',
    personality: 'Sắc sảo, tỉ mỉ, theo dõi sát sổ đầu bài, giáo án và phản ánh từ phụ huynh.',
    powerNote:
      'Phụ trách công tác chuyên môn, dự giờ thăm lớp và phối hợp giải quyết phản ánh của phụ huynh.',
    gender: 'female',
    hairColor: '#292524',
    shirtColor: '#7c2d12',
    glasses: false,
  },

  // Đồng nghiệp (Tổ chuyên môn & Giáo viên bộ môn)
  {
    id: 'gv_lan',
    name: 'Cô Lan',
    title: 'Tổ trưởng Toán',
    tier: 'colleague',
    subjectOrArea: 'Giáo viên bộ môn Toán',
    personality: 'Thẳng thắn, nghiêm khắc về chuyên môn và kỷ luật giờ học.',
    powerNote:
      'Giáo viên dạy chính môn Toán của lớp, thường xuyên trao đổi về bài kiểm tra và ý thức học tập.',
    gender: 'female',
    hairColor: '#3f2a1d',
    shirtColor: '#0f766e',
    glasses: true,
  },
  {
    id: 'gv_tuan_anh',
    name: 'Thầy Tuấn Anh',
    title: 'Giáo viên trẻ',
    tier: 'colleague',
    subjectOrArea: 'Giáo viên Tin học · Phụ trách Đoàn/Đội',
    personality: 'Nhiệt huyết, sáng tạo, gần gũi học sinh nhưng đôi lúc thiếu kinh nghiệm xử lý khủng hoảng.',
    powerNote:
      'Đồng hành cùng lớp trong các hoạt động Đoàn – Đội, văn nghệ và phong trào thi đua.',
    gender: 'male',
    hairColor: '#1c1917',
    shirtColor: '#0369a1',
    glasses: false,
  },
  {
    id: 'gv_huong',
    name: 'Cô Hương',
    title: 'Giáo viên Ngữ văn',
    tier: 'colleague',
    subjectOrArea: 'Giáo viên bộ môn Ngữ văn',
    personality: 'Nhạy cảm, giàu tình cảm nhưng dễ chạnh lòng nếu bị hiểu lầm hoặc so sánh thi đua.',
    powerNote:
      'Giáo viên bộ môn Ngữ văn giàu tâm huyết, thường phối hợp nắm bắt tâm lý học sinh.',
    gender: 'female',
    hairColor: '#5c3317',
    shirtColor: '#9d174d',
    glasses: false,
  },
  {
    id: 'gv_hai',
    name: 'Thầy Hải',
    title: 'Giáo viên kỳ cựu',
    tier: 'colleague',
    subjectOrArea: 'Giáo viên Hóa học · Nhiều năm kinh nghiệm',
    personality: 'Điềm đạm, dày dặn kinh nghiệm nhưng đôi khi bảo thủ với phương pháp giảng dạy mới.',
    powerNote:
      'Thầy giáo nhiều năm công tác tại trường, luôn coi trọng lễ phép và nề nếp giờ học.',
    gender: 'male',
    hairColor: '#6b7280',
    shirtColor: '#4338ca',
    glasses: true,
  },
];

export const STAFF_MAP = new Map<string, StaffCharacter>(
  STAFF_CHARACTERS.map((s) => [s.id, s])
);

const COLLEAGUE_IDS = ['gv_lan', 'gv_tuan_anh', 'gv_huong', 'gv_hai'];

export function resolveStaffForSituation(
  sit: PedagogicalSituation
): StaffCharacter | null {
  if (sit.staffCharacterId) {
    return STAFF_MAP.get(sit.staffCharacterId) ?? null;
  }
  if (sit.category !== 'Đồng nghiệp' && sit.category !== 'Ban Giám Hiệu' && !sit.staffTier) {
    return null;
  }

  const text = `${sit.title} ${sit.prompt}`.toLowerCase();
  if (sit.category === 'Ban Giám Hiệu' || sit.staffTier === 'principal') {
    if (text.includes('phó hiệu trưởng') || text.includes('chuyên môn') || text.includes('sổ đầu bài')) {
      return STAFF_MAP.get('bgh_hieu_pho') ?? null;
    }
    return STAFF_MAP.get('bgh_hieu_truong') ?? null;
  }

  if (text.includes('trẻ') || text.includes('tập sự') || text.includes('sửa giáo án')) {
    return STAFF_MAP.get('gv_tuan_anh') ?? null;
  }
  if (text.includes('lớn tuổi') || text.includes('bảo thủ') || text.includes('kinh nghiệm')) {
    return STAFF_MAP.get('gv_hai') ?? null;
  }
  if (text.includes('kiệt sức') || text.includes('buồn') || text.includes('tâm sự') || text.includes('văn')) {
    return STAFF_MAP.get('gv_huong') ?? null;
  }
  if (text.includes('ồn') || text.includes('tổ') || text.includes('khen thưởng')) {
    return STAFF_MAP.get('gv_lan') ?? null;
  }

  let hash = 0;
  for (let i = 0; i < sit.id.length; i++) {
    hash = (hash * 31 + sit.id.charCodeAt(i)) >>> 0;
  }
  return STAFF_MAP.get(COLLEAGUE_IDS[hash % COLLEAGUE_IDS.length]) ?? null;
}

const PRINCIPAL_RAW: CompactSituationInput[] = [
  {
    id: 'bgh_chi_tieu_thi_dua',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Hiệu trưởng giao chỉ tiêu 100% hạnh kiểm Tốt cho lớp',
    prompt:
      'Thầy Hiệu trưởng Quốc Việt gọi bạn lên trao đổi: năm nay trường xét chuẩn thi đua xuất sắc, yêu cầu lớp bạn phải đạt 100% hạnh kiểm Tốt — trong khi lớp vẫn còn vài học sinh cá biệt hay vi phạm nội quy.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Thẳng thắn báo cáo thực trạng từng học sinh, đề xuất lộ trình kèm cặp sát sao và xin Ban Giám Hiệu hỗ trợ thêm thời gian theo dõi thay vì chạy theo thành tích ảo.',
        quality: 'best',
        feedback:
          'Sự trung thực và tinh thần trách nhiệm được Thầy Hiệu trưởng tôn trọng, giúp lớp được hỗ trợ nguồn lực thực chất mà không gây áp lực giả tạo.',
      },
      {
        text: 'Vâng dạ nhận chỉ tiêu 100% rồi về siết phạt thật nặng hoặc ép học sinh cá biệt ký cam kết chuyển lớp nếu tái phạm.',
        quality: 'poor',
        feedback:
          'Chạy theo chỉ tiêu hình thức tạo ra bầu không khí ngột ngạt, khiến học sinh bị dồn ép và cả tập thể mất niềm tin nặng nề.',
      },
      {
        text: 'Im lặng gật đầu đồng ý trước mặt Hiệu trưởng nhưng trong lòng tính cuối kỳ vẫn đánh giá tùy tình hình.',
        quality: 'weak',
        feedback:
          'Thiếu đối thoại thẳng thắn với lãnh đạo dễ gây sốc khi báo cáo cuối kỳ không khớp kỳ vọng.',
      },
      {
        text: 'Cam kết phấn đấu tối đa trong khả năng, nhưng xin phép đánh giá công bằng theo sự tiến bộ thực tế của các em.',
        quality: 'good',
        feedback:
          'Giữ được nguyên tắc sư phạm và sự chừng mực với lãnh đạo, tuy nhiên nên kèm kế hoạch hỗ trợ cụ thể hơn.',
      },
    ],
  },
  {
    id: 'bgh_du_gio_dot_xuat',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_pho',
    title: 'Phó Hiệu trưởng dự giờ đột xuất và góp ý gay gắt',
    prompt:
      'Cô Phó Hiệu trưởng Thanh Mai bất ngờ vào dự giờ đúng tiết lớp vừa có xích mích nên vài học sinh mất tập trung. Cuối buổi, cô phê bình khá gay gắt rằng lớp bạn quản lý nề nếp chưa đạt.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Bình tĩnh tiếp thu các điểm đúng về điều hành lớp, giải trình ngắn gọn bối cảnh sự việc đầu tiết và chủ động mời cô Thanh Mai dự lại sau 2 tuần để chứng minh cải thiện.',
        quality: 'best',
        feedback:
          'Thái độ cầu thị, bản lĩnh giúp Phó Hiệu trưởng ghi nhận thiện chí, qua đó bảo vệ uy tín và tâm lý cho cả lớp.',
      },
      {
        text: 'Phân bua gay gắt ngay tại văn phòng rằng lớp có nhiều học sinh cá biệt quá khó dạy, ai vào dạy cũng thế thôi.',
        quality: 'poor',
        feedback:
          'Đổ lỗi cho học sinh trước lãnh đạo làm giảm nghiêm trọng tín nhiệm chuyên môn và khiến lớp bị gắn mác tiêu cực toàn trường.',
      },
      {
        text: 'Chấp nhận lời phê bình nhưng về lớp trút giận mắng xối xả cả lớp vì làm mình mất mặt trước Phó Hiệu trưởng.',
        quality: 'poor',
        feedback:
          'Trút áp lực từ cấp trên xuống học sinh làm tổn thương nặng nề tình cảm và tinh thần cả lớp.',
      },
      {
        text: 'Ghi chép lại toàn bộ góp ý để rút kinh nghiệm, đồng thời về trao đổi nhẹ nhàng cùng lớp cùng nhau chấn chỉnh.',
        quality: 'good',
        feedback:
          'Chừng mực và an toàn, dù chưa giải thích rõ bối cảnh khách quan cho Ban Giám Hiệu hiểu sâu hơn.',
      },
    ],
  },
  {
    id: 'bgh_phu_huynh_khieu_nai',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Phụ huynh gửi đơn khiếu nại trực tiếp lên Hiệu trưởng',
    prompt:
      'Một phụ huynh bức xúc vì con bị trừ điểm thi đua đã gửi đơn thẳng lên Thầy Hiệu trưởng Quốc Việt cho rằng giáo viên chủ nhiệm thiên vị. Thầy Hiệu trưởng yêu cầu bạn giải trình ngay trong chiều nay.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Chuẩn bị đầy đủ sổ đầu bài, minh chứng khách quan, đề xuất Hiệu trưởng cho cùng gặp gỡ đối thoại ba bên trên tinh thần lắng nghe và vì sự tiến bộ của học sinh.',
        quality: 'best',
        feedback:
          'Minh bạch, điềm tĩnh và tôn trọng phụ huynh giúp Thầy Hiệu trưởng hoàn toàn tin tưởng, dập tắt tin đồn ảnh hưởng lớp.',
      },
      {
        text: 'Xin rút lại hình thức trừ điểm ngay lập tức để phụ huynh rút đơn cho êm chuyện trước mặt Hiệu trưởng.',
        quality: 'weak',
        feedback:
          'Nhượng bộ vô nguyên tắc khiến kỷ cương lớp bị coi nhẹ và học sinh khác thấy bất công.',
      },
      {
        text: 'Tỏ thái độ bất mãn, đòi Hiệu trưởng xử lý phụ huynh vì vu khống và dọa xin thôi chủ nhiệm lớp này.',
        quality: 'poor',
        feedback:
          'Phản ứng cảm tính trước người đứng đầu nhà trường khiến sự việc leo thang khủng hoảng, lớp chịu áp lực nặng.',
      },
      {
        text: 'Gửi bản tường trình chi tiết bằng văn bản lên Hiệu trưởng, đề nghị nhà trường trả lời thay để tránh va chạm.',
        quality: 'good',
        feedback:
          'Đúng quy trình hành chính nhưng thiếu cuộc đối thoại trực tiếp cởi mở để hóa giải hiểu lầm tận gốc.',
      },
    ],
  },
  {
    id: 'bgh_cat_tiet_sinh_hoat',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_pho',
    title: 'Ban Giám Hiệu yêu cầu dùng tiết sinh hoạt để ôn thi mũi nhọn',
    prompt:
      'Cô Phó Hiệu trưởng Thanh Mai chỉ đạo tạm cắt các tiết sinh hoạt lớp trong tháng này để tăng cường luyện đề thi chung cho kịp chỉ tiêu khối, dù lớp bạn đang có nhiều vấn đề tâm lý cần tháo gỡ.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Chấp hành tăng cường ôn tập phần lớn thời gian, đồng thời xin phép cô Phó Hiệu trưởng giữ lại 15 phút đầu giờ để nắm bắt tâm lý lớp và hỗ trợ học sinh yếu đúng lúc.',
        quality: 'best',
        feedback:
          'Vừa đáp ứng mục tiêu chuyên môn của Ban Giám Hiệu, vừa bảo vệ được khoảng không gian kết nối sống còn của lớp.',
      },
      {
        text: 'Từ chối thẳng thừng chỉ đạo của Phó Hiệu trưởng trước cuộc họp tổ vì cho rằng tiết sinh hoạt không thể đụng tới.',
        quality: 'poor',
        feedback:
          'Phản ứng cứng nhắc trước tập thể lãnh đạo dễ gây căng thẳng công việc và ảnh hưởng đánh giá chung của lớp.',
      },
      {
        text: 'Cắt sạch 100% thời gian sinh hoạt lớp, dồn toàn bộ học sinh làm bài tập liên tục suốt tháng.',
        quality: 'weak',
        feedback:
          'Không khí lớp trở nên nặng nề, các mâu thuẫn ngầm không được giải tỏa khiến tâm trạng cả lớp sa sút.',
      },
      {
        text: 'Thực hiện theo lịch nhà trường và tranh thủ trao đổi nhanh với từng học sinh vào giờ ra chơi khi cần thiết.',
        quality: 'good',
        feedback:
          'Giữ được kỷ luật chỉ đạo và vẫn quan tâm học sinh, nhưng tốn nhiều công sức ngoài giờ.',
      },
    ],
  },
  {
    id: 'bgh_hop_xep_loai_lop',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Lớp bị phê bình đứng cuối thi đua trong cuộc họp Hội đồng',
    prompt:
      'Trong cuộc họp Hội đồng sư phạm đầu tuần, Thầy Hiệu trưởng Quốc Việt đọc tên lớp bạn xếp cuối bảng thi đua vì vài lỗi nề nếp và yêu cầu giáo viên chủ nhiệm nghiêm túc rút kinh nghiệm.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Nghiêm túc nhận trách nhiệm chung trước hội đồng, sau đó về lớp họp bàn dân chủ để chính các em tự đề ra cách khắc phục thay vì trách mắng.',
        quality: 'best',
        feedback:
          'Bản lĩnh chịu trách nhiệm và khơi dậy lòng tự trọng tập thể giúp cả lớp đoàn kết vươn lên ấn tượng.',
      },
      {
        text: 'Bước vào lớp sau cuộc họp liền chỉ mặt các học sinh hay vi phạm mắng nhiếc thậm tệ vì làm lớp đội sổ.',
        quality: 'poor',
        feedback:
          'Chia rẽ nội bộ lớp, biến học sinh cá biệt thành “tội đồ” trước cả tập thể và khiến lớp suy sụp tinh thần.',
      },
      {
        text: 'Bỏ mặc kết quả thi đua và nói với lớp rằng xếp hạng chỉ là hình thức, không cần bận tâm.',
        quality: 'weak',
        feedback:
          'Thái độ buông xuôi làm học sinh mất động lực phấn đấu và tạo ấn tượng thiếu cầu tiến với Ban Giám Hiệu.',
      },
      {
        text: 'Thông báo kết quả xếp hạng trên bảng lớp và tăng gấp đôi hình phạt trực nhật đối với mọi lỗi vi phạm.',
        quality: 'weak',
        feedback:
          'Biện pháp nặng về trừng phạt dễ gây tâm lý đối phó căng thẳng trong lớp.',
      },
    ],
  },
  {
    id: 'bgh_sua_diem_hoc_ba',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Đề nghị "làm đẹp" học bạ cho học sinh sắp chuyển trường',
    prompt:
      'Thầy Hiệu trưởng Quốc Việt nhắc khéo bạn cân nhắc nâng mức xếp loại rèn luyện trong học bạ cho một học sinh sắp chuyển đi (gia đình có đóng góp cho trường) để hồ sơ đẹp hơn.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Khéo léo trình bày quy chế đánh giá minh bạch, xin phép giữ nguyên kết quả thực chất nhưng viết thêm nhận xét ghi nhận cụ thể những cố gắng tích cực của em để gia đình yên tâm.',
        quality: 'best',
        feedback:
          'Giữ vững liêm chính nghề giáo một cách khôn khéo, vừa bảo vệ công bằng cho cả lớp vừa giữ hòa khí với lãnh đạo.',
      },
      {
        text: 'Đồng ý sửa lại mức xếp loại ngay theo ý Hiệu trưởng để được lòng lãnh đạo.',
        quality: 'poor',
        feedback:
          'Vi phạm đạo đức nhà giáo; tin đồn thiên vị nhanh chóng lan ra khiến cả lớp mất niềm tin vào sự công bằng.',
      },
      {
        text: 'Lớn tiếng tố cáo trước văn phòng rằng Hiệu trưởng đang ép giáo viên làm sai quy chế.',
        quality: 'poor',
        feedback:
          'Cách phản ứng thiếu tế nhị gây xung đột trực diện với Hiệu trưởng, ảnh hưởng dây chuyền đến lớp chủ nhiệm.',
      },
      {
        text: 'Nhờ Ban Giám Hiệu ký duyệt văn bản xác nhận riêng nếu muốn điều chỉnh để mình không đứng tên chịu trách nhiệm.',
        quality: 'weak',
        feedback:
          'Né tránh trách nhiệm chuyên môn thay vì bảo vệ chuẩn mực đánh giá ngay từ đầu.',
      },
    ],
  },
  {
    id: 'bgh_hieu_pho_kiem_tra_giao_an',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_pho',
    title: 'Phó Hiệu trưởng kiểm tra đột xuất sổ chủ nhiệm & giáo án',
    prompt:
      'Cô Phó Hiệu trưởng Thanh Mai kiểm tra hồ sơ đột xuất và phát hiện sổ theo dõi tâm lý học sinh của bạn cập nhật chậm 1 tuần do bạn bận xử lý sự cố lớp.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Chân thành nhận thiếu sót, trình bày ngắn gọn các ca hỗ trợ thực tế đã làm trong tuần và cam kết hoàn thiện sổ sách đầy đủ ngay trong ngày.',
        quality: 'best',
        feedback:
          'Thái độ chuyên nghiệp, cầu thị và minh chứng thực tế giúp cô Phó Hiệu trưởng đánh giá cao tâm huyết của bạn.',
      },
      {
        text: 'Phản ứng rằng việc chăm lo học sinh thực tế quan trọng hơn giấy tờ, sổ sách chỉ là hình thức rườm rà.',
        quality: 'poor',
        feedback:
          'Coi nhẹ quy trình quản lý khiến Phó Hiệu trưởng đánh giá thấp ý thức kỷ luật, kéo theo lớp bị soi xét gắt hơn.',
      },
      {
        text: 'Chống chế đổ lỗi do ban cán sự lớp nộp biên bản muộn nên chưa ghi kịp.',
        quality: 'weak',
        feedback:
          'Đẩy lỗi hành chính sang học sinh làm mất uy tín người đứng lớp.',
      },
      {
        text: 'Lặng lẽ cầm sổ về bổ sung gấp cho đủ chữ ký mà không trao đổi thêm gì.',
        quality: 'good',
        feedback:
          'Khắc phục được hồ sơ nhưng thiếu sự trao đổi tích cực để lãnh đạo hiểu khó khăn thực tế.',
      },
    ],
  },
  {
    id: 'bgh_ky_luat_hoc_sinh_ca_biet',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Hiệu trưởng muốn nêu tên học sinh lớp bạn trước cờ toàn trường',
    prompt:
      'Sau vài vụ nghịch ngợm của nhóm học sinh lớp bạn, Thầy Hiệu trưởng Quốc Việt dự định đọc tên các em trước lễ chào cờ sáng thứ Hai để làm gương răn đe toàn trường.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Xin gặp riêng Thầy Hiệu trưởng đề xuất giải pháp giáo dục nội bộ kết hợp gia đình trong 2 tuần thử thách, tránh nêu tên công khai gây mặc cảm bướng bỉnh cho trẻ.',
        quality: 'best',
        feedback:
          'Bảo vệ được lòng tự trọng cho học sinh mà vẫn thể hiện trách nhiệm kiểm soát kỷ luật vững vàng trước Hiệu trưởng.',
      },
      {
        text: 'Ủng hộ hoàn toàn để Thầy Hiệu trưởng răn đe mạnh tay vì mình ở lớp nhắc mãi không nghe.',
        quality: 'poor',
        feedback:
          'Đẩy học sinh vào bẽ bàng trước toàn trường khiến các em oán giận giáo viên chủ nhiệm và kéo tâm lý cả lớp đi xuống.',
      },
      {
        text: 'Tự ý bảo học sinh liên quan nghỉ học sáng thứ Hai để né buổi chào cờ.',
        quality: 'poor',
        feedback:
          'Đối phó sai quy chế và dạy học sinh cách trốn tránh trách nhiệm trước Ban Giám Hiệu.',
      },
      {
        text: 'Chấp nhận để Hiệu trưởng nhắc chung tập thể lớp không nêu tên cụ thể cá nhân.',
        quality: 'good',
        feedback:
          'Giảm tổn thương cho từng cá nhân nhưng cả lớp vẫn hơi nặng nề sau buổi lễ.',
      },
    ],
  },
  {
    id: 'bgh_phan_cong_kiem_nhiem',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_pho',
    title: 'Ban Giám Hiệu giao thêm việc phong trào vào cao điểm ôn thi',
    prompt:
      'Cô Phó Hiệu trưởng Thanh Mai đề nghị lớp bạn làm đội nòng cốt dàn dựng tiết mục đồng diễn lớn cho trường đúng tuần lớp đang căng thẳng ôn tập kiểm tra.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Nhận nhiệm vụ bằng phương án tinh gọn: phối hợp thầy Tuấn Anh chia lịch tập ngắn khoa học ngoài giờ chính và luân phiên học sinh khá tham gia để không ảnh hưởng bài vở.',
        quality: 'best',
        feedback:
          'Giải pháp dung hòa xuất sắc: hoàn thành nhiệm vụ nhà trường giao mà vẫn bảo vệ thành tích học tập của lớp.',
      },
      {
        text: 'Dồn toàn bộ lớp tập luyện suốt các buổi chiều, cắt giảm việc kiểm tra bài vở để tiết mục thật hoành tráng lấy điểm với Ban Giám Hiệu.',
        quality: 'poor',
        feedback:
          'Chạy theo bề nổi làm học lực cả lớp sụt giảm rõ rệt trước kỳ kiểm tra.',
      },
      {
        text: 'Than vãn với phụ huynh trong nhóm lớp rằng Ban Giám Hiệu ép việc vô lý khiến lớp quá tải.',
        quality: 'poor',
        feedback:
          'Gây bất bình giữa phụ huynh và nhà trường, tạo bầu không khí căng thẳng ảnh hưởng trực tiếp đến học sinh.',
      },
      {
        text: 'Xin Ban Giám Hiệu cho lớp chỉ đóng góp lực lượng cổ vũ và hỗ trợ hậu cần thay vì diễn chính.',
        quality: 'good',
        feedback:
          'Bảo vệ được thời gian ôn thi của lớp nhưng hơi giảm cơ hội tỏa sáng tập thể với nhà trường.',
      },
    ],
  },
  {
    id: 'bgh_doi_phong_hoc',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Nhà trường điều chuyển lớp sang phòng học cũ ở dãy cuối',
    prompt:
      'Thầy Hiệu trưởng Quốc Việt thông báo chuyển lớp bạn sang phòng học cũ ít quạt hơn để nhường phòng mới cho lớp bồi dưỡng học sinh giỏi. Nhiều học sinh và phụ huynh tỏ ra bất bình.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Động viên học sinh ổn định tinh thần, cùng lớp trang trí lại phòng mới ấm cúng và khéo léo kiến nghị Ban Giám Hiệu bổ sung thêm quạt/đèn để đảm bảo điều kiện học.',
        quality: 'best',
        feedback:
          'Vừa giữ thái độ hợp tác với lãnh đạo để xin nâng cấp thiết bị, vừa truyền năng lượng tích cực giúp cả lớp gắn kết.',
      },
      {
        text: 'Đồng tình với học sinh tỏ thái độ bất mãn, chê bai sự thiên vị của nhà trường ngay trong giờ sinh hoạt.',
        quality: 'poor',
        feedback:
          'Kích động tâm lý ấm ức tập thể làm tinh thần học tập và thiện cảm trong lớp lao dốc mạnh.',
      },
      {
        text: 'Yêu cầu cả lớp im lặng chấp nhận, ai kêu ca sẽ bị ghi lỗi ý thức.',
        quality: 'weak',
        feedback:
          'Áp đặt thiếu sẻ chia khiến học sinh cảm thấy không được giáo viên bảo vệ quyền lợi chính đáng.',
      },
      {
        text: 'Thuyết phục phụ huynh tự đóng tiền mua sắm toàn bộ thiết bị mới cho phòng học.',
        quality: 'weak',
        feedback:
          'Gây gánh nặng thu chi dễ phát sinh phản ứng trái chiều từ phụ huynh.',
      },
    ],
  },
  {
    id: 'bgh_bao_cao_thanh_tich',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_pho',
    title: 'Ban Giám Hiệu cử gấp học sinh lớp bạn đi thi giao lưu',
    prompt:
      'Sát ngày thi giao lưu cấp cụm, cô Phó Hiệu trưởng Thanh Mai gọi báo trường thiếu thí sinh và chỉ định lớp bạn phải cử gấp 4 em tham gia ngay đầu tuần tới.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Trao đổi thẳng thắn với cô Phó Hiệu trưởng để chọn những em thật sự tự nguyện và phù hợp, đồng thời xin miễn giảm bài kiểm tra trùng lịch để các em không bị quá tải.',
        quality: 'best',
        feedback:
          'Phối hợp nhịp nhàng với Ban Giám Hiệu đồng thời bảo vệ sức khỏe và quyền lợi công bằng cho học sinh.',
      },
      {
        text: 'Ép buộc ngẫu nhiên 4 học sinh đi thi cho đủ chỉ tiêu, dọa trừ điểm nếu từ chối.',
        quality: 'poor',
        feedback:
          'Ép buộc tạo áp lực tâm lý nặng nề, khiến các em và cả lớp mất thiện cảm sâu sắc.',
      },
      {
        text: 'Từ chối thẳng không cử ai vì thông báo quá gấp gáp.',
        quality: 'weak',
        feedback:
          'Thiếu tinh thần hỗ trợ nhiệm vụ chung khiến Ban Giám Hiệu đánh giá lớp thiếu gắn kết.',
      },
      {
        text: 'Vận động học sinh khá giỏi đi thi cọ xát và tự bỏ thời gian ngoài giờ ôn nhanh cho các em.',
        quality: 'good',
        feedback:
          'Tận tâm và hoàn thành nhiệm vụ trường giao, tuy hơi vất vả cho cả thầy trò.',
      },
    ],
  },
  {
    id: 'bgh_tang_cuong_thu_quy',
    category: 'Ban Giám Hiệu',
    staffTier: 'principal',
    staffCharacterId: 'bgh_hieu_truong',
    title: 'Hiệu trưởng thúc tiến độ vận động đóng góp cơ sở vật chất',
    prompt:
      'Thầy Hiệu trưởng Quốc Việt nhắc trong cuộc họp giao ban rằng tỷ lệ phụ huynh lớp bạn đóng quỹ xã hội hóa tu sửa sân trường còn chậm và yêu cầu giáo viên chủ nhiệm đôn đốc gấp.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Báo cáo rõ hoàn cảnh các gia đình khó khăn trong lớp lên Hiệu trưởng, chỉ thông báo tinh thần tự nguyện minh bạch tới ban đại diện phụ huynh chứ không thúc ép học sinh trên lớp.',
        quality: 'best',
        feedback:
          'Giữ đúng quy định tự nguyện và bảo vệ tâm lý học sinh nghèo, đồng thời giúp Hiệu trưởng nắm sát thực tế.',
      },
      {
        text: 'Đọc tên công khai những học sinh chưa đóng tiền mỗi sáng trước lớp để thúc phụ huynh nộp sớm cho đạt thành tích với Hiệu trưởng.',
        quality: 'poor',
        feedback:
          'Hành vi phản giáo dục gây tổn thương sâu sắc cho học sinh hoàn cảnh khó khăn và khiến cả lớp phẫn nộ.',
      },
      {
        text: 'Nhắn tin hối thúc liên tục mỗi ngày khiến phụ huynh căng thẳng rồi chuyển sự bực dọc sang con cái.',
        quality: 'weak',
        feedback:
          'Gây áp lực dây chuyền từ phụ huynh xuống tâm trạng học tập của học sinh.',
      },
      {
        text: 'Phối hợp Ban đại diện phụ huynh vận động nhẹ nhàng trên tinh thần tự nguyện và miễn cho các hộ khó khăn.',
        quality: 'good',
        feedback:
          'Đúng vai trò cầu nối và giữ được sự tế nhị với phụ huynh lẫn học sinh.',
      },
    ],
  },
];

const COLLEAGUE_EXTRA_RAW: CompactSituationInput[] = [
  {
    id: 'dn_lan_cham_khat_khe',
    category: 'Đồng nghiệp',
    staffTier: 'colleague',
    staffCharacterId: 'gv_lan',
    title: 'Cô Lan (Toán) chấm bài kiểm tra quá khắt khe làm cả lớp lo lắng',
    prompt:
      'Sau bài kiểm tra Toán 1 tiết, cả lớp buồn bã vì Cô Lan trừ điểm trình bày rất nặng khiến hơn nửa lớp dưới trung bình. Học sinh nhờ bạn nói đỡ với cô.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Trao đổi riêng cầu thị với Cô Lan về tâm lý lớp, cùng cô thống nhất hướng dẫn lại kỹ năng trình bày và đề xuất cho lớp làm bài cộng điểm gỡ lại kiến thức.',
        quality: 'best',
        feedback:
          'Tôn trọng chuẩn chuyên môn của đồng nghiệp đồng thời mở ra cơ hội sửa sai giúp lớp lấy lại tự tin.',
      },
      {
        text: 'Nhận xét trước mặt học sinh rằng Cô Lan chấm quá khó tính và vô lý so với mặt bằng chung.',
        quality: 'poor',
        feedback:
          'Hạ thấp uy tín đồng nghiệp trước học sinh làm nảy sinh thái độ bất hợp tác trong các giờ Toán sau này.',
      },
      {
        text: 'Gạt đi bảo học sinh tự chịu trách nhiệm vì yếu Toán thì điểm thấp là đúng rồi.',
        quality: 'weak',
        feedback:
          'Khiến học sinh thấy đơn độc và giảm động lực phấn đấu ở môn học khó.',
      },
      {
        text: 'Nhờ Cô Lan giải thích lại biểu điểm chung cho lớp hiểu rõ để rút kinh nghiệm cho bài sau.',
        quality: 'good',
        feedback:
          'Giúp học sinh hiểu tiêu chí chấm bài dù tâm trạng lớp vẫn hơi nặng nề.',
      },
    ],
  },
  {
    id: 'dn_tuan_anh_doi_gio',
    category: 'Đồng nghiệp',
    staffTier: 'colleague',
    staffCharacterId: 'gv_tuan_anh',
    title: 'Thầy Tuấn Anh xin đổi tiết đột xuất sát giờ học',
    prompt:
      'Chỉ còn 15 phút nữa vào tiết 1, Thầy Tuấn Anh nhắn tin xin đổi tiết gấp để kịp xử lý việc đoàn đội, khiến lớp bạn đang chuẩn bị kiểm tra bài môn khác bị xáo trộn.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Linh hoạt nhận đổi hỗ trợ đồng nghiệp kịp việc chung, thông báo rõ ngay cho lớp để ổn định tâm lý và điều chỉnh nhẹ nhịp học phù hợp.',
        quality: 'best',
        feedback:
          'Sự tương trợ kịp thời giữa đồng nghiệp tạo tấm gương hợp tác tốt và giữ lớp vận hành êm ái.',
      },
      {
        text: 'Cáu gắt từ chối gay gắt và phàn nàn với cả lớp rằng Thầy Tuấn Anh làm việc thiếu chuyên nghiệp.',
        quality: 'poor',
        feedback:
          'Gây căng thẳng quan hệ đồng nghiệp và tạo ấn tượng xấu về tinh thần tập thể trước học sinh.',
      },
      {
        text: 'Nhận đổi tiết nhưng vào lớp cho học sinh ngồi chơi tự do cả buổi vì chưa chuẩn bị giáo án.',
        quality: 'weak',
        feedback:
          'Để trống giờ học khiến lớp mất nề nếp và giảm sút chất lượng tiếp thu.',
      },
      {
        text: 'Đồng ý đổi giúp lần này nhưng cuối buổi góp ý riêng Thầy Tuấn Anh báo sớm hơn vào lần sau.',
        quality: 'good',
        feedback:
          'Hỗ trợ đồng nghiệp hợp lý và có góp ý xây dựng.',
      },
    ],
  },
  {
    id: 'dn_huong_gan_mac_ca_biet',
    category: 'Đồng nghiệp',
    staffTier: 'colleague',
    staffCharacterId: 'gv_huong',
    title: 'Cô Hương bức xúc định kiến với nhóm học sinh cá biệt lớp bạn',
    prompt:
      'Tại phòng giáo viên, Cô Hương than phiền lớp bạn có mấy em cá biệt “hết thuốc chữa” và tuyên bố sẽ không gọi các em đó phát biểu trong giờ Văn nữa.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Lắng nghe chia sẻ sự vất vả của Cô Hương, kể thêm vài chuyển biến nhỏ tích cực của các em gần đây và đề nghị cùng phối hợp khích lệ để các em tiến bộ.',
        quality: 'best',
        feedback:
          'Hóa giải thành kiến của đồng nghiệp bằng sự đồng cảm, giữ cơ hội công bằng và niềm tin cho học sinh lớp bạn.',
      },
      {
        text: 'Tranh cãi gay gắt bênh lớp chằm chặp, cho rằng do giờ dạy của Cô Hương chưa hấp dẫn nên học sinh mới chán.',
        quality: 'poor',
        feedback:
          'Chỉ trích năng lực giảng dạy làm Cô Hương tự ái sâu sắc, gây căng thẳng nặng trong các tiết học của lớp.',
      },
      {
        text: 'Hùa theo đồng ý rằng mấy em đó đúng là hết cách dạy, tùy cô muốn xử lý sao cũng được.',
        quality: 'poor',
        feedback:
          'Bỏ rơi học sinh trước định kiến khiến các em càng bất cần và chống đối mọi môn học.',
      },
      {
        text: 'Hứa sẽ về phạt nặng nhóm học sinh đó để lần sau không làm phiền giờ dạy của Cô Hương nữa.',
        quality: 'weak',
        feedback:
          'Chỉ giải quyết phần ngọn bằng trừng phạt mà chưa tháo gỡ mối quan hệ thầy trò ở môn Văn.',
      },
    ],
  },
  {
    id: 'dn_hai_phe_binh_lop_on',
    category: 'Đồng nghiệp',
    staffTier: 'colleague',
    staffCharacterId: 'gv_hai',
    title: 'Thầy Hải ghi điểm kém sổ đầu bài vì lớp không giữ vệ sinh',
    prompt:
      'Kết thúc tiết Hóa, Thầy Hải bực bội ghi sổ đầu bài đánh giá lớp ý thức kém vì bảng chưa lau sạch và sàn còn vụn giấy từ giờ ra chơi trước.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Xin lỗi Thầy Hải về thiếu sót trực nhật của lớp, trao đổi lịch sự để phân biệt lỗi vệ sinh đầu giờ với ý thức học trong tiết và nhắc lớp khắc phục ngay.',
        quality: 'best',
        feedback:
          'Vừa thể hiện sự cầu thị tôn trọng thầy giáo lớn tuổi, vừa bảo vệ công bằng điểm thi đua học tập cho cả lớp.',
      },
      {
        text: 'Kéo cả lớp lên cãi lại rằng đó là rác từ tiết trước chứ không phải lỗi trong tiết Hóa.',
        quality: 'poor',
        feedback:
          'Đối đầu giữa đồng nghiệp làm bầu không khí dạy học trở nên căng thẳng và tạo thói quen đổ lỗi cho học sinh.',
      },
      {
        text: 'Bực mình trút giận phạt cả tổ trực nhật chép phạt và cấm ra chơi cả tuần.',
        quality: 'weak',
        feedback:
          'Phạt nặng quá mức khiến học sinh ức chế vì những sơ suất nhỏ.',
      },
      {
        text: 'Nhắc nhở ban cán sự lớp kiểm tra vệ sinh kỹ hơn trước mỗi tiết học bộ môn.',
        quality: 'good',
        feedback:
          'Khắc phục thói quen lớp nhưng chưa trao đổi lại với Thầy Hải để tránh hiểu nhầm thi đua.',
      },
    ],
  },
  {
    id: 'dn_lan_trung_lich_kiem_tra',
    category: 'Đồng nghiệp',
    staffTier: 'colleague',
    staffCharacterId: 'gv_lan',
    title: 'Hai giáo viên bộ môn xếp trùng 3 bài kiểm tra trong cùng 1 ngày',
    prompt:
      'Học sinh kêu trời vì tuần này Cô Lan và hai thầy cô khác đều báo kiểm tra viết vào đúng sáng thứ Tư. Lớp căng thẳng quá tải rõ rệt.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Chủ động trao đổi nhẹ nhàng với Cô Lan và các đồng nghiệp điều phối giãn lịch kiểm tra sang hai ngày khác nhau để học sinh có thời gian ôn tập hiệu quả.',
        quality: 'best',
        feedback:
          'Phối hợp nhịp nhàng với tổ chuyên môn giúp giảm tải áp lực và nâng cao chất lượng làm bài cho cả lớp.',
      },
      {
        text: 'Bảo học sinh ráng chịu vì cấp trên quy định chương trình đến đâu kiểm tra đến đó, không thể can thiệp đồng nghiệp.',
        quality: 'weak',
        feedback:
          'Thụ động để học sinh quá tải dồn dập làm tâm trạng và kết quả học tập suy giảm.',
      },
      {
        text: 'Gửi tin nhắn than phiền trong nhóm chung giáo viên rằng các thầy cô bộ môn thiếu phối hợp gây khổ cho học sinh.',
        quality: 'poor',
        feedback:
          'Góp ý thiếu khéo léo nơi đông người dễ khiến đồng nghiệp tự ái, phản tác dụng hợp tác.',
      },
      {
        text: 'Động viên cả lớp cố gắng ôn tập trước những phần trọng tâm và xin Cô Lan giới hạn đề cương gọn hơn.',
        quality: 'good',
        feedback:
          'Giúp học sinh bớt lo âu nhưng lịch kiểm tra dồn ngày vẫn gây mệt mỏi.',
      },
    ],
  },
  {
    id: 'dn_tuan_anh_phong_trao',
    category: 'Đồng nghiệp',
    staffTier: 'colleague',
    staffCharacterId: 'gv_tuan_anh',
    title: 'Thầy Tuấn Anh quên đặt phòng Tin học khi lớp có tiết thực hành',
    prompt:
      'Đến tiết thực hành, lớp bạn hào hứng lên phòng máy thì phát hiện Thầy Tuấn Anh quên đăng ký lịch nên phòng đã có lớp khác dùng. Thầy rất lúng túng trước học sinh.',
    involvedStudentIds: [],
    options: [
      {
        text: 'Nhanh trí giữ trật tự lớp, khéo léo hỗ trợ Thầy Tuấn Anh chuyển sang hoạt động nhóm phân tích tình huống thực tế trên lớp để tiết học vẫn hào hứng.',
        quality: 'best',
        feedback:
          'Giữ trọn thể diện cho đồng nghiệp trẻ và biến sự cố thành tiết học bổ ích được học sinh yêu thích.',
      },
      {
        text: 'Trách móc Thầy Tuấn Anh ngay trước mặt học sinh sao làm việc cẩu thả để lớp mất công leo cầu thang.',
        quality: 'poor',
        feedback:
          'Làm đồng nghiệp mất mặt trước học sinh và gây tâm lý hụt hẫng, chán nản cho cả lớp.',
      },
      {
        text: 'Cho cả lớp tự giải tán về phòng ngồi nói chuyện chờ hết tiết.',
        quality: 'weak',
        feedback:
          'Lãng phí giờ học và dễ phát sinh mất trật tự.',
      },
      {
        text: 'Động viên học sinh thông cảm rồi dẫn lớp về ôn tập bài cũ nhẹ nhàng.',
        quality: 'good',
        feedback:
          'Giữ được hòa khí nhưng tiết học hơi tẻ nhạt so với mong đợi thực hành.',
      },
    ],
  },
];

export const PRINCIPAL_SITUATIONS: PedagogicalSituation[] =
  PRINCIPAL_RAW.map(buildSituation);

export const COLLEAGUE_EXTRA_SITUATIONS: PedagogicalSituation[] =
  COLLEAGUE_EXTRA_RAW.map(buildSituation);
