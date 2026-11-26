import { PedagogicalSituation } from '../types/game';
import { buildSituation, CompactSituationInput } from './situationBuilder';

export const EXTERNAL_EVENTS: PedagogicalSituation[] = [
  // === THỜI TIẾT (Weather) ===
  {
    id: 'ext_weather_autumn_breeze',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [9, 10],
    title: 'Tiết trời thu dịu mát bất ngờ',
    prompt:
      'Tuần này thời tiết chuyển sang se mát dễ chịu sau những ngày nắng gắt đầu thu. Cả lớp học tập hào hứng, tinh thần tập trung hơn hẳn.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Không khí mát mẻ giúp cả lớp tiếp thu bài tốt hơn và tâm trạng thoải mái.',
      targetEffects: {},
      classEffects: { academic: 3, mood: 8, affection: 2 },
    },
  },
  {
    id: 'ext_weather_heavy_rain_flood',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [9, 10],
    title: 'Mưa bão kéo dài gây ngập đường đến trường',
    prompt:
      'Trận mưa lớn kéo dài từ sáng sớm làm nhiều tuyến đường bị ngập, Hoài Linh và Ba phải lội nước đi học muộn, quần áo ướt lạnh.',
    involvedStudentIds: ['hoai_linh', 'ba'],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Thời tiết khắc nghiệt khiến việc đi lại vất vả, tâm trạng học sinh bị ảnh hưởng đáng kể.',
      targetEffects: { academic: -4, mood: -18 },
      classEffects: { academic: -2, mood: -8 },
    },
  },
  {
    id: 'ext_weather_cold_snap',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [12, 1],
    title: 'Đợt gió mùa đông bắc rét đậm tràn về',
    prompt:
      'Nhiệt độ giảm sâu đột ngột vào đầu buổi sáng, gió lùa qua cửa sổ khiến nhiều học sinh co ro buồn ngủ trong giờ học.',
    involvedStudentIds: ['thien', 'hoa', 'hoai_linh'],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Cái rét đầu đông làm giảm sự tỉnh táo và hứng thú trong các tiết đầu buổi.',
      targetEffects: { academic: -3, mood: -14 },
      classEffects: { academic: -2, mood: -7 },
    },
  },
  {
    id: 'ext_weather_humid_march',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [2, 3],
    title: 'Trời nồm ẩm kéo dài khiến lớp học trơn trượt',
    prompt:
      'Độ ẩm không khí tăng cao khiến nền lớp học đổ mồ hôi ẩm ướt, bảng phấn khó lau, nhiều học sinh thấy uể oải khó chịu.',
    involvedStudentIds: ['tien', 'minh'],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Thời tiết nồm ẩm khiến nhóm học sinh hiếu động càng dễ cáu kỉnh, bồn chồn.',
      targetEffects: { mood: -14, affection: -4 },
      classEffects: { mood: -6 },
    },
  },
  {
    id: 'ext_weather_spring_sunshine',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [2, 3, 4],
    title: 'Nắng xuân ấm áp chan hòa sân trường',
    prompt:
      'Sau chuỗi ngày mưa phùn ẩm ướt, ánh nắng xuân ấm áp trở lại khiến sân trường rực rỡ sức sống, các em hào hứng ra chơi và học tập.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Thời tiết thuận lợi giúp tinh thần cả lớp phấn chấn rõ rệt.',
      targetEffects: {},
      classEffects: { academic: 2, mood: 9, affection: 2 },
    },
  },
  {
    id: 'ext_weather_heatwave_powercut',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [4, 5],
    title: 'Nắng nóng đầu hè gay gắt kèm mất điện cục bộ',
    prompt:
      'Đợt nắng nóng gần 39°C trùng đúng lúc khu vực trường bị cắt điện luân phiên nửa buổi. Quạt trần ngừng quay làm cả lớp mệt lả vì oi bức.',
    involvedStudentIds: ['tien', 'hung', 'hong_loan'],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Oi bức kéo dài khiến học lực và sự kiên nhẫn của cả lớp suy giảm, nhóm cá biệt dễ bực dọc.',
      targetEffects: { academic: -4, mood: -20, affection: -5 },
      classEffects: { academic: -3, mood: -10 },
    },
  },
  {
    id: 'ext_weather_sudden_thunderstorm',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [5, 9, 10],
    title: 'Cơn mưa dông bất chợt vào cuối buổi học',
    prompt:
      'Sấm chớp kèm gió giật mạnh ập đến đúng lúc gần tan học khiến nhiều học sinh lo lắng không mang áo mưa, đứng ngóng phụ huynh ở hành lang.',
    involvedStudentIds: ['long', 'hien'],
    externalEvent: {
      source: 'Thời tiết',
      feedback: 'Cơn dông bất ngờ khiến tâm lý các em có phần bất an vào cuối buổi.',
      targetEffects: { mood: -12 },
      classEffects: { mood: -5 },
    },
  },

  // === CHỈ ĐẠO TỪ NHÀ TRƯỜNG (School Directives) ===
  {
    id: 'ext_school_surprise_inspection',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 11, 3, 4],
    title: 'Đoàn thanh tra chuyên môn dự giờ đột xuất',
    prompt:
      'Ban Giám Hiệu cùng đoàn thanh tra sở bất ngờ dự giờ và kiểm tra vở ghi của lớp. Không khí lớp học trở nên nghiêm túc và căng thẳng hơn bình thường.',
    involvedStudentIds: ['lien', 'thang', 'dung'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Áp lực kiểm tra khiến cán bộ lớp và học sinh chăm ngoan tập trung cao độ nhưng hơi căng thẳng.',
      targetEffects: { academic: 6, mood: -12 },
      classEffects: { academic: 4, mood: -6 },
    },
  },
  {
    id: 'ext_school_scholarship',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [9, 1, 5],
    title: 'Nhà trường trao học bổng "Tiếp sức đến trường"',
    prompt:
      'Trong lễ chào cờ đầu tuần, nhà trường trao suất học bổng và bộ sách giáo khoa mới cho Hoài Linh và Ba để động viên hoàn cảnh khó khăn.',
    involvedStudentIds: ['hoai_linh', 'ba'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Sự hỗ trợ kịp thời của nhà trường tiếp thêm động lực rất lớn cho hai em.',
      targetEffects: { academic: 8, mood: 18, affection: 10 },
      classEffects: { mood: 5, affection: 3 },
    },
  },
  {
    id: 'ext_school_sports_festival',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [11, 3],
    title: 'Nhà trường phát động Hội khỏe Phù Đổng cấp trường',
    prompt:
      'Các lớp háo hức đăng ký thi đấu bóng đá, kéo co và điền kinh. Hùng, Tuấn và Vinh sung sức tập luyện rất hăng say nhưng hơi lơ là bài tập trên lớp.',
    involvedStudentIds: ['hung', 'tuan', 'vinh'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Hoạt động thể thao giúp giải tỏa năng lượng tích cực cho các nam sinh năng động nhưng giảm nhẹ thời gian học.',
      targetEffects: { academic: -4, mood: 16, affection: 6 },
      classEffects: { academic: -2, mood: 8, affection: 3 },
    },
  },
  {
    id: 'ext_school_new_fans_lights',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 4],
    title: 'Nhà trường nâng cấp hệ thống đèn và quạt lớp học',
    prompt:
      'Phòng cơ sở vật chất hoàn tất lắp đặt hệ thống đèn chống cận và thay mới toàn bộ quạt trần cho phòng học lớp bạn.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Phòng học sáng sủa và thoáng mát hơn giúp cả lớp học tập thoải mái.',
      targetEffects: {},
      classEffects: { academic: 4, mood: 8, affection: 3 },
    },
  },
  {
    id: 'ext_school_extra_exam_prep',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [12, 5],
    title: 'Chỉ đạo tăng cường tiết ôn tập chuẩn bị thi Học kỳ',
    prompt:
      'Nhà trường ban hành lịch tăng cường thêm 2 buổi ôn luyện đề cương mỗi tuần. Lịch học dày đặc khiến nhiều học sinh áp lực rõ rệt.',
    involvedStudentIds: ['tien', 'ba', 'hien'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Kiến thức được củng cố vững hơn nhưng cường độ học cao khiến học sinh mệt mỏi.',
      targetEffects: { academic: 6, mood: -16, affection: -4 },
      classEffects: { academic: 5, mood: -9 },
    },
  },
  {
    id: 'ext_school_discipline_crackdown',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 1, 4],
    title: 'Nhà trường siết chặt kiểm tra nề nếp tại cổng trường',
    prompt:
      'Đội cờ đỏ và giám thị kiểm tra gắt gao đồng phục, đầu tóc, đi học muộn mỗi sáng. Nhóm Tiến, Minh, Hồng Loan bị nhắc nhở liên tục nên tỏ ra bực bội.',
    involvedStudentIds: ['tien', 'minh', 'hong_loan'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Nề nếp chung nghiêm túc hơn nhưng nhóm học sinh cá biệt nảy sinh tâm lý ức chế.',
      targetEffects: { mood: -15, affection: -8 },
      classEffects: { academic: 2, mood: -4 },
    },
  },
  {
    id: 'ext_school_art_competition',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [11, 3],
    title: 'Lớp đạt giải cao trong cuộc thi Báo tường & Văn nghệ',
    prompt:
      'Ban Giám Hiệu công bố lớp bạn giành giải Nhì toàn trường nhờ sự đóng góp nhiệt tình của Hoa, Liên và Hồng Loan.',
    involvedStudentIds: ['hoa', 'lien', 'hong_loan'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Thành tích tập thể mang lại niềm tự hào lớn và gắn kết cả lớp.',
      targetEffects: { mood: 16, affection: 10 },
      classEffects: { mood: 10, affection: 5 },
    },
  },
  {
    id: 'ext_school_schedule_shift',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [1, 2],
    title: 'Nhà trường điều chỉnh đột xuất thời khóa biểu trái buổi',
    prompt:
      'Do thiếu giáo viên bộ môn tạm thời, thời khóa biểu tuần này thay đổi liên tục làm nhiều học sinh mang nhầm sách vở và rối nhịp sinh hoạt.',
    involvedStudentIds: ['long', 'nam'],
    externalEvent: {
      source: 'Nhà trường',
      feedback: 'Sự xáo trộn lịch học khiến một số em lúng túng và mất tập trung.',
      targetEffects: { academic: -4, mood: -10 },
      classEffects: { academic: -2, mood: -5 },
    },
  },

  // === PHỤ HUYNH (Parents) ===
  {
    id: 'ext_parent_grade_pressure',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [12, 3, 5],
    title: 'Nhiều phụ huynh tạo áp lực điểm số nặng nề ở nhà',
    prompt:
      'Gần các kỳ kiểm tra lớn, phụ huynh của Hiền, Dũng và Thắng ép con học thêm kín lịch đến khuya, liên tục so sánh điểm số với con nhà người khác.',
    involvedStudentIds: ['hien', 'dung', 'thang'],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Kỳ vọng quá mức từ gia đình khiến các em học sinh khá giỏi rơi vào trạng thái căng thẳng kéo dài.',
      targetEffects: { academic: 3, mood: -18 },
      classEffects: { mood: -4 },
    },
  },
  {
    id: 'ext_parent_class_support',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [9, 11, 2],
    title: 'Ban đại diện phụ huynh tài trợ tủ sách & nước uống cho lớp',
    prompt:
      'Hội phụ huynh đồng lòng đóng góp lắp đặt máy lọc nước sạch và bổ sung 30 đầu sách kỹ năng sống cho góc thư viện cuối lớp.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Sự chung tay ấm áp của phụ huynh giúp môi trường lớp học thêm tiện nghi, thân thiện.',
      targetEffects: {},
      classEffects: { academic: 4, mood: 9, affection: 5 },
    },
  },
  {
    id: 'ext_parent_neglect_rebel',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 1, 4],
    title: 'Gia đình học sinh cá biệt xảy ra bất hòa, ít quan tâm con',
    prompt:
      'Bạn nắm thông tin cha mẹ Tiến và Hùng bận rộn mâu thuẫn gia đình, bỏ mặc con tự xoay xở khiến hai em càng hay đi chơi lêu lổng và nóng nảy.',
    involvedStudentIds: ['tien', 'hung'],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Thiếu sự quan tâm từ gia đình làm hai em hụt hẫng, dễ sa sút cả học tập lẫn thái độ.',
      targetEffects: { academic: -6, mood: -16, affection: -10 },
      classEffects: {},
    },
  },
  {
    id: 'ext_parent_praise_teacher',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [11, 1, 5],
    title: 'Phụ huynh gửi thư cảm ơn và động viên sự tận tâm của lớp',
    prompt:
      'Nhiều phụ huynh nhắn tin khen ngợi lớp dạo này tiến bộ rõ về thái độ lễ phép, tự giác học tập và cảm ơn sự sát sao của giáo viên chủ nhiệm.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Phản hồi tích cực từ gia đình lan tỏa bầu không khí tin tưởng giữa phụ huynh, học sinh và thầy cô.',
      targetEffects: {},
      classEffects: { mood: 7, affection: 6 },
    },
  },
  {
    id: 'ext_parent_homework_complaint',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 3],
    title: 'Phụ huynh phàn nàn bài tập về nhà quá tải',
    prompt:
      'Một nhóm phụ huynh bày tỏ bức xúc trong nhóm chung vì con phải làm bài tập các môn đến nửa đêm mà vẫn không kịp, khiến trẻ sinh tâm lý chán học.',
    involvedStudentIds: ['nam', 'thien', 'hoai_linh'],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Áp lực bài vở dồn dập làm giảm hứng thú học tập và gây căng thẳng cho các em.',
      targetEffects: { mood: -14, affection: -5 },
      classEffects: { mood: -6, affection: -3 },
    },
  },
  {
    id: 'ext_parent_ba_family_hardship',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [12, 2],
    title: 'Gia đình học sinh gặp biến cố kinh tế đột xuất',
    prompt:
      'Cha của Ba bị tai nạn lao động nhẹ phải nghỉ làm vài tuần, khiến em lo lắng phụ giúp gia đình và tinh thần đi học sa sút.',
    involvedStudentIds: ['ba'],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Biến cố gia đình làm Ba buồn bã và khó tập trung vào bài vở trên lớp.',
      targetEffects: { academic: -6, mood: -20 },
      classEffects: {},
    },
  },
  {
    id: 'ext_parent_party_treat',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [1, 5],
    title: 'Phụ huynh gửi bánh kẹo liên hoan chúc mừng lớp tổng kết',
    prompt:
      'Nhân dịp sơ kết và chuẩn bị nghỉ lễ, đại diện phụ huynh mang bánh kẹo và hoa quả đến tặng cả lớp liên hoan nhẹ cuối giờ.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Phụ huynh',
      feedback: 'Buổi liên hoan nhỏ giúp các em vui vẻ, gắn kết tình bạn bè và thầy trò.',
      targetEffects: {},
      classEffects: { mood: 10, affection: 4 },
    },
  },

  // === CỘNG ĐỒNG / MÔI TRƯỜNG BÊN NGOÀI (Community / External) ===
  {
    id: 'ext_comm_seasonal_flu',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [12, 1, 2],
    title: 'Dịch cúm mùa lây lan nhẹ tại địa phương',
    prompt:
      'Thời tiết giao mùa khiến vài học sinh trong trường bị sốt nhẹ, ho cảm; Thiện, Hoa và Long đến lớp trong trạng thái mệt mỏi, ngạt mũi.',
    involvedStudentIds: ['thien', 'hoa', 'long'],
    externalEvent: {
      source: 'Cộng đồng',
      feedback: 'Sức khỏe suy giảm do cảm cúm ảnh hưởng đến khả năng tiếp thu và tâm trạng lớp.',
      targetEffects: { academic: -5, mood: -15 },
      classEffects: { academic: -2, mood: -6 },
    },
  },
  {
    id: 'ext_comm_internet_cafe',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 11, 2, 4],
    title: 'Quán game mới mở gần cổng trường lôi kéo học sinh',
    prompt:
      'Một quán game khuyến mãi giờ chơi khai trương cách trường không xa, lôi kéo Hùng, Minh và Tiến tụ tập sau giờ học dẫn tới xao nhãng bài vở.',
    involvedStudentIds: ['hung', 'minh', 'tien'],
    externalEvent: {
      source: 'Cộng đồng',
      feedback: 'Cám dỗ bên ngoài cổng trường khiến nhóm học sinh cá biệt giảm sút học lực và dễ sa vào xích mích.',
      targetEffects: { academic: -8, mood: -8, affection: -10 },
      classEffects: {},
    },
  },
  {
    id: 'ext_comm_construction_noise',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [11, 3, 4],
    title: 'Công trình thi công gần trường gây tiếng ồn lớn',
    prompt:
      'Tiếng máy khoan và xe tải từ công trình đường sá ngay sát hàng rào trường vang suốt buổi sáng làm giáo viên và học sinh rất khó nghe giảng.',
    involvedStudentIds: [],
    externalEvent: {
      source: 'Cộng đồng',
      feedback: 'Ô nhiễm tiếng ồn bên ngoài khiến cả lớp mất tập trung và dễ mệt mỏi.',
      targetEffects: {},
      classEffects: { academic: -3, mood: -8 },
    },
  },
  {
    id: 'ext_comm_social_media_rumor',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [1, 3, 4],
    title: 'Trào lưu mạng xã hội thiếu lành mạnh lan vào trường học',
    prompt:
      'Một tài khoản ẩn danh trên mạng xã hội đăng bài chế giễu học sinh giữa các lớp khiến Hồng Loan, Tuấn và Minh bàn tán kích động, suýt xảy ra cự cãi.',
    involvedStudentIds: ['hong_loan', 'tuan', 'minh'],
    externalEvent: {
      source: 'Cộng đồng',
      feedback: 'Tác động tiêu cực từ mạng xã hội khiến các em dễ mất bình tĩnh và nảy sinh mâu thuẫn.',
      targetEffects: { mood: -14, affection: -8 },
      classEffects: { mood: -5 },
    },
  },
  {
    id: 'ext_comm_reading_campaign',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [10, 4],
    title: 'Ngày hội Đọc sách cộng đồng thu hút học sinh tham gia',
    prompt:
      'Thư viện quận phối hợp với trường tổ chức xe sách lưu động và giao lưu tác giả trẻ, khơi dậy niềm say mê đọc sách cho cả lớp.',
    involvedStudentIds: ['thang', 'lien', 'hien'],
    externalEvent: {
      source: 'Cộng đồng',
      feedback: 'Hoạt động văn hóa đọc bổ ích giúp học sinh mở mang kiến thức và thư giãn tinh thần.',
      targetEffects: { academic: 7, mood: 10 },
      classEffects: { academic: 4, mood: 6, affection: 2 },
    },
  },
  {
    id: 'ext_comm_volunteer_drive',
    category: 'Sự kiện khách quan',
    eventType: 'external',
    preferredMonths: [1, 2],
    title: 'Phong trào quyên góp "Áo ấm vùng cao" của địa phương',
    prompt:
      'Đoàn phường và nhà trường phát động quyên góp sách vở, áo ấm cũ. Cả lớp tích cực hưởng ứng, ngay cả Tiến và Hùng cũng mang đồ đến đóng góp.',
    involvedStudentIds: ['tien', 'hung', 'hoai_linh'],
    externalEvent: {
      source: 'Cộng đồng',
      feedback: 'Hoạt động sẻ chia nhân văn giúp các em cá biệt bộc lộ mặt tốt và cả lớp thêm gắn bó.',
      targetEffects: { mood: 12, affection: 10 },
      classEffects: { mood: 6, affection: 5 },
    },
  },
];

const PROBLEM_STUDENT_RAW: CompactSituationInput[] = [
  {
    id: 'cabiet_danh_nhau_san_truong',
    category: 'Chủ nhiệm',
    isInfraction: true,
    title: 'Hai học sinh cá biệt xô xát đánh nhau ở sân sau',
    prompt:
      'Giờ ra chơi, cờ đỏ hớt hải báo Tiến và Hùng đang túm áo xô xát, đánh nhau với một nhóm học sinh lớp khác ở khu vực sân sau chỉ vì va chạm lúc đá cầu.',
    involvedStudentIds: ['tien', 'hung'],
    options: [
      {
        text: 'Kịp thời can ngăn tách hai bên đảm bảo an toàn, yêu cầu viết tường trình riêng rồi mời gặp từng em và phối hợp phụ huynh giải quyết tận gốc mâu thuẫn.',
        quality: 'best',
        feedback: 'Ngăn chặn bạo lực kịp thời và xử lý thấu đáo giúp các em nhận trách nhiệm mà không kích động thù hằn thêm.',
      },
      {
        text: 'Đưa cả hai lên phòng giám thị làm bản kiểm điểm và phạt lao động vệ sinh cuối tuần.',
        quality: 'good',
        feedback: 'Giữ được kỷ cương trước mắt nhưng cần lắng nghe nguyên nhân sâu xa để không tái phạm.',
      },
      {
        text: 'Quát mắng Tiến và Hùng thậm tệ trước sân trường rồi trừ sạch điểm thi đua của tổ.',
        quality: 'weak',
        feedback: 'Chỉ trích trước đám đông làm hai em tự ái, dễ hẹn nhau giải quyết ngoài cổng trường.',
      },
      {
        text: 'Tuyên bố đuổi học tạm thời 1 tuần ngay lập tức để làm gương cho toàn khối.',
        quality: 'poor',
        feedback: 'Xử lý cực đoan đẩy học sinh cá biệt rời xa môi trường giáo dục và dễ lún sâu vào bạo lực.',
      },
    ],
  },
  {
    id: 'cabiet_minh_bat_nat_thien',
    category: 'Chủ nhiệm',
    isInfraction: true,
    title: 'Học sinh cá biệt giấu cặp sách, bắt nạt bạn trầm tính',
    prompt:
      'Đầu giờ học, Thiên hoảng hốt tìm cặp sách không thấy. Hóa ra Minh đã rủ Tuấn giấu cặp của bạn lên nóc tủ để trêu chọc khiến Thiên suýt bật khóc.',
    involvedStudentIds: ['minh', 'tuan', 'thien'],
    options: [
      {
        text: 'Yêu cầu Minh và Tuấn trả lại cặp sách ngay, trấn an Thiên rồi cuối giờ phân tích nghiêm túc tác hại của bắt nạt học đường và buộc hai em xin lỗi chân thành.',
        quality: 'best',
        feedback: 'Bảo vệ kịp thời học sinh yếu thế và giáo dục rõ ranh giới giữa đùa nghịch với bắt nạt bạn bè.',
      },
      {
        text: 'Nhắc chung cả lớp không được giấu đồ của bạn rồi tiếp tục bài giảng cho kịp tiến độ.',
        quality: 'weak',
        feedback: 'Xử lý qua loa khiến Thiên thấy không được bảo vệ và Minh dễ tiếp tục bắt nạt bạn.',
      },
      {
        text: 'Bắt Minh và Tuấn đứng góc lớp suốt 2 tiết liền và gọi điện phê bình phụ huynh ngay trong giờ.',
        quality: 'good',
        feedback: 'Có tính răn đe nhưng cần kết hợp trao đổi riêng để các em thật sự thấu hiểu cảm xúc của bạn.',
      },
      {
        text: 'Bảo Thiên đàn ông con trai phải mạnh mẽ lên, có cái cặp cũng không tự giữ được.',
        quality: 'poor',
        feedback: 'Đổ lỗi cho nạn nhân làm Thiên tổn thương nặng nề và dung túng hành vi bắt nạt.',
      },
    ],
  },
  {
    id: 'cabiet_hong_loan_cai_tay_doi',
    category: 'Trên lớp',
    isInfraction: true,
    title: 'Học sinh cá biệt đập bàn cãi tay đôi khi bị ghi sổ đầu bài',
    prompt:
      'Khi lớp trưởng Liên nhắc nhở Hồng Loan không làm việc riêng trong giờ tự học, Loan bỗng đập bàn quát lại và đòi xé trang sổ theo dõi của lớp.',
    involvedStudentIds: ['hong_loan', 'lien'],
    options: [
      {
        text: 'Bình tĩnh yêu cầu cả hai dừng tranh cãi, tạm tách Loan ra hành lang hít thở ổn định cảm xúc rồi cuối giờ lắng nghe cả hai phía để phân xử công minh.',
        quality: 'best',
        feedback: 'Hạ nhiệt xung đột đúng lúc, giữ thể diện cho cả cán bộ lớp lẫn học sinh cá tính mạnh.',
      },
      {
        text: 'Phê bình Hồng Loan ngay trước lớp vì thái độ ngang ngược chống đối cán bộ lớp.',
        quality: 'weak',
        feedback: 'Đối đầu trực diện khi Loan đang mất bình tĩnh dễ làm em phản ứng bùng nổ hơn.',
      },
      {
        text: 'Yêu cầu Liên nhịn đi cho yên chuyện và không ghi lỗi vào sổ nữa.',
        quality: 'poor',
        feedback: 'Làm mất uy tín cán bộ lớp và khiến Hồng Loan tưởng rằng to tiếng sẽ thoát lỗi.',
      },
      {
        text: 'Ghi ngay vi phạm kỷ luật nặng vào sổ đầu bài và giao Liên giám sát chặt Loan.',
        quality: 'good',
        feedback: 'Giữ được nguyên tắc lớp nhưng cần giải tỏa tâm lý cho Loan để không tăng căng thẳng với Liên.',
      },
    ],
  },
  {
    id: 'cabiet_hung_tron_tiet_choi_game',
    category: 'Chủ nhiệm',
    isInfraction: true,
    title: 'Rủ rê bạn trốn tiết trèo tường ra quán net',
    prompt:
      'Tiết 3 buổi sáng, giáo viên bộ môn báo Hùng và Ba biến mất khỏi lớp sau giờ ra chơi. Bảo vệ phát hiện hai em định trèo tường sang quán net gần trường.',
    involvedStudentIds: ['hung', 'ba'],
    options: [
      {
        text: 'Đưa hai em vào phòng hội đồng bình tĩnh tìm hiểu lý do (Ba bị rủ rê vì chán học), răn đe lỗi mất an toàn, báo gia đình phối hợp và giao Hùng hỗ trợ Ba ôn bài bù.',
        quality: 'best',
        feedback: 'Vừa chặn đứng hành vi nguy hiểm, vừa tách Ba khỏi tâm lý tự ti chán học và định hướng lại Hùng.',
      },
      {
        text: 'Bắt hai em viết bản kiểm điểm đọc trước toàn lớp vào sáng thứ Hai.',
        quality: 'weak',
        feedback: 'Phơi bày lỗi trước tập thể làm Ba càng mặc cảm và dễ bỏ học thật.',
      },
      {
        text: 'Mời phụ huynh lên ngay lập tức và yêu cầu gia đình tự quản lý con, nhà trường không chịu trách nhiệm.',
        quality: 'poor',
        feedback: 'Phủi bỏ trách nhiệm giáo dục làm đứt gãy mối quan hệ gia đình – nhà trường.',
      },
      {
        text: 'Phạt Hùng và Ba chép lại toàn bộ bài giảng tiết 3 và ở lại trực nhật cuối buổi.',
        quality: 'good',
        feedback: 'Giúp hai em bù bài nhưng cần kết hợp trao đổi gia đình về nguy cơ trèo tường mất an toàn.',
      },
    ],
  },
  {
    id: 'cabiet_tien_mang_do_cam',
    category: 'Chủ nhiệm',
    isInfraction: true,
    title: 'Phát hiện học sinh mang pháo nổ / đồ chơi nguy hiểm vào lớp',
    prompt:
      'Trong giờ ra chơi, tiếng nổ tách vang lên ở góc lớp khiến các bạn nữ giật mình. Kiểm tra ra Tiến mang pháo diêm và ná cao su vào lớp để khoe bạn.',
    involvedStudentIds: ['tien', 'vinh'],
    options: [
      {
        text: 'Thu giữ ngay vật dụng nguy hiểm đảm bảo an toàn, phân tích cho Tiến và cả lớp hậu quả cháy nổ thương tích, đồng thời thông báo phụ huynh ký cam kết không tái phạm.',
        quality: 'best',
        feedback: 'Xử lý dứt khoát yếu tố nguy hiểm, kết hợp giáo dục an toàn học đường và phối hợp gia đình.',
      },
      {
        text: 'Thu giữ bỏ sọt rác rồi nhắc nhở Tiến lần sau không mang nữa là được.',
        quality: 'weak',
        feedback: 'Quá nhẹ tay với vật liệu gây nguy hiểm an toàn trường học và dễ khiến em coi thường nội quy.',
      },
      {
        text: 'Lục soát cặp sách toàn bộ học sinh nam trong lớp để xem còn ai giấu đồ cấm không.',
        quality: 'poor',
        feedback: 'Xâm phạm quyền riêng tư tập thể vô căn cứ làm cả lớp bất bình.',
      },
      {
        text: 'Nộp ngay tang vật lên Ban Giám Hiệu và yêu cầu hạ hạnh kiểm Tiến cả học kỳ.',
        quality: 'good',
        feedback: 'Đúng quy trình kỷ luật nhưng cần giải thích để Tiến nhận thức rõ mối nguy chứ không chỉ sợ phạt.',
      },
    ],
  },
  {
    id: 'cabiet_nhom_quay_pha_gio_giai_lao',
    category: 'Trên lớp',
    isInfraction: true,
    title: 'Nhóm học sinh cá biệt cố tình gây ồn phá tiết học dự giờ',
    prompt:
      'Khi có giáo viên tổ chuyên môn đến dự giờ, Minh và Tiến cố tình gõ thước kẻ xuống gầm bàn và cười khúc khích làm gián đoạn nhịp giảng bài của bạn.',
    involvedStudentIds: ['minh', 'tien'],
    options: [
      {
        text: 'Khéo léo di chuyển xuống gần bàn hai em, vừa giảng bài vừa chạm nhẹ ra hiệu nhắc nhở và giao ngay câu hỏi vừa sức để kéo hai em tập trung; cuối giờ góp ý nghiêm.',
        quality: 'best',
        feedback: 'Bản lĩnh điều hành lớp tuyệt vời: giữ tiết dự giờ trôi chảy mà vẫn kiểm soát tốt học sinh cá biệt.',
      },
      {
        text: 'Dừng giảng hẳn để quát Minh và Tiến trước mặt giáo viên dự giờ.',
        quality: 'poor',
        feedback: 'Làm hỏng không khí tiết dự giờ và khiến hai em càng hả hê hoặc chống đối.',
      },
      {
        text: 'Mặc kệ hai em muốn làm gì thì làm, chỉ gọi các bạn bàn đầu phát biểu cho xong tiết.',
        quality: 'weak',
        feedback: 'Bỏ mặc góc lớp mất trật tự làm giảm chất lượng tiết học.',
      },
      {
        text: 'Nhắc chung cả lớp giữ trật tự rồi ghi tên hai em lên góc bảng để xử lý sau tiết.',
        quality: 'good',
        feedback: 'Không làm gián đoạn bài giảng quá lâu nhưng ghi tên lên bảng trước khách dễ gây căng thẳng.',
      },
    ],
  },
];

export const PROBLEM_STUDENT_SITUATIONS: PedagogicalSituation[] =
  PROBLEM_STUDENT_RAW.map(buildSituation);
