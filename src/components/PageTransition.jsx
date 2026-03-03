import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition() {
    const location = useLocation()
    const [isPresent, setIsPresent] = useState(false)

    // Trigger animation on route change
    useEffect(() => {
        setIsPresent(true)
        const t = setTimeout(() => setIsPresent(false), 1000)
        return () => clearTimeout(t)
    }, [location.pathname])

    // 5 horizontal bars for smooth curtain wipe
    const bars = [0, 1, 2, 3, 4]

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    key="transition"
                    className="page-transition-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                >
                    {bars.map((i) => (
                        <motion.div
                            key={i}
                            className="page-transition-bar"
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.76, 0, 0.24, 1],
                                delay: 0.15 + i * 0.06,
                            }}
                            style={{ transformOrigin: i % 2 === 0 ? 'top' : 'bottom' }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
