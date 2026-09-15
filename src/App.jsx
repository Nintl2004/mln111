import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  Compass, 
  ShieldAlert, 
  Cpu, 
  Zap, 
  Layers, 
  Bot, 
  Trophy, 
  ChevronRight, 
  RotateCcw,
  ArrowRight,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  Send,
  HelpCircle as QuestionIcon,
  MessageSquare
} from 'lucide-react';

// Full structured content matching both pptx and 2.docx perfectly
const chaptersData = {
  intro: {
    badge: "Khởi đầu",
    chapterNum: "Chương 1",
    title: "Đặt vấn đề & Cái bẫy Nhận thức",
    desc: "Khám phá hiện trạng xác định chân lý trong một xã hội bất định thời đại bùng nổ thông tin và sự hạn chế, bế tắc của các quan niệm triết học cũ.",
    traps: [
      {
        icon: "👥",
        title: "Bẫy số đông (Tâm lý bầy đàn)",
        desc: "Mỗi ngày trên mạng xã hội, chúng ta bị bủa vây bởi hàng ngàn luồng thông tin đa chiều. Đứng trước sự hỗn loạn này, con người rất dễ sa bẫy tin vào những thứ được đám đông tung hô (như các bài đăng triệu lượt chia sẻ)."
      },
      {
        icon: "💰",
        title: "Bẫy lợi ích trước mắt",
        desc: "Mù quáng chạy theo các trào lưu làm giàu nhanh, các lựa chọn mang lại sự có ích hay lợi ích chủ quan trước mắt, lầm tưởng lòng tham có thể bẻ cong được quy luật khách quan."
      },
      {
        icon: "⚡",
        title: "Sự sụp đổ của ảo tưởng",
        desc: "Thực tiễn qua sự sụp đổ của vô số mô hình lừa đảo tài chính đa cấp, trào lưu chữa bệnh phản khoa học chứng minh: đám đông và lợi ích tức thời không bảo chứng cho sự thật."
      }
    ],
    historicalSchools: [
      {
        school: "Chủ nghĩa Duy tâm Chủ quan",
        philosophers: "Béccơli, E.Makhơ, Phichtơ",
        desc: "Béccơli cho chân lý là sự phù hợp giữa suy diễn về sự vật với chính bản thân sự vật trên thực tế. Makhơ coi sự vật chỉ là phức hợp cảm giác. Phichtơ cho rằng nhận thức chỉ là nhận thức các cảm giác của con người.",
        color: "from-amber-50 to-orange-100 border-orange-200 text-orange-850"
      },
      {
        school: "Chủ nghĩa Duy tâm Khách quan",
        philosophers: "Platôn, Hêghen",
        desc: "Giải thích duy tâm, thần bí. Platôn coi nhận thức chỉ là quá trình 'hồi tưởng' lại của linh hồn về thế giới ý niệm đã có từ trước. Hêghen cho rằng nhận thức là quá trình tự ý thức của tinh thần thế giới.",
        color: "from-blue-50 to-indigo-100 border-indigo-200 text-indigo-850"
      },
      {
        school: "Hoài nghi & Bất khả tri",
        philosophers: "Hium, Cantơ",
        desc: "Hium nghi ngờ khả năng nhận thức của con người, nghi ngờ cả sự tồn tại khách quan của sự vật. Cantơ cho rằng con người chỉ biết hiện tượng bề ngoài, không thể biết bản chất thực sự của đối tượng - 'vật tự nó' (Ding an sich).",
        color: "from-rose-50 to-red-100 border-red-200 text-red-850"
      },
      {
        school: "Chủ nghĩa Duy vật trước Mác",
        philosophers: "Duy vật siêu hình",
        desc: "Thừa nhận khả năng nhận thức phản ánh thế giới. Tuy nhiên, họ hiểu phản ánh chỉ là sự sao chép giản đơn, thụ động, máy móc như soi gương, không có vận động, chưa hiểu vai trò của thực tiễn.",
        color: "from-teal-50 to-emerald-100 border-emerald-200 text-emerald-850"
      }
    ]
  },
  theory: {
    badge: "Mác - Lênin",
    chapterNum: "Chương 2",
    title: "Lý luận Nhận thức Duy vật Biện chứng",
    desc: "Cuộc cách mạng đưa phạm trù Thực tiễn vào làm cơ sở đo lường nhận thức, định nghĩa con đường nhận thức chân lý khách quan.",
    definition: "Nhận thức là sự phản ánh hiện thực khách quan vào bộ óc người; đây không phải sự phản ánh thụ động, giản đơn, mà là một quá trình biện chứng, tích cực, sáng tạo.",
    principles: [
      {
        title: "Thế giới khách quan",
        desc: "Thế giới vật chất tồn tại độc lập với ý thức con người và là đối tượng duy nhất của nhận thức."
      },
      {
        title: "Khả năng nhận thức",
        desc: "Con người có khả năng nhận thức được thế giới. Không có gì là không thể biết, chỉ có những cái chưa biết và sẽ được biết."
      },
      {
        title: "Cơ sở Thực tiễn",
        desc: "Lấy thực tiễn làm cơ sở, động lực, mục đích của nhận thức và là tiêu chuẩn duy nhất để kiểm tra chân lý."
      }
    ],
    dialecticsSteps: [
      {
        step: "01",
        name: "Trực quan sinh động (Nhận thức cảm tính)",
        desc: "Gồm cảm giác, tri giác, biểu tượng. Phản ánh những đặc điểm, thuộc tính bên ngoài, rời rạc, trực tiếp của sự vật hiện tượng khi mới tiếp nhận."
      },
      {
        step: "02",
        name: "Tư duy trừu tượng (Nhận thức lý tính)",
        desc: "Gồm khái niệm, phán đoán, suy lý. Đi sâu bóc tách hiện tượng giả tạo, xâu chuỗi thông tin để phản ánh đúng bản chất, quy luật vận động bên trong."
      },
      {
        step: "03",
        name: "Trở về Thực tiễn (Kiểm nghiệm chân lý)",
        desc: "Đưa tri thức lý tính quay lại kiểm chứng bằng thực tế đời sống để khẳng định chân lý khách quan hoặc phủ định các ảo tưởng sai lầm."
      }
    ]
  },
  truth: {
    badge: "Chân lý",
    chapterNum: "Chương 3",
    title: "Bản chất & 4 Đặc tính cốt lõi của Chân lý",
    desc: "Chân lý là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm.",
    properties: [
      {
        name: "Tính Khách quan",
        keyword: "Độc lập loài người",
        desc: "Chân lý là tri thức phản ánh đúng thực tại khách quan, hoàn toàn không phụ thuộc vào con người và loài người, không phụ thuộc vào lôgic hay lợi ích và quy ước."
      },
      {
        name: "Tính Cụ thể",
        keyword: "Không gian & Thời gian",
        desc: "Không có chân lý trừu tượng chung chung. Chân lý luôn phản ánh sự vật trong điều kiện cụ thể, hoàn cảnh lịch sử cụ thể, không gian và thời gian xác định."
      },
      {
        name: "Tính Tương đối",
        keyword: "Giới hạn lịch sử",
        desc: "Tri thức đúng nhưng chưa hoàn toàn đầy đủ, mới phản ánh đúng một mặt, một bộ phận nào đó của hiện thực khách quan trong điều kiện giới hạn."
      },
      {
        name: "Tính Tuyệt đối",
        keyword: "Tổng số biện chứng",
        desc: "Phản ánh đầy đủ, toàn diện hiện thực khách quan. Chân lý tuyệt đối là tổng số vô hạn của các chân lý tương đối, con người ngày càng tiến gần đến nó."
      }
    ]
  },
  practice: {
    badge: "Thực tiễn",
    chapterNum: "Chương 4",
    title: "Vai trò quyết định của Thực tiễn",
    desc: "Thực tiễn là toàn bộ những hoạt động vật chất - cảm tính, có tính lịch sử - xã hội của con người nhằm cải tạo tự nhiên và xã hội.",
    forms: [
      {
        icon: "🌾",
        name: "Hoạt động Sản xuất vật chất",
        desc: "Hoạt động cơ bản nhất, quyết định sự sinh tồn và phát triển của toàn xã hội loài người."
      },
      {
        icon: "🏛️",
        name: "Hoạt động Chính trị - xã hội",
        desc: "Cải biến các quan hệ xã hội, đấu tranh vì sự công bằng, tự do và tiến bộ con người."
      },
      {
        icon: "🧪",
        name: "Hoạt động Thực nghiệm khoa học",
        desc: "Tạo môi trường nhân tạo đặc biệt để kiểm chứng giả thuyết lý thuyết và phát triển công nghệ."
      }
    ],
    roles: [
      {
        title: "Nguồn gốc & Cơ sở",
        desc: "Thực tiễn cung cấp tài liệu, giác quan mở rộng và đặt ra nhu cầu buộc bộ óc nhận thức của con người hoạt động."
      },
      {
        title: "Mục đích của nhận thức",
        desc: "Nhận thức không phải để cất giữ, mà để quay về định hướng, dẫn đường cho hoạt động thực tiễn cải biến thế giới."
      },
      {
        title: "Tiêu chuẩn kiểm nghiệm chân lý",
        desc: "Tiêu chuẩn khách quan duy nhất. Không thể lấy sự tán thành số đông, hiển nhiên hay sự có lợi trước mắt để kiểm tra đúng sai."
      }
    ]
  },
  digital: {
    badge: "Ứng dụng",
    chapterNum: "Chương 5",
    title: "Nhận thức Chân lý trong Kỷ nguyên số",
    desc: "Trong bối cảnh mạng xã hội bùng nổ, việc con người xác định đúng - sai thường trải qua một quá trình giằng co giữa cảm tính bề ngoài và lý tính sâu sắc, phản ánh đúng con đường biện chứng của nhận thức: \"Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn\".",
    process: [
      {
        phase: "Giai đoạn 1",
        title: "Khi mới tiếp nhận thông tin",
        trap: "Cái bẫy của \"Nhận thức cảm tính\" và Số đông",
        realityLabel: "Thực trạng",
        reality: "Khi mới tiếp cận một xu hướng đầu tư mang lại lợi ích ngay lập tức hoặc một tin giả được hàng triệu lượt chia sẻ, con người chủ yếu tiếp nhận thông qua cảm giác và tri giác bề ngoài (nhìn thấy số đông tung hô, nghe thấy lợi nhuận). Ở giai đoạn trực quan sinh động này, thông tin chưa được phân tích sâu, dẫn đến hiện tượng tâm lý bầy đàn và thiên kiến xác nhận.",
        philosophyLabel: "Nhận định triết học",
        philosophy: "Nhận thức lúc này chỉ mới phản ánh được những đặc điểm bên ngoài, rời rạc của sự vật. Nếu vội vàng đánh giá đây là chân lý chỉ vì nó \"hiển nhiên\", \"được số đông tán thành\" hay \"có lợi trước mắt\", con người đã rơi vào sai lầm của chủ nghĩa duy tâm chủ quan, lầm tưởng hiện tượng bề mặt là bản chất."
      },
      {
        phase: "Giai đoạn 2",
        title: "Đánh giá lại vấn đề",
        trap: "Vai trò của \"Nhận thức lý tính\" và Nguồn thông tin uy tín",
        realityLabel: "Thực trạng",
        reality: "Sau khi sự hào nhoáng ban đầu qua đi hoặc khi xuất hiện những cảnh báo rủi ro, những người có tư duy phản biện bắt đầu thu thập thêm dữ liệu từ các nguồn chính thống, chuyên gia uy tín. Họ phân tích đối chiếu, xâu chuỗi các luồng thông tin để nhìn nhận lại bản chất của sự việc (ví dụ: nhận ra bản chất của dự án là mô hình lừa đảo đa cấp Ponzi).",
        philosophyLabel: "Nhận định triết học",
        philosophy: "Đây là bước chuyển nhảy vọt lên giai đoạn tư duy trừu tượng. Thông qua các khái niệm, phán đoán và suy lý, óc người đã gạt bỏ những hiện tượng giả tạo, ngẫu nhiên do số đông tạo ra để phản ánh đúng những quy luật bên trong, tất yếu của sự vật. Tuy nhiên, nhận thức lý tính dù sâu sắc đến đâu vẫn chưa thể tự nó khẳng định hoàn toàn chân lý."
      },
      {
        phase: "Giai đoạn 3",
        title: "Chốt chặn cuối cùng",
        trap: "\"Thực tiễn\" là tiêu chuẩn kiểm nghiệm chân lý",
        realityLabel: "Vận dụng",
        reality: "Dù đánh giá bằng nhận thức lý tính có logic và dựa trên nhiều nguồn uy tín đến đâu, bước quyết định để xác định chân lý vẫn phải là đưa những nhận định đó quay trở lại kiểm chứng bằng thực tiễn đời sống.",
        philosophyLabel: "Kết quả",
        philosophy: "Khi các mô hình đa cấp sập đổ, những người hùa theo số đông mất trắng tài sản; đó chính là lúc thực tiễn lên tiếng. Thực tiễn đã đập tan ảo tưởng của nhận thức cảm tính, chứng minh rằng sự ủng hộ của đám đông hay lợi ích cục bộ trước mắt tuyệt đối không thể bẻ cong được tính khách quan của chân lý."
      }
    ],
    comparison: {
      headers: ["Tiêu chí", "Niềm tin sai lầm / Ảo giác", "Chân lý Khách quan"],
      rows: [
        ["Cơ sở", "Đồng thuận đám đông, mong muốn chủ quan, lợi ích cá nhân tạm thời", "Phản ánh đúng đắn quy luật vận động khách quan của thế giới"],
        ["Tính chất", "Phụ thuộc hoàn toàn vào ý chí chủ quan, định kiến con người", "Hoàn toàn độc lập với con người, loài người hay sự quy ước số đông"],
        ["Thước đo", "Tính hiển nhiên cảm tính, sự có lợi trước mắt, tính hấp dẫn", "Được kiểm nghiệm khách quan qua hành động thực tiễn sinh động"],
        ["Hệ quả", "Thất bại thảm hại, sụp đổ đau đớn khi va chạm thực tế", "Vững bền trước thời gian, dẫn dắt hành động đi tới thành công thực tế"]
      ]
    }
  }
};

const quizQuestions = [
  {
    id: 1,
    question: "Theo triết học Mác - Lênin, đặc tính nào khẳng định nội dung của chân lý hoàn toàn độc lập, 'không phụ thuộc vào con người và loài người', cũng như không phụ thuộc vào lợi ích hay sự quy ước của đám đông?",
    options: [
      { key: "A", text: "Tính cụ thể" },
      { key: "B", text: "Tính khách quan" },
      { key: "C", text: "Tính tuyệt đối" },
      { key: "D", text: "Tính tương đối" }
    ],
    correct: "B",
    explain: "Tính khách quan khẳng định nội dung chân lý hoàn toàn phản ánh thực tại khách quan và độc lập với con người, loài người hay sự đồng thuận chủ quan."
  },
  {
    id: 2,
    question: "Điền từ còn thiếu vào câu nói nổi tiếng của C. Mác: 'Vấn đề tìm hiểu xem tư duy của con người có thể đạt tới chân lý khách quan không, hoàn toàn không phải là một vấn đề lý luận mà là...'?",
    options: [
      { key: "A", text: "Một vấn đề thực tiễn" },
      { key: "B", text: "Một sự đồng thuận của số đông" },
      { key: "C", text: "Sự cảm nhận chủ quan" },
      { key: "D", text: "Lợi ích trước mắt" }
    ],
    correct: "A",
    explain: "Nguyên văn luận điểm của C. Mác trong Luận cương về Feuerbach nhằm khẳng định thực tiễn là tiêu chuẩn kiểm nghiệm chân lý duy nhất."
  },
  {
    id: 3,
    question: "Theo giáo trình, sai lầm của Chủ nghĩa duy tâm chủ quan (tiêu biểu là Béccơli) là định nghĩa chân lý như thế nào?",
    options: [
      { key: "A", text: "Là quá trình hồi tưởng lại của linh hồn." },
      { key: "B", text: "Là sự sao chép giản đơn, thụ động." },
      { key: "C", text: "Là sự phù hợp giữa suy diễn về sự vật với chính bản thân sự vật trên thực tế." },
      { key: "D", text: "Là sự tự nhận thức của tinh thần thế giới." }
    ],
    correct: "C",
    explain: "Béccơli (Duy tâm chủ quan) cho chân lý là sự phù hợp giữa suy diễn của con người về sự vật với chính bản thân sự vật trên thực tế chủ quan."
  },
  {
    id: 4,
    question: "V.I. Lênin đã khái quát con đường biện chứng của sự nhận thức chân lý theo trình tự nào sau đây?",
    options: [
      { key: "A", text: "Từ tư duy trừu tượng đến thực tiễn, rồi quay lại trực quan sinh động." },
      { key: "B", text: "Từ nhận thức cảm tính đến sự tung hô của số đông." },
      { key: "C", text: "Từ trực quan sinh động đến thực tiễn, bỏ qua tư duy trừu tượng." },
      { key: "D", text: "Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn." }
    ],
    correct: "D",
    explain: "Chu trình biện chứng: Đi từ nhận thức cảm tính (trực quan sinh động) đến nhận thức lý tính (tư duy trừu tượng), rồi quay về phục vụ, kiểm nghiệm tại thực tiễn."
  },
  {
    id: 5,
    question: "Triết học Mác - Lênin khẳng định: 'Không có chân lý trừu tượng, chung chung, chân lý luôn là...'?",
    options: [
      { key: "A", text: "Số đông" },
      { key: "B", text: "Cụ thể" },
      { key: "C", text: "Bất biến" },
      { key: "D", text: "Lợi ích" }
    ],
    correct: "B",
    explain: "Tính cụ thể khẳng định chân lý luôn phản ánh đối tượng trong không gian, thời gian và điều kiện hoàn cảnh cụ thể xác định."
  }
];

const debatesData = [
  {
    question: "Liệu lợi ích trước mắt nó có lợi hoàn toàn cho đám đông là chân lý? Liệu có người đã đạt được lợi ích ban đầu thì có bị che mờ không?",
    answer: "Chân lý KHÔNG đồng nhất với lợi ích chủ quan hay sự đồng thuận của đám đông. Triết học Mác - Lênin khẳng định chân lý có tính khách quan, tức là hoàn toàn độc lập với con người, loài người hay tính có lợi. Dù một tri thức mang lại lợi ích lớn tạm thời (như mô hình Ponzi, đa cấp thu hút đám đông ban đầu), nó đi ngược quy luật khách quan nên sớm muộn cũng bị thực tiễn đập tan. Những người nhận lợi ích ban đầu thường bị thiên kiến xác nhận và cảm tính che mờ mắt, dùng sự có lợi để đo đạc đúng sai thay vì dùng thực tiễn khách quan kiểm chứng."
  },
  {
    question: "Phản biện 1: Cú lừa 'Thực tiễn vs. Số đông'. Thực tiễn do con người tiến hành, vậy thực tiễn khác gì ý kiến số đông?",
    answer: "Sự tán thành của số đông chỉ là trạng thái tâm lý chủ quan, dễ rơi vào ảo giác tập thể. Ngược lại, thực tiễn là 'hoạt động vật chất - cảm tính' cải tạo thế giới. Khi bắt tay vào hành động thực tế, các quy luật vật lý, hóa học, kinh tế khách quan sẽ lên tiếng trực tiếp để kiểm chứng, bất chấp số đông có tán thành chủ quan hay không. Thực tiễn đập tan mọi ảo tưởng tâm lý đám đông."
  },
  {
    question: "Phản biện 2: Bẫy 'Chân lý lỗi thời' (Tính tương đối). Thực tiễn đổi thay, chân lý hôm nay có thể thành sai lầm ngày mai không?",
    answer: "Có, và đó chính là minh chứng cho tính tương đối và tính cụ thể của chân lý. Không có chân lý trừu tượng chung chung, chân lý luôn là cụ thể gắn liền không gian, thời gian xác định. Việc nó không còn đúng ở tương lai không phải do nó là cú lừa, mà vì điều kiện lịch sử đã thay đổi. Nó đòi hỏi chúng ta liên tục tích lũy các 'chân lý tương đối' mới để tiệm cận sâu sắc hơn tới 'chân lý tuyệt đối'."
  },
  {
    question: "Phản biện 3: Bẫy 'Sự thật chưa được kiểm chứng'. Thuyết Nhật tâm của Galileo ban đầu chưa kiểm chứng được thì có là chân lý không?",
    answer: "Nội dung thuyết Nhật tâm đã là chân lý từ trước vì nó phản ánh đúng hiện thực khách quan (tính khách quan độc lập với loài người có nhận thức được nó hay chưa). Tuy nhiên, để con người xác nhận và khẳng định nó chắc chắn là chân lý thì bắt buộc phải chờ hoạt động thực tiễn phát triển (các công cụ viễn vọng, vật lý thiên văn sau này)."
  },
  {
    question: "Phản biện 4: Niềm tin sai lầm có thể thành chân lý nếu có lợi ích vững bền không?",
    answer: "Không bao giờ. Lấy lợi ích làm thước đo chân lý là sai lầm của chủ nghĩa thực dụng (pragmatism). Một niềm tin sai quy luật khách quan có thể mang lại thành công chớp nhoáng, nhưng sớm muộn sẽ vấp phải thực tế khách quan và sụp đổ hoàn toàn. Lợi ích chủ quan không bao giờ bẻ cong được quy luật khách quan."
  }
];

const chatbotFAQ = [
  { q: "Thực tiễn là gì?", a: "Khái niệm và 3 hình thức cơ bản của thực tiễn." },
  { q: "Tại sao đám đông không quyết định chân lý?", a: "Lý giải tính khách quan tối cao của chân lý triết học." },
  { q: "Con đường biện chứng của nhận thức là gì?", a: "Phân tích 3 giai đoạn từ cảm tính đến lý tính và thực tiễn." },
  { q: "Bộ lọc chống tin giả trong Kỷ nguyên số?", a: "Các bước ứng dụng triết học lọc sạch thông tin rác." }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Expanded timelines state
  const [expandedTimeline, setExpandedTimeline] = useState({
    1: true,
    2: false,
    3: false,
    4: false
  });

  // Flip Flashcard states
  const [flippedCard, setFlippedCard] = useState(null);

  // Quiz states
  const [answers, setAnswers] = useState({ 1: null, 2: null, 3: null, 4: null, 5: null });

  // Debates Accordion state
  const [expandedDebate, setExpandedDebate] = useState(null);

  // Toggle philosophy text in Chapter 5
  const [showPhilosophy, setShowPhilosophy] = useState({});

  const togglePhilosophy = (idx) => {
    setShowPhilosophy(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // AI Chatbot state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Xin chào bạn! Tôi là Trợ lý AI Triết học chuyên sâu về Lý luận Nhận thức & Chân lý của bạn. Bạn có thắc mắc gì về mối quan hệ giữa nhận thức và thực tiễn, hoặc cách lọc thông tin đúng đắn trong kỷ nguyên số theo tài liệu giáo trình không?' }
  ]);
  const [userMsg, setUserMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Monitor scroll for progress and active section (Scrollspy)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check which section is in view
      const sections = ['intro', 'theory', 'truth', 'practice', 'digital', 'flashcard', 'quiz', 'debates', 'chatbot'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Adjust for sticky navigation height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Bot logic
  const handleSendMessage = (textToSend = '') => {
    const text = textToSend || userMsg;
    if (!text.trim() || isTyping) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setUserMsg('');
    setIsTyping(true);

    // AI logic response simulation
    setTimeout(() => {
      let reply = "Tôi đã ghi nhận câu hỏi của bạn. Theo Triết học Mác - Lênin, mọi nhận thức đều xuất phát từ thực tiễn và quay về phục vụ thực tiễn. Bạn có thể làm rõ thêm khía cạnh bạn đang quan tâm không?";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('thực tiễn là gì') || lowerText.includes('khái niệm thực tiễn')) {
        reply = "Thực tiễn là toàn bộ những hoạt động vật chất - cảm tính, có tính lịch sử - xã hội của con người nhằm cải tạo tự nhiên và xã hội phục vụ con người. Nó gồm 3 hình thức cơ bản: Hoạt động sản xuất vật chất (quyết định nhất), Hoạt động chính trị - xã hội, và Hoạt động thực nghiệm khoa học.";
      } else if (lowerText.includes('chân lý') || lowerText.includes('chan ly')) {
        reply = "Chân lý là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm. Nó có 4 đặc tính cốt lõi: Tính khách quan (luôn độc lập với con người, loài người hay quy ước), Tính cụ thể (gắn liền không gian, thời gian và hoàn cảnh lịch sử cụ thể), Tính tương đối (chưa đầy đủ toàn diện ở giai đoạn giới hạn), và Tính tuyệt đối (tổng số biện chứng của các chân lý tương đối).";
      } else if (lowerText.includes('bẫy số đông') || lowerText.includes('dam dong') || lowerText.includes('đám đông')) {
        reply = "Chân lý có tính khách quan, nghĩa là nội dung phản ánh khách quan hoàn toàn độc lập với con người và loài người. Sự chấp nhận hay đồng thuận của đám đông KHÔNG phải là tiêu chuẩn đo lường chân lý. Thước đo duy nhất và khách quan của chân lý chính là Thực tiễn kiểm nghiệm!";
      } else if (lowerText.includes('kỷ nguyên số') || lowerText.includes('tin giả') || lowerText.includes('không gian mạng')) {
        reply = "Trong bối cảnh mạng xã hội bùng nổ, quá trình con người đánh giá thông tin và xác định chân lý trong kỷ nguyên số gồm 3 giai đoạn biện chứng:\n\n" +
          "1. Giai đoạn 1 (Khi mới tiếp nhận thông tin): Tránh cái bẫy của nhận thức cảm tính và số đông. Nhận thức cảm tính chỉ phản ánh bề ngoài, dễ rơi vào tâm lý bầy đàn.\n\n" +
          "2. Giai đoạn 2 (Đánh giá lại vấn đề): Vai trò của nhận thức lý tính và nguồn thông tin uy tín. Dùng tư duy phản biện để bóc tách hiện tượng giả tạo, hướng tới quy luật tất yếu.\n\n" +
          "3. Giai đoạn 3 (Chốt chặn cuối cùng): Đưa nhận định quay lại kiểm chứng bằng Thực tiễn khách quan - đây là tiêu chuẩn duy nhất của chân lý, đập tan mọi ảo tưởng của nhận thức cảm tính.";
      } else if (lowerText.includes('con đường biện chứng') || lowerText.includes('lenin') || lowerText.includes('lênin')) {
        reply = "V.I. Lênin đúc kết con đường biện chứng cực kì chuẩn xác: 'Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn'. Đây là vòng tuần hoàn vô hạn giúp nhận thức của con người ngày càng tiệm cận sâu sắc tới chân lý tuyệt đối.";
      } else if (lowerText.includes('galileo') || lowerText.includes('nhật tâm')) {
        reply = "Thuyết Nhật tâm của Galileo ban đầu bị toàn bộ xã hội phản đối và chưa có thiết bị để kiểm chứng thực tiễn. Nhưng nó đã luôn là chân lý vì nội dung của nó phản ánh đúng hiện thực khách quan (tính khách quan của chân lý không phụ thuộc vào việc loài người đã nhận thức được nó hay chưa). Để con người xác nhận được nó, cần sự phát triển của thực tiễn.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-850 antialiased selection:bg-red-500 selection:text-white">
      
      {/* Scroll Progress Bar at very top */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-amber-500 z-50 transition-all duration-100 shadow-sm" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ================= HERO SECTION (bg-red-gradient) ================= */}
      <section className="relative min-h-screen bg-red-gradient overflow-hidden flex flex-col items-center justify-center text-white px-4">
        
        {/* Sphere lights */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[700px] h-[300px] sm:h-[700px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[600px] h-[250px] sm:h-[600px] bg-black/15 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Artistic decorated images at sides matching mln111-tan */}
        <div className="absolute left-0 bottom-0 h-[70%] w-[340px] pointer-events-none select-none hidden xl:block" style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}>
          <img 
            src="/assets/image3.png" 
            alt="Left Side Decoration" 
            className="h-full w-full object-cover object-top filter grayscale contrast-[0.95] brightness-[0.55] mix-blend-mode-luminosity opacity-40 hover:opacity-50 transition-opacity duration-750" 
          />
        </div>

        <div className="absolute right-0 bottom-0 h-[70%] w-[340px] pointer-events-none select-none hidden xl:block" style={{
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}>
          <img 
            src="/assets/image18.png" 
            alt="Right Side Decoration" 
            className="h-full w-full object-cover object-top filter grayscale contrast-[0.95] brightness-[0.55] mix-blend-mode-luminosity opacity-40 hover:opacity-50 transition-opacity duration-750" 
          />
        </div>

        {/* Lưới tọa độ chìm */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        {/* Small floating glowing stars matching target style */}
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-1.5 h-1.5 top-[15%] left-[8%] animate-ping"></div>
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-1 h-1 top-[25%] left-[18%]"></div>
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-2 h-2 top-[60%] left-[5%] animate-pulse"></div>
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-1.5 h-1.5 top-[75%] left-[14%]"></div>
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-1.5 h-1.5 top-[12%] right-[10%]"></div>
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-1 h-1 top-[30%] right-[6%] animate-ping"></div>
        <div className="absolute rounded-full bg-white/25 pointer-events-none w-2 h-2 top-[55%] right-[8%] animate-pulse"></div>
        <div className="absolute rounded-full bg-white/20 pointer-events-none w-1.5 h-1.5 top-[80%] right-[15%]"></div>

        {/* Diagonal lines decoration */}
        <div className="absolute bg-white/10 pointer-events-none top-[20%] left-[3%] w-10 h-[1.5px] rotate-[45deg]"></div>
        <div className="absolute bg-white/10 pointer-events-none top-[70%] left-[10%] w-7 h-[1.5px] -rotate-[30deg]"></div>
        <div className="absolute bg-white/10 pointer-events-none top-[35%] right-[4%] w-12 h-[1.5px] -rotate-[45deg]"></div>
        <div className="absolute bg-white/10 pointer-events-none top-[65%] right-[12%] w-9 h-[1.5px] rotate-[20deg]"></div>

        {/* Hero Content Area */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full space-y-8">
          
          {/* Badge */}
          <div className="flex items-center justify-center gap-3 animate-float">
            <div className="h-[1.5px] w-12 bg-white/30"></div>
            <span className="inline-flex h-6 items-center justify-center rounded-full border border-white/25 bg-white/15 px-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm gap-1.5 hover:bg-white/25 transition-colors cursor-default">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Lý luận nhận thức & Chân lý
            </span>
            <div className="h-[1.5px] w-12 bg-white/30"></div>
          </div>

          {/* Rotating Búa Liềm Symbol with radial gears */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border border-white/10 animate-spin-slow" style={{
              backgroundImage: 'repeating-conic-gradient(transparent 0deg, transparent 20deg, rgba(255,255,255,0.06) 20deg, rgba(255,255,255,0.06) 21deg)'
            }}></div>
            <div className="absolute w-20 h-20 rounded-full border border-white/15 animate-spin-reverse"></div>
            <span className="relative text-7xl font-black text-white/90 select-none leading-none animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">☭</span>
          </div>

          {/* Epic Main Titles */}
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-5 leading-tight tracking-tight drop-shadow-sm uppercase">
            LÝ LUẬN NHẬN THỨC <br />
            <span className="text-red-200">VÀ CHÂN LÝ</span>
          </h1>

          {/* Aesthetic Center Line */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1.5px] w-16 bg-white/25"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="h-[1.5px] w-16 bg-white/25"></div>
          </div>

          {/* Descriptions */}
          <p className="text-xl sm:text-2xl text-red-100 mb-3 max-w-3xl mx-auto font-light">
            Khoa học lý luận Mác - Lênin ứng dụng thực tiễn Kỷ nguyên số
          </p>
          <p className="text-red-200/80 text-sm max-w-2xl mx-auto">
            Trình bày hệ thống, biện chứng mối quan hệ giữa Nhận thức - Chân lý - Thực tiễn, đập tan mọi bẫy ảo tưởng đám đông và lợi ích tức thời
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => scrollToSection('intro')}
              className="px-8 py-4 bg-white text-red-800 rounded-full font-bold text-lg hover:bg-red-50 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
            >
              Khám phá ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('quiz')}
              className="px-8 py-4 bg-transparent text-white border-2 border-white/40 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Làm bài Quiz
            </button>
          </div>

          {/* Under Quote Panel */}
          <div className="mx-auto max-w-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
            <p className="text-red-100/90 text-sm italic leading-relaxed">
              &quot;Triết học không chỉ giải thích thế giới theo nhiều cách khác nhau, điều quan trọng là phải thay đổi nó.&quot;
            </p>
            <p className="text-white/40 text-[10px] uppercase tracking-wider mt-2">— Karl Marx, Luận cương về Feuerbach</p>
          </div>

          {/* Counters matching target style */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-14 pt-4 text-white/95">
            <div className="text-center flex flex-col items-center gap-1 group cursor-pointer" onClick={() => scrollToSection('intro')}>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1 group-hover:bg-white/20 transition-colors">
                <BookOpen className="w-5 h-5 text-red-200" />
              </div>
              <div className="text-2xl font-bold">05</div>
              <div className="text-red-200/80 text-xs uppercase tracking-wider">Chương học</div>
            </div>
            <div className="text-center flex flex-col items-center gap-1 group cursor-pointer" onClick={() => scrollToSection('quiz')}>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1 group-hover:bg-white/20 transition-colors">
                <Trophy className="w-5 h-5 text-red-200" />
              </div>
              <div className="text-2xl font-bold">05</div>
              <div className="text-red-200/80 text-xs uppercase tracking-wider">Câu hỏi Quiz</div>
            </div>
            <div className="text-center flex flex-col items-center gap-1 group cursor-pointer" onClick={() => scrollToSection('chatbot')}>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1 group-hover:bg-white/20 transition-colors">
                <Bot className="w-5 h-5 text-red-200" />
              </div>
              <div className="text-2xl font-bold">AI</div>
              <div className="text-red-200/80 text-xs uppercase tracking-wider">AI Chatbot</div>
            </div>
          </div>

        </div>

      </section>

      {/* ================= STICKY TABS NAVIGATION ================= */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2.5 scrollbar-none items-center">
            
            {/* Logo */}
            <div className="pr-4 border-r border-slate-200 font-extrabold text-sm text-red-700 select-none flex items-center gap-1.5 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-lg">☭</span> TRANG CHỦ
            </div>

            {/* Menu Items */}
            {[
              { id: 'intro', label: 'Bẫy Nhận Thức', icon: ShieldAlert },
              { id: 'theory', label: 'Lý Luận Mác-Lênin', icon: BrainCircuit },
              { id: 'truth', label: 'Bản Chất Chân Lý', icon: Compass },
              { id: 'practice', label: 'Vai Trò Thực Tiễn', icon: Zap },
              { id: 'digital', label: 'Kỷ Nguyên Số', icon: Cpu },
              { id: 'flashcard', label: 'Flashcard 3D', icon: Layers },
              { id: 'quiz', label: 'Đố Vui', icon: Trophy },
              { id: 'debates', label: 'Phản Biện Lớp', icon: HelpCircle },
              { id: 'chatbot', label: 'Chatbot AI', icon: Bot },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-red-gradient rounded-xl -z-10 shadow-sm shadow-red-700/25"></div>
                  )}
                  <Icon className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT SECTION (cuộn SPA dài) ================= */}
      <main className="max-w-7xl mx-auto px-4 py-16 w-full space-y-32">

        {/* ================= CHAPTER 1: INTRO & BẪY NHẬN THỨC ================= */}
        <section id="intro" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Chương 1
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Thực trạng & Hai cái bẫy Nhận thức
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Mỗi ngày trên mạng xã hội, chúng ta bị bủa vây bởi hàng ngàn luồng thông tin đa chiều. Đứng trước sự hỗn loạn này, con người rất dễ sa bẫy tâm lý chủ quan.
            </p>
          </div>

          {/* Traps Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chaptersData.intro.traps.map((trap, idx) => (
              <div key={idx} className="card-hover bg-gradient-to-br from-red-50 to-red-100 border border-red-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-md shadow-red-600/10">
                    {trap.icon}
                  </div>
                  <h3 className="text-lg font-bold text-red-950">{trap.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trap.desc}</p>
                </div>
                <div className="pt-2 border-t border-red-200/30 flex items-center text-xs font-bold text-red-700 hover:text-red-900 cursor-pointer" onClick={() => scrollToSection('digital')}>
                  <span>Giải pháp Mác - Lênin</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Red blockquote matching target website */}
          <div className="bg-red-gradient rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-red-800/10">
            <div className="text-8xl font-serif absolute -top-4 left-4 opacity-15 select-none">&quot;</div>
            <blockquote className="relative z-10 space-y-4">
              <p className="text-lg sm:text-xl italic font-light leading-relaxed">
                &quot;Thực tiễn qua sự sụp đổ của vô số mô hình lừa đảo tài chính đa cấp, trào lưu phản khoa học chứng minh: đám đông và lợi ích tức thời không bảo chứng cho sự thật.&quot;
              </p>
              <footer className="font-semibold text-red-200/90 text-sm flex items-center gap-1.5">
                <Info className="w-4 h-4" /> 
                — Đâu là bộ lọc chuẩn xác để phân định Đúng - Sai?
              </footer>
            </blockquote>
          </div>

          {/* Historical Philosophy timeline matching target website */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-slate-800">Lịch sử phát triển Tư tưởng Nhận thức</h3>
            <div className="relative">
              
              {/* Vertical timeline line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-red-100 hidden md:block"></div>

              <div className="space-y-8">
                {chaptersData.intro.historicalSchools.map((school, idx) => {
                  const isLeft = idx % 2 === 0;
                  const isExpanded = expandedTimeline[idx + 1];
                  return (
                    <div key={idx} className="relative flex flex-col md:flex-row items-stretch md:items-center w-full">
                      
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-white shadow-md z-10 hidden md:block transition-all duration-300 bg-red-600 scale-110"></div>

                      {/* Left container */}
                      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-10 md:text-right flex justify-end' : 'md:pl-10 order-last flex justify-start'}`}>
                        <div className={`w-full max-w-xl rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                          isExpanded 
                            ? 'border-red-300 bg-red-50/70' 
                            : 'border-slate-200 bg-white'
                        }`}>
                          <div className="p-5 space-y-3 cursor-pointer" onClick={() => setExpandedTimeline(prev => ({ ...prev, [idx+1]: !prev[idx+1] }))}>
                            <div className="flex items-center justify-between gap-2">
                              <span className={`inline-flex px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                                isExpanded ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {school.philosophers}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-red-600' : ''}`} />
                            </div>
                            <h4 className={`font-bold text-base ${isExpanded ? 'text-red-950' : 'text-slate-800'}`}>{school.school}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{school.desc}</p>
                          </div>
                          
                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-red-200/40 pt-4 bg-red-50/40 text-left">
                              <h5 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Đặc điểm & Hạn chế lớn</h5>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {idx === 0 && "Bản chất: Sự vật chỉ là phức hợp cảm giác con người. Hạn chế: Rơi vào duy tâm chủ quan, phủ nhận tính khách quan thực sự của thế giới bên ngoài, biến chân lý thành thứ tùy tiện thuộc tâm lý cá nhân."}
                                {idx === 1 && "Bản chất: Platôn coi nhận thức là hồi tưởng ý niệm linh hồn; Hêghen coi là tinh thần thế giới tự ý thức. Hạn chế: Thần bí hóa tri thức, tách rời lý luận khỏi hoạt động vật chất cảm tính của con người."}
                                {idx === 2 && "Bản chất: Hium nghi ngờ sự tồn tại của vật thể; Cantơ bảo con người không thể biết bản chất 'vật tự nó'. Hạn chế: Bất khả tri, phủ nhận năng lực nắm bắt quy luật khách quan của trí tuệ loài người."}
                                {idx === 3 && "Bản chất: Thừa nhận thế giới khách quan phản ánh vào óc. Hạn chế: Coi phản ánh là chụp ảnh thụ động, siêu hình máy móc, hoàn toàn không thấy năng động sáng tạo và vai trò cốt lõi của thực tiễn."}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right empty placeholder container for large screens to balance layout */}
                      <div className="hidden md:block w-1/2"></div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </section>

        {/* ================= CHAPTER 2: LÝ LUẬN NHẬN THỨC MÁC-LÊNIN ================= */}
        <section id="theory" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Chương 2
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Lý luận Nhận thức Duy vật Biện chứng
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Định nghĩa con đường khoa học của nhận thức chân lý khách quan. Đưa Thực tiễn trở thành trục xoay trung tâm của tri thức.
            </p>
          </div>

          {/* Cards 3-Columns grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chaptersData.theory.principles.map((pr, idx) => (
              <div key={idx} className="card-hover bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-red-950">{pr.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{pr.desc}</p>
                </div>
                <div className="pt-2 border-t border-red-200/30 text-xs font-semibold text-slate-400">
                  Nguyên lý triết học
                </div>
              </div>
            ))}
          </div>

          {/* Lenin Quote Box */}
          <div className="bg-red-gradient text-white rounded-3xl p-8 relative overflow-hidden shadow-lg shadow-red-800/10">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-4 max-w-4xl">
              <span className="text-red-200 font-extrabold text-xs uppercase tracking-wider">Luận điểm kinh điển</span>
              <p className="text-lg sm:text-xl italic font-light leading-relaxed">
                &quot;Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn - đó là con đường biện chứng của sự nhận thức thực tại khách quan.&quot;
              </p>
              <footer className="font-semibold text-red-200/90 text-sm">— V.I. Lênin</footer>
            </div>
          </div>

          {/* Biện chứng steps grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-slate-800">Chu trình 3 bước nhận thức chân lý</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chaptersData.theory.dialecticsSteps.map((st, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-3 card-hover">
                  <div className="w-10 h-10 bg-red-100 text-red-700 font-extrabold rounded-full flex items-center justify-center text-sm">
                    {st.step}
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">{st.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ================= CHAPTER 3: ĐẶC TÍNH CỦA CHÂN LÝ ================= */}
        <section id="truth" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Chương 3
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Bản chất & 4 Đặc tính của Chân lý
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Chân lý không phải là thứ thuộc về số đông hay niềm tin chủ quan. Nó là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm.
            </p>
          </div>

          {/* Truth Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {chaptersData.truth.properties.map((prop, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5 card-hover">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-rose-50 text-red-600 rounded-xl flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{prop.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wider">
                    {prop.keyword}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">{prop.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-400 font-semibold select-none">
                  Thuộc tính {idx + 1}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ================= CHAPTER 4: VAI TRÒ CỦA THỰC TIỄN ================= */}
        <section id="practice" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Chương 4
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Sức mạnh & Vai trò của Thực tiễn
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Thực tiễn là toàn bộ hoạt động vật chất cảm tính của con người. Thực tiễn đóng vai trò quyết định, là nguồn gốc phát sinh và thước đo cuối cùng của nhận thức.
            </p>
          </div>

          {/* 3 Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chaptersData.practice.forms.map((form, idx) => (
              <div key={idx} className="card-hover bg-gradient-to-br from-red-50 to-orange-50 border border-orange-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-xl">
                    {form.icon}
                  </div>
                  <h3 className="text-lg font-bold text-red-950">{form.name}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{form.desc}</p>
                </div>
                <div className="pt-2 border-t border-orange-200/35 text-xs font-bold text-orange-700">
                  Hình thức {idx + 1}
                </div>
              </div>
            ))}
          </div>

          {/* C.Mác Quote Box */}
          <div className="bg-red-gradient text-white rounded-3xl p-8 relative overflow-hidden shadow-lg shadow-red-800/10">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-4 max-w-4xl">
              <span className="text-red-200 font-extrabold text-xs uppercase tracking-wider">Luận cương vĩ đại</span>
              <p className="text-lg sm:text-xl italic font-light leading-relaxed">
                &quot;Vấn đề tìm hiểu xem tư duy của con người có thể đạt tới chân lý khách quan không, hoàn toàn không phải là một vấn đề lý luận mà là một vấn đề thực tiễn.&quot;
              </p>
              <footer className="font-semibold text-red-200/90 text-sm">— C. Mác</footer>
            </div>
          </div>

          {/* 3 Decisive Roles */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-slate-800">Vai trò quyết định của Thực tiễn đối với Nhận thức</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chaptersData.practice.roles.map((role, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-3 card-hover">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-red-600">Quy tắc {idx+1}</span>
                  <h4 className="font-bold text-slate-800 text-base">{role.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{role.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ================= CHAPTER 5: KỶ NGUYÊN SỐ & PHÂN BIỆT CHÂN LÝ ================= */}
        <section id="digital" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Chương 5
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Nhận thức Chân lý trong Kỷ nguyên số
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
              Trong bối cảnh mạng xã hội bùng nổ, việc con người xác định đúng - sai thường trải qua một quá trình giằng co giữa cảm tính bề ngoài và lý tính sâu sắc, phản ánh đúng con đường biện chứng của nhận thức: <strong className="text-red-700 font-bold">&quot;Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn&quot;</strong>.
            </p>
          </div>

          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chaptersData.digital.process.map((pr, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 card-hover transition-all duration-300 hover:shadow-md" style={{
                borderTop: `4px solid ${idx === 0 ? '#dc2626' : idx === 1 ? '#eab308' : '#10b981'}`
              }}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      idx === 0 ? 'bg-red-50 text-red-700' : idx === 1 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {pr.phase}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base leading-snug">{pr.title}</h4>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{pr.trap}</div>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="space-y-1">
                      <span className={`text-xs font-extrabold uppercase tracking-wider ${
                        idx === 0 ? 'text-red-600' : idx === 1 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>{pr.realityLabel}:</span>
                      <p className="text-gray-600 text-sm leading-relaxed">{pr.reality}</p>
                    </div>
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => togglePhilosophy(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                          showPhilosophy[idx]
                            ? 'bg-slate-150 text-slate-800 border border-slate-200'
                            : 'bg-red-50/50 text-red-700 hover:bg-red-50 border border-dashed border-red-200'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          💡 {pr.philosophyLabel}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          showPhilosophy[idx] ? 'rotate-180 text-slate-500' : 'text-red-500'
                        }`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        showPhilosophy[idx] 
                          ? 'max-h-72 opacity-100 mt-2' 
                          : 'max-h-0 opacity-0 pointer-events-none'
                      }`}>
                        <div className="p-3 bg-slate-50/60 border border-slate-100 rounded-xl">
                          <p className="text-gray-600 text-sm leading-relaxed italic">{pr.philosophy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bảng so sánh */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 overflow-hidden">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-800">Đối chiếu: Niềm tin sai lầm (Ảo giác) & Chân lý khách quan</h3>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1">Giúp phân biệt chân lý với những niềm tin giả tạo</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    {chaptersData.digital.comparison.headers.map((h, idx) => (
                      <th key={idx} className="px-6 py-4 text-left text-sm font-bold text-slate-700 tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {chaptersData.digital.comparison.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">
                        {row[0]}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">
                        {row[1]}
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-600 font-medium">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Solutions box matching docx section 4 */}
          <div className="bg-slate-100/70 border border-slate-200/50 rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-red-950">Giải pháp & Bài học thực tiễn</h3>
              <p className="text-slate-500 text-sm">Các nguyên tắc rút ra từ thực tế vận động xã hội số</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200/40">
                <h4 className="font-bold text-red-700 text-sm uppercase tracking-wider mb-2">Trường hợp 1: Nhận thức bị bóp méo bởi &quot;Số đông&quot;</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong>Ví dụ:</strong> Tin giả giật gân, các phương pháp tự chữa bệnh phản khoa học tràn lan mạng xã hội. Con người vì sợ bị cô lập thường hùa theo ảo giác tập thể.
                  <br />
                  <strong className="text-emerald-700">Bài học hành động:</strong> Chân lý mang tính khách quan tuyệt đối, hoàn toàn độc lập với lợi ích hay sự quy ước của đám đông. Đừng bao giờ hùa theo một quan điểm chỉ vì &quot;ai cũng nói vậy&quot;, hãy giữ tư duy độc lập.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200/40">
                <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wider mb-2">Trường hợp 2: Nhận thức bị thao túng bởi &quot;Lợi ích trước mắt&quot;</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong>Ví dụ:</strong> Bẫy đầu tư Ponzi đa cấp, coin rác thổi phồng lợi nhuận. Lòng tham tạo ra &quot;thiên kiến xác nhận&quot; che mờ quy luật kinh tế.
                  <br />
                  <strong className="text-emerald-700">Bài học hành động:</strong> Tuyệt đối không lấy sự có lợi/có ích làm thước đo đúng sai của tri thức. Mọi quyết định học tập, nghề nghiệp hay đầu tư phải dựa trên việc phân tích các quy luật khách quan của thực tế.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200/40">
                <h4 className="font-bold text-emerald-700 text-sm uppercase tracking-wider mb-2">Trường hợp 3: Vội vàng kết luận mà bỏ qua &quot;Kiểm chứng&quot;</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong>Hệ quả:</strong> Mất mát tài sản, hậu quả nhãn tiền chỉ bộc lộ khi thực tế va chạm.
                  <br />
                  <strong className="text-emerald-700">Bài học hành động (Liên hệ bản thân):</strong> Bất kỳ tri thức, ý tưởng, code tìm được trên mạng đều chỉ là &quot;giả thuyết&quot;. Bản thân phải tự bắt tay vào thực hành, &quot;chạy thử&quot; (test). Kết quả thực hành đó mới là câu trả lời cuối cùng xác minh chân lý.
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* ================= SECTION 6: FLASHCARDS 3D ================= */}
        <section id="flashcard" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Flashcard 3D
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Thẻ học nhanh 4 Đặc tính Chân lý
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Nhấp chuột trực tiếp lên mỗi thẻ để lật xoay 3D khám phá nội dung định nghĩa cốt lõi của các tính chất Chân lý.
            </p>
          </div>

          {/* Grid Cards 3D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chaptersData.truth.properties.map((prop, idx) => {
              const isFlipped = flippedCard === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setFlippedCard(isFlipped ? null : idx)}
                  className="flip-card h-64 w-full cursor-pointer group"
                >
                  <div className={`flip-card-inner relative w-full h-full text-center transition-transform duration-500 rounded-3xl shadow-sm border border-slate-200/60 ${isFlipped ? 'flipped' : ''}`} style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}>
                    
                    {/* Front Side */}
                    <div className="flip-card-front absolute inset-0 bg-white rounded-3xl p-6 flex flex-col justify-between items-center bg-gradient-to-br from-white to-slate-50">
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform duration-300">
                        <Compass className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-slate-800">{prop.name}</h4>
                        <span className="inline-block text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{prop.keyword}</span>
                      </div>
                      <div className="text-xs font-semibold text-red-600 flex items-center gap-1">
                        <span>Nhấp để lật</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back absolute inset-0 bg-red-950 text-white rounded-3xl p-6 flex flex-col justify-between items-center">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-red-400">Định nghĩa triết học</span>
                      <p className="text-sm leading-relaxed text-red-100">{prop.desc}</p>
                      <button className="text-xs text-red-300 font-semibold hover:underline">Quay lại</button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ================= SECTION 7: INTERACTIVE QUIZ ================= */}
        <section id="quiz" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Đố Vui
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Trắc nghiệm 5 Câu hỏi Giáo trình (MLN111)
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Kiểm nghiệm tính đúng đắn của tri thức bạn vừa học được qua các câu hỏi chuẩn học thuật.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quizQuestions.map((qz) => {
              const selectedOpt = answers[qz.id];
              return (
                <div key={qz.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-5">
                  
                  {/* Title Question */}
                  <div className="flex gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {qz.id}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                      {qz.question}
                    </h3>
                  </div>

                  {/* List Choices */}
                  <div className="flex flex-col gap-2.5">
                    {qz.options.map((opt) => {
                      const isSelected = selectedOpt === opt.key;
                      const isCorrectOpt = opt.key === qz.correct;
                      
                      let cardStyle = 'border-slate-200/80 hover:bg-slate-50 hover:border-slate-300';
                      let letterStyle = 'bg-slate-100 text-slate-600';

                      if (selectedOpt) {
                        if (isSelected) {
                          if (isCorrectOpt) {
                            cardStyle = 'border-emerald-500 bg-emerald-50/50';
                            letterStyle = 'bg-emerald-500 text-white';
                          } else {
                            cardStyle = 'border-red-500 bg-red-50/50';
                            letterStyle = 'bg-red-500 text-white';
                          }
                        } else if (isCorrectOpt) {
                          cardStyle = 'border-emerald-300 bg-emerald-50/20';
                          letterStyle = 'bg-emerald-500/20 text-emerald-700';
                        }
                      }

                      return (
                        <div
                          key={opt.key}
                          onClick={() => !selectedOpt && setAnswers(prev => ({ ...prev, [qz.id]: opt.key }))}
                          className={`border rounded-xl p-3 flex items-center gap-3 transition-all duration-300 cursor-pointer ${cardStyle}`}
                        >
                          <div className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-xs flex-shrink-0 transition-colors ${letterStyle}`}>
                            {opt.key}
                          </div>
                          <span className="text-xs font-semibold text-slate-700 leading-snug">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {selectedOpt && (
                    <div className={`p-3.5 rounded-xl flex items-start gap-2.5 border text-xs ${
                      selectedOpt === qz.correct 
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800' 
                        : 'bg-red-50/50 border-red-200 text-red-800'
                    }`}>
                      {selectedOpt === qz.correct ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
                      )}
                      <div className="leading-relaxed">
                        <strong className="block mb-0.5">
                          {selectedOpt === qz.correct ? "Lựa chọn chính xác!" : "Lựa chọn chưa chính xác."}
                        </strong>
                        {qz.explain}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Reset quiz button */}
          {Object.values(answers).some(a => a !== null) && (
            <div className="text-center">
              <button 
                onClick={() => setAnswers({ 1: null, 2: null, 3: null, 4: null, 5: null })}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/60 rounded-xl font-bold text-sm transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Làm lại đố vui
              </button>
            </div>
          )}

        </section>

        {/* ================= SECTION 8: DEBATES QUESTIONS (Q&A Phản biện) ================= */}
        <section id="debates" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Phản Biện Lớp
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Góc Phản Biện Chuyên Sâu & Đỡ Đòn Q&A
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Trang bị lý luận sắc bén chống lại các câu hỏi phản biện hiểm hóc nhất từ giảng viên và khán giả về chủ đề Chân lý.
            </p>
          </div>

          {/* Debates Accordion List matching docx */}
          <div className="max-w-4xl mx-auto space-y-4">
            {debatesData.map((deb, idx) => {
              const isExpanded = expandedDebate === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-red-300 shadow-md bg-red-50/20' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Title Bar */}
                  <div 
                    onClick={() => setExpandedDebate(isExpanded ? null : idx)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs flex-shrink-0 ${
                        isExpanded ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className={`text-sm sm:text-base font-bold ${isExpanded ? 'text-red-950' : 'text-slate-800'}`}>
                        {deb.question}
                      </h4>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-red-600' : ''}`} />
                  </div>

                  {/* Body Content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-3 border-t border-red-200/40 text-left bg-red-50/10">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-red-700 block mb-2">
                        🔥 Vũ khí lý luận đỡ đòn
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {deb.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </section>

        {/* ================= SECTION 9: AI CHATBOT ================= */}
        <section id="chatbot" className="scroll-mt-24 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex h-5 w-fit items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              Chatbot AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-red tracking-tight">
              Tương tác với AI Triết học Mác-Lênin
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Hệ thống giả lập Chatbot thông minh giúp tháo gỡ mọi khúc mắc, định lý sâu sắc liên quan đến nhận thức, chân lý và thực tiễn.
            </p>
          </div>

          {/* Chat Container */}
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row items-stretch h-[600px] border-red-100">
            
            {/* Left FAQs sidebar */}
            <div className="md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  Câu hỏi triết học mẫu
                </h3>
                <div className="flex flex-col gap-2">
                  {chatbotFAQ.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(faq.q)}
                      disabled={isTyping}
                      className="text-left p-3 rounded-xl border border-slate-200/80 bg-white hover:bg-red-50 hover:border-red-200 text-xs font-semibold text-slate-700 leading-snug transition-all duration-300 hover:text-red-800 disabled:opacity-50"
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200 text-slate-400 text-xs text-center font-medium">
                Mô phỏng Tư duy Biện chứng
              </div>
            </div>

            {/* Right Chat logs display */}
            <div className="md:w-2/3 flex flex-col h-full bg-slate-100/30">
              
              {/* Top chat bar */}
              <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/10">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-none">Marxist Philo-AI</h4>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Trực tuyến
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Trò chuyện lý luận
                </div>
              </div>

              {/* Message scroll log */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4 flex flex-col scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white self-end rounded-tr-none'
                        : 'bg-white text-slate-700 border border-slate-200/80 self-start rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-400 self-start animate-pulse flex items-center gap-1.5">
                    <Bot className="w-4 h-4 animate-spin text-red-600" />
                    <span>AI Triết học đang liên kết lý luận...</span>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Message Input box */}
              <div className="p-4 bg-white border-t border-slate-200">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={userMsg}
                    onChange={(e) => setUserMsg(e.target.value)}
                    placeholder="Đặt câu hỏi về Thực tiễn, Chân lý..."
                    disabled={isTyping}
                    className="flex-grow px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!userMsg.trim() || isTyping}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 shadow-sm shadow-red-600/10 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER matches target website exactly ================= */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-14 px-4 mt-20 relative overflow-hidden">
        {/* Glow backdrop decoration */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              <span className="text-red-500">☭</span> LÝ LUẬN NHẬN THỨC
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Ứng dụng web tương tác học tập cao cấp về chuyên đề &quot;Lý luận Nhận thức và Chân lý&quot; thuộc học phần Triết học Mác - Lênin. Hướng tới xây dựng bộ lọc tri thức đúng đắn và nâng tầm tư duy phản biện trong Kỷ nguyên số.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-red-500">Mục lục Chương</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <span onClick={() => scrollToSection('intro')} className="hover:text-white cursor-pointer transition-colors">Bẫy Nhận Thức</span>
              <span onClick={() => scrollToSection('theory')} className="hover:text-white cursor-pointer transition-colors">Lý Luận Mác-Lênin</span>
              <span onClick={() => scrollToSection('truth')} className="hover:text-white cursor-pointer transition-colors">Bản Chất Chân Lý</span>
              <span onClick={() => scrollToSection('practice')} className="hover:text-white cursor-pointer transition-colors">Vai Trò Thực Tiễn</span>
              <span onClick={() => scrollToSection('digital')} className="hover:text-white cursor-pointer transition-colors">Ứng Dụng Số</span>
              <span onClick={() => scrollToSection('quiz')} className="hover:text-white cursor-pointer transition-colors">Trắc Nghiệm</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-red-500">Luận cương về Thực tiễn</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 italic leading-relaxed">
              &quot;Lý thuyết chỉ là màu xám xịt, còn cây đời mãi mãi xanh tươi. Hãy luôn kiểm nghiệm mọi tri thức bằng chính hành động thực tiễn vững bền.&quot;
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} Lý luận Nhận thức và Chân lý. Phát triển chuyên sâu cùng Triết học Mác - Lênin.
        </div>
      </footer>

    </div>
  );
}
