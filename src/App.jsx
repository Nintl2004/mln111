import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  ExternalLink,
  FileSearch,
  FlaskConical,
  Info,
  Layers3,
  Link2,
  Menu,
  MousePointer2,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react'

const navItems = [
  { id: 'question', label: '01 / Câu hỏi' },
  { id: 'lens', label: '02 / Lăng kính' },
  { id: 'experiment', label: '03 / Thực nghiệm' },
  { id: 'audit', label: '04 / Quy trình' },
  { id: 'findings', label: '05 / Kết quả' },
  { id: 'takeaway', label: '06 / Kết luận' },
]

const sources = [
  { id: 'nist', label: 'NIST AI RMF 1.0', title: 'AI Risk Management Framework 1.0', meta: 'Tabassi, E. / NIST / 2023', url: 'https://doi.org/10.6028/NIST.AI.100-1', note: 'NIST khuyến nghị đo lường bằng các tập kiểm tra đại diện cho bối cảnh sử dụng, có phương pháp, độ bất định và báo cáo được ghi chép. Chức năng MEASURE mô tả các quy trình test, evaluation, verification & validation (TEVV). Đây là một framework tự nguyện, không phải quy định bắt buộc.' },
  { id: 'simpleqa', label: 'SimpleQA', title: 'Measuring short-form factuality in large language models', meta: 'Wei et al. / OpenAI / 2024', url: 'https://openai.com/index/introducing-simpleqa/', note: 'SimpleQA tập trung vào câu hỏi ngắn, truy vấn sự thật, có thể kiểm tra nhanh; bộ benchmark có 4.326 câu hỏi và được thiết kế để việc chấm điểm rõ ràng hơn.' },
  { id: 'truthfulqa', label: 'TruthfulQA', title: 'TruthfulQA: Measuring how models mimic human falsehoods', meta: 'Lin, Hilton & Evans / 2021', url: 'https://openai.com/index/truthfulqa/', note: 'Bộ đánh giá gồm 817 câu hỏi thuộc 38 nhóm, nhằm kiểm tra việc mô hình có lặp lại các ngộ nhận phổ biến của con người hay không.' },
  { id: 'halueval', label: 'HaluEval', title: 'HaluEval: A Large-Scale Hallucination Evaluation Benchmark', meta: 'Li et al. / EMNLP / 2023', url: 'https://aclanthology.org/2023.emnlp-main.397/', note: 'Nghiên cứu xây dựng mẫu hallucination do con người gán nhãn và cho thấy LLM gặp khó khăn khi tự nhận diện nội dung bịa đặt; kết quả phụ thuộc vào nhiệm vụ và tập dữ liệu.' },
]

const claims = [
  { id: 'A', claim: 'NIST AI RMF có chức năng MEASURE và mô tả các quy trình TEVV cần được theo dõi, ghi chép.', source: 'NIST AI RMF 1.0 · Measure 2.x', verdict: 'supported', tag: 'Được hỗ trợ', detail: 'Nguồn chính thức mô tả MEASURE là chức năng dùng các phương pháp định lượng, định tính hoặc hỗn hợp để phân tích, đánh giá, benchmark và theo dõi rủi ro AI. Kết luận chỉ đúng trong phạm vi văn bản NIST được trích dẫn; đây là framework tự nguyện.' },
  { id: 'B', claim: 'Một câu trả lời có kèm đường link luôn là câu trả lời đúng.', source: 'Không có nguồn đủ để suy ra mệnh đề “luôn”.', verdict: 'rejected', tag: 'Bác bỏ', detail: 'Có link không đồng nghĩa nguồn đó phù hợp, dẫn đúng nội dung, còn hiệu lực hoặc đủ để chứng minh toàn bộ claim. Cần kiểm tra quan hệ claim–evidence, không chỉ sự hiện diện của URL.' },
  { id: 'C', claim: 'SimpleQA là một benchmark gồm 4.326 câu hỏi ngắn, tập trung vào việc trả lời các câu hỏi tìm kiếm sự thật.', source: 'OpenAI · Introducing SimpleQA / paper', verdict: 'supported', tag: 'Được hỗ trợ', detail: 'Con số và phạm vi này được nêu trong tài liệu SimpleQA. Không được mở rộng kết luận thành “SimpleQA đo được mọi dạng factuality của AI”. Chính tác giả cũng nêu giới hạn về câu hỏi ngắn và một đáp án có thể xác minh.' },
  { id: 'D', claim: 'HaluEval chứng minh mọi mô hình AI đều bịa thông tin ở đúng 19,5% câu hỏi.', source: 'HaluEval · EMNLP 2023', verdict: 'uncertain', tag: 'Không thể suy ra', detail: 'Kết quả 19,5% trong nghiên cứu có bối cảnh, mẫu và cách đo riêng. Không được biến một kết quả theo nhiệm vụ thành tỷ lệ chung cho “mọi mô hình AI”. Đây là lỗi ngoại suy phạm vi.' },
]

const taxonomy = [
  { code: 'E1', name: 'Nguồn không phù hợp', desc: 'Link tồn tại nhưng không nói về claim, hoặc không phải nguồn gốc.', color: 'coral' },
  { code: 'E2', name: 'Claim vượt quá bằng chứng', desc: 'Nguồn chỉ hỗ trợ một phần, nhưng câu viết lại dùng “luôn”, “mọi”, “chắc chắn”.', color: 'amber' },
  { code: 'E3', name: 'Sai thời điểm / bối cảnh', desc: 'Thông tin đúng ở thời điểm hoặc điều kiện A nhưng bị áp dụng sang B.', color: 'blue' },
  { code: 'E4', name: 'Không kiểm tra thực tiễn', desc: 'Không có phép thử, quan sát, log hoặc kết quả vận hành để đối chiếu.', color: 'mint' },
]

const experimentSteps = [
  { no: '01', title: 'Chốt bộ claim', desc: 'Tách câu trả lời AI thành các mệnh đề có thể đánh giá độc lập; khóa phiên bản và thời điểm.', icon: Layers3 },
  { no: '02', title: 'Đo pre-verification', desc: 'Cho người đánh giá xem claim như đầu ra ban đầu và ghi quyết định: chấp nhận / treo / bác bỏ.', icon: MousePointer2 },
  { no: '03', title: 'Đối chiếu nguồn', desc: 'Tìm nguồn gốc, kiểm tra độ phù hợp, thời điểm, phạm vi và mức độ bằng chứng cho từng claim.', icon: FileSearch },
  { no: '04', title: 'Đưa vào thực tiễn', desc: 'Kiểm thử trong điều kiện sử dụng thật hoặc giả lập có kiểm soát; ghi cả kết quả và điều kiện thất bại.', icon: FlaskConical },
  { no: '05', title: 'Đo post + audit', desc: 'Đánh giá lại cùng bộ claim, so với nhãn chuẩn và mã hóa nguyên nhân lỗi; báo cáo bất định.', icon: ClipboardCheck },
]

function App() {
  const [activeSection, setActiveSection] = useState('question')
  const [menuOpen, setMenuOpen] = useState(false)
  const [claimFilter, setClaimFilter] = useState('all')
  const [activeClaim, setActiveClaim] = useState('A')
  const [openSource, setOpenSource] = useState(null)
  const [showMethodNote, setShowMethodNote] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0.1, 0.4, 0.8] })
    navItems.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  const filteredClaims = useMemo(() => claimFilter === 'all' ? claims : claims.filter((claim) => claim.verdict === claimFilter), [claimFilter])
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Bỏ qua đến nội dung chính</a>
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand-mark" onClick={() => scrollTo('question')} aria-label="Về đầu bài trình bày"><span className="brand-symbol"><ShieldCheck size={18} strokeWidth={2.5} /></span><span>THỰC TIỄN <i>/</i> AI VERIFICATION</span></button>
          <div className="topbar-meta"><span className="status-dot" /> BÀI TRÌNH BÀY NGHIÊN CỨU <span className="meta-divider" /> 2026</div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Mở mục lục"><Menu size={20} aria-hidden="true" /></button>
        </div>
        <nav className={`section-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mục lục bài trình bày">{navItems.map((item) => <button key={item.id} className={activeSection === item.id ? 'active' : ''} onClick={() => scrollTo(item.id)}>{item.label}</button>)}</nav>
        <div className="progress-rail"><span style={{ width: `${((navItems.findIndex((item) => item.id === activeSection) + 1) / navItems.length) * 100}%` }} /></div>
      </header>

      <main id="main">
        <section id="question" className="hero section-shell">
          <div className="hero-grid grid-lines"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-index">00</span> MỘT CÂU HỎI TRIẾT HỌC, MỘT BÀI TEST AI</div><h1>Thực tiễn là<br /><em>tiêu chuẩn</em><br />của chân lý.</h1><p className="hero-lede">Trong kiểm chứng AI, “nghe có vẻ đúng” chỉ là điểm bắt đầu. Claim chỉ đáng tin khi nó đứng vững trước <strong>nguồn có thể truy nguyên</strong> và <strong>một phép thử trong thế giới thật</strong>.</p><div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo('experiment')}>Xem thiết kế thực nghiệm <ArrowRight size={16} /></button><button className="text-button" onClick={() => scrollTo('lens')}>Đọc lăng kính lý luận <ArrowDownRight size={16} /></button></div></div><div className="hero-art" aria-label="Sơ đồ claim đi qua nguồn và thực tiễn"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="claim-node node-top"><Sparkles size={16} /><span>CLAIM AI</span><strong>“Đúng?”</strong></div><div className="proof-line line-one"><span>đối chiếu</span></div><div className="claim-node node-mid"><Link2 size={16} /><span>NGUỒN</span><strong>evidence</strong></div><div className="proof-line line-two"><span>thử trong bối cảnh</span></div><div className="claim-node node-bottom"><Target size={16} /><span>THỰC TIỄN</span><strong>pass / fail</strong></div><div className="hero-stamp">FIELD<br />NOTE <span>01</span></div></div></div>
          <div className="hero-bottom"><div><span className="tiny-label">LUẬN ĐỀ</span><p>Không phải mọi câu trả lời trôi chảy đều là tri thức đúng.</p></div><div><span className="tiny-label">CÂU HỎI NGHIÊN CỨU</span><p>Quy trình nguồn + thực tiễn làm giảm lỗi chấp nhận claim AI đến mức nào?</p></div><div><span className="tiny-label">ĐƠN VỊ PHÂN TÍCH</span><p>Claim — không phải “câu trả lời” như một khối nguyên vẹn.</p></div></div>
        </section>

        <section id="lens" className="section-shell light-section"><SectionHeading index="01" kicker="LĂNG KÍNH" title={<>Từ lý luận nhận thức<br /><em>đến kiểm chứng có thể đo.</em></>} desc="Bài trình bày dùng mệnh đề “thực tiễn là tiêu chuẩn của chân lý” như một nguyên tắc thiết kế kiểm chứng — không phải như một khẩu hiệu thay thế cho bằng chứng." /><div className="lens-layout"><div className="theory-card paper-card"><div className="card-kicker"><Quote size={16} /> NỀN TẢNG TỪ PROJECT</div><p className="pull-quote">“Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn — đó là con đường biện chứng của sự nhận thức chân lý...”</p><div className="quote-source">— V.I. Lênin, theo Giáo trình Triết học Mác – Lênin MLN111, phần III.2</div><div className="theory-note"><Info size={15} /><span>Trong bài này, “thực tiễn” được chuyển hóa thành phép thử quan sát được: hành động, dữ liệu, log, kết quả vận hành hoặc thực nghiệm có đối chứng.</span></div></div><div className="translation-map"><div className="map-row"><span className="map-number">A</span><div><strong>Nhận thức cảm tính</strong><span>AI trả lời trôi chảy, người đọc thấy hợp lý.</span></div><ArrowRight size={17} /></div><div className="map-row"><span className="map-number">B</span><div><strong>Tư duy lý tính</strong><span>Tách claim, truy nguồn, đối chiếu phạm vi và thời điểm.</span></div><ArrowRight size={17} /></div><div className="map-row map-row-active"><span className="map-number">C</span><div><strong>Trở về thực tiễn</strong><span>Thử trong bối cảnh sử dụng; ghi nhận đúng, sai và điều kiện thất bại.</span></div><Check size={17} /></div><div className="map-caption">PHÉP DỊCH PHƯƠNG PHÁP</div></div></div><div className="three-principles"><Principle number="01" title="Khách quan" body="Claim đúng không vì được số đông chấp nhận; nó cần phù hợp với đối tượng và bằng chứng." /><Principle number="02" title="Cụ thể" body="Một kết luận chỉ đúng trong phạm vi nguồn, thời điểm, dữ liệu và bối cảnh đã nêu." /><Principle number="03" title="Có thể kiểm lại" body="Kết quả phải để lại dấu vết: nguồn, tiêu chí, phép thử, nhãn chuẩn và phiên bản." /></div></section>

        <section id="experiment" className="section-shell dark-section"><SectionHeading dark index="02" kicker="VERIFICATION EXPERIMENT / AUDIT STUDY" title={<>Đo “niềm tin” trước,<br /><em>đo “đúng” sau.</em></>} desc="Thiết kế tối thiểu để trả lời câu hỏi nghiên cứu: cùng một bộ claim, quyết định chấp nhận thay đổi ra sao sau khi có nguồn và thực tiễn?" /><div className="experiment-board"><div className="board-intro"><div className="board-label">HYPOTHESIS / H1</div><h3>Nguồn + thực tiễn<br /><span>→ giảm false acceptance</span></h3><p>Hiệu quả được đánh giá trên nhãn chuẩn do người kiểm duyệt độc lập xác lập trước khi chấm pre/post.</p><button className="outline-button" onClick={() => setShowMethodNote(!showMethodNote)}>{showMethodNote ? 'Ẩn ghi chú' : 'Xem cách đo'} <ChevronDown size={15} className={showMethodNote ? 'rotated' : ''} /></button>{showMethodNote && <div className="method-note"><strong>Không gắn con số minh họa với một nghiên cứu đã chạy.</strong><br />Để có kết quả thật, cần khóa model/version, prompt, bộ claim, người chấm và điều kiện test; sau đó công bố N, khoảng tin cậy và các trường hợp bất đồng.</div>}</div><div className="metric-stack"><Metric label="Đơn vị phân tích" value="claim" suffix="mỗi mệnh đề" /><Metric label="Nhãn chuẩn" value="3" suffix="supported / rejected / uncertain" /><Metric label="Kết quả chính" value="Δ FAR" suffix="false-acceptance rate" /></div></div><div className="steps-grid">{experimentSteps.map((step) => <div className="step-card" key={step.no}><div className="step-top"><span>{step.no}</span><step.icon size={17} /></div><h3>{step.title}</h3><p>{step.desc}</p></div>)}</div></section>

        <section id="audit" className="section-shell paper-section"><SectionHeading index="03" kicker="AUDIT KIT" title={<>Mỗi claim đi qua<br /><em>một đường kiểm chứng.</em></>} desc="Bộ lọc bên dưới là một audit kit tương tác. Hãy chọn từng claim để xem nguồn chỉ hỗ trợ đến đâu — và thực tiễn buộc ta phải hỏi thêm điều gì." /><div className="audit-toolbar"><div className="filter-tabs" role="group" aria-label="Lọc claim">{[{ id: 'all', label: 'Tất cả' }, { id: 'supported', label: 'Hỗ trợ' }, { id: 'rejected', label: 'Bác bỏ' }, { id: 'uncertain', label: 'Chưa đủ' }].map((filter) => <button key={filter.id} className={claimFilter === filter.id ? 'active' : ''} onClick={() => setClaimFilter(filter.id)}>{filter.label}</button>)}</div><span className="audit-count">{filteredClaims.length} / {claims.length} claim mẫu</span></div><div className="claims-layout"><div className="claims-list">{filteredClaims.map((claim) => <button key={claim.id} className={`claim-row ${activeClaim === claim.id ? 'active' : ''}`} onClick={() => setActiveClaim(claim.id)}><span className="claim-id">{claim.id}</span><span className="claim-text">{claim.claim}</span><StatusPill verdict={claim.verdict} label={claim.tag} /><ArrowRight size={16} /></button>)}</div><div className="claim-inspector">{(() => { const claim = claims.find((item) => item.id === activeClaim) || claims[0]; return <><div className="inspector-head"><span>CLAIM / {claim.id}</span><StatusPill verdict={claim.verdict} label={claim.tag} /></div><h3>{claim.claim}</h3><div className="inspector-source"><Link2 size={15} /><span><strong>Nguồn đối chiếu</strong>{claim.source}</span></div><div className="inspector-detail">{claim.detail}</div><div className="verdict-ruler"><span className="ruler-label">VERDICT</span><div className={`ruler-state ${claim.verdict === 'supported' ? 'is-supported' : claim.verdict === 'rejected' ? 'is-rejected' : 'is-uncertain'}`}><span>{claim.verdict === 'supported' ? 'SUPPORTED' : claim.verdict === 'rejected' ? 'REJECTED' : 'UNDECIDABLE'}</span><span>{claim.verdict === 'supported' ? 'nguồn đủ cho claim trong phạm vi' : claim.verdict === 'rejected' ? 'bằng chứng đi ngược mệnh đề' : 'chưa đủ để kết luận'}</span></div></div><div className="inspector-footer"><span><CircleAlert size={14} /> Không dùng màu thay cho nhãn chữ</span><button className="icon-button" aria-label="Mở ghi chú phương pháp" onClick={() => setShowMethodNote(true)}><Info size={16} /></button></div></> })()}</div></div></section>

        <section id="findings" className="section-shell dark-section findings-section"><SectionHeading dark index="04" kicker="MINH HỌA PHÂN TÍCH" title={<>Một quy trình tốt<br /><em>đổi được quyết định.</em></>} desc="Biểu đồ là kịch bản minh họa để đọc chỉ số — không phải kết quả của một nghiên cứu đã chạy trong project này." /><div className="findings-layout"><div className="chart-card"><div className="chart-top"><div><span className="chart-label">BỘ CLAIM MẪU / N = 20</span><h3>False acceptance rate</h3></div><span className="mini-toggle" aria-label="Biểu đồ minh họa">MINH HỌA</span></div><div className="bar-chart"><Bar label="PRE · 6 false accepts / 20" value="30%" width="83%" tone="coral" /><Bar label="POST · 1 false accept / 20" value="5%" width="14%" tone="mint" /></div><div className="chart-foot"><div><span>Giảm tuyệt đối</span><strong>25 điểm %</strong></div><div><span>Giảm tương đối</span><strong>83,3%</strong></div><div><span>Định nghĩa</span><strong>FA / N</strong></div></div><div className="simulation-tag"><Sparkles size={13} /> SỐ LIỆU MINH HỌA · cần thay bằng dữ liệu thật khi triển khai</div></div><div className="finding-notes"><div className="finding-note"><span className="note-number">01</span><div><h3>Đừng chỉ báo accuracy</h3><p>Accuracy có thể che khuất việc người dùng chấp nhận claim sai. Hãy báo false acceptance, false rejection, và tỷ lệ “uncertain”.</p></div></div><div className="finding-note"><span className="note-number">02</span><div><h3>Thực tiễn không tự động = sự thật</h3><p>Một phép thử đơn lẻ có thể bị nhiễu. Cần nêu điều kiện, đối chứng, tiêu chí pass/fail và mức độ khái quát.</p></div></div><div className="finding-note"><span className="note-number">03</span><div><h3>Độ tin cậy nằm ở audit trail</h3><p>Nguồn, phiên bản model, prompt, quyết định của người chấm và lý do sửa claim phải có thể truy lại.</p></div></div></div></div><div className="taxonomy-wrap"><div className="taxonomy-head"><span className="chart-label">ERROR TAXONOMY</span><p>Mã lỗi để biến “AI sai” thành một chẩn đoán có thể hành động.</p></div><div className="taxonomy-grid">{taxonomy.map((item) => <div className={`taxonomy-card ${item.color}`} key={item.code}><span>{item.code}</span><h3>{item.name}</h3><p>{item.desc}</p></div>)}</div></div></section>

        <section id="takeaway" className="section-shell light-section takeaway-section"><SectionHeading index="05" kicker="KẾT LUẬN" title={<>Không phải “tin AI” hay “không tin AI”.<br /><em>Hãy tin vào quy trình có thể kiểm lại.</em></>} desc="Thực tiễn là tiêu chuẩn của chân lý khi nó được cụ thể hóa thành bằng chứng quan sát được, điều kiện kiểm thử rõ ràng và một vòng lặp sửa sai có kỷ luật." /><div className="takeaway-grid"><div className="takeaway-statement"><span className="large-number">01</span><p>Claim AI chỉ nên được chấp nhận khi:</p><ul><li><Check size={16} /> Có nguồn phù hợp và truy nguyên được.</li><li><Check size={16} /> Không vượt quá phạm vi bằng chứng.</li><li><Check size={16} /> Đã qua phép thử / quan sát phù hợp với bối cảnh.</li><li><Check size={16} /> Có nhãn “chưa đủ” khi dữ liệu chưa cho phép kết luận.</li></ul></div><div className="next-loop"><div className="loop-ring"><span>claim</span><ArrowRight size={18} /><span>source</span><ArrowRight size={18} /><span>practice</span><ArrowRight size={18} /><span>revise</span></div><p>Một câu trả lời tốt không chỉ đưa ra kết luận. Nó để lại đường đi để người khác kiểm lại, phản biện và cập nhật.</p><button className="button button-dark" onClick={() => scrollTo('question')}>Đọc lại từ đầu <ArrowRight size={16} /></button></div></div><div className="sources-section"><div className="sources-head"><div><span className="tiny-label">ĐỌC THÊM / NGUỒN ĐÃ KIỂM TRA</span><h3>Không có nguồn nào thay thế được việc đọc đúng phạm vi.</h3></div><span className="source-count">{sources.length} nguồn</span></div><div className="sources-grid">{sources.map((source) => <button className="source-card" key={source.id} onClick={() => setOpenSource(source)}><span className="source-label">{source.label}</span><strong>{source.title}</strong><span className="source-meta">{source.meta}</span><ExternalLink size={15} /></button>)}</div></div></section>
      </main>

      <footer className="footer"><div><span className="brand-symbol"><ShieldCheck size={17} /></span><strong>THỰC TIỄN / AI VERIFICATION</strong></div><p>Web presentation · MLN111 · kiểm chứng AI bằng nguồn và thực tiễn</p><span className="footer-note">Nội dung triết học nền theo tài liệu project; nội dung AI đối chiếu theo nguồn được liên kết.</span></footer>

      {openSource && <div className="modal-backdrop" role="presentation" onClick={() => setOpenSource(null)}><div className="source-modal" role="dialog" aria-modal="true" aria-label={openSource.title} onClick={(event) => event.stopPropagation()}><div className="modal-top"><span className="source-label">{openSource.label}</span><button className="icon-button" onClick={() => setOpenSource(null)} aria-label="Đóng"><X size={18} /></button></div><h2>{openSource.title}</h2><p className="source-meta">{openSource.meta}</p><p>{openSource.note}</p><a className="button button-primary" href={openSource.url} target="_blank" rel="noreferrer">Mở nguồn gốc <ExternalLink size={15} /></a></div></div>}
    </div>
  )
}

function SectionHeading({ index, kicker, title, desc, dark = false }) { return <div className={`section-heading ${dark ? 'dark' : ''}`}><div className="section-index"><span>{index}</span><i /></div><div><div className="eyebrow"><span className="eyebrow-index">{index}</span> {kicker}</div><h2>{title}</h2><p>{desc}</p></div></div> }
function Principle({ number, title, body }) { return <article className="principle"><span>{number}</span><h3>{title}</h3><p>{body}</p></article> }
function Metric({ label, value, suffix }) { return <div className="metric"><span>{label}</span><strong>{value}</strong><small>{suffix}</small></div> }
function Bar({ label, value, width, tone }) { return <div className="bar-row"><div className="bar-meta"><span>{label}</span><strong>{value}</strong></div><div className="bar-track"><span className={tone} style={{ width }} /></div></div> }
function StatusPill({ verdict, label }) { return <span className={`status-pill ${verdict}`}><span />{label}</span> }

export default App
