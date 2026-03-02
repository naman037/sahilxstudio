import { useEffect, useRef, useState } from 'react'
import { CursorDefault, CursorHover } from './CursorIcons'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)

    // N elements in the trail
    const trailCount = 6
    // Keep track of logical positions
    const trailsRef = useRef([...Array(trailCount)].map(() => ({ x: -100, y: -100 })))
    // Keep track of actual DOM elements connecting to those positions
    const elsRef = useRef([])
    const mouse = useRef({ x: -100, y: -100 })
    const raf = useRef(null)

    useEffect(() => {
        const handleMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY }
        }

        const loop = () => {
            // Head of the snake follows mouse exactly
            trailsRef.current[0].x = mouse.current.x
            trailsRef.current[0].y = mouse.current.y

            // Body follows the head
            for (let i = 1; i < trailCount; i++) {
                const prev = trailsRef.current[i - 1]
                const curr = trailsRef.current[i]
                curr.x += (prev.x - curr.x) * 0.45 // Lower for looser trail, higher for tighter
                curr.y += (prev.y - curr.y) * 0.45
            }

            elsRef.current.forEach((el, i) => {
                if (el) {
                    const { x, y } = trailsRef.current[i]
                    // Center the svg on mouse coords
                    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
                }
            })

            raf.current = requestAnimationFrame(loop)
        }

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .work-item, .magnetic-btn')) {
                setIsHovering(true)
            }
        }
        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, .work-item, .magnetic-btn')) {
                setIsHovering(false)
            }
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)

        loop()
        return () => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
            cancelAnimationFrame(raf.current)
        }
    }, [])

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
            {trailsRef.current.map((_, i) => {
                const opacity = i === 0 ? 1 : Math.pow(0.5, i)
                // Shrink slightly as they trail behind
                const sizeDefault = Math.max(20, 64 - i * 6)
                const sizeHover = Math.max(20, 72 - i * 6)

                return (
                    <div
                        key={i}
                        ref={(el) => (elsRef.current[i] = el)}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0,
                            opacity,
                            willChange: 'transform',
                            mixBlendMode: 'difference',
                        }}
                    >
                        {isHovering ? <CursorHover size={sizeHover} /> : <CursorDefault size={sizeDefault} />}
                    </div>
                )
            })}
        </div>
    )
}
