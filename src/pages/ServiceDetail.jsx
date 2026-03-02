import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES, IMAGES } from '../data'

export default function ServiceDetail() {
    const { id } = useParams()
    const service = SERVICES.find(s => s.id === id) || SERVICES[0]

    return (
        <motion.main
            className="service-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '32px 40px', zIndex: 100, display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/" style={{ fontFamily: 'Anton, sans-serif', color: 'var(--white)', textDecoration: 'none', fontSize: '24px' }}>SXS</Link>
                <Link to="/" style={{ fontFamily: 'Space Mono', color: 'var(--off-white)', textDecoration: 'none', fontSize: '12px', textTransform: 'uppercase' }}>Close (Esc)</Link>
            </nav>

            <div style={{ flex: 1, paddingTop: '20vh', paddingLeft: '4vw', paddingRight: '4vw', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                    style={{ fontSize: '12px', fontFamily: 'Space Mono', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {service.tag}
                </motion.div>

                <motion.h1
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(50px, 8vw, 120px)', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '40px' }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    {service.title}
                </motion.h1>

                <motion.p
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', lineHeight: 1.6, color: 'var(--off-white)', maxWidth: '600px', marginBottom: '80px' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {service.details}
                </motion.p>

                {/* Decorative Images */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingBottom: '100px' }}>
                    <motion.img
                        src={IMAGES.rebellion[0]}
                        style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'grayscale(100%)' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    <motion.img
                        src={IMAGES.raw[0]}
                        style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />
                </div>
            </div>
        </motion.main>
    )
}
