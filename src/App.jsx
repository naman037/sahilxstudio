import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

import BagIntro from './components/BagIntro'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ServiceDetail from './pages/ServiceDetail'
import AboutDetail from './pages/AboutDetail'
import { TransitionProvider } from './components/PageTransition'
import CustomCursor from './components/CustomCursor'

// ═══════════════════════════════════════════════
// GLOBAL LAYOUT (Cursor & Lenis)
// ═══════════════════════════════════════════════
function Layout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/about" element={<AboutDetail />} />
      </Routes>
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <Router>
      <TransitionProvider>
        <Layout>
          {!entered && <BagIntro onEnter={() => setEntered(true)} />}
          {entered && <AnimatedRoutes />}
        </Layout>
      </TransitionProvider>
    </Router>
  )
}
