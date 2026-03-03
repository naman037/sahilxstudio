import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ═══════════════════════════════════════════════
// TRANSITION CONTEXT
// ═══════════════════════════════════════════════
const TransitionContext = createContext(null)

export function useTransition() {
    return useContext(TransitionContext)
}

export function TransitionProvider({ children }) {
    const [phase, setPhase] = useState('idle') // idle | enter | hold | exit
    const transitionData = useRef({ name: '', img: '', path: '' })
    const navigate = useRef(null)

    const startTransition = useCallback((name, img, path, nav) => {
        if (phase !== 'idle') return
        transitionData.current = { name, img, path }
        navigate.current = nav
        setPhase('enter')
    }, [phase])

    const value = { phase, setPhase, startTransition, transitionData, navigate }

    return (
        <TransitionContext.Provider value={value}>
            {children}
            <ChaoticTransition />
        </TransitionContext.Provider>
    )
}

// ═══════════════════════════════════════════════
// CHAOTIC WHITE-LINE WEB TRANSITION (Canvas)
// ═══════════════════════════════════════════════
function ChaoticTransition() {
    const { phase, setPhase, transitionData, navigate } = useTransition()
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const animRef = useRef(null)
    const linesRef = useRef([])
    const particlesRef = useRef([])
    const frameCountRef = useRef(0)
    const projectImgRef = useRef(null)
    const imgLoadedRef = useRef(false)

    // Pre-load the project image when transition starts
    useEffect(() => {
        if (phase === 'enter') {
            imgLoadedRef.current = false
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
                projectImgRef.current = img
                imgLoadedRef.current = true
            }
            img.onerror = () => {
                imgLoadedRef.current = true // proceed without image
            }
            img.src = transitionData.current.img
        }
    }, [phase, transitionData])

    // Main animation loop
    useEffect(() => {
        if (phase === 'idle') return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const dpr = window.devicePixelRatio || 1
        const W = window.innerWidth
        const H = window.innerHeight
        canvas.width = W * dpr
        canvas.height = H * dpr
        canvas.style.width = W + 'px'
        canvas.style.height = H + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const cx = W / 2
        const cy = H / 2

        linesRef.current = []
        particlesRef.current = []
        frameCountRef.current = 0

        let opacity = 0
        let fadeOutStarted = false
        let fadeOutOpacity = 1
        let navigated = false
        const maxLines = 220
        const linesPerFrame = 10
        const maxParticles = 80
        const particlesPerFrame = 4
        const buildFrames = 42 // ~0.7s at 60fps
        const holdFrames = 12  // ~0.2s hold
        const fadeFrames = 24  // ~0.4s fade out

        // Generate a single random line
        function makeLine() {
            const angle = Math.random() * Math.PI * 2
            const dist = Math.random() * 150
            const ox = cx + Math.cos(angle) * dist + (Math.random() - 0.5) * W * 0.4
            const oy = cy + Math.sin(angle) * dist + (Math.random() - 0.5) * H * 0.4
            const len = 80 + Math.random() * 450
            const a2 = Math.random() * Math.PI * 2
            const useAccent = Math.random() < 0.2 // 20% accent colored
            return {
                x1: ox,
                y1: oy,
                x2: ox + Math.cos(a2) * len,
                y2: oy + Math.sin(a2) * len,
                width: 0.3 + Math.random() * 1.2,
                alpha: 0.08 + Math.random() * 0.35,
                drawn: 0,
                speed: 0.2 + Math.random() * 0.4,
                accent: useAccent,
            }
        }

        // Generate a single particle
        function makeParticle() {
            const angle = Math.random() * Math.PI * 2
            const dist = Math.random() * Math.max(W, H) * 0.55
            return {
                x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * W * 0.4,
                y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * H * 0.4,
                r: 0.3 + Math.random() * 1.5,
                alpha: 0.1 + Math.random() * 0.4,
            }
        }

        // Draw framed project images
        function drawFramedImages(ctx, alpha) {
            if (!imgLoadedRef.current || !projectImgRef.current) return

            const img = projectImgRef.current

            // Main center frame
            const frameW = Math.min(W * 0.28, 380)
            const frameH = frameW * 1.35
            const frameX = cx - frameW / 2
            const frameY = cy - frameH / 2 - 30

            const borderWidth = 12
            const matteWidth = 16

            ctx.globalAlpha = alpha * 0.85

            // Dark border
            ctx.fillStyle = '#333'
            ctx.fillRect(frameX - borderWidth - matteWidth, frameY - borderWidth - matteWidth,
                frameW + (borderWidth + matteWidth) * 2, frameH + (borderWidth + matteWidth) * 2)

            // White matte
            ctx.fillStyle = '#f0ece6'
            ctx.fillRect(frameX - matteWidth, frameY - matteWidth,
                frameW + matteWidth * 2, frameH + matteWidth * 2)

            // Image
            ctx.drawImage(img, frameX, frameY, frameW, frameH)

            // Two smaller side frames
            const smallW = frameW * 0.65
            const smallH = smallW * 1.2
            const gap = 40

            // Left small frame
            const lx = frameX - borderWidth - matteWidth - gap - smallW - borderWidth - matteWidth
            const ly = cy - smallH / 2 + 40
            ctx.globalAlpha = alpha * 0.6
            ctx.fillStyle = '#333'
            ctx.fillRect(lx - borderWidth - matteWidth, ly - borderWidth - matteWidth,
                smallW + (borderWidth + matteWidth) * 2, smallH + (borderWidth + matteWidth) * 2)
            ctx.fillStyle = '#f0ece6'
            ctx.fillRect(lx - matteWidth, ly - matteWidth, smallW + matteWidth * 2, smallH + matteWidth * 2)
            ctx.drawImage(img, lx, ly, smallW, smallH)

            // Right small frame
            const rx = frameX + frameW + (borderWidth + matteWidth) + gap
            const ry = cy - smallH / 2 + 40
            ctx.fillStyle = '#333'
            ctx.fillRect(rx - borderWidth - matteWidth, ry - borderWidth - matteWidth,
                smallW + (borderWidth + matteWidth) * 2, smallH + (borderWidth + matteWidth) * 2)
            ctx.fillStyle = '#f0ece6'
            ctx.fillRect(rx - matteWidth, ry - matteWidth, smallW + matteWidth * 2, smallH + matteWidth * 2)
            ctx.drawImage(img, rx, ry, smallW, smallH)

            ctx.globalAlpha = 1
        }

        function render() {
            const frame = frameCountRef.current
            ctx.clearRect(0, 0, W, H)

            // === Phase: ENTER (build up lines) ===
            if (!fadeOutStarted) {
                // Fade in the black background
                opacity = Math.min(1, opacity + 0.08)
                ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
                ctx.fillRect(0, 0, W, H)

                // Add new lines
                if (linesRef.current.length < maxLines && frame < buildFrames) {
                    const batchSize = Math.min(linesPerFrame, maxLines - linesRef.current.length)
                    for (let i = 0; i < batchSize; i++) {
                        linesRef.current.push(makeLine())
                    }
                }

                // Add new particles
                if (particlesRef.current.length < maxParticles && frame < buildFrames) {
                    const batchSize = Math.min(particlesPerFrame, maxParticles - particlesRef.current.length)
                    for (let i = 0; i < batchSize; i++) {
                        particlesRef.current.push(makeParticle())
                    }
                }

                // Draw all lines with progressive reveal
                for (const line of linesRef.current) {
                    line.drawn = Math.min(1, line.drawn + line.speed)
                    const progress = line.drawn

                    ctx.beginPath()
                    ctx.moveTo(line.x1, line.y1)
                    ctx.lineTo(
                        line.x1 + (line.x2 - line.x1) * progress,
                        line.y1 + (line.y2 - line.y1) * progress
                    )
                    ctx.strokeStyle = line.accent
                        ? `rgba(224, 48, 0, ${line.alpha * 0.7})`
                        : `rgba(255, 255, 255, ${line.alpha})`
                    ctx.lineWidth = line.width
                    ctx.stroke()
                }

                // Draw particles
                for (const p of particlesRef.current) {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
                    ctx.fill()
                }

                // Draw framed images (fade in over build phase)
                const imgAlpha = Math.min(1, frame / (buildFrames * 0.6))
                drawFramedImages(ctx, imgAlpha)

                // Navigate during build (hidden behind the overlay)
                if (frame >= buildFrames - 10 && !navigated) {
                    navigated = true
                    if (navigate.current) {
                        navigate.current(transitionData.current.path)
                    }
                }

                // After build + hold, start fade out
                if (frame >= buildFrames + holdFrames) {
                    fadeOutStarted = true
                    // Removed setPhase('exit') to prevent the useEffect from restarting
                }
            }

            // === Phase: EXIT (fade out the whole effect) ===
            if (fadeOutStarted) {
                fadeOutOpacity = Math.max(0, fadeOutOpacity - (1 / fadeFrames))

                ctx.globalAlpha = fadeOutOpacity
                ctx.fillStyle = '#000'
                ctx.fillRect(0, 0, W, H)

                // Redraw all lines
                for (const line of linesRef.current) {
                    ctx.beginPath()
                    ctx.moveTo(line.x1, line.y1)
                    ctx.lineTo(line.x2, line.y2)
                    ctx.strokeStyle = line.accent
                        ? `rgba(224, 48, 0, ${line.alpha * 0.7})`
                        : `rgba(255, 255, 255, ${line.alpha})`
                    ctx.lineWidth = line.width
                    ctx.stroke()
                }

                // Redraw particles
                for (const p of particlesRef.current) {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
                    ctx.fill()
                }

                drawFramedImages(ctx, fadeOutOpacity)
                ctx.globalAlpha = 1

                if (fadeOutOpacity <= 0) {
                    cancelAnimationFrame(animRef.current)
                    linesRef.current = []
                    particlesRef.current = []
                    setPhase('idle')
                    return
                }
            }

            frameCountRef.current++
            animRef.current = requestAnimationFrame(render)
        }

        if (phase !== 'idle') {
            animRef.current = requestAnimationFrame(render)
        }

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current)
        }
    }, [phase, setPhase, transitionData, navigate])

    if (phase === 'idle') return null

    return (
        <div
            ref={containerRef}
            className="chaotic-transition-container"
        >
            <canvas
                ref={canvasRef}
                className="chaotic-transition-canvas"
            />
        </div>
    )
}

export default function PageTransition() {
    // Legacy — kept so App.jsx import doesn't break.
    // The real transition is now rendered inside TransitionProvider.
    return null
}
