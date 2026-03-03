import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
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
// SVG CHARACTER — PHOTOGRAPHER (Left)
// ═══════════════════════════════════════════════
function PhotographerCharacter() {
  const [lightHovered, setLightHovered] = useState(false)
  const [cameraHovered, setCameraHovered] = useState(false)

  return (
    <div className="hero-character-photographer">
      <svg viewBox="0 0 280 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Studio Light on tripod */}
        <g
          className="studio-light-element"
          onMouseEnter={() => setLightHovered(true)}
          onMouseLeave={() => setLightHovered(false)}
          style={{ cursor: 'none' }}
        >
          {/* Tripod legs */}
          <line x1="55" y1="280" x2="30" y2="440" stroke="#3a3a3a" strokeWidth="2" />
          <line x1="55" y1="280" x2="55" y2="445" stroke="#3a3a3a" strokeWidth="2" />
          <line x1="55" y1="280" x2="80" y2="440" stroke="#3a3a3a" strokeWidth="2" />
          {/* Light head */}
          <rect x="35" y="250" width="40" height="30" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
          {/* Light bulb / glow */}
          <rect
            className="light-bulb"
            x="38" y="253" width="34" height="24" rx="2"
            fill={lightHovered ? '#fff8e0' : '#1a1a1a'}
            opacity={lightHovered ? 1 : 0.3}
            style={{ transition: 'fill 0.4s, opacity 0.4s' }}
          />
          {/* Light glow effect */}
          {lightHovered && (
            <ellipse cx="55" cy="265" rx="60" ry="80" fill="rgba(255,248,200,0.06)" />
          )}
        </g>

        {/* Character body — photographer silhouette */}
        <g style={{ animation: 'idleBreathe 3.5s ease-in-out infinite', transformOrigin: '160px 460px' }}>
          {/* Legs */}
          <path d="M145 380 L135 475" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" />
          <path d="M165 380 L178 475" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" />
          {/* Shoes */}
          <ellipse cx="132" cy="476" rx="14" ry="5" fill="#111" />
          <ellipse cx="181" cy="476" rx="14" ry="5" fill="#111" />
          {/* Body */}
          <path d="M130 260 C125 310, 125 360, 145 380 L165 380 C185 360, 185 310, 180 260 Z" fill="#1a1a1a" />
          {/* Jacket detail */}
          <line x1="155" y1="265" x2="155" y2="370" stroke="#252525" strokeWidth="1" />
          {/* Belt */}
          <rect x="133" y="345" width="44" height="6" rx="2" fill="#222" />
          <rect x="152" y="344" width="8" height="8" rx="1" fill="#333" />
          {/* Neck */}
          <rect x="147" y="240" width="16" height="22" rx="4" fill="#2a2a2a" />
          {/* Head */}
          <ellipse cx="155" cy="225" rx="22" ry="26" fill="#1e1e1e" />
          {/* Beanie / cap */}
          <path d="M133 220 Q135 195, 155 192 Q175 195, 177 220" fill="#e03000" />
          <rect x="132" y="218" width="46" height="6" rx="2" fill="#c02800" />
          {/* Eye glint */}
          <circle cx="148" cy="226" r="2" fill="#555" />
          <circle cx="164" cy="226" r="2" fill="#555" />

          {/* Arms holding camera */}
          {/* Left arm - supporting camera */}
          <path d="M130 270 Q110 290, 115 310 Q118 320, 130 315" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Right arm - pressing shutter */}
          <path d="M180 270 Q200 285, 195 310 Q192 325, 180 320" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" fill="none" />

          {/* Camera body */}
          <g
            className="camera-element"
            onMouseEnter={() => setCameraHovered(true)}
            onMouseLeave={() => setCameraHovered(false)}
            style={{ cursor: 'none' }}
          >
            <rect x="120" y="295" width="70" height="40" rx="4" fill="#222" stroke="#333" strokeWidth="1" />
            {/* Viewfinder */}
            <rect x="140" y="288" width="20" height="10" rx="2" fill="#282828" />
            {/* Lens barrel */}
            <circle cx="155" cy="315" r="16" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
            <circle cx="155" cy="315" r="11" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
            <circle cx="155" cy="315" r="7" fill="#0a0a0a" />
            {/* Lens glass */}
            <circle cx="155" cy="315" r="5" fill="#151520" />
            {/* Lens shine */}
            <circle
              className="lens-shine"
              cx="152" cy="312" r="3"
              fill="rgba(150,200,255,0.6)"
              opacity={cameraHovered ? 1 : 0}
              style={{ transition: 'opacity 0.3s' }}
            />
            {cameraHovered && (
              <circle cx="155" cy="315" r="18" fill="none" stroke="rgba(100,180,255,0.15)" strokeWidth="2" />
            )}
            {/* Shutter button */}
            <circle cx="175" cy="296" r="4" fill="#333" />
            {/* Flash hotshoe */}
            <rect x="147" y="286" width="16" height="3" rx="1" fill="#2a2a2a" />
          </g>
        </g>

        {/* Gear bag strap */}
        <path d="M172 268 Q195 300, 200 370 Q202 400, 195 430" stroke="#282828" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="188" y="420" width="22" height="35" rx="4" fill="#1a1a1a" stroke="#252525" strokeWidth="1" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════
// SVG CHARACTER — MODEL (Right)
// ═══════════════════════════════════════════════
function ModelCharacter() {
  return (
    <div className="hero-character-model">
      <svg viewBox="0 0 260 460" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <g style={{ animation: 'idleBreathe 4s ease-in-out infinite', transformOrigin: '130px 440px' }}>
          {/* Legs — natural pose, weight on one leg */}
          <path d="M120 360 L110 455" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
          <path d="M145 360 L160 450" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
          {/* Heels */}
          <path d="M105 453 L100 458 L118 458 L115 453" fill="#1a1a1a" />
          <path d="M155 448 L152 458 L170 458 L165 448" fill="#1a1a1a" />

          {/* Body — elegant, slight S-curve pose */}
          <path d="M110 235 C105 270, 105 320, 120 360 L145 360 C160 320, 162 270, 155 235 Z" fill="#1a1a1a" />

          {/* Dress/outfit detail — fitted silhouette */}
          <path d="M112 280 Q130 275, 153 280" stroke="#222" strokeWidth="0.5" fill="none" />
          <path d="M115 310 Q130 305, 150 310" stroke="#222" strokeWidth="0.5" fill="none" />

          {/* Waist accent */}
          <path d="M114 290 Q132 285, 152 290" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3" fill="none" />

          {/* Neck */}
          <rect x="126" y="215" width="12" height="22" rx="4" fill="#2a2a2a" />

          {/* Head */}
          <ellipse cx="132" cy="200" rx="20" ry="24" fill="#1e1e1e" />

          {/* Hair — flowing */}
          <path d="M112 195 Q110 170, 120 160 Q132 152, 145 160 Q155 170, 152 195" fill="#111" />
          <path d="M112 195 Q105 220, 100 250" stroke="#111" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M152 195 Q158 215, 162 240" stroke="#111" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Face details */}
          <circle cx="126" cy="200" r="1.5" fill="#555" />
          <circle cx="140" cy="200" r="1.5" fill="#555" />
          <path d="M128 208 Q133 212, 138 208" stroke="#333" strokeWidth="0.8" fill="none" />

          {/* Left arm — resting on hip */}
          <path d="M110 245 Q95 275, 100 300 Q105 310, 112 305" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* Right arm — relaxed at side */}
          <path d="M155 245 Q170 280, 168 320 Q167 340, 163 355" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* Hand details */}
          <circle cx="100" cy="303" r="5" fill="#1a1a1a" />
          <circle cx="163" cy="357" r="5" fill="#1a1a1a" />

          {/* Earring */}
          <circle cx="113" cy="205" r="2" fill="var(--accent)" opacity="0.5" />

          {/* Subtle necklace */}
          <path d="M122 232 Q132 240, 142 232" stroke="#333" strokeWidth="0.8" fill="none" />
          <circle cx="132" cy="239" r="2" fill="#333" />
        </g>
      </svg>
    </div>
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
// HERO SECTION — CINEMATIC WITH CHARACTERS
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

  const tx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 })
  const ty = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 30 })
  const tx2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), { stiffness: 60, damping: 20 })
  const ty2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 })

  const heroImages = [
    IMAGES.rebellion[0], IMAGES.raw[0], IMAGES.borcelle[0],
    IMAGES.rebellion[4], IMAGES.raw[1], IMAGES.borcelle[1],
  ]

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      {/* Image grid background */}
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

      {/* Cinematic overlay on top of images */}
      <div className="hero-cinematic-bg" />

      {/* Light beams */}
      <div className="hero-light-beam" />
      <div className="hero-light-beam" />
      <div className="hero-light-beam" />

      {/* Characters */}
      <div className="hero-characters">
        <PhotographerCharacter />
        <ModelCharacter />
      </div>

      {/* Floor shadows */}
      <div className="hero-floor-shadow left" />
      <div className="hero-floor-shadow right" />

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
      <BusinessCard />
      <Contact />
    </motion.main>
  )
}
