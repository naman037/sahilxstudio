import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGES } from '../data'

// All project images for the photo explosion
const ALL_PHOTOS = [
    ...IMAGES.raw,
    ...IMAGES.rebellion.slice(0, 4),
    ...IMAGES.borcelle,
]

// ═══════════════════════════════════════════════
// CAMERA BAG SVG
// ═══════════════════════════════════════════════
function CameraBagSVG({ hovered }) {
    return (
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="bag-svg">
            {/* Bag shadow on floor */}
            <ellipse cx="160" cy="268" rx="120" ry="10" fill="rgba(0,0,0,0.5)" />

            {/* Bag body */}
            <rect x="60" y="100" width="200" height="150" rx="12" fill="#1a1714" stroke="#2e2a24" strokeWidth="2" />

            {/* Leather texture lines */}
            <line x1="80" y1="120" x2="80" y2="240" stroke="#252119" strokeWidth="0.5" />
            <line x1="240" y1="120" x2="240" y2="240" stroke="#252119" strokeWidth="0.5" />

            {/* Front pocket */}
            <rect x="90" y="155" width="140" height="75" rx="6" fill="#151210" stroke="#2a2620" strokeWidth="1.5" />

            {/* Pocket zipper */}
            <line x1="100" y1="160" x2="220" y2="160" stroke="#3d3730" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="218" cy="160" r="3" fill="#4a4238" />

            {/* Top flap */}
            <path d="M60 112 C60 95, 75 80, 95 78 L225 78 C245 80, 260 95, 260 112" fill="#1e1b16" stroke="#2e2a24" strokeWidth="2" />

            {/* Flap stitching */}
            <path d="M75 100 L245 100" stroke="#2a2620" strokeWidth="0.8" strokeDasharray="4 3" />

            {/* Main buckle / clasp */}
            <rect x="140" y="90" width="40" height="18" rx="3" fill="#3d3730" stroke="#4a4238" strokeWidth="1" />
            <rect x="155" y="93" width="10" height="12" rx="2" fill="#554d42" />

            {/* Handle */}
            <path d="M120 78 C120 55, 135 45, 160 45 C185 45, 200 55, 200 78" stroke="#2a2620" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M120 78 C120 55, 135 45, 160 45 C185 45, 200 55, 200 78" stroke="#3d3730" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Side straps */}
            <rect x="50" y="140" width="14" height="60" rx="3" fill="#1e1b16" stroke="#2e2a24" strokeWidth="1" />
            <rect x="256" y="140" width="14" height="60" rx="3" fill="#1e1b16" stroke="#2e2a24" strokeWidth="1" />

            {/* Strap buckles */}
            <circle cx="57" cy="155" r="3" fill="#4a4238" stroke="#554d42" strokeWidth="0.5" />
            <circle cx="263" cy="155" r="3" fill="#4a4238" stroke="#554d42" strokeWidth="0.5" />

            {/* Brand label on bag */}
            <rect x="135" y="175" width="50" height="20" rx="2" fill="#0d0b09" stroke="#2a2620" strokeWidth="0.5" />
            <text x="160" y="189" textAnchor="middle" fill="#4a4238" fontSize="8" fontFamily="'Space Mono', monospace" letterSpacing="0.1em">SXS</text>

            {/* Subtle shine on hovering */}
            {hovered && (
                <rect x="60" y="100" width="200" height="150" rx="12" fill="rgba(255,200,100,0.03)" />
            )}
        </svg>
    )
}

// ═══════════════════════════════════════════════
// EQUIPMENT ITEMS (appear on hover)
// ═══════════════════════════════════════════════
const EQUIPMENT = [
    {
        id: 'camera',
        label: 'Camera',
        svg: (
            <svg viewBox="0 0 80 56" fill="none">
                <rect x="8" y="12" width="64" height="38" rx="5" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
                <rect x="30" y="5" width="20" height="10" rx="2" fill="#222" />
                <circle cx="40" cy="31" r="14" fill="#111" stroke="#333" strokeWidth="1.5" />
                <circle cx="40" cy="31" r="10" fill="#0a0a0a" stroke="#222" strokeWidth="1" />
                <circle cx="40" cy="31" r="6" fill="#151520" />
                <circle cx="37" cy="28" r="2.5" fill="rgba(150,200,255,0.3)" />
                <circle cx="62" cy="14" r="3" fill="#333" />
            </svg>
        ),
        x: -160, y: 30, rotation: -15, width: 80,
    },
    {
        id: 'lens',
        label: 'Lens',
        svg: (
            <svg viewBox="0 0 50 70" fill="none">
                <rect x="5" y="0" width="40" height="65" rx="8" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
                <circle cx="25" cy="25" r="16" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
                <circle cx="25" cy="25" r="11" fill="#0a0a0a" />
                <circle cx="25" cy="25" r="7" fill="#151520" />
                <rect x="8" y="48" width="34" height="4" rx="1" fill="#252525" />
                <rect x="8" y="55" width="34" height="3" rx="1" fill="#222" />
            </svg>
        ),
        x: 165, y: 45, rotation: 25, width: 45,
    },
    {
        id: 'tripod',
        label: 'Tripod',
        svg: (
            <svg viewBox="0 0 60 90" fill="none">
                <rect x="26" y="0" width="8" height="35" rx="2" fill="#222" stroke="#333" strokeWidth="1" />
                <line x1="30" y1="35" x2="10" y2="88" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
                <line x1="30" y1="35" x2="30" y2="88" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
                <line x1="30" y1="35" x2="50" y2="88" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
                <circle cx="30" cy="35" r="4" fill="#333" />
            </svg>
        ),
        x: -110, y: 10, rotation: -30, width: 50,
    },
    {
        id: 'flash',
        label: 'Flash',
        svg: (
            <svg viewBox="0 0 36 60" fill="none">
                <rect x="6" y="20" width="24" height="38" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                <rect x="4" y="0" width="28" height="22" rx="3" fill="#222" stroke="#333" strokeWidth="1" />
                <rect x="8" y="3" width="20" height="16" rx="2" fill="#ffe8c0" opacity="0.15" />
                <rect x="14" y="55" width="8" height="5" rx="1" fill="#333" />
            </svg>
        ),
        x: 120, y: 15, rotation: 12, width: 36,
    },
    {
        id: 'filmroll',
        label: 'Film',
        svg: (
            <svg viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
                <circle cx="22" cy="22" r="8" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
                <circle cx="22" cy="22" r="3" fill="#333" />
                {[0, 60, 120, 180, 240, 300].map((ang) => (
                    <rect key={ang} x="20" y="2" width="4" height="6" rx="1" fill="#2a2a2a"
                        transform={`rotate(${ang} 22 22)`} />
                ))}
            </svg>
        ),
        x: -70, y: 55, rotation: 0, width: 40,
    },
]

// ═══════════════════════════════════════════════
// FLYING PHOTO (polaroid-style card)
// ═══════════════════════════════════════════════
function FlyingPhoto({ src, index, total }) {
    const angle = (index / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.8
    const distance = 200 + Math.random() * 350
    const endX = Math.cos(angle) * distance
    const endY = -Math.abs(Math.sin(angle) * distance) - 100 - Math.random() * 200
    const rotation = (Math.random() - 0.5) * 60

    return (
        <motion.div
            className="bag-photo"
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{
                x: endX,
                y: endY,
                scale: 1,
                rotate: rotation,
                opacity: [1, 1, 1, 0],
            }}
            transition={{
                duration: 1.8 + Math.random() * 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.04,
            }}
        >
            <img src={src} alt="" loading="eager" />
        </motion.div>
    )
}

// ═══════════════════════════════════════════════
// BAG INTRO — MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function BagIntro({ onEnter }) {
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [zooming, setZooming] = useState(false)
    const [exiting, setExiting] = useState(false)
    const bagRef = useRef(null)

    const handleClick = useCallback(() => {
        if (clicked) return
        setClicked(true)

        // After photos explode, start zoom
        setTimeout(() => setZooming(true), 1400)

        // After zoom, exit
        setTimeout(() => setExiting(true), 2200)

        // Reveal main site
        setTimeout(() => onEnter(), 2800)
    }, [clicked, onEnter])

    return (
        <AnimatePresence>
            {!exiting && (
                <motion.div
                    className="bag-intro"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Spotlight beam */}
                    <div className="bag-spotlight" />

                    {/* Subtle ambient particles */}
                    <div className="bag-dust">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="dust-particle"
                                style={{
                                    left: `${30 + Math.random() * 40}%`,
                                    top: `${10 + Math.random() * 60}%`,
                                    width: 1 + Math.random() * 2,
                                    height: 1 + Math.random() * 2,
                                }}
                                animate={{
                                    y: [0, -20 - Math.random() * 30, 0],
                                    opacity: [0, 0.4, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 3,
                                    delay: Math.random() * 3,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </div>

                    {/* Floor reflection line */}
                    <div className="bag-floor-line" />

                    {/* Equipment items (hover reveal) */}
                    <div className="bag-equipment-area">
                        {EQUIPMENT.map((eq) => (
                            <motion.div
                                key={eq.id}
                                className="bag-equipment-item"
                                style={{
                                    width: eq.width,
                                    position: 'absolute',
                                    left: `calc(50% + ${eq.x}px)`,
                                    bottom: `${eq.y}px`,
                                }}
                                initial={{ opacity: 0, y: -40, rotate: 0, scale: 0.5 }}
                                animate={hovered && !clicked ? {
                                    opacity: 1,
                                    y: 0,
                                    rotate: eq.rotation,
                                    scale: 1,
                                } : {
                                    opacity: 0,
                                    y: -40,
                                    rotate: 0,
                                    scale: 0.5,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: hovered ? EQUIPMENT.indexOf(eq) * 0.08 : 0,
                                }}
                            >
                                {eq.svg}
                            </motion.div>
                        ))}
                    </div>

                    {/* The Camera Bag */}
                    <motion.div
                        ref={bagRef}
                        className="bag-container"
                        onMouseEnter={() => !clicked && setHovered(true)}
                        onMouseLeave={() => !clicked && setHovered(false)}
                        onClick={handleClick}
                        animate={zooming ? {
                            scale: 15,
                            opacity: 0,
                        } : {
                            scale: hovered ? 1.05 : 1,
                        }}
                        transition={zooming ? {
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1],
                        } : {
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <CameraBagSVG hovered={hovered} />

                        {/* Click prompt */}
                        <motion.div
                            className="bag-click-hint"
                            animate={{ opacity: hovered && !clicked ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Click to Open
                        </motion.div>
                    </motion.div>

                    {/* Photo explosion */}
                    {clicked && (
                        <div className="bag-photos-container">
                            {ALL_PHOTOS.map((src, i) => (
                                <FlyingPhoto key={i} src={src} index={i} total={ALL_PHOTOS.length} />
                            ))}
                        </div>
                    )}

                    {/* Bottom text */}
                    <motion.div
                        className="bag-bottom-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: clicked ? 0 : 0.3 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <span className="bag-brand">SAHIL<span style={{ color: 'var(--accent)' }}>×</span>STUDIOS</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
