import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ loaded }) {
    // 5 black stripes for the wipe effect
    const stripes = [0, 1, 2, 3, 4]

    return (
        <AnimatePresence>
            {!loaded && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9000,
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'
                    }}
                >
                    {/* Base Black Background Layer that fades out */}
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.8 }} // Wait for stripes to start moving
                        style={{
                            position: 'absolute', inset: 0, background: 'var(--black)', zIndex: 9001
                        }}
                    />

                    {/* Loading Content on top of background */}
                    <motion.div
                        style={{ zIndex: 9002 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div style={{
                            fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(32px, 6vw, 80px)',
                            color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.1em',
                            textAlign: 'center'
                        }}>
                            SAHIL<span style={{ color: 'var(--accent)' }}>×</span>STUDIOS
                        </div>

                        {/* Progress Bar */}
                        <div style={{
                            marginTop: '40px', width: '240px', height: '2px',
                            background: 'rgba(240,236,228,0.1)', overflow: 'hidden', margin: '40px auto 0'
                        }}>
                            <motion.div
                                style={{ height: '100%', background: 'var(--accent)' }}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.8, ease: 'linear' }}
                            />
                        </div>
                        <div style={{
                            marginTop: '12px', fontFamily: 'Space Mono, monospace', fontSize: '11px',
                            letterSpacing: '0.3em', color: 'var(--off-white)', textTransform: 'uppercase',
                            opacity: 0.5, textAlign: 'center'
                        }}>
                            Loading Portfolio...
                        </div>
                    </motion.div>

                    {/* The Black Scribble Lines Wipe Overlay */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 9003,
                        display: 'flex', width: '100vw', height: '100vh'
                    }}>
                        {stripes.map((i) => (
                            <motion.div
                                key={i}
                                initial={{ scaleY: 1 }}
                                exit={{ scaleY: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: 0.3 + i * 0.08 // Staggered wipe
                                }}
                                style={{
                                    flex: 1,
                                    background: 'var(--black)',
                                    transformOrigin: 'bottom'
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
