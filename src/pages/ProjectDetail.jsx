import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { WORKS, IMAGES } from '../data'

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const project = WORKS.find(w => w.id === id) || WORKS[0]

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') navigate('/')
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [navigate])

    // Mocking some related images for the vertical scroll
    const gallery = [
        project.img,
        IMAGES.raw[Math.floor(Math.random() * IMAGES.raw.length)],
        IMAGES.rebellion[Math.floor(Math.random() * IMAGES.rebellion.length)],
        IMAGES.borcelle[Math.floor(Math.random() * IMAGES.borcelle.length)],
    ]

    return (
        <motion.main
            className="project-detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center center' }}
        >
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '32px 40px', zIndex: 100, display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/" style={{ fontFamily: 'Anton, sans-serif', color: 'var(--white)', textDecoration: 'none', fontSize: '24px' }}>SXS</Link>
                <Link to="/" style={{ fontFamily: 'Space Mono', color: 'var(--off-white)', textDecoration: 'none', fontSize: '12px', textTransform: 'uppercase' }}>Close (Esc)</Link>
            </nav>

            <div style={{ paddingTop: '20vh', paddingLeft: '4vw', paddingRight: '4vw', maxWidth: '1400px', margin: '0 auto' }}>
                <motion.h1
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 12vw, 180px)', lineHeight: 0.85, textTransform: 'uppercase', marginBottom: '24px' }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    {project.name}
                </motion.h1>

                <motion.div
                    style={{ display: 'flex', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', marginBottom: '80px', flexWrap: 'wrap' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div>
                        <div style={{ fontSize: '10px', fontFamily: 'Space Mono', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>Role</div>
                        <div style={{ fontSize: '16px', fontFamily: 'Inter' }}>{project.type}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '10px', fontFamily: 'Space Mono', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>Year</div>
                        <div style={{ fontSize: '16px', fontFamily: 'Inter' }}>{project.year}</div>
                    </div>
                    <div style={{ maxWidth: '400px' }}>
                        <div style={{ fontSize: '10px', fontFamily: 'Space Mono', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>Description</div>
                        <div style={{ fontSize: '16px', fontFamily: 'Inter', opacity: 0.7, lineHeight: 1.5 }}>
                            {project.desc || 'An immersive visual experience driven by high-contrast cinematography and meticulous color grading.'}
                        </div>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '120px' }}>
                    {gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={img} alt={`Project frame ${i}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.main>
    )
}
