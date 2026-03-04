import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGES } from '../data'

// All project images — duplicate to fill the sphere densely
const BASE_PHOTOS = [
    ...IMAGES.raw,
    ...IMAGES.rebellion.slice(0, 4),
    ...IMAGES.borcelle,
]
const ALL_PHOTOS = [...BASE_PHOTOS, ...BASE_PHOTOS.slice(0, 6)] // ~16 cards for density

// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════
const SPHERE_RADIUS = 260
const FOV = 700
const TILT_X = -0.15 // slight top-down tilt for cinematic angle

// Pre-calculate Fibonacci sphere layout
const SPHERE_POINTS = ALL_PHOTOS.map((_src, i) => {
    const total = ALL_PHOTOS.length
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    const yNorm = 1 - (i / (total - 1)) * 2
    const r = Math.sqrt(1 - yNorm * yNorm)
    const baseTheta = goldenAngle * i

    // Random stagger delay for entrance
    const staggerDelay = 200 + i * 80 + Math.random() * 200

    // Scatter direction for exit
    const scatterX = (Math.random() - 0.5) * 1200
    const scatterY = (Math.random() - 0.5) * 800
    const scatterRot = (Math.random() - 0.5) * 90

    return { yNorm, r, baseTheta, index: i, staggerDelay, scatterX, scatterY, scatterRot }
})

// 3D → 2D projection with rotation on two axes
function project3D(pt, angleY, angleX) {
    const theta = pt.baseTheta + angleY

    // Sphere coordinates
    let x = Math.cos(theta) * pt.r * SPHERE_RADIUS
    let y = pt.yNorm * SPHERE_RADIUS
    let z = Math.sin(theta) * pt.r * SPHERE_RADIUS

    // Apply X-axis tilt (cinematic angle)
    const cosX = Math.cos(angleX)
    const sinX = Math.sin(angleX)
    const y2 = y * cosX - z * sinX
    const z2 = y * sinX + z * cosX
    y = y2
    z = z2

    // Perspective projection
    const scale = FOV / (FOV + z)
    return {
        x: x * scale,
        y: y * scale,
        scale,
        z,
        depthNorm: (z + SPHERE_RADIUS) / (SPHERE_RADIUS * 2), // 0 = far, 1 = near
    }
}

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function BagIntro({ onEnter }) {
    const [phase, setPhase] = useState('idle')
    const [angleY, setAngleY] = useState(0)
    const [elapsed, setElapsed] = useState(0)
    const enterCalled = useRef(false)
    const rafRef = useRef(null)
    const startTime = useRef(null)

    // Phase timeline
    useEffect(() => {
        const t1 = setTimeout(() => setPhase('forming'), 400)
        const t2 = setTimeout(() => setPhase('hero'), 3000)
        const t3 = setTimeout(() => setPhase('exit'), 5000)
        const t4 = setTimeout(() => {
            if (!enterCalled.current) {
                enterCalled.current = true
                onEnter()
            }
        }, 6000)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
            clearTimeout(t4)
        }
    }, [onEnter])

    // Rotation animation with speed ramping
    useEffect(() => {
        if (phase !== 'forming' && phase !== 'hero' && phase !== 'exit') {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            return
        }

        if (!startTime.current) startTime.current = performance.now()
        let last = performance.now()

        function tick(now) {
            const dt = now - last
            last = now
            const totalElapsed = now - startTime.current

            // Speed curve: accelerate in forming, decelerate in hero
            let speed
            if (phase === 'forming') {
                // Ease-in: starts slow, builds up
                const t = Math.min(totalElapsed / 2600, 1)
                speed = 0.0003 + t * 0.0012
            } else if (phase === 'hero') {
                // Majestic slow rotation
                speed = 0.0003
            } else {
                // Exit: speed up as it flies away
                speed = 0.002
            }

            setAngleY(a => a + speed * dt)
            setElapsed(totalElapsed)
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [phase])

    // Skip handler
    const handleSkip = useCallback(() => {
        if (phase === 'exit' || phase === 'done') return
        setPhase('exit')
        setTimeout(() => {
            if (!enterCalled.current) {
                enterCalled.current = true
                onEnter()
            }
        }, 900)
    }, [phase, onEnter])

    const isActive = phase === 'forming' || phase === 'hero'
    const isExiting = phase === 'exit'

    // Dynamic X tilt — subtle breathing motion
    const breathTilt = TILT_X + Math.sin(elapsed * 0.0008) * 0.05

    // Particle configs — pre-computed for stable keys
    const particles = useMemo(() =>
        Array.from({ length: 30 }).map((_, i) => ({
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            size: 1 + Math.random() * 3,
            duration: 3 + Math.random() * 5,
            delay: Math.random() * 4,
            drift: (Math.random() - 0.5) * 60,
        })),
        [])

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="sphere-intro"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={handleSkip}
                >
                    {/* Cinematic ambient gradient */}
                    <div className="sphere-ambient" />

                    {/* Volumetric light rays */}
                    <div className="sphere-light-rays" style={{
                        opacity: phase === 'hero' ? 0.12 : isActive ? 0.05 : 0,
                    }} />

                    {/* Enhanced floating particles */}
                    <div className="sphere-dust">
                        {particles.map((p, i) => (
                            <motion.div
                                key={i}
                                className="sphere-dust-particle"
                                style={{
                                    left: p.left,
                                    top: p.top,
                                    width: p.size,
                                    height: p.size,
                                }}
                                animate={{
                                    y: [0, -40 - p.drift, 0],
                                    x: [0, p.drift * 0.3, 0],
                                    opacity: [0, 0.6, 0],
                                    scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: p.duration,
                                    delay: p.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* PULSING RADIAL GLOW — behind sphere */}
                    <div
                        className="sphere-glow"
                        style={{
                            opacity: phase === 'hero' ? 0.9 : isActive ? 0.3 : 0,
                            transform: `translate(-50%, -50%) scale(${phase === 'hero' ? 1.3 : 1})`,
                        }}
                    />
                    <div
                        className="sphere-glow-pulse"
                        style={{
                            opacity: phase === 'hero' ? 0.5 : 0,
                        }}
                    />

                    {/* ORBITAL RINGS — more dramatic */}
                    <div className="orbital-lines">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`orbital-ring orbital-ring-${i}`}
                                style={{ opacity: isActive ? (phase === 'hero' ? 0.2 : 0.1) : 0 }}
                            />
                        ))}
                    </div>

                    {/* ═══ THE IMAGE SPHERE ═══ */}
                    <div
                        className="sphere-stage"
                        style={{
                            opacity: isExiting ? 0 : isActive ? 1 : 0,
                            transform: isExiting ? 'scale(3)' : isActive ? 'scale(1)' : 'scale(0.3)',
                            transition: isExiting
                                ? 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.76,0,0.24,1)'
                                : 'opacity 1s ease, transform 1.5s cubic-bezier(0.16,1,0.3,1)',
                        }}
                    >
                        {SPHERE_POINTS.map((pt) => {
                            const proj = project3D(pt, angleY, breathTilt)
                            const cardW = 110
                            const cardH = 140

                            // Depth-based effects
                            const depthOpacity = 0.15 + proj.depthNorm * 0.85
                            const depthBlur = proj.depthNorm < 0.3 ? (0.3 - proj.depthNorm) * 6 : 0
                            const depthBrightness = 0.5 + proj.depthNorm * 0.5

                            // Staggered entrance
                            const hasAppeared = isActive && elapsed > pt.staggerDelay
                            const appearProgress = isActive
                                ? Math.min(1, Math.max(0, (elapsed - pt.staggerDelay) / 500))
                                : 0

                            // Exit scatter
                            const exitProgress = isExiting ? Math.min(1, elapsed / 800) : 0

                            let cardOpacity, cardTransform
                            if (isExiting) {
                                const ep = exitProgress
                                cardOpacity = 1 - ep
                                cardTransform = `scale(${proj.scale * (1 + ep * 2)}) rotate(${pt.scatterRot * ep}deg)`
                            } else if (hasAppeared) {
                                const bounce = 1 + Math.sin(appearProgress * Math.PI) * 0.15
                                cardOpacity = depthOpacity * appearProgress
                                cardTransform = `scale(${proj.scale * (appearProgress < 1 ? bounce : 1)})`
                            } else {
                                cardOpacity = 0
                                cardTransform = `scale(${proj.scale * 0.3})`
                            }

                            return (
                                <div
                                    key={pt.index}
                                    className="sphere-card"
                                    style={{
                                        width: cardW,
                                        height: cardH,
                                        left: `calc(50% + ${proj.x}px - ${cardW / 2}px)`,
                                        top: `calc(50% + ${proj.y}px - ${cardH / 2}px)`,
                                        transform: cardTransform,
                                        zIndex: Math.round(proj.depthNorm * 100),
                                        opacity: cardOpacity,
                                        filter: depthBlur > 0.5
                                            ? `blur(${depthBlur}px) brightness(${depthBrightness})`
                                            : `brightness(${depthBrightness})`,
                                    }}
                                >
                                    <img src={ALL_PHOTOS[pt.index]} alt="" loading="eager" />

                                    {/* Front card shine effect */}
                                    {proj.depthNorm > 0.75 && (
                                        <div
                                            className="sphere-card-shine"
                                            style={{ opacity: (proj.depthNorm - 0.75) * 2 }}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Progress bar */}
                    <div className="sphere-progress-bar" style={{ opacity: isExiting ? 0 : 0.6 }}>
                        <div
                            className="sphere-progress-fill"
                            style={{
                                width: phase === 'idle' ? '0%'
                                    : phase === 'forming' ? '50%'
                                        : phase === 'hero' ? '90%'
                                            : '100%'
                            }}
                        />
                    </div>

                    {/* Skip hint */}
                    <motion.div
                        className="sphere-skip-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExiting ? 0 : 0.25 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    >
                        Click anywhere to skip
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
