import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const materials = [
  { id: 'MV-PV-001', name: 'Đoạn mây song thừa', village: 'Phú Vinh', type: 'Mây', amount: '12 kg', price: '45.000đ/kg', status: 'Còn hàng', image: 'https://images.unsplash.com/photo-1609602126247-4ab7188b4f8d?auto=format&fit=crop&w=800&q=85', tone: 'green' },
  { id: 'MV-BT-001', name: 'Mảnh gốm men lam', village: 'Bát Tràng', type: 'Gốm', amount: '320 mảnh', price: 'Liên hệ', status: 'Còn hàng', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85', tone: 'clay' },
  { id: 'MV-PV-003', name: 'Nan tre chưa xử lý', village: 'Phú Vinh', type: 'Tre', amount: '80 bó', price: '60.000đ/bó', status: 'Sắp hết', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=85', tone: 'sand' },
  { id: 'MV-BT-004', name: 'Đất sét tạo hình', village: 'Bát Tràng', type: 'Gốm', amount: '45 kg', price: '25.000đ/kg', status: 'Còn hàng', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=85', tone: 'clay' },
  { id: 'MV-PV-005', name: 'Lõi mây tự nhiên', village: 'Phú Vinh', type: 'Mây', amount: '6 kg', price: 'Liên hệ', status: 'Còn hàng', image: 'https://images.unsplash.com/photo-1544609171-0f7f8e6e2fc0?auto=format&fit=crop&w=800&q=85', tone: 'green' },
  { id: 'MV-BT-006', name: 'Mảnh gốm thô', village: 'Bát Tràng', type: 'Gốm', amount: '150 mảnh', price: '35.000đ/kg', status: 'Sắp hết', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85', tone: 'clay' },
]

const categories = [
  { label: 'Mây', icon: '⌁', count: '12 hồ sơ', image: 'https://images.unsplash.com/photo-1609602126247-4ab7188b4f8d?auto=format&fit=crop&w=700&q=80' },
  { label: 'Tre', icon: '♧', count: '8 hồ sơ', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=80' },
  { label: 'Gốm', icon: '◌', count: '15 hồ sơ', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80' },
  { label: 'Khác', icon: '✦', count: '6 hồ sơ', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80' },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Tất cả')
  const [modal, setModal] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredMaterials = useMemo(() => materials.filter((item) => {
    const matchesType = filter === 'Tất cả' || item.type === filter
    const haystack = `${item.name} ${item.village} ${item.type}`.toLowerCase()
    return matchesType && haystack.includes(query.toLowerCase())
  }), [filter, query])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#" onClick={() => scrollTo('top')}>
          <span className="brand-mark">M</span>
          <span><strong>MẠCH VIỆT</strong><small>Vật liệu cho vòng đời mới</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">☰</button>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <button onClick={() => scrollTo('materials')}>Khám phá vật liệu</button>
          <button onClick={() => scrollTo('how-it-works')}>Cách hoạt động</button>
          <button onClick={() => scrollTo('stories')}>Câu chuyện làng nghề</button>
          <button onClick={() => scrollTo('about')}>Về Mạch Việt</button>
        </nav>
        <button className="header-cta" onClick={() => setModal('supplier')}>Đăng ký cung cấp <Arrow /></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> MARKETPLACE VẬT LIỆU TÁI SỬ DỤNG</p>
            <h1>Vật liệu cũ.<br /><em>Ý tưởng mới.</em></h1>
            <p className="hero-description">Mạch Việt kết nối những vật liệu còn giá trị từ làng nghề với cộng đồng sáng tạo — để mỗi chất liệu tìm thấy một vòng đời mới.</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollTo('materials')}>Khám phá vật liệu <Arrow /></button>
              <button className="text-button" onClick={() => setModal('request')}>Tôi đang tìm vật liệu <Arrow /></button>
            </div>
            <div className="hero-proof"><span className="proof-avatars">◉ ◉ ◉</span><span><strong>Được xây dựng cùng</strong><br />các hộ sản xuất làng nghề Việt Nam</span></div>
          </div>
          <div className="hero-art">
            <div className="art-image-main"><img onError={(event) => { event.currentTarget.style.display = 'none' }} src="https://images.unsplash.com/photo-1609602126247-4ab7188b4f8d?auto=format&fit=crop&w=1200&q=90" alt="Chi tiết vật liệu mây tự nhiên" /></div>
            <div className="art-note"><span className="note-dot" /> Được thu gom từ<br /><strong>Phú Vinh, Hà Nội</strong></div>
            <div className="art-stamp">VÒNG ĐỜI<br /><b>MỚI</b><span>✦</span></div>
            <div className="art-texture" />
          </div>
        </section>

        <section className="ticker"><span>GIVE MATERIALS A SECOND LIFE</span><i>✦</i><span>CONNECT MATERIALS WITH CREATIVITY</span><i>✦</i><span>PRESERVE THE STORY</span><i>✦</i></section>

        <section className="section materials-section" id="materials">
          <div className="section-heading">
            <div><p className="eyebrow">01 — THƯ VIỆN VẬT LIỆU</p><h2>Tìm chất liệu<br /><em>cho ý tưởng của bạn.</em></h2></div>
            <p className="heading-side">Mỗi hồ sơ là một lô vật liệu có thật, được kiểm tra và ghi nhận từ các làng nghề.</p>
          </div>
          <div className="search-row">
            <div className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm theo tên, chất liệu hoặc làng nghề..." /></div>
            <div className="filter-list">{['Tất cả', 'Mây', 'Tre', 'Gốm'].map((name) => <button key={name} className={filter === name ? 'active' : ''} onClick={() => setFilter(name)}>{name}</button>)}</div>
            <button className="view-all" onClick={() => { setFilter('Tất cả'); setQuery('') }}>Xem tất cả <Arrow /></button>
          </div>
          <div className="material-grid">
            {filteredMaterials.slice(0, 4).map((item) => <MaterialCard item={item} key={item.id} onRequest={() => setModal('request')} />)}
          </div>
          {filteredMaterials.length === 0 && <div className="empty">Chưa tìm thấy vật liệu phù hợp. <button onClick={() => { setQuery(''); setFilter('Tất cả') }}>Xóa bộ lọc</button></div>}
        </section>

        <section className="category-band">
          <div className="section-heading compact"><div><p className="eyebrow">KHÁM PHÁ THEO CHẤT LIỆU</p><h2>Chạm vào <em>chất liệu.</em></h2></div><p className="heading-side">Từ những gì quen thuộc, tạo nên điều chưa từng có.</p></div>
          <div className="category-grid">{categories.map((category) => <button className="category-card" key={category.label} onClick={() => { setFilter(category.label === 'Khác' ? 'Tất cả' : category.label); scrollTo('materials') }}><img onError={(event) => { event.currentTarget.style.display = 'none' }} src={category.image} alt="" /><span className="category-overlay" /><div className="category-info"><span className="category-icon">{category.icon}</span><strong>{category.label}</strong><small>{category.count}</small><span className="circle-arrow"><Arrow /></span></div></button>)}</div>
        </section>

        <section className="section process-section" id="how-it-works">
          <div className="section-heading"><div><p className="eyebrow">02 — CÁCH HOẠT ĐỘNG</p><h2>Một kết nối<br /><em>có chủ đích.</em></h2></div><p className="heading-side">Chúng tôi hỗ trợ cả hai phía để việc chuyển giao vật liệu diễn ra rõ ràng, thuận tiện và đáng tin cậy.</p></div>
          <div className="steps"><Step number="01" title="Khám phá" text="Tìm kiếm và xem thông tin về những vật liệu đang có sẵn từ các làng nghề." /><Step number="02" title="Gửi yêu cầu" text="Cho chúng tôi biết bạn cần gì. Không cần tài khoản, không cần giỏ hàng." /><Step number="03" title="Kết nối" text="Mạch Việt xác nhận thông tin và hỗ trợ bạn kết nối với cơ sở cung cấp." /><Step number="04" title="Tạo vòng đời mới" text="Vật liệu được chuyển giao và bắt đầu hành trình mới trong sản phẩm của bạn." /></div>
        </section>

        <section className="village-section" id="stories">
          <div className="village-image"><img onError={(event) => { event.currentTarget.style.display = 'none' }} src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=90" alt="Nghệ nhân làm gốm" /><div className="image-caption">Bát Tràng, Hà Nội<br /><small>Nơi đất kể chuyện</small></div></div>
          <div className="village-copy"><p className="eyebrow">03 — NHỮNG NƠI TẠO RA VẬT LIỆU</p><h2>Mỗi làng nghề<br />là một <em>mạch sống.</em></h2><p>Đằng sau mỗi lô vật liệu là một nơi chốn, một kỹ thuật và bàn tay của người đã gìn giữ nó qua nhiều thế hệ.</p><button className="button outline">Tìm hiểu về làng nghề <Arrow /></button><div className="village-facts"><span><strong>02</strong><small>Làng nghề<br />đang kết nối</small></span><span><strong>∞</strong><small>Câu chuyện<br />chưa được kể</small></span></div></div>
        </section>

        <section className="impact-section" id="about">
          <div className="impact-intro"><p className="eyebrow light">04 — TÁC ĐỘNG ĐƯỢC GHI NHẬN</p><h2>Giá trị không<br />chỉ nằm ở <em>con số.</em></h2><p>Mỗi vật liệu được chuyển giao là một bước nhỏ để thay đổi cách chúng ta nhìn về những thứ được gọi là “dư thừa”.</p></div>
          <div className="impact-stats"><div><strong>48</strong><span>hồ sơ vật liệu<br />hợp lệ</span></div><div><strong>320<small>kg</small></strong><span>vật liệu đã<br />chuyển giao</span></div><div><strong>27</strong><span>giao dịch<br />hoàn tất</span></div><p className="impact-note">* Số liệu thử nghiệm được ghi nhận đến tháng 11/2026</p></div>
        </section>

        <section className="supplier-cta">
          <div className="cta-pattern" /><p className="eyebrow">DÀNH CHO NHÀ CUNG CẤP</p><h2>Bạn có vật liệu còn giá trị<br />sau sản xuất?</h2><p>Hãy để Mạch Việt giúp chúng tìm được vòng đời mới.</p><button className="button light" onClick={() => setModal('supplier')}>Đăng ký cung cấp vật liệu <Arrow /></button>
        </section>
      </main>

      <footer><div className="footer-brand"><a className="brand" href="#"><span className="brand-mark">M</span><span><strong>MẠCH VIỆT</strong><small>Vật liệu cho vòng đời mới</small></span></a><p>Một nền tảng kết nối vật liệu tái sử dụng từ làng nghề với cộng đồng sáng tạo.</p></div><div className="footer-links"><div><strong>Khám phá</strong><button onClick={() => scrollTo('materials')}>Vật liệu</button><button onClick={() => scrollTo('stories')}>Làng nghề</button><button onClick={() => scrollTo('how-it-works')}>Cách hoạt động</button></div><div><strong>Tham gia</strong><button onClick={() => setModal('request')}>Tôi cần vật liệu</button><button onClick={() => setModal('supplier')}>Tôi có vật liệu</button></div><div><strong>Liên hệ</strong><span>hello@machviet.vn</span><span>Hà Nội, Việt Nam</span><span>Instagram · Facebook</span></div></div><div className="footer-bottom"><span>© 2026 Mạch Việt</span><span>Được làm với sự trân trọng dành cho vật liệu Việt.</span></div></footer>
      {modal && <Modal type={modal} close={() => setModal(null)} />}
    </div>
  )
}

function MaterialCard({ item, onRequest }) {
  return <article className={`material-card tone-${item.tone}`}><div className="card-image"><img onError={(event) => { event.currentTarget.style.display = 'none' }} src={item.image} alt={item.name} /><span className={`status ${item.status === 'Sắp hết' ? 'low' : ''}`}>{item.status}</span><button className="heart" aria-label="Lưu vật liệu">♡</button></div><div className="card-body"><div className="card-meta"><span>{item.type}</span><span>·</span><span>{item.village}</span></div><h3>{item.name}</h3><div className="card-details"><span><small>Số lượng</small><strong>{item.amount}</strong></span><span><small>Giá tham khảo</small><strong>{item.price}</strong></span></div><button className="card-link" onClick={onRequest}>Xem hồ sơ <Arrow /></button></div></article>
}

function Step({ number, title, text }) {
  return <div className="step"><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><span className="step-arrow">↗</span></div>
}

function Modal({ type, close }) {
  const supplier = type === 'supplier'
  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event) => event.key === 'Escape' && close()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [close])
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><div className="modal"><button className="modal-close" onClick={close} aria-label="Đóng">×</button>{submitted ? <div className="modal-success"><span className="success-mark">✓</span><p className="eyebrow">ĐÃ TIẾP NHẬN</p><h2>Cảm ơn bạn đã<br /><em>kết nối.</em></h2><p className="modal-intro">Đội ngũ Mạch Việt sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận thông tin.</p><button className="button primary" onClick={close}>Đóng cửa sổ</button></div> : <><p className="eyebrow">{supplier ? 'TRỞ THÀNH NHÀ CUNG CẤP' : 'TÌM VẬT LIỆU'}</p><h2>{supplier ? <><span>Đưa vật liệu của bạn</span><br /><em>đi xa hơn.</em></> : <><span>Bạn đang tìm</span><br /><em>vật liệu gì?</em></>}</h2><p className="modal-intro">{supplier ? 'Để lại thông tin, đội ngũ Mạch Việt sẽ liên hệ và hỗ trợ bạn tạo hồ sơ vật liệu.' : 'Mô tả nhu cầu của bạn, chúng tôi sẽ tìm nguồn phù hợp và liên hệ lại sớm nhất.'}</p><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}><label>Họ và tên<input required placeholder="Nguyễn Văn A" /></label><label>{supplier ? 'Bạn đang có vật liệu gì?' : 'Bạn đang cần vật liệu gì?'}<input required placeholder={supplier ? 'Ví dụ: Mây, tre, gốm...' : 'Ví dụ: Mảnh gốm men lam...'} /></label><div className="form-row"><label>Số điện thoại<input required placeholder="09xx xxx xxx" /></label><label>Khu vực<input placeholder="Hà Nội" /></label></div><button className="button primary full" type="submit">{supplier ? 'Gửi đăng ký' : 'Gửi yêu cầu'} <Arrow /></button></form></>}</div></div>
}

createRoot(document.getElementById('root')).render(<App />)
