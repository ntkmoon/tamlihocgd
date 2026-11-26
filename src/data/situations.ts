import { PedagogicalSituation } from '../types/game';
import { SITUATIONS_PART_1 } from './situationsPart1';
import { SITUATIONS_PART_2 } from './situationsPart2';
import { SITUATIONS_PART_3 } from './situationsPart3';
import { EXTERNAL_EVENTS, PROBLEM_STUDENT_SITUATIONS } from './externalEvents';
import { COLLEAGUE_EXTRA_SITUATIONS, PRINCIPAL_SITUATIONS } from './staff';

const CORE_SITUATIONS: PedagogicalSituation[] = [
  {
    id: 'th_thien_im_lang',
    category: 'Trên lớp',
    title: 'Học sinh đứng im khi được gọi trả lời',
    prompt:
      'Trong giờ học, cả lớp không ai giơ tay. Bạn gọi Thiên đứng dậy trả lời câu hỏi, nhưng em chỉ đứng im, mắt tròn xoe nhìn giáo viên, miệng mím chặt và không nói gì. Bạn sẽ xử lý thế nào?',
    involvedStudentIds: ['thien'],
    choices: [
      {
        label: 'A',
        text: 'Nhắc lại câu hỏi và động viên Thiên; nếu em vẫn chưa trả lời được thì mời một bạn khá hơn trả lời rồi khích lệ Thiên nhắc lại, cuối giờ gặp riêng tìm hiểu nguyên nhân.',
        quality: 'best',
        feedback:
          'Xử lý chuẩn sư phạm: vừa giữ thể diện cho học sinh nhút nhát trước lớp, vừa giúp em nắm kiến thức và có cơ hội sửa chữa sau giờ học.',
        targetEffects: { academic: 6, mood: 8, affection: 10 },
        classEffects: { academic: 2, mood: 2, affection: 3 },
      },
      {
        label: 'B',
        text: 'Cho Thiên đứng tại chỗ hết tiết để răn đe vì thái độ không chịu hợp tác khi giáo viên kiểm tra bài.',
        quality: 'poor',
        feedback:
          'Phạt đứng trước lớp làm học sinh càng hoảng sợ, mất tự tin và nảy sinh tâm lý sợ hãi, xa lánh giáo viên.',
        targetEffects: { academic: -4, mood: -18, affection: -16 },
        classEffects: { mood: -6, affection: -5 },
      },
      {
        label: 'C',
        text: 'Cho Thiên ngồi xuống ngay và ghi điểm kém vào sổ đầu bài vì không thuộc bài.',
        quality: 'weak',
        feedback:
          'Ghi điểm kém ngay mà chưa rõ nguyên nhân tâm lý khiến em bị ức chế và mất động lực phát biểu ở các tiết sau.',
        targetEffects: { academic: -3, mood: -12, affection: -10 },
        classEffects: { mood: -3, affection: -2 },
      },
      {
        label: 'D',
        text: 'Bỏ qua hoàn toàn, chuyển sang gọi bạn khác mà không trao đổi thêm với Thiên.',
        quality: 'good',
        feedback:
          'Tránh được căng thẳng tức thời nhưng chưa giúp Thiên vượt qua sự rụt rè hay khắc phục lỗ hổng kiến thức.',
        targetEffects: { academic: -1, mood: 2, affection: 1 },
        classEffects: { mood: 0, affection: 0 },
      },
    ],
  },
  {
    id: 'th_tien_xe_bai',
    category: 'Trên lớp',
    title: 'Học sinh xé bài kiểm tra 1 điểm',
    prompt:
      'Vừa trả bài kiểm tra xong, bạn quay lên bảng thì nghe tiếng “roạc, xoạt”. Quay lại thấy Tiến đã xé nát bài làm bị 1 điểm trước lớp. Khi được hỏi, Tiến đáp tỉnh queo: “Bài của em thì em xé!”. Bạn xử lý ra sao?',
    involvedStudentIds: ['tien'],
    choices: [
      {
        label: 'A',
        text: 'Quát mắng gay gắt trước lớp, bắt Tiến đứng góc lớp và ghi ngay vào sổ đầu bài vì tội vô lễ.',
        quality: 'poor',
        feedback:
          'Đối đầu gay gắt trước tập thể dễ đẩy học sinh cá tính mạnh vào tâm lý bất cần, chống đối quyết liệt hơn.',
        targetEffects: { academic: -4, mood: -16, affection: -18 },
        classEffects: { mood: -6, affection: -5 },
      },
      {
        label: 'B',
        text: 'Dành 1-2 phút xuống chỗ Tiến phân tích nhẹ nhàng nhưng nghiêm khắc rằng đó là công sức chấm bài của thầy cô, mong em giữ bình tĩnh và gặp riêng cuối giờ để động viên.',
        quality: 'best',
        feedback:
          'Tình huống mẫu mực: giữ được kỷ cương lớp học ngay lập tức mà vẫn tôn trọng lòng tự trọng của học sinh, khiến Tiến tâm phục khẩu phục.',
        targetEffects: { academic: 5, mood: 6, affection: 12 },
        classEffects: { academic: 2, mood: 3, affection: 4 },
      },
      {
        label: 'C',
        text: 'Lờ đi như không thấy gì để tránh mất thời gian tiết học và tiếp tục viết bảng.',
        quality: 'weak',
        feedback:
          'Làm ngơ trước hành vi thiếu tôn trọng sẽ khiến cả lớp nghĩ giáo viên bất lực và dễ lặp lại thái độ vô lễ.',
        targetEffects: { academic: -2, mood: -2, affection: -6 },
        classEffects: { academic: -2, mood: -3, affection: -4 },
      },
      {
        label: 'D',
        text: 'Thu lại những mảnh giấy vụn và đuổi Tiến ra khỏi lớp ngay lập tức.',
        quality: 'poor',
        feedback:
          'Đuổi học sinh ra khỏi lớp vừa vi phạm nguyên tắc sư phạm vừa cắt đứt đối thoại giáo dục với em.',
        targetEffects: { academic: -6, mood: -14, affection: -16 },
        classEffects: { mood: -5, affection: -5 },
      },
    ],
  },
  {
    id: 'th_hong_loan_vo_le',
    category: 'Trên lớp',
    title: 'Học sinh mất trật tự và buông lời thiếu lễ phép',
    prompt:
      'Đang giảng bài, Hồng Loan ngồi dưới nói chuyện riêng và cười đùa dù đã nhắc nhiều lần. Khi bạn nghiêm giọng yêu cầu tập trung, Loan buột miệng lẩm bẩm lời khó nghe. Cả lớp lặng người nhìn bạn!',
    involvedStudentIds: ['hong_loan'],
    choices: [
      {
        label: 'A',
        text: 'Đập bàn quát lớn và tát cảnh cáo hoặc đuổi thẳng Hồng Loan ra khỏi lớp học.',
        quality: 'poor',
        feedback:
          'Mất kiểm soát cảm xúc và bạo lực/đuổi học sinh khiến tình hình vỡ trận, làm tổn thương sâu sắc quan hệ thầy trò.',
        targetEffects: { academic: -6, mood: -20, affection: -22 },
        classEffects: { mood: -8, affection: -8 },
      },
      {
        label: 'B',
        text: 'Đình chỉ dạy ngay, gửi bản tường trình lên Ban Giám Hiệu đòi kỷ luật đuổi học Hồng Loan.',
        quality: 'weak',
        feedback:
          'Đẩy hoàn toàn trách nhiệm sang kỷ luật hành chính khiến học sinh mặc cảm và mất niềm tin vào lòng bao dung của thầy cô.',
        targetEffects: { academic: -3, mood: -12, affection: -14 },
        classEffects: { mood: -4, affection: -4 },
      },
      {
        label: 'C',
        text: 'Kìm nén cơn giận, nói nhẹ nhàng nhưng kiên quyết cho em cơ hội tự nhận lỗi, tạm chuyển lớp tự sinh hoạt vài phút rồi cuối giờ bao dung phân tích riêng với Loan.',
        quality: 'best',
        feedback:
          'Sự điềm tĩnh và lòng bao dung đúng lúc đã chạm đến nhận thức của Hồng Loan, giúp em tự giác nhận lỗi sâu sắc.',
        targetEffects: { academic: 5, mood: 8, affection: 14 },
        classEffects: { academic: 2, mood: 4, affection: 6 },
      },
      {
        label: 'D',
        text: 'Cười gượng cho qua chuyện để giữ hòa khí lớp học, không nhắc nhở gì thêm.',
        quality: 'weak',
        feedback:
          'Nhân nhượng thái quá khiến kỷ cương lớp học lỏng lẻo và học sinh dễ nhờn quy tắc.',
        targetEffects: { academic: -2, mood: 3, affection: -3 },
        classEffects: { academic: -2, mood: -1, affection: -3 },
      },
    ],
  },
  {
    id: 'th_vinh_tuan_coc_so',
    category: 'Chủ nhiệm',
    title: '“Thưa thầy/cô, bạn Tuấn bảo cóc sợ thầy/cô ạ!”',
    prompt:
      'Trong giờ sinh hoạt cuối tuần khi lớp đang nêu ưu khuyết điểm, Vinh nhanh nhảu giơ tay trêu bạn: “Em thưa thầy/cô! Bạn Tuấn bảo cóc sợ thầy/cô ạ!”. Cả lớp ồ lên nhìn phản ứng của bạn.',
    involvedStudentIds: ['vinh', 'tuan'],
    choices: [
      {
        label: 'A',
        text: 'Bình tĩnh mỉm cười đáp: “Thầy cô đâu làm gì để các em phải sợ! Thầy cô chỉ mong các em kính trọng và lễ phép. Tuấn nói đúng đấy, nhưng cách nói của Tuấn chưa đẹp thôi.”',
        quality: 'best',
        feedback:
          'Ứng xử thông minh, dí dỏm mà vẫn giữ uy nghiêm: hóa giải sự trêu chọc, phân định rõ “kính trọng” khác “sợ hãi” và nhắc khéo cách ăn nói.',
        targetEffects: { academic: 2, mood: 10, affection: 12 },
        classEffects: { mood: 6, affection: 6 },
      },
      {
        label: 'B',
        text: 'Nổi giận hỏi vặn lại Tuấn rồi bắt cả Vinh lẫn Tuấn viết bản kiểm điểm vì dám hỗn với giáo viên.',
        quality: 'poor',
        feedback:
          'Phản ứng căng thẳng khiến bầu không khí sinh hoạt lớp trở nên nặng nề, hai học sinh thấy bị oan và mất thiện cảm.',
        targetEffects: { mood: -14, affection: -15 },
        classEffects: { mood: -5, affection: -5 },
      },
      {
        label: 'C',
        text: 'Nghiêm mặt yêu cầu Vinh im lặng và cắt luôn phần phát biểu góp ý của cả lớp.',
        quality: 'weak',
        feedback:
          'Dập tắt không khí dân chủ trong giờ sinh hoạt lớp khiến học sinh ngại chia sẻ thật lòng.',
        targetEffects: { mood: -7, affection: -7 },
        classEffects: { mood: -4, affection: -3 },
      },
      {
        label: 'D',
        text: 'Quay sang dọa Tuấn: “Em không sợ thì tuần sau cứ chờ xem điểm hạnh kiểm thế nào!”',
        quality: 'poor',
        feedback:
          'Dùng quyền lực điểm hạnh kiểm để đe dọa làm giảm uy tín giáo viên và khiến Tuấn chống đối ngầm.',
        targetEffects: { mood: -16, affection: -18 },
        classEffects: { mood: -5, affection: -6 },
      },
    ],
  },
  {
    id: 'th_hoai_linh_hoan_canh',
    category: 'Gia đình & Tâm lý',
    title: 'Học sinh ngủ gật, chưa thuộc bài vì hoàn cảnh',
    prompt:
      'Kiểm tra bài cũ, Hoài Linh đứng ấp úng chưa học bài, quần áo hơi lấm lem và có vẻ rất mệt mỏi. Bạn hỏi han mới biết mẹ em mất sớm, tối em phải phụ ba làm đồng đến khuya mới ngủ.',
    involvedStudentIds: ['hoai_linh'],
    choices: [
      {
        label: 'A',
        text: 'Phê bình nghiêm khắc trước lớp vì lý do cá nhân không thể biện minh cho việc lười học và đi học thiếu chỉnh tề.',
        quality: 'poor',
        feedback:
          'Không lắng nghe hoàn cảnh mà trách mắng trước lớp làm tổn thương sâu sắc học sinh mồ côi đang chịu nhiều thiệt thòi.',
        targetEffects: { academic: -4, mood: -20, affection: -20 },
        classEffects: { mood: -6, affection: -5 },
      },
      {
        label: 'B',
        text: 'Cho Hoài Linh về chỗ, tạm cho nợ điểm lần sau trả, ân cần động viên em trước lớp và bàn với tập thể, nhà trường hỗ trợ em vượt khó.',
        quality: 'best',
        feedback:
          'Cách xử lý đầy nhân ái: chạm tới trái tim Hoài Linh và giáo dục cả lớp tinh thần tương thân tương ái, giúp em có động lực vươn lên.',
        targetEffects: { academic: 8, mood: 14, affection: 16 },
        classEffects: { academic: 2, mood: 6, affection: 7 },
      },
      {
        label: 'C',
        text: 'Ghi điểm 0 theo đúng quy chế để đảm bảo công bằng tuyệt đối với các bạn khác trong lớp.',
        quality: 'weak',
        feedback:
          'Quá cứng nhắc về quy chế mà thiếu đi sự linh hoạt nhân văn khiến Hoài Linh dễ nản chí bỏ học.',
        targetEffects: { academic: -3, mood: -14, affection: -12 },
        classEffects: { mood: -3, affection: -2 },
      },
      {
        label: 'D',
        text: 'Cho em ngồi xuống nhanh rồi dạy tiếp bài mới như bình thường, không hỏi thêm để đỡ mất thời gian.',
        quality: 'good',
        feedback:
          'Không làm em xấu hổ nhưng bỏ lỡ cơ hội hỗ trợ kịp thời cho học sinh có hoàn cảnh đặc biệt.',
        targetEffects: { academic: 0, mood: 2, affection: 2 },
        classEffects: { mood: 0, affection: 0 },
      },
    ],
  },
  {
    id: 'th_hoa_thu_tinh',
    category: 'Gia đình & Tâm lý',
    title: 'Nữ sinh viết thư bày tỏ tình cảm với giáo viên',
    prompt:
      'Một nữ sinh ngoan hiền trong lớp là Hoa bỗng gửi lá thư tay bày tỏ sự cảm mến đặc biệt dành cho bạn. Nếu xử lý vụng về, em có thể xấu hổ hoặc hiểu nhầm tình cảm thầy trò.',
    involvedStudentIds: ['hoa'],
    choices: [
      {
        label: 'A',
        text: 'Phê bình Hoa ngay trước lớp để răn đe và giữ chuẩn mực đạo đức nhà trường.',
        quality: 'poor',
        feedback:
          'Công khai chuyện riêng tư nhạy cảm trước lớp sẽ làm Hoa tổn thương nặng nề, xấu hổ đến mức có thể đòi chuyển lớp hoặc nghỉ học.',
        targetEffects: { academic: -6, mood: -22, affection: -24 },
        classEffects: { mood: -5, affection: -6 },
      },
      {
        label: 'B',
        text: 'Ngại ngùng tìm mọi cách tránh mặt Hoa, không bao giờ gọi em phát biểu hay tiếp xúc gần nữa.',
        quality: 'weak',
        feedback:
          'Né tránh lộ liễu dễ khiến học sinh hiểu lầm rằng giáo viên cũng có tình cảm hoặc làm không khí lớp học gượng gạo.',
        targetEffects: { academic: -2, mood: -8, affection: -8 },
        classEffects: { mood: -1, affection: -1 },
      },
      {
        label: 'C',
        text: 'Viết thư hồi âm bày tỏ sự bối rối nhưng nhận lời làm bạn tâm giao bí mật với em.',
        quality: 'poor',
        feedback:
          'Vi phạm chuẩn mực quan hệ sư phạm thầy trò và dễ gây hiểu lầm tai hại lâu dài.',
        targetEffects: { academic: -3, mood: 2, affection: -10 },
        classEffects: { mood: -2, affection: -4 },
      },
      {
        label: 'D',
        text: 'Coi như không có chuyện gì xảy ra, vẫn đối xử bình thường, tự nhiên như mọi học sinh khác và khéo léo lồng ghép câu chuyện về tình thầy trò đúng mực.',
        quality: 'best',
        feedback:
          'Ứng xử khéo léo nhất theo sổ tay sư phạm: tôn trọng cảm xúc trong sáng của tuổi học trò mà vẫn giữ trọn ranh giới thầy trò.',
        targetEffects: { academic: 4, mood: 6, affection: 6 },
        classEffects: { mood: 2, affection: 3 },
      },
    ],
  },
  {
    id: 'th_nam_thang_cham_nham',
    category: 'Trên lớp',
    title: 'Học sinh thắc mắc bị chấm điểm thấp hơn bạn',
    prompt:
      'Trong giờ trả bài kiểm tra, Nam đứng dậy thắc mắc: “Thưa thầy/cô! Bài của em làm giống hệt bài bạn Thắng, sao bạn Thắng được 8 điểm mà em chỉ được có 5 điểm ạ?”.',
    involvedStudentIds: ['nam', 'thang'],
    choices: [
      {
        label: 'A',
        text: 'Khẳng định mình chấm rất kỹ rồi, yêu cầu Nam tự xem lại bài và không được thắc mắc nữa.',
        quality: 'poor',
        feedback:
          'Từ chối kiểm chứng khiến học sinh ấm ức, cho rằng giáo viên bảo thủ và thiếu công bằng.',
        targetEffects: { academic: -2, mood: -12, affection: -14 },
        classEffects: { mood: -4, affection: -5 },
      },
      {
        label: 'B',
        text: 'Thu cả hai bài ngay và cộng thêm 3 điểm cho Nam trước lớp để khỏi đôi co.',
        quality: 'weak',
        feedback:
          'Cho điểm cảm tính khi chưa đối chiếu sẽ khiến Thắng và cả lớp nghi ngờ tính công tâm khi chấm bài.',
        targetEffects: { academic: 0, mood: -3, affection: -4 },
        classEffects: { mood: -3, affection: -5 },
      },
      {
        label: 'C',
        text: 'Nhẹ nhàng hẹn Nam cuối giờ mang bài của em và Thắng lên đối chiếu kỹ: nếu mình chấm nhầm sẽ xin lỗi và sửa điểm ngay, còn nếu em sai sẽ giải thích cặn kẽ.',
        quality: 'best',
        feedback:
          'Thái độ thẳng thắn, cầu thị và minh bạch giúp học sinh tin tưởng tuyệt đối vào sự công tâm của giáo viên.',
        targetEffects: { academic: 6, mood: 8, affection: 11 },
        classEffects: { academic: 2, mood: 4, affection: 5 },
      },
      {
        label: 'D',
        text: 'Nghi ngờ hai em chép bài nhau nên hạ luôn điểm của Thắng xuống 5 cho bằng nhau.',
        quality: 'poor',
        feedback:
          'Quy chụp vô căn cứ làm cả hai học sinh bức xúc tột độ và mất niềm tin vào thầy cô.',
        targetEffects: { academic: -5, mood: -18, affection: -20 },
        classEffects: { mood: -6, affection: -7 },
      },
    ],
  },
  {
    id: 'th_dung_xe_vo',
    category: 'Trên lớp',
    title: 'Thầy/Cô ghi nhầm đầu bài, học sinh bực bội xé trang vở',
    prompt:
      'Lớp đang thi đua “Vở sạch chữ đẹp”. Bạn vừa ghi đầu bài lên bảng thì phát hiện ghi nhầm nên xóa viết lại. Dũng nắn nót viết xong liền bực bội xé trang vở và càu nhàu: “Viết như vậy mà cũng viết!”.',
    involvedStudentIds: ['dung'],
    choices: [
      {
        label: 'A',
        text: 'Thẳng thắn nhận sơ suất của mình trước lớp, đồng thời phân tích nhẹ nhàng cho Dũng hiểu lỗi nóng nảy và nói rằng ai cũng có lúc nhầm lẫn.',
        quality: 'best',
        feedback:
          'Dám nhận lỗi trước học sinh tạo nên sự công bằng và tấm gương trung thực, giúp Dũng nhận ra mình phản ứng thái quá.',
        targetEffects: { academic: 3, mood: 8, affection: 12 },
        classEffects: { mood: 4, affection: 6 },
      },
      {
        label: 'B',
        text: 'Quay xuống hỏi ai vừa nói câu đó rồi phê bình Dũng gay gắt trước lớp vì thái độ vô lễ.',
        quality: 'poor',
        feedback:
          'Chỉ trách học sinh mà lờ đi lỗi ghi nhầm của mình khiến em thấy bị đối xử bất công và ấm ức.',
        targetEffects: { mood: -14, affection: -15 },
        classEffects: { mood: -4, affection: -5 },
      },
      {
        label: 'C',
        text: 'Giả vờ không nghe thấy câu nói của Dũng và tiếp tục giảng bài bình thường.',
        quality: 'weak',
        feedback:
          'Im lặng né tránh khiến Dũng vẫn hậm hực vì mất điểm thi đua vở sạch chữ đẹp không phải do lỗi của em.',
        targetEffects: { mood: -6, affection: -5 },
        classEffects: { mood: -2, affection: -2 },
      },
      {
        label: 'D',
        text: 'Trừ điểm thi đua của cả tổ vì để thành viên xé vở mất trật tự trong giờ.',
        quality: 'poor',
        feedback:
          'Phạt lây cả tập thể khi nguyên nhân khởi phát từ sơ suất của giáo viên sẽ gây phản ứng ngược.',
        targetEffects: { mood: -12, affection: -14 },
        classEffects: { mood: -7, affection: -6 },
      },
    ],
  },
  {
    id: 'th_hung_nghi_khong_phep',
    category: 'Chủ nhiệm',
    title: 'Học sinh hay nghỉ học không phép',
    prompt:
      'Hùng thường xuyên nghỉ học không phép, tuần này đã vắng 2 buổi không lý do. Bạn cần hành động thế nào với cương vị giáo viên chủ nhiệm?',
    involvedStudentIds: ['hung'],
    choices: [
      {
        label: 'A',
        text: 'Tuyên bố tạm đình chỉ học tập của Hùng, bắt làm bản kiểm điểm đưa lên Hội đồng kỷ luật.',
        quality: 'poor',
        feedback:
          'Chưa tìm hiểu nguyên nhân đã đình chỉ học rất dễ đẩy học sinh chán nản đến nguy cơ bỏ học hẳn.',
        targetEffects: { academic: -6, mood: -16, affection: -18 },
        classEffects: { mood: -3, affection: -3 },
      },
      {
        label: 'B',
        text: 'Gặp riêng Hùng hỏi rõ lý do, sau đó đến thăm trao đổi với phụ huynh để cùng tìm nguyên nhân và biện pháp giúp đỡ phù hợp.',
        quality: 'best',
        feedback:
          'Kết hợp lắng nghe học sinh và phối hợp gia đình giúp tháo gỡ tận gốc nguyên nhân nghỉ học.',
        targetEffects: { academic: 7, mood: 8, affection: 12 },
        classEffects: { academic: 1, mood: 2, affection: 3 },
      },
      {
        label: 'C',
        text: 'Nhờ tổ trưởng đem giấy mời phụ huynh đến trường gặp ban giám hiệu vào tuần sau.',
        quality: 'good',
        feedback:
          'Có biện pháp liên hệ gia đình nhưng thiếu sự gần gũi trực tiếp tìm hiểu tâm tư của Hùng.',
        targetEffects: { academic: 2, mood: -3, affection: -2 },
        classEffects: { mood: 0, affection: 0 },
      },
      {
        label: 'D',
        text: 'Coi như việc riêng của em, cuối kỳ cứ căn cứ số buổi nghỉ mà hạ hạnh kiểm.',
        quality: 'poor',
        feedback:
          'Bỏ mặc học sinh là thiếu trách nhiệm trong công tác chủ nhiệm, khiến Hùng trượt dài.',
        targetEffects: { academic: -8, mood: -6, affection: -10 },
        classEffects: { mood: -2, affection: -3 },
      },
    ],
  },
  {
    id: 'th_ba_rut_hoc_ba',
    category: 'Gia đình & Tâm lý',
    title: 'Học sinh mặc cảm muốn xin bỏ học',
    prompt:
      'Ba học yếu và hay trốn tiết. Khi bạn hỏi chuyện, Ba cười chua chát nói: “Thầy cô nào cũng bảo em dốt nát, phá phách. Em xin nghỉ học để khỏi làm phiền lớp”. Bạn làm gì để giữ em ở lại?',
    involvedStudentIds: ['ba'],
    choices: [
      {
        label: 'A',
        text: 'Kiên trì động viên, tìm ra điểm mạnh của Ba, phân công bạn học kèm và nhờ giáo viên bộ môn gọi bài dễ cho điểm khích lệ để em lấy lại tự tin.',
        quality: 'best',
        feedback:
          'Tuyệt vời! Sự tin tưởng và kế hoạch tác động sư phạm cụ thể đã giúp Ba tìm lại niềm tin và hứng thú đến trường.',
        targetEffects: { academic: 10, mood: 14, affection: 18 },
        classEffects: { academic: 2, mood: 4, affection: 5 },
      },
      {
        label: 'B',
        text: 'Đồng ý ngay với đề nghị của Ba vì giữ học sinh cá biệt chỉ kéo thành tích thi đua của lớp đi xuống.',
        quality: 'poor',
        feedback:
          'Từ bỏ học sinh vì bệnh thành tích là sai lầm nghiêm trọng nhất của người làm công tác giáo dục.',
        targetEffects: { academic: -10, mood: -22, affection: -28 },
        classEffects: { mood: -8, affection: -10 },
      },
      {
        label: 'C',
        text: 'Phê bình Ba thiếu ý chí phấn đấu rồi gọi phụ huynh lên đón về tự giáo dục.',
        quality: 'weak',
        feedback:
          'Chỉ trích thêm vào nỗi tự ti sẵn có khiến Ba càng tin rằng không ai muốn dạy mình.',
        targetEffects: { academic: -4, mood: -12, affection: -14 },
        classEffects: { mood: -3, affection: -3 },
      },
      {
        label: 'D',
        text: 'Khuyên Ba cố gắng tự đọc sách giáo khoa ở nhà nhiều hơn để theo kịp các bạn.',
        quality: 'good',
        feedback:
          'Có lời khuyên tích cực nhưng thiếu giải pháp đồng hành cụ thể nên Ba khó tự vượt qua.',
        targetEffects: { academic: 2, mood: 2, affection: 3 },
        classEffects: { mood: 0, affection: 1 },
      },
    ],
  },
  {
    id: 'th_long_mat_but',
    category: 'Trên lớp',
    title: 'Tranh cãi nghi ngờ lấy bút trong giờ học',
    prompt:
      'Đang trong giờ học, Long đứng bật dậy thưa: “Thưa thầy/cô, bạn Hòa lấy bút của em! Chính mắt em thấy ngòi bút nằm trong hộp bút bạn ấy!”. Cả lớp nhốn nháo bàn tán.',
    involvedStudentIds: ['long'],
    choices: [
      {
        label: 'A',
        text: 'Dừng giảng ngay, lục soát cặp sách từng bàn một giữa lớp để tìm ra thủ phạm trộm cắp.',
        quality: 'poor',
        feedback:
          'Lục soát tập thể làm tổn thương nặng nề danh dự học sinh và gây không khí nghi kỵ căng thẳng.',
        targetEffects: { mood: -15, affection: -14 },
        classEffects: { mood: -10, affection: -9 },
      },
      {
        label: 'B',
        text: 'Yêu cầu Long ngồi xuống im lặng, mất bút thì về mua cây khác, không làm phiền giờ giảng.',
        quality: 'weak',
        feedback:
          'Giải quyết qua loa khiến Long ấm ức và không xử lý triệt để mâu thuẫn trong lớp.',
        targetEffects: { mood: -8, affection: -8 },
        classEffects: { mood: -3, affection: -3 },
      },
      {
        label: 'C',
        text: 'Trấn an Long, nhẹ nhàng hỏi cả lớp có ai nhặt nhầm bút của bạn không để trả lại hoặc cuối giờ đưa riêng cho thầy/cô, tuyên dương tính trung thực tự giác.',
        quality: 'best',
        feedback:
          'Giữ ổn định giờ học, tránh kết tội oan khi chưa rõ ràng và mở lối danh dự để học sinh tự giác sửa lỗi.',
        targetEffects: { academic: 2, mood: 8, affection: 10 },
        classEffects: { mood: 4, affection: 5 },
      },
      {
        label: 'D',
        text: 'Phạt đứng cả hai bạn vì tội mất trật tự gây gổ trong giờ học.',
        quality: 'poor',
        feedback:
          'Đánh đồng người mất đồ và người bị nghi là xử ép, làm mất niềm tin vào công lý của thầy cô.',
        targetEffects: { mood: -14, affection: -15 },
        classEffects: { mood: -4, affection: -4 },
      },
    ],
  },
  {
    id: 'th_lien_bau_lai_lop_truong',
    category: 'Chủ nhiệm',
    title: 'Lớp trưởng bị đề nghị thay thế vì nóng tính',
    prompt:
      'Trong giờ sinh hoạt, Tuấn và Minh đứng dậy đề nghị thay lớp trưởng Liên vì cho rằng Liên hay quát mắng và thiên vị. Liên đáp lại do các bạn không thích mình nên nói vậy.',
    involvedStudentIds: ['lien', 'tuan', 'minh'],
    choices: [
      {
        label: 'A',
        text: 'Cho cả lớp giơ tay bầu lại lớp trưởng ngay lập tức theo số đông để thể hiện tính dân chủ.',
        quality: 'weak',
        feedback:
          'Quyết định vội vàng khi chưa xác minh khiến Liên bị sốc, tự ái và tổn thương tinh thần nghiêm trọng.',
        targetEffects: { mood: -10, affection: -10 },
        classEffects: { mood: -2, affection: -2 },
      },
      {
        label: 'B',
        text: 'Tạm hoãn việc bầu lại để lắng nghe thêm ý kiến các tổ trưởng, sau đó gặp riêng góp ý cho Liên cách ứng xử mềm mỏng hơn và hẹn 2 tuần để lớp gắn kết lại.',
        quality: 'best',
        feedback:
          'Khéo léo bảo vệ lòng tự trọng cho Liên, đồng thời giúp cả Tuấn, Minh và Liên nhìn nhận lại để đoàn kết hơn.',
        targetEffects: { academic: 3, mood: 9, affection: 12 },
        classEffects: { academic: 2, mood: 5, affection: 6 },
      },
      {
        label: 'C',
        text: 'Bênh vực Liên hoàn toàn và phê bình Tuấn, Minh vì tội nói xấu cán bộ lớp.',
        quality: 'poor',
        feedback:
          'Áp đặt một chiều khiến Tuấn, Minh và nhiều bạn khác bất mãn ngầm, làm lớp mất đoàn kết.',
        targetEffects: { mood: -12, affection: -14 },
        classEffects: { mood: -6, affection: -6 },
      },
      {
        label: 'D',
        text: 'Bãi nhiệm Liên ngay và chỉ định Tuấn làm lớp trưởng thay thế để xem bạn làm được đến đâu.',
        quality: 'poor',
        feedback:
          'Xử lý cảm tính tạo tiền lệ xấu, làm Liên mất niềm tin và tập thể lớp chia rẽ.',
        targetEffects: { mood: -14, affection: -15 },
        classEffects: { mood: -5, affection: -5 },
      },
    ],
  },
  {
    id: 'th_minh_nhai_loi',
    category: 'Trên lớp',
    title: 'Học sinh nhại lời và bắt bẻ câu chữ giáo viên',
    prompt:
      'Minh ngồi dưới cười đùa không chú ý. Bạn nghiêm khắc gọi: “Minh, em đứng dậy nhắc lại thầy/cô vừa nói gì?”. Minh nhanh nhảu đáp: “Thưa thầy/cô vừa nói: Minh đứng dậy nhắc lại ạ!”. Cả lớp cười ồ.',
    involvedStudentIds: ['minh'],
    choices: [
      {
        label: 'A',
        text: 'Đỏ mặt tức giận, đuổi Minh ra khỏi lớp ngay vì tội hỗn láo trêu ngươi giáo viên.',
        quality: 'poor',
        feedback:
          'Nóng vội rơi vào bẫy chống chế của học sinh bướng bỉnh, dễ dẫn tới đôi co căng thẳng trước lớp.',
        targetEffects: { academic: -4, mood: -14, affection: -16 },
        classEffects: { mood: -5, affection: -5 },
      },
      {
        label: 'B',
        text: 'Làm ngơ quay lên bảng giảng tiếp vì ngại tranh cãi thêm với Minh.',
        quality: 'weak',
        feedback:
          'Bỏ qua khiến Minh đắc thắng và cả lớp thấy sự thiếu bản lĩnh trong điều hành lớp học.',
        targetEffects: { academic: -2, mood: 2, affection: -6 },
        classEffects: { academic: -2, mood: -2, affection: -4 },
      },
      {
        label: 'C',
        text: 'Bình tĩnh nhìn thẳng Minh và sửa lại câu hỏi thật chính xác: “Em nhắc lại nội dung bài giảng thầy/cô vừa phân tích trên bảng là gì?” rồi nhắc nhở nghiêm túc khi em lúng túng.',
        quality: 'best',
        feedback:
          'Bản lĩnh sư phạm vững vàng: khắc phục ngay sơ hở câu chữ, khiến Minh hết đường lý sự cùn mà vẫn giữ không khí nghiêm túc.',
        targetEffects: { academic: 4, mood: 2, affection: 8 },
        classEffects: { academic: 3, mood: 3, affection: 5 },
      },
      {
        label: 'D',
        text: 'Phạt cả lớp chép phạt 10 lần vì dám hùa theo Minh cười cợt giáo viên.',
        quality: 'poor',
        feedback:
          'Trút giận lên cả tập thể vô tội là cách xử lý phản sư phạm.',
        targetEffects: { mood: -10, affection: -12 },
        classEffects: { mood: -10, affection: -10 },
      },
    ],
  },
  {
    id: 'th_hien_hoc_them',
    category: 'Gia đình & Tâm lý',
    preferredMonths: [10, 11, 3],
    title: 'Học sinh lo lắng bị trù dập vì không học thêm',
    prompt:
      'Hiền tìm gặp bạn tâm sự: em không học thêm lớp của thầy dạy bộ môn nữa nên dạo này hay bị thầy hỏi câu rất khó và điểm kiểm tra sụt giảm. Hiền rất buồn và lo lắng.',
    involvedStudentIds: ['hien'],
    choices: [
      {
        label: 'A',
        text: 'Gạt phắt đi, bảo Hiền đừng suy diễn lung tung vì không có chuyện thầy cô trù dập học sinh.',
        quality: 'poor',
        feedback:
          'Bác bỏ ngay tâm sự khiến Hiền nghĩ bạn bao che đồng nghiệp và không còn tin tưởng chia sẻ nữa.',
        targetEffects: { academic: -3, mood: -14, affection: -16 },
        classEffects: { mood: -2, affection: -2 },
      },
      {
        label: 'B',
        text: 'Lắng nghe ân cần, khuyên Hiền kiểm tra lại kỹ bài làm trước đã, đồng thời hứa sẽ khéo léo trao đổi với thầy bộ môn để hiểu rõ và hỗ trợ em.',
        quality: 'best',
        feedback:
          'Vừa bảo vệ quyền lợi chính đáng và trấn an tinh thần cho Hiền, vừa giữ gìn sự tôn trọng khéo léo với đồng nghiệp.',
        targetEffects: { academic: 6, mood: 12, affection: 14 },
        classEffects: { mood: 2, affection: 3 },
      },
      {
        label: 'C',
        text: 'Tỏ ra bất bình cùng Hiền và hứa sẽ báo cáo thẳng lên Ban Giám Hiệu đòi kỷ luật thầy bộ môn.',
        quality: 'weak',
        feedback:
          'Kết luận vội vàng khi mới nghe từ một phía dễ làm tổn thương đồng nghiệp nếu sự thật không phải vậy.',
        targetEffects: { academic: 0, mood: 4, affection: 3 },
        classEffects: { mood: -2, affection: -3 },
      },
      {
        label: 'D',
        text: 'Khuyên Hiền nên quay lại lớp học thêm của thầy cho yên chuyện để thi cử thuận lợi.',
        quality: 'poor',
        feedback:
          'Thiếu công tâm và vô tình tiếp tay cho tâm lý ép buộc, làm Hiền thất vọng.',
        targetEffects: { academic: -2, mood: -10, affection: -14 },
        classEffects: { mood: -3, affection: -4 },
      },
    ],
  },
  {
    id: 'th_lop_da_bong_vo_kinh',
    category: 'Chủ nhiệm',
    title: 'Đá bóng vỡ cửa kính nhưng đã tự giác lắp lại',
    prompt:
      'Dù nhà trường đã cấm, một nhóm học sinh (Tuấn, Vinh, Hùng) vẫn đá bóng trong sân làm vỡ ô cửa kính. Tuy nhiên các em đã tự góp tiền mua tấm kính mới lắp lại ngay. Giờ sinh hoạt bạn xử lý thế nào?',
    involvedStudentIds: ['tuan', 'vinh', 'hung'],
    choices: [
      {
        label: 'A',
        text: 'Bỏ qua hoàn toàn không nhắc lại vì kính cũng đã được lắp lại nguyên vẹn rồi.',
        quality: 'weak',
        feedback:
          'Không nhắc nhở lỗi vi phạm nội quy dễ khiến các em chủ quan tái phạm lần sau.',
        targetEffects: { mood: 3, affection: 1 },
        classEffects: { mood: 0, affection: -2 },
      },
      {
        label: 'B',
        text: 'Chỉ phê bình gay gắt hành vi đá bóng vi phạm nội quy và hạ bậc hạnh kiểm cả nhóm.',
        quality: 'weak',
        feedback:
          'Không ghi nhận tinh thần tự giác khắc phục hậu quả làm các em cảm thấy hụt hẫng.',
        targetEffects: { mood: -10, affection: -10 },
        classEffects: { mood: -3, affection: -3 },
      },
      {
        label: 'C',
        text: 'Nghiêm khắc phê bình lỗi vi phạm nội quy, nhưng đồng thời khen ngợi tinh thần tự giác khắc phục lỗi của nhóm và yêu cầu hứa không tái phạm.',
        quality: 'best',
        feedback:
          'Công minh và nhân văn: răn đe đúng khuyết điểm nhưng vẫn khuyến khích tinh thần dũng cảm chịu trách nhiệm.',
        targetEffects: { academic: 2, mood: 8, affection: 12 },
        classEffects: { mood: 4, affection: 6 },
      },
      {
        label: 'D',
        text: 'Bắt cả nhóm đứng trước cờ tuần sau xin lỗi toàn trường.',
        quality: 'poor',
        feedback:
          'Hình phạt quá nặng so với việc các em đã tự giác khắc phục và là lần đầu vi phạm.',
        targetEffects: { mood: -15, affection: -16 },
        classEffects: { mood: -5, affection: -5 },
      },
    ],
  },
  {
    id: 'th_lop_hat_bai',
    category: 'Chủ nhiệm',
    preferredMonths: [9],
    title: 'Học sinh đề nghị giáo viên hát khi nhận lớp',
    prompt:
      'Buổi đầu nhận lớp chủ nhiệm, không khí còn hơi bỡ ngỡ. Vinh và cả lớp hào hứng vỗ tay đề nghị bạn hát một bài làm quen, nhưng bạn lại hát không hay chút nào!',
    involvedStudentIds: ['vinh', 'hoa'],
    choices: [
      {
        label: 'A',
        text: 'Nghiêm mặt từ chối thẳng: “Tôi không biết hát, các em giữ trật tự để bắt đầu học nội quy!”',
        quality: 'weak',
        feedback:
          'Làm tắt ngấm sự hào hứng của học sinh ngay buổi đầu gặp mặt, tạo khoảng cách xa lạ.',
        targetEffects: { mood: -8, affection: -8 },
        classEffects: { mood: -6, affection: -6 },
      },
      {
        label: 'B',
        text: 'Tươi cười nói vui: “Cô/thầy hát không hay đâu, nhưng vì tình cảm của lớp, chúng ta cùng bắt nhịp hát chung một bài nhé!”',
        quality: 'best',
        feedback:
          'Khéo léo, thân thiện và tự tin! Cả lớp bật cười hào hứng, xóa tan khoảng cách thầy trò ngay từ ngày đầu.',
        targetEffects: { mood: 10, affection: 12 },
        classEffects: { mood: 9, affection: 10 },
      },
      {
        label: 'C',
        text: 'Đẩy trách nhiệm: “Cô/thầy không biết hát, mời bạn lớp trưởng lên hát thay đi!”',
        quality: 'good',
        feedback:
          'Tạm thoát tình huống nhưng bỏ lỡ cơ hội tuyệt vời để tự mình gắn kết với tập thể lớp.',
        targetEffects: { mood: 1, affection: 1 },
        classEffects: { mood: 1, affection: 1 },
      },
      {
        label: 'D',
        text: 'Lúng túng đỏ mặt rồi lảng sang chuyện khác khiến lớp cười khúc khích.',
        quality: 'weak',
        feedback:
          'Sự lúng túng làm giảm sự tự tin của giáo viên trước học sinh mới.',
        targetEffects: { mood: 0, affection: -3 },
        classEffects: { mood: -1, affection: -3 },
      },
    ],
  },
  {
    id: 'th_lop_vang_dam_ma',
    category: 'Trên lớp',
    title: 'Lớp vắng một nửa vì đi viếng mẹ bạn',
    prompt:
      'Bước vào giờ dạy, bạn thấy lớp vắng gần một nửa học sinh. Hỏi ra mới biết các em vừa đi đưa đám mẹ của một bạn cùng trường từ tiết trước nên chưa kịp về lớp.',
    involvedStudentIds: ['lien', 'thang'],
    choices: [
      {
        label: 'A',
        text: 'Tức giận tuyên bố cho cả lớp nghỉ luôn tiết học này để cảnh cáo.',
        quality: 'poor',
        feedback:
          'Nóng vội bỏ tiết vi phạm quy chế chuyên môn và làm ảnh hưởng quyền lợi học tập của học sinh có mặt.',
        targetEffects: { academic: -6, mood: -8, affection: -10 },
        classEffects: { academic: -6, mood: -6, affection: -8 },
      },
      {
        label: 'B',
        text: 'Vẫn giảng bài mới bình thường và ghi tên phạt nặng tất cả các em vắng mặt.',
        quality: 'weak',
        feedback:
          'Quá cứng nhắc và thiếu cảm thông trước nghĩa cử tình bạn chân thành của các em.',
        targetEffects: { academic: 2, mood: -8, affection: -9 },
        classEffects: { academic: 1, mood: -6, affection: -7 },
      },
      {
        label: 'C',
        text: 'Cảm thông với lý do chính đáng, tạm lùi bài mới sang buổi sau và cho các em tại lớp ôn luyện bài tập, khi đủ lớp sẽ nhắc khéo việc sắp xếp thời gian.',
        quality: 'best',
        feedback:
          'Vừa đảm bảo kỷ cương không để trống giờ, vừa giàu lòng nhân ái và bảo vệ quyền lợi học tập cho cả lớp.',
        targetEffects: { academic: 4, mood: 8, affection: 10 },
        classEffects: { academic: 3, mood: 6, affection: 7 },
      },
      {
        label: 'D',
        text: 'Cho các em ở lại lớp ngồi tự nói chuyện tự do hết tiết chờ các bạn về.',
        quality: 'weak',
        feedback:
          'Để trống giờ gây mất trật tự và lãng phí thời gian học tập.',
        targetEffects: { academic: -3, mood: 3, affection: -1 },
        classEffects: { academic: -3, mood: 1, affection: -2 },
      },
    ],
  },
  {
    id: 'th_chuong_dien_thoai',
    category: 'Trên lớp',
    title: 'Chuông điện thoại của chính giáo viên reo trong lớp',
    prompt:
      'Giữa lúc bạn đang nghiêm giọng nhắc nhở kỷ luật lớp, bỗng tiếng chuông điện thoại reo vang. Bạn nghiêm mặt hỏi của ai thì dưới lớp có tiếng rụt rè: “Thưa cô/thầy... hình như là máy của cô/thầy ạ!” (Hôm qua bạn mới đổi nhạc chuông).',
    involvedStudentIds: ['vinh', 'hoa'],
    choices: [
      {
        label: 'A',
        text: 'Bối rối tắt phụt máy rồi lờ đi, quát cả lớp im lặng không được cười.',
        quality: 'poor',
        feedback:
          'Che giấu sơ suất bằng thái độ gắt gỏng khiến học sinh mất sự kính trọng đối với sự trung thực của thầy cô.',
        targetEffects: { mood: -8, affection: -10 },
        classEffects: { mood: -6, affection: -8 },
      },
      {
        label: 'B',
        text: 'Thẳng thắn xin lỗi cả lớp vì chưa quen nhạc chuông máy mới, tắt chuông ngay và nhân dịp này phổ biến văn hóa dùng điện thoại nơi học đường.',
        quality: 'best',
        feedback:
          'Đúng chuẩn sư phạm: một lời xin lỗi chân thành không làm mất uy tín mà còn khiến học sinh nể phục sự điềm tĩnh, gương mẫu.',
        targetEffects: { mood: 8, affection: 10 },
        classEffects: { mood: 5, affection: 7 },
      },
      {
        label: 'C',
        text: 'Chống chế nói rằng đây là cuộc gọi khẩn cấp của Ban Giám Hiệu rồi bỏ ra ngoài nghe máy 10 phút.',
        quality: 'weak',
        feedback:
          'Thiếu trung thực trước học sinh và bỏ dở tiết giảng làm gián đoạn mạch học tập.',
        targetEffects: { academic: -2, mood: -4, affection: -6 },
        classEffects: { academic: -2, mood: -3, affection: -5 },
      },
      {
        label: 'D',
        text: 'Cười trừ rồi vội vàng chuyển bài thật nhanh để lớp quên đi.',
        quality: 'good',
        feedback:
          'Giữ được không khí nhẹ nhàng nhưng chưa tận dụng thành bài học gương mẫu về lời xin lỗi.',
        targetEffects: { mood: 2, affection: 2 },
        classEffects: { mood: 2, affection: 1 },
      },
    ],
  },
  {
    id: 'th_uoc_nghi_tiet',
    category: 'Trên lớp',
    title: '“Thưa thầy/cô, em ước được nghỉ tiết học của thầy/cô ạ!”',
    prompt:
      'Cuối giờ học căng thẳng, bạn hỏi vui cả lớp: “Nếu được một điều ước ngay lúc này, các em ước gì?”. Cả lớp cười rộ, bỗng Minh ở cuối lớp hồn nhiên đáp: “Thưa thầy/cô, em ước được nghỉ tiết học của thầy/cô ạ!”.',
    involvedStudentIds: ['minh'],
    choices: [
      {
        label: 'A',
        text: 'Vẫn giữ nụ cười hóm hỉnh, giải thích vui rằng quy định nhà trường không cho phép thực hiện điều ước đó, nhưng hứa sẽ tạo thêm phút thư giãn để lớp đỡ mệt.',
        quality: 'best',
        feedback:
          'Sự hài hước và thấu hiểu tâm lý học trò sau 3-4 tiết học căng thẳng giúp gắn kết tình thầy trò tuyệt vời.',
        targetEffects: { mood: 10, affection: 11 },
        classEffects: { mood: 8, affection: 8 },
      },
      {
        label: 'B',
        text: 'Tự ái phật lòng, phê bình Minh ngay trước lớp về thái độ thiếu ý thức học tập.',
        quality: 'poor',
        feedback:
          'Chính bạn mở lời hỏi vui nhưng lại trách mắng sự chân thật trẻ con sẽ làm cả lớp khép mình lại ở những lần sau.',
        targetEffects: { mood: -14, affection: -15 },
        classEffects: { mood: -7, affection: -7 },
      },
      {
        label: 'C',
        text: 'Gật đầu cho cả lớp nghỉ sớm 15 phút để chiều lòng học sinh.',
        quality: 'weak',
        feedback:
          'Vi phạm quy định giờ giảng và khiến học sinh nghĩ có thể dễ dàng xin nghỉ tiết.',
        targetEffects: { academic: -4, mood: 6, affection: 2 },
        classEffects: { academic: -4, mood: 5, affection: 1 },
      },
      {
        label: 'D',
        text: 'Lờ đi như không nghe thấy câu trả lời của Minh và dọn cặp ra về.',
        quality: 'weak',
        feedback:
          'Không khí lớp bị chùng xuống đột ngột, dễ khiến học sinh nghĩ giáo viên đang giận dỗi.',
        targetEffects: { mood: -4, affection: -4 },
        classEffects: { mood: -3, affection: -3 },
      },
    ],
  },
  {
    id: 'th_thanh_nien_ngoai_truong',
    category: 'Chủ nhiệm',
    title: 'Thanh niên ngoài trường chờ đánh học sinh lớp bạn',
    prompt:
      'Giờ ra chơi, học sinh hớt hải báo tin: do xích mích bên ngoài, một nhóm thanh niên lạ đang tụ tập trước cổng trường chờ lúc tan học để đánh Tuấn.',
    involvedStudentIds: ['tuan'],
    choices: [
      {
        label: 'A',
        text: 'Coi đó là xích mích ngoài phạm vi nhà trường nên không can thiệp, nhắc Tuấn tự giải quyết.',
        quality: 'poor',
        feedback:
          'Vô trách nhiệm với sự an toàn và tính mạng của học sinh mình chủ nhiệm!',
        targetEffects: { mood: -22, affection: -25 },
        classEffects: { mood: -10, affection: -12 },
      },
      {
        label: 'B',
        text: 'Yêu cầu Tuấn ở lại trong trường an toàn, báo ngay cho bảo vệ và gia đình đến đón, đồng thời sẵn sàng báo công an địa phương nếu có dấu hiệu nguy hiểm.',
        quality: 'best',
        feedback:
          'Quyết đoán, kịp thời và đúng quy trình bảo vệ an toàn học đường, sau đó cần tìm hiểu rõ mâu thuẫn để giải quyết dứt điểm.',
        targetEffects: { mood: 10, affection: 16 },
        classEffects: { mood: 5, affection: 7 },
      },
      {
        label: 'C',
        text: 'Bảo Tuấn tự đi ra cổng trường hòa giải xin lỗi đám thanh niên kia cho xong chuyện.',
        quality: 'poor',
        feedback:
          'Đẩy học sinh vào tình thế nguy hiểm trực tiếp khi nhóm kia đang kích động.',
        targetEffects: { mood: -20, affection: -22 },
        classEffects: { mood: -8, affection: -8 },
      },
      {
        label: 'D',
        text: 'Phê bình Tuấn trước lớp vì tội gây sự bên ngoài làm ảnh hưởng uy tín lớp.',
        quality: 'weak',
        feedback:
          'Ưu tiên trách móc thay vì bảo vệ an toàn trước mắt cho học sinh là sai thứ tự xử lý.',
        targetEffects: { mood: -12, affection: -12 },
        classEffects: { mood: -4, affection: -4 },
      },
    ],
  },
  {
    id: 'th_nhom_ban_toc_vang',
    category: 'Chủ nhiệm',
    title: 'Học sinh nhuộm tóc nổi bật, cắt kiểu khác lạ',
    prompt:
      'Đầu tuần đi học, Tiến và Minh rủ nhau nhuộm tóc vàng đỏ nổi bật khác hẳn quy định học đường. Một số bạn trong lớp bàn tán xôn xao.',
    involvedStudentIds: ['tien', 'minh'],
    choices: [
      {
        label: 'A',
        text: 'Đứng trước lớp mỉa mai kiểu tóc lố lăng và cấm hai em vào lớp cho đến khi nhuộm đen lại.',
        quality: 'poor',
        feedback:
          'Cấm vào lớp và mỉa mai ngoại hình dễ kích động cái tôi phản kháng của tuổi mới lớn.',
        targetEffects: { academic: -4, mood: -15, affection: -16 },
        classEffects: { mood: -4, affection: -4 },
      },
      {
        label: 'B',
        text: 'Gặp riêng hỏi han và khéo léo chia sẻ trong giờ sinh hoạt về nét đẹp phù hợp lứa tuổi học sinh, tinh thần hòa đồng tập thể và vận động các em tự giác điều chỉnh.',
        quality: 'best',
        feedback:
          'Thuyết phục bằng lý lẽ tôn trọng và giá trị tập thể giúp học sinh tiếp thu tự nguyện mà không cảm thấy bị xúc phạm.',
        targetEffects: { academic: 2, mood: 6, affection: 10 },
        classEffects: { mood: 3, affection: 5 },
      },
      {
        label: 'C',
        text: 'Khen kiểu tóc cá tính và cho qua luôn vì nghĩ đó là quyền tự do cá nhân.',
        quality: 'weak',
        feedback:
          'Bỏ qua nội quy nhà trường dễ tạo tiền lệ mất nề nếp đồng bộ trong lớp.',
        targetEffects: { mood: 4, affection: 2 },
        classEffects: { mood: 1, affection: -3 },
      },
      {
        label: 'D',
        text: 'Gọi điện mách thẳng phụ huynh đến cạo đầu hoặc đưa con về ngay trong buổi sáng.',
        quality: 'poor',
        feedback:
          'Biện pháp cực đoan làm sứt mẻ nghiêm trọng niềm tin giữa học sinh và giáo viên.',
        targetEffects: { mood: -18, affection: -20 },
        classEffects: { mood: -5, affection: -6 },
      },
    ],
  },
  {
    id: 'th_kiem_tra_dot_xuat',
    category: 'Trên lớp',
    preferredMonths: [10, 12, 3, 5],
    title: 'Học sinh trung bình đạt điểm tuyệt đối “đột xuất”',
    prompt:
      'Khi chấm bài kiểm tra 1 tiết, bạn bất ngờ thấy bài của Nam — học sinh có sức học trung bình — lại làm xuất sắc, xứng đáng điểm 10 tuyệt đối. Giờ trả bài bạn xử lý ra sao?',
    involvedStudentIds: ['nam'],
    choices: [
      {
        label: 'A',
        text: 'Khen ngợi sự tiến bộ của Nam trước lớp và khéo léo mời em lên bảng trình bày lại cách giải cho cả lớp cùng học tập.',
        quality: 'best',
        feedback:
          'Rất tinh tế: nếu em tự làm thật sẽ được vinh danh xứng đáng; nếu trót chép bài, em sẽ tự nhận ra qua sự lúng túng để gặp riêng nhắc nhở tế nhị.',
        targetEffects: { academic: 8, mood: 8, affection: 10 },
        classEffects: { academic: 3, mood: 4, affection: 4 },
      },
      {
        label: 'B',
        text: 'Nghi ngờ em quay cóp nên không cho điểm và phê bình thẳng thừng trước cả lớp.',
        quality: 'poor',
        feedback:
          'Kết tội theo định kiến khi chưa có bằng chứng sẽ dập tắt hoàn toàn nỗ lực vươn lên của học sinh.',
        targetEffects: { academic: -6, mood: -18, affection: -20 },
        classEffects: { mood: -5, affection: -6 },
      },
      {
        label: 'C',
        text: 'Lặng lẽ tự hạ xuống 7 điểm cho “hợp lý” với sức học bình thường của Nam.',
        quality: 'poor',
        feedback:
          'Chấm điểm theo định kiến là thiếu công bằng, vi phạm nghiêm trọng nguyên tắc đánh giá.',
        targetEffects: { academic: -4, mood: -12, affection: -14 },
        classEffects: { mood: -3, affection: -4 },
      },
      {
        label: 'D',
        text: 'Cho điểm 10 bình thường và không hỏi gì thêm để tránh làm em ngại.',
        quality: 'good',
        feedback:
          'Động viên được tinh thần nhưng chưa kiểm chứng được năng lực thực chất của bài làm.',
        targetEffects: { academic: 2, mood: 6, affection: 5 },
        classEffects: { mood: 1, affection: 1 },
      },
    ],
  },
];

const normalizeNegativeDelta = (v?: number) =>
  typeof v === 'number' && v < 0 ? Math.round(v * 2.5) : v;

const NORMALIZED_CORE_SITUATIONS: PedagogicalSituation[] = CORE_SITUATIONS.map((sit) => ({
  ...sit,
  choices: sit.choices?.map((ch) => ({
    ...ch,
    targetEffects: {
      academic: normalizeNegativeDelta(ch.targetEffects.academic),
      mood: normalizeNegativeDelta(ch.targetEffects.mood),
      affection: normalizeNegativeDelta(ch.targetEffects.affection),
    },
    classEffects: {
      academic: normalizeNegativeDelta(ch.classEffects.academic),
      mood: normalizeNegativeDelta(ch.classEffects.mood),
      affection: normalizeNegativeDelta(ch.classEffects.affection),
    },
  })) as PedagogicalSituation['choices'],
}));

export const PEDAGOGICAL_SITUATIONS: PedagogicalSituation[] = [
  ...NORMALIZED_CORE_SITUATIONS,
  ...SITUATIONS_PART_1,
  ...SITUATIONS_PART_2,
  ...SITUATIONS_PART_3,
  ...PROBLEM_STUDENT_SITUATIONS,
  ...COLLEAGUE_EXTRA_SITUATIONS,
  ...PRINCIPAL_SITUATIONS,
  ...EXTERNAL_EVENTS,
];
