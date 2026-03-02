import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IMAGES } from '../data'

export default function AboutDetail() {
    return (
        <motion.main
            className="about-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '32px 40px', zIndex: 100, display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/" style={{ fontFamily: 'Anton, sans-serif', color: 'var(--white)', textDecoration: 'none', fontSize: '24px' }}>SXS</Link>
                <Link to="/" style={{ fontFamily: 'Space Mono', color: 'var(--off-white)', textDecoration: 'none', fontSize: '12px', textTransform: 'uppercase' }}>Close (Esc)</Link>
            </nav>

            <div style={{ paddingTop: '20vh', paddingLeft: '4vw', paddingRight: '4vw', maxWidth: '1000px', margin: '0 auto', paddingBottom: '120px' }}>
                <motion.h1
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 12vw, 150px)', lineHeight: 0.85, textTransform: 'uppercase', marginBottom: '40px' }}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    BEHIND<br />THE<span style={{ color: 'var(--accent)' }}>LENS</span>
                </motion.h1>

                <motion.div
                    style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '60px', alignItems: 'start', marginTop: '80px' }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img
                        src={IMAGES.rebellion[4]}
                        alt="Sahil Singh Portrait"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                    />

                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', lineHeight: 1.6, color: 'var(--off-white)', opacity: 0.9 }}>
                        <p style={{ marginBottom: '24px' }}>
                            I am Sahil Singh, an independent cinematographer and photographer based in Jodhpur, India. For the past three years, my work has orbited around the underground music scene, high-energy event coverage, and stark travel documentary.
                        </p>
                        <p style={{ marginBottom: '24px' }}>
                            My aesthetic is heavily defined by high-contrast digital brutalism—emulating film stocks while pushing the boundaries of modern digital sensors. I embrace grain, intense contrast, and deliberate lens imperfections to craft imagery that feels raw and authentic.
                        </p>
                        <p style={{ marginBottom: '48px' }}>
                            Whether I am directing a chaotic rap video with a skeleton crew or capturing the serene, monolithic architecture of an ancient city, my goal is always the same: to make you feel something visceral.
                        </p>

                        <a href="https://wa.me/918920866483" target="_blank" rel="noopener noreferrer" className="magnetic-btn" style={{ borderColor: '#25D366', color: '#25D366', display: 'inline-flex', padding: '16px 32px' }}>
                            WhatsApp Me
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.main>
    )
}
