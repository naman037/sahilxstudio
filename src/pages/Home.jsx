import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { IMAGES, WORKS, SERVICES } from '../data'
import { useTransition } from '../components/PageTransition'

// ═══════════════════════════════════════════════
// SCRAMBLE TEXT HOOK
// ═══════════════════════════════════════════════
function useScramble(originalText, trigger) {
  const [text, setText] = useState(originalText)
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*'

  useEffect(() => {
    if (!trigger) {
      setText(originalText)
      return
    }
    let iteration = 0
    const interval = setInterval(() => {
      setText(
        originalText.split('').map((char, idx) => {
          if (char === ' ') return ' '
          if (idx < iteration) return originalText[idx]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (iteration >= originalText.length) clearInterval(interval)
      iteration += 0.5
    }, 30)
    return () => clearInterval(interval)
  }, [trigger, originalText])

  return text
}

// ═══════════════════════════════════════════════
// HERO SECTION — CINEMATIC
// ═══════════════════════════════════════════════
function Hero() {
  const heroImages = [
    IMAGES.rebellion[0], IMAGES.raw[0], IMAGES.borcelle[0],
    IMAGES.rebellion[4], IMAGES.raw[1], IMAGES.borcelle[1],
  ]

  return (
    <section className="hero" ref={null}>
      {/* Image grid background */}
      <div className="hero-bg-grid">
        {heroImages.map((img, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <img
              src={img}
              alt=""
              loading={i < 3 ? 'eager' : 'lazy'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Cinematic overlay on top of images */}
      <div className="hero-cinematic-bg" />

      {/* Title */}
      <div className="hero-content" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">
            <div>
              SAHIL
              <span className="hero-accent">×</span>
              STUDIOS
            </div>
          </h1>
        </motion.div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Cinematography &amp; Photography — Jodhpur, India
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{ marginTop: '48px', display: 'flex', gap: '20px', justifyContent: 'center' }}
        >
          <a href="#work" className="magnetic-btn">View Work</a>
          <a href="#contact" className="magnetic-btn" style={{ borderColor: 'var(--accent)' }}>Hire Me</a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Corner text */}
      <div
        style={{
          position: 'absolute', bottom: 40, right: 40, zIndex: 10,
          fontFamily: 'Space Mono, monospace', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--off-white)',
          writingMode: 'vertical-rl', opacity: 0.35,
        }}
      >
        Sahil Singh · 2025
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(5,5,5,0.8)' : 'transparent',
        transition: 'background 0.4s, backdrop-filter 0.4s',
      }}
    >
      <a href="#" className="nav-logo">SXS</a>
      <ul className="nav-links">
        {['Work', 'About', 'Services', 'Contact'].map(item => (
          <li key={item}>
            {item === 'About' ? (
              <Link to="/about">{item}</Link>
            ) : (
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ═══════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════
function Marquee({ items, reverse = false }) {
  const dupeItems = [...items, ...items]

  return (
    <div className="marquee-section">
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {dupeItems.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════
// MANIFESTO / ABOUT
// ═══════════════════════════════════════════════
function Manifesto() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  const fullText = "HI I'M SAHIL SINGH A PASSIONATE CINEMATOGRAPHER AND PHOTOGRAPHER BASED IN JODHPUR INDIA"
  const words = fullText.split(' ')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="manifesto" id="about" ref={ref}>
      <div className="section-label">About</div>

      <div className="manifesto-text">
        {words.map((word, i) => (
          <span
            key={i}
            className={`word ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: visible ? `${i * 0.06}s` : '0s' }}
          >
            {word}
          </span>
        ))}
      </div>

      <motion.p
        className="manifesto-sub"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        From music videos to fashion editorials, concert photography to cinematic storytelling —
        I craft visuals that leave an impact. Every frame is a statement.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ marginTop: '48px' }}
      >
        <a href="#contact" className="magnetic-btn">Let's Talk ↗</a>
        <a href="https://wa.me/918920866483" target="_blank" rel="noopener noreferrer" className="magnetic-btn" style={{ marginLeft: '12px', borderColor: '#25D366', color: '#25D366' }}>
          WhatsApp
        </a>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════
function Stats() {
  const stats = [
    { num: '50+', label: 'Projects' },
    { num: '8+', label: 'Artists Worked With' },
    { num: '3+', label: 'Years Experience' },
    { num: '∞', label: 'Frames Captured' },
  ]

  return (
    <div className="stats-row">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════
// THE VAULT — WORKS WITH 3D SCROLL
// ═══════════════════════════════════════════════
function Vault() {
  const [previewImg, setPreviewImg] = useState(null)
  const [previewName, setPreviewName] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const previewRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const previewPosRef = useRef({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const perspective3D = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -5])
  const depthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98])

  // Only run the rAF loop when the section is visible
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(section)

    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', handleMove)

    const loop = () => {
      if (isVisibleRef.current && previewRef.current) {
        previewPosRef.current.x += (mouseRef.current.x - previewPosRef.current.x) * 0.1
        previewPosRef.current.y += (mouseRef.current.y - previewPosRef.current.y) * 0.1
        previewRef.current.style.left = `${previewPosRef.current.x + 24}px`
        previewRef.current.style.top = `${previewPosRef.current.y - 130}px`
      }
      raf.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <section className="vault" id="work" ref={sectionRef}>
      {/* Floating preview */}
      <div
        ref={previewRef}
        className={`floating-preview ${previewVisible ? 'active' : ''}`}
        data-name={previewName}
      >
        {previewImg && <img src={previewImg} alt={previewName} />}
      </div>

      <div className="vault-header">
        <motion.h2
          className="vault-title"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected<br />Works
        </motion.h2>
        <div className="vault-count">({WORKS.length} projects)</div>
      </div>

      <motion.div
        className="works-list"
        style={{
          rotateX: perspective3D,
          scale: depthScale,
        }}
      >
        {WORKS.map((work, i) => (
          <WorkItem
            key={work.id}
            work={work}
            index={i}
            scrollProgress={scrollYProgress}
            onHover={(img, name) => {
              setPreviewImg(img)
              setPreviewName(name)
              setPreviewVisible(true)
            }}
            onLeave={() => setPreviewVisible(false)}
          />
        ))}
      </motion.div>
    </section>
  )
}

function WorkItem({ work, index, scrollProgress, onHover, onLeave }) {
  const [hovered, setHovered] = useState(false)
  const scrambled = useScramble(work.name, hovered)
  const ref = useRef(null)
  const nav = useNavigate()
  const transition = useTransition()

  const itemOffset = index * 0.04
  const itemZ = useTransform(
    scrollProgress,
    [0.1 + itemOffset, 0.4 + itemOffset, 0.6 + itemOffset],
    [30, 0, -20]
  )
  const itemOpacity = useTransform(
    scrollProgress,
    [0.05 + itemOffset, 0.2 + itemOffset, 0.8],
    [0.5, 1, 0.9]
  )

  const handleClick = (e) => {
    e.preventDefault()
    if (transition) {
      transition.startTransition(work.name, work.img, `/project/${work.id}`, nav)
    }
  }

  return (
    <a href={`/project/${work.id}`} onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <motion.div
        ref={ref}
        className="work-item"
        style={{
          translateZ: itemZ,
          opacity: itemOpacity,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.07 }}
        onMouseEnter={() => {
          setHovered(true)
          onHover(work.img, work.name)
        }}
        onMouseLeave={() => {
          setHovered(false)
          onLeave()
        }}
      >
        <span className="work-num">{work.id}</span>
        <span className="work-name">{scrambled}</span>
        <span className="work-type">{work.type}</span>
        <span className="work-year">{work.year}</span>
      </motion.div>
    </a>
  )
}

// ═══════════════════════════════════════════════
// GALLERY SCROLL — ENHANCED
// ═══════════════════════════════════════════════
function GalleryScroll() {
  const allImages = [
    ...IMAGES.rebellion,
    ...IMAGES.raw,
    ...IMAGES.borcelle,
  ]

  return (
    <div className="horizontal-scroll-container" id="gallery">
      <div className="section-label" style={{ marginBottom: '40px' }}>Gallery</div>
      <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        <div className="h-scroll-track">
          {allImages.map((img, i) => (
            <motion.div
              key={i}
              className="h-scroll-card"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />
              <div className="h-scroll-card-info">
                <div className="h-scroll-card-title">Frame {String(i + 1).padStart(2, '0')}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════
// BUSINESS CARD — 3D FLIP
// ═══════════════════════════════════════════════
function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <section className="business-card-section">
      <div className={`business-card-bg ${isFlipped ? 'flipped' : ''}`} />

      <div className="section-label" style={{ zIndex: 1 }}>Business Card</div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div
          className="business-card-container"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`business-card-inner ${isFlipped ? 'flipped' : ''}`}>
            {/* Front */}
            <div className="business-card-front">
              <div className="card-front-header">
                <div>
                  <div className="card-name">Sahil<br />Singh</div>
                  <div className="card-title-role">Cinematographer &amp; Photographer</div>
                </div>
                <div className="card-logo-small">SXS</div>
              </div>

              <div>
                <div className="card-front-line" />
                <div className="card-contact-info">
                  <div className="card-contact-item">
                    <svg className="card-contact-icon" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                    +91 89208 66483
                  </div>
                  <div className="card-contact-item">
                    <svg className="card-contact-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                    sahilsingh25sam@gmail.com
                  </div>
                  <div className="card-contact-item">
                    <svg className="card-contact-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    Jodhpur, Rajasthan, India
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="business-card-back">
              <div className="card-back-logo">
                SAHIL<br />×<br />STUDIOS
              </div>
              <div className="card-back-line" />
              <div className="card-back-tagline">Cinematography &amp; Photography</div>
              <div className="card-back-website">sahilxstudios.com</div>
            </div>
          </div>
        </div>

        <div className="business-card-hint">Click to flip</div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════
function Services() {
  return (
    <section className="services" id="services">
      <div className="section-label">What I Do</div>

      <motion.h2
        style={{
          fontFamily: 'Anton, Impact, sans-serif',
          fontSize: 'clamp(40px, 6vw, 96px)',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          maxWidth: '700px',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Experience &amp;<br /><span style={{ color: 'var(--accent)' }}>Services</span>
      </motion.h2>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <Link to={`/service/${s.id}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: '80px', borderLeft: '1px solid rgba(240,236,228,0.1)', paddingLeft: '32px' }}
      >
        <div className="section-label" style={{ marginBottom: '32px' }}>Experience</div>
        {[
          { role: 'Freelance Cinematographer & Photographer', period: '2022 — Present', desc: 'Independent work across music, fashion, events and brand campaigns.' },
          { role: 'Assistant Photographer', period: '2021 — 2022', desc: 'Mentored under established photographers, learning studio and field techniques.' },
        ].map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{ marginBottom: '48px', paddingLeft: '24px', position: 'relative' }}
          >
            <div style={{
              position: 'absolute', left: '-37px', top: '6px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)',
            }} />
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '8px' }}>{exp.period}</div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '22px', textTransform: 'uppercase', marginBottom: '8px' }}>{exp.role}</div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--off-white)', opacity: 0.6, lineHeight: 1.7 }}>{exp.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// CONTACT / FOOTER
// ═══════════════════════════════════════════════
function Contact() {
  const titleRef = useRef(null)
  const sectionRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(section)

    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', handleMove)

    const loop = () => {
      if (isVisibleRef.current && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const tx = (mouseRef.current.x - cx) * 0.015
        const ty = (mouseRef.current.y - cy) * 0.015
        posRef.current.x += (tx - posRef.current.x) * 0.1
        posRef.current.y += (ty - posRef.current.y) * 0.1
        titleRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const handleEmailClick = (e) => {
    e.preventDefault()
    window.location.href = 'mailto:sahilsingh25sam@gmail.com'
  }

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="section-label">Contact</div>

      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="contact-title">
          LET'S CREATE<br />
          <span className="line2">SOMETHING!!!!</span>
        </h2>
      </motion.div>

      <div className="contact-links">
        <motion.a
          href="tel:+918920866483"
          className="contact-link"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          +91 89208 66483
        </motion.a>

        <motion.a
          href="mailto:sahilsingh25sam@gmail.com"
          className="contact-link"
          onClick={handleEmailClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          sahilsingh25sam@gmail.com ✦ Click for surprise
        </motion.a>

        <motion.a
          href="https://www.behance.net/sahilsingh271"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Behance ↗
        </motion.a>
      </div>

      {/* Footer bar */}
      <div className="footer-bottom" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span>© 2025 SahilXStudios</span>
        <span>Jodhpur, India</span>
        <span>Made with ♥ & Ambition</span>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════
export default function Home() {
  const marqueeItems = [
    'Cinematography', 'Photography', 'Music Videos', 'Concerts',
    'Fashion', 'Brand Films', 'Jodhpur', 'India',
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Nav />
      <Hero />
      <Marquee items={marqueeItems} />
      <Manifesto />
      <Stats />
      <Vault />
      <GalleryScroll />
      <Marquee items={['Assistant Director', 'Color Grading', 'Digital Storytelling', 'Event Coverage', 'Post Production']} reverse />
      <Services />
      <BusinessCard />
      <Contact />
    </motion.main>
  )
}
