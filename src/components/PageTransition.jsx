import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition() {
    const location = useLocation()
    const [isPresent, setIsPresent] = useState(false)

    // Trigger animation on route change
    useEffect(() => {
        setIsPresent(true)
        const t = setTimeout(() => setIsPresent(false), 1200)
        return () => clearTimeout(t)
    }, [location.pathname])

    // Generate chaotic paths
    const paths = useMemo(() => {
        const arr = []
        for (let p = 0; p < 3; p++) {
            let d = `M ${Math.random() * 100} ${Math.random() * 100}`
            for (let i = 0; i < 400; i++) {
                d += ` L ${Math.random() * 100} ${Math.random() * 100}`
            }
            arr.push(d)
        }
        return arr
    }, [])

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    key="transition"
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        pointerEvents: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        {paths.map((d, i) => (
                            <motion.path
                                key={i}
                                d={d}
                                fill="none"
                                stroke="var(--black)"
                                strokeWidth="1.5"
                                vectorEffect="non-scaling-stroke"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "linear" }}
                            />
                        ))}
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
