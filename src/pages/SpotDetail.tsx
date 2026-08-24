import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSpotById } from '../data/spots'

interface Props {
  spotId: string
  onBack: () => void
  saved: boolean
  onToggleSave: () => void
}

export default function SpotDetail({ spotId, onBack, saved, onToggleSave }: Props) {
  const spot = getSpotById(spotId)
  const [heartBurst, setHeartBurst] = useState(false)
  const [goConfirm, setGoConfirm] = useState(false)

  if (!spot) return null

  const handleSave = () => {
    setHeartBurst(true)
    onToggleSave()
    setTimeout(() => setHeartBurst(false), 600)
  }

  const handleGo = () => {
    setGoConfirm(true)
    setTimeout(() => setGoConfirm(false), 2000)
  }

  return (
    <div className="relative overflow-y-auto" style={{ minHeight: '100dvh', background: 'var(--color-paper)' }}>
      {/* Full-bleed hero image */}
      <motion.div
        className="relative overflow-hidden"
        style={{ height: '60vh' }}
        layoutId={`spot-photo-${spot.id}`}
      >
        <motion.img
          src={spot.image}
          alt={spot.name}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.8)' }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-5 flex items-center gap-2"
          style={{ color: 'white', zIndex: 10 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>BACK</span>
        </button>

        {/* Category badge */}
        <div className="absolute top-12 right-5">
          <span
            className="font-mono text-white"
            style={{
              fontSize: 9,
              letterSpacing: '0.15em',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {spot.category}
          </span>
        </div>

        {/* Bottom hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <motion.div
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(30px, 9vw, 42px)', fontStyle: 'italic', fontWeight: 300 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {spot.name}
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 pt-8">
        {/* Page number / caption style */}
        <div className="flex items-center justify-between mb-6">
          <div className="label" style={{ fontSize: 9, color: 'var(--color-beige)' }}>
            DAY 0{spot.day} · SPOT
          </div>
          <div className="label" style={{ fontSize: 9, color: 'var(--color-beige)' }}>
            {spot.nameEn}
          </div>
        </div>

        {/* Description */}
        <p className="font-sans mb-8" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--color-charcoal)' }}>
          「{spot.description}」
        </p>

        <div className="rule mb-8" />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="label mb-1" style={{ fontSize: 9, color: 'var(--color-beige)' }}>所要時間</div>
            <div className="font-sans" style={{ fontSize: 14, fontWeight: 500 }}>{spot.duration}</div>
          </div>
          <div>
            <div className="label mb-1" style={{ fontSize: 9, color: 'var(--color-beige)' }}>エリア</div>
            <div className="font-sans" style={{ fontSize: 14, fontWeight: 500 }}>{spot.area}</div>
          </div>
          <div>
            <div className="label mb-1" style={{ fontSize: 9, color: 'var(--color-beige)' }}>雰囲気</div>
            <div className="flex flex-wrap gap-1">
              {spot.vibe.map((v) => (
                <span
                  key={v}
                  className="font-mono"
                  style={{ fontSize: 10, color: 'var(--color-blue)', background: 'var(--color-blue-light)', padding: '2px 6px', borderRadius: 2 }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="label mb-1" style={{ fontSize: 9, color: 'var(--color-beige)' }}>予定タイプ</div>
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                padding: '3px 8px',
                borderRadius: 2,
                display: 'inline-block',
                ...(spot.type === 'FIX'
                  ? { background: 'var(--color-charcoal)', color: 'var(--color-paper)' }
                  : spot.type === 'PLAN'
                  ? { border: '1px solid var(--color-charcoal)', color: 'var(--color-charcoal)' }
                  : { background: 'var(--color-blue)', color: 'white' }),
              }}
            >
              {spot.type}
            </span>
          </div>
        </div>

        {/* Handwritten memo */}
        {spot.memo && (
          <div
            className="mb-8 relative"
            style={{
              background: '#FFFDE7',
              padding: '12px 16px',
              transform: 'rotate(-0.8deg)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {/* Tape strip */}
            <div
              className="tape absolute"
              style={{ top: -8, left: '50%', transform: 'translateX(-50%)', width: 40, height: 14, borderRadius: 1 }}
            />
            <p className="font-sans" style={{ fontSize: 14, color: '#555', lineHeight: 1.6, fontStyle: 'italic' }}>
              {spot.memo}
            </p>
          </div>
        )}

        <div className="rule mb-8" />

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pb-12">
          {/* Map button */}
          <motion.a
            href={spot.mapsUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4"
            style={{ border: '1px solid var(--color-charcoal)', borderRadius: 2 }}
            whileTap={{ scale: 0.98, background: 'rgba(28,26,23,0.04)' }}
          >
            <span className="font-sans" style={{ fontSize: 15, fontWeight: 500 }}>MAPで見る</span>
            <span style={{ fontSize: 18 }}>↗</span>
          </motion.a>

          {/* Save / heart button */}
          <motion.button
            onClick={handleSave}
            className="flex items-center justify-between px-5 py-4 relative overflow-hidden"
            style={{
              border: `1px solid ${saved ? 'var(--color-wine)' : 'rgba(28,26,23,0.2)'}`,
              borderRadius: 2,
              background: saved ? 'var(--color-wine-light)' : 'transparent',
              transition: 'all 0.3s',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-sans" style={{ fontSize: 15, fontWeight: 500, color: saved ? 'var(--color-wine)' : 'var(--color-charcoal)' }}>
              {saved ? '保存済み' : '行きたい'}
            </span>
            <motion.span
              animate={heartBurst ? { scale: [1, 1.5, 1], rotate: [0, -10, 10, 0] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: 20, display: 'inline-block' }}
            >
              {saved ? '♥' : '♡'}
            </motion.span>
          </motion.button>

          {/* Go button */}
          <motion.button
            onClick={handleGo}
            className="flex items-center justify-between px-5 py-4"
            style={{
              background: 'var(--color-charcoal)',
              borderRadius: 2,
              color: 'var(--color-paper)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-sans" style={{ fontSize: 15, fontWeight: 500 }}>ここ行こ</span>
            <AnimatePresence mode="wait">
              {goConfirm ? (
                <motion.span
                  key="confirm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono"
                  style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-blue-light)' }}
                >
                  GOOD CHOICE ✓
                </motion.span>
              ) : (
                <motion.span key="arrow" style={{ fontSize: 18 }}>→</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
