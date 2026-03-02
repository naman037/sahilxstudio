import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { IMAGES, WORKS, SERVICES } from '../data'

// ═══════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const loop = () => {
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      raf.current = requestAnimationFrame(loop)
    }

    const handleHoverIn = () => ringRef.current?.classList.add('hovering')
    const handleHoverOut = () => ringRef.current?.classList.remove('hovering')

    document.addEventListener('mousemove', handleMove)
    document.querySelectorAll('a, button, .work-item, .magnetic-btn').forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    loop()
    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

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
      setText(prev =>
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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
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
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════
function Hero() {
  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }, [mouseX, mouseY])

  const tx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 30 })
  const ty = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 })
  const tx2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), { stiffness: 60, damping: 20 })
  const ty2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 })

  const heroImages = [
    IMAGES.rebellion[0], IMAGES.raw[0], IMAGES.borcelle[0],
    IMAGES.rebellion[4], IMAGES.raw[1], IMAGES.borcelle[1],
  ]

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      {/* Grid BG */}
      <motion.div className="hero-bg-grid" style={{ x: tx2, y: ty2 }}>
        {heroImages.map((img, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <motion.img
              src={img}
              alt=""
              loading={i < 3 ? 'eager' : 'lazy'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        ))}
      </motion.div>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.65) 50%, rgba(5,5,5,0.92) 100%)',
        zIndex: 1,
      }} />

      {/* Scan line */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 90%, rgba(224,48,0,0.05) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <div className="hero-content" style={{ zIndex: 10 }}>
        <motion.div
          style={{ x: tx, y: ty }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">
            <div>
              {'SAHIL'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block' }}
                  whileHover={{ color: 'var(--accent)', y: -8, transition: { duration: 0.15 } }}
                >
                  {ch}
                </motion.span>
              ))}
              <span className="hero-accent">×</span>
              {'STUDIOS'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block' }}
                  whileHover={{ color: 'var(--accent)', y: -8, transition: { duration: 0.15 } }}
                >
                  {ch}
                </motion.span>
              ))}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: 40, right: 40, zIndex: 10,
          fontFamily: 'Space Mono, monospace', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--off-white)',
          writingMode: 'vertical-rl',
        }}
      >
        Sahil Singh · 2025
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════
function Marquee({ items, speed = 40, reverse = false }) {
  const trackRef = useRef(null)
  const raf = useRef(null)
  const pos = useRef(0)
  const dir = useRef(reverse ? -1 : 1)
  const isHovered = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const loop = () => {
      if (!isHovered.current) {
        pos.current += dir.current * 0.5
        const totalWidth = track.scrollWidth / 2
        if (Math.abs(pos.current) >= totalWidth) pos.current = 0
        track.style.transform = `translateX(${pos.current}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    const handleEnter = () => { isHovered.current = true; dir.current *= -1 }
    const handleLeave = () => { isHovered.current = false; dir.current *= -1 }

    track.addEventListener('mouseenter', handleEnter)
    track.addEventListener('mouseleave', handleLeave)

    loop()
    return () => {
      cancelAnimationFrame(raf.current)
      track.removeEventListener('mouseenter', handleEnter)
      track.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const dupeItems = [...items, ...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee-track" ref={trackRef}>
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
// THE VAULT — WORKS
// ═══════════════════════════════════════════════
function Vault() {
  const [previewImg, setPreviewImg] = useState(null)
  const [previewName, setPreviewName] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const previewRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const previewPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', handleMove)

    const loop = () => {
      if (previewRef.current) {
        previewPosRef.current.x += (mouseRef.current.x - previewPosRef.current.x) * 0.1
        previewPosRef.current.y += (mouseRef.current.y - previewPosRef.current.y) * 0.1
        previewRef.current.style.left = `${previewPosRef.current.x + 24}px`
        previewRef.current.style.top = `${previewPosRef.current.y - 130}px`
      }
      raf.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <section className="vault" id="work">
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

      <div className="works-list">
        {WORKS.map((work, i) => (
          <WorkItem
            key={work.id}
            work={work}
            index={i}
            onHover={(img, name) => {
              setPreviewImg(img)
              setPreviewName(name)
              setPreviewVisible(true)
            }}
            onLeave={() => setPreviewVisible(false)}
          />
        ))}
      </div>
    </section>
  )
}

function WorkItem({ work, index, onHover, onLeave }) {
  const [hovered, setHovered] = useState(false)
  const scrambled = useScramble(work.name, hovered)

  return (
    <Link to={`/project/${work.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <motion.div
        className="work-item"
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
    </Link>
  )
}

// ═══════════════════════════════════════════════
// GALLERY SCROLL
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
              whileHover={{ scale: 1.02 }}
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
    </section >
  )
}

// ═══════════════════════════════════════════════
// CONTACT / FOOTER
// ═══════════════════════════════════════════════
function Contact() {
  const titleRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', handleMove)

    const loop = () => {
      if (titleRef.current) {
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
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const handleEmailClick = (e) => {
    e.preventDefault()

    // CONFETTI EXPLOSION
    const duration = 3000
    const end = Date.now() + duration
    const colors = ['#e03000', '#ff6b00', '#f0ece4', '#050505']

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        disableForReducedMotion: true,
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        disableForReducedMotion: true,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    // Open email after short delay
    setTimeout(() => {
      window.location.href = 'mailto:sahilsingh25sam@gmail.com'
    }, 400)
  }

  return (
    <section className="contact" id="contact">
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
      <Contact />
    </motion.main>
  )
}
