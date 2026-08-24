import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Today from './pages/Today'
import SpotDetail from './pages/SpotDetail'
import MapPage from './pages/MapPage'
import Saved from './pages/Saved'

type MainPage = 'home' | 'today' | 'map' | 'saved'
type Page = MainPage | 'spot'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
  const [savedSpots, setSavedSpots] = useState<Set<string>>(new Set(['otaru-bine', 'otaru-canal']))
  const [prevPage, setPrevPage] = useState<Page>('home')

  const navigate = useCallback((to: Page, spotId?: string) => {
    setPrevPage(page)
    if (to === 'spot' && spotId) setSelectedSpot(spotId)
    setPage(to)
  }, [page])

  const toggleSave = useCallback((id: string) => {
    setSavedSpots((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const goBack = useCallback(() => {
    setPage(prevPage === 'spot' ? 'today' : prevPage)
  }, [prevPage])

  const navPage = (page === 'spot' ? prevPage : page) as MainPage

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  }

  return (
    <div
      className="grain relative flex flex-col"
      style={{ minHeight: '100dvh', maxWidth: 430, margin: '0 auto', background: 'var(--color-paper)', overflow: 'hidden' }}
    >
      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={page}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ flex: 1 }}
        >
          {page === 'home' && <Home onNavigate={navigate} />}
          {page === 'today' && (
            <Today onNavigate={navigate} savedSpots={savedSpots} onToggleSave={toggleSave} />
          )}
          {page === 'map' && (
            <MapPage onNavigate={navigate} savedSpots={savedSpots} onToggleSave={toggleSave} />
          )}
          {page === 'saved' && (
            <Saved onNavigate={navigate} savedSpots={savedSpots} onToggleSave={toggleSave} />
          )}
          {page === 'spot' && selectedSpot && (
            <SpotDetail
              spotId={selectedSpot}
              onBack={goBack}
              saved={savedSpots.has(selectedSpot)}
              onToggleSave={() => toggleSave(selectedSpot)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {page !== 'spot' && (
        <BottomNav current={navPage} onChange={(p) => navigate(p)} />
      )}
    </div>
  )
}
