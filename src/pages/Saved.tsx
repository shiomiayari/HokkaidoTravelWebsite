import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { spots } from '../data/spots'

type Page = 'home' | 'today' | 'map' | 'saved' | 'spot'

interface Props {
  onNavigate: (p: Page, id?: string) => void
  savedSpots: Set<string>
  onToggleSave: (id: string) => void
}

const CATEGORIES = ['すべて', '絶対行きたい', '食べたい', '飲みたい', '見たい'] as const
type Category = typeof CATEGORIES[number]

const spotCategories: Record<string, Category> = {
  'otaru-bine': '飲みたい',
  'kitaichi-glass': '見たい',
  'otaru-orgel': '見たい',
  'tengu-mountain': '絶対行きたい',
  'otaru-canal': '見たい',
  'otaru-warehouse': '飲みたい',
  'tanaka-sake': '飲みたい',
}

const handwrittenMemos = [
  { text: 'ワイン飲みたい🍷', rotate: -2, color: '#8B6F4E' },
  { text: '夕方よさそう', rotate: 1.5, color: '#4A6B4A' },
  { text: '疲れてなかったら', rotate: -1, color: '#6B4A4A' },
  { text: 'ここ行こ ✓', rotate: 2, color: '#2A4A6B' },
]

export default function Saved({ onNavigate, savedSpots, onToggleSave }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて')

  const savedList = spots.filter((s) => savedSpots.has(s.id))
  const filtered =
    activeCategory === 'すべて'
      ? savedList
      : savedList.filter((s) => spotCategories[s.id] === activeCategory)

  return (
    <div className="overflow-y-auto" style={{ minHeight: '100dvh', paddingBottom: 100, background: 'var(--color-paper)' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <div className="label mb-2" style={{ fontSize: 9, color: 'var(--color-wine)', letterSpacing: '0.2em' }}>
          COLLECTION
        </div>
        <div className="flex items-baseline gap-3">
          <div
            className="font-display"
            style={{ fontSize: 'clamp(32px, 10vw, 44px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1 }}
          >
            OUR PICKS
          </div>
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{ fontSize: 22, color: 'var(--color-wine)', display: 'inline-block' }}
          >
            ♡
          </motion.span>
        </div>
        <div className="font-sans mt-2" style={{ fontSize: 14, color: 'var(--color-charcoal-soft)', opacity: 0.7 }}>
          行きたい場所
        </div>
      </div>

      {/* Category filter */}
      <div className="overflow-x-auto flex gap-2 px-6 pb-6" style={{ scrollSnapType: 'x mandatory' }}>
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="font-mono flex-none"
            style={{
              fontSize: 10,
              letterSpacing: '0.1em',
              padding: '6px 12px',
              borderRadius: 2,
              background: activeCategory === cat ? 'var(--color-charcoal)' : 'transparent',
              color: activeCategory === cat ? 'var(--color-paper)' : 'var(--color-charcoal)',
              border: `1px solid ${activeCategory === cat ? 'var(--color-charcoal)' : 'rgba(28,26,23,0.2)'}`,
              scrollSnapAlign: 'start',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            whileTap={{ scale: 0.94 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {savedList.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="font-display" style={{ fontSize: 40, fontStyle: 'italic', fontWeight: 200, color: 'var(--color-beige)', lineHeight: 1 }}>
            まだない
          </div>
          <div className="font-sans mt-3" style={{ fontSize: 14, color: 'var(--color-beige)' }}>
            スポットをハートで保存しよう
          </div>
        </div>
      ) : (
        <>
          {/* Mosaic grid */}
          <div className="px-4">
            <AnimatePresence>
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <div className="font-sans" style={{ fontSize: 14, color: 'var(--color-beige)' }}>
                    このカテゴリにはまだありません
                  </div>
                </motion.div>
              ) : (
                <MosaicGrid
                  items={filtered}
                  savedSpots={savedSpots}
                  onToggleSave={onToggleSave}
                  onNavigate={onNavigate}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Handwritten memos section */}
          {savedList.length > 0 && (
            <div className="px-6 pt-8 pb-6">
              <div className="label mb-4" style={{ fontSize: 9, color: 'var(--color-beige)' }}>NOTES</div>
              <div className="flex flex-wrap gap-3">
                {handwrittenMemos.slice(0, Math.min(4, savedList.length + 1)).map((memo, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    style={{
                      background: '#FFFDE7',
                      padding: '8px 14px',
                      transform: `rotate(${memo.rotate}deg)`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      borderRadius: 1,
                    }}
                    whileTap={{ scale: 1.05 }}
                  >
                    <p className="font-sans" style={{ fontSize: 13, color: memo.color, fontStyle: 'italic' }}>
                      {memo.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function MosaicGrid({
  items,
  savedSpots,
  onToggleSave,
  onNavigate,
}: {
  items: typeof spots
  savedSpots: Set<string>
  onToggleSave: (id: string) => void
  onNavigate: (p: any, id?: string) => void
}) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
      {items.map((spot, i) => {
        // Create varied sizes: first item full width, others alternate
        const isWide = i === 0 || (i % 5 === 3)
        return (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            className={isWide ? 'col-span-2' : 'col-span-1'}
            style={{ transform: i % 4 === 2 ? 'rotate(-1deg)' : i % 4 === 1 ? 'rotate(0.7deg)' : 'none' }}
          >
            <MosaicCard
              spot={spot}
              isSaved={savedSpots.has(spot.id)}
              onToggleSave={() => onToggleSave(spot.id)}
              onNavigate={onNavigate}
              tall={isWide}
              category={spotCategories[spot.id] || 'すべて'}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

function MosaicCard({
  spot,
  isSaved,
  onToggleSave,
  onNavigate,
  tall,
  category,
}: {
  spot: typeof spots[0]
  isSaved: boolean
  onToggleSave: () => void
  onNavigate: (p: any, id?: string) => void
  tall: boolean
  category: string
}) {
  return (
    <motion.div
      onClick={() => onNavigate('spot', spot.id)}
      className="relative w-full text-left overflow-hidden"
      style={{ height: tall ? 220 : 160, borderRadius: 3, cursor: 'pointer' }}
      whileTap={{ scale: 0.97 }}
      layoutId={`spot-photo-${spot.id}`}
    >
      <img
        src={`${spot.image.split('?')[0]}?w=${tall ? 700 : 350}&h=${tall ? 440 : 320}&fit=crop&auto=format&q=75`}
        alt={spot.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.72)' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1609831353201-3e31d35cc985?w=350&h=320&fit=crop&auto=format&q=75`
        }}
      />

      {/* Gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />

      {/* Content */}
      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        <div className="flex justify-end">
          <motion.div
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onToggleSave() }}
            style={{ fontSize: 18, color: 'white', cursor: 'pointer' }}
            whileTap={{ scale: 1.4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {isSaved ? '♥' : '♡'}
          </motion.div>
        </div>

        <div>
          <div className="label text-white/50" style={{ fontSize: 8 }}>{category}</div>
          <div className="font-display text-white leading-tight mt-0.5" style={{ fontSize: tall ? 18 : 14, fontStyle: 'italic' }}>
            {spot.name}
          </div>
          {tall && (
            <div className="font-sans text-white/60 mt-1" style={{ fontSize: 12 }}>
              {spot.area} · {spot.duration}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
