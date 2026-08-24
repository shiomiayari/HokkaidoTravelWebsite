import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"

import { spots } from "../data/spots"

type Page = "home" | "today" | "map" | "saved" | "spot"

interface Props {
  onNavigate: (p: Page, id?: string) => void

  savedSpots: Set<string>

  onToggleSave: (id: string) => void
}

interface MapSpot {
  id: string

  name: string

  nameEn: string

  x: number

  y: number

  type: "walk" | "drive"

  img: string

  desc: string
}

const mapSpots: MapSpot[] = [
  {
    id: "otaru-canal",
    name: "小樽運河",
    nameEn: "OTARU CANAL",
    x: 42,
    y: 38,
    type: "walk",
    img: "photo-1545014393-76c7b8936c76",
    desc: "大正時代の運河。石造り倉庫群が並ぶ。",
  },

  {
    id: "otaru-warehouse",
    name: "小樽倉庫No.1",
    nameEn: "WAREHOUSE No.1",
    x: 48,
    y: 44,
    type: "walk",
    img: "photo-1598176314960-249219ed5409",
    desc: "運河沿いの醸造所レストラン。",
  },

  {
    id: "kitaichi-glass",
    name: "北一硝子",
    nameEn: "KITAICHI GLASS",
    x: 58,
    y: 56,
    type: "walk",
    img: "photo-1609831353201-3e31d35cc985",
    desc: "石油ランプが灯す幻想的な空間。",
  },

  {
    id: "otaru-orgel",
    name: "オルゴール堂",
    nameEn: "ORGEL DO",
    x: 65,
    y: 52,
    type: "walk",
    img: "photo-1673750254142-792fbd6cf7d3",
    desc: "3,000種類以上のオルゴールが並ぶ。",
  },

  {
    id: "otaru-bine",
    name: "小樽バイン",
    nameEn: "OTARU BINE",
    x: 36,
    y: 48,
    type: "walk",
    img: "photo-1774705740253-fc1e515aa4ee",
    desc: "ワインとランチ。歴史ある石造り倉庫。",
  },

  {
    id: "tanaka-sake",
    name: "田中酒造",
    nameEn: "TANAKA SAKE",
    x: 55,
    y: 70,
    type: "walk",
    img: "photo-1534678275982-a3989afe85e6",
    desc: "明治35年創業の老舗酒蔵。",
  },

  {
    id: "tengu-mountain",
    name: "天狗山",
    nameEn: "TENGU MTN",
    x: 20,
    y: 25,
    type: "drive",
    img: "photo-1545105511-839f4a45a030",
    desc: "標高532m。小樽市街を一望。",
  },
]

export default function MapPage({
  onNavigate,
  savedSpots,
  onToggleSave,
}: Props) {
  const [activePin, setActivePin] = useState<string | null>(null)

  const [visitedPins, setVisitedPins] = useState<Set<string>>(new Set())

  const activePinData = mapSpots.find((s) => s.id === activePin)

  const spotData = activePinData
    ? spots.find((s) => s.id === activePinData.id)
    : null

  const handlePin = (id: string) => {
    setActivePin(activePin === id ? null : id)

    setVisitedPins((prev) => new Set([...prev, id]))
  }

  return (
    <div
      className="relative flex flex-col"
      style={{
        height: "100dvh",
        background: "var(--color-paper)",
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-4" style={{ flexShrink: 0 }}>
        <div
          className="label"
          style={{ fontSize: 10, color: "var(--color-blue)" }}
        >
          MAP
        </div>
        <div
          className="font-display"
          style={{ fontSize: 26, fontStyle: "italic", fontWeight: 300 }}
        >
          小樽
        </div>
        <div
          className="font-mono mt-0.5"
          style={{
            fontSize: 10,
            color: "var(--color-beige)",
            letterSpacing: "0.1em",
          }}
        >
          OTARU · 歩いて回れる街
        </div>
      </div>

      {/* Map area */}
      <div
        className="relative flex-1 overflow-hidden mx-4 mb-4"
        style={{ borderRadius: 4 }}
      >
        {/* Map background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #E8DFC8 0%, #DDD5C5 60%, #C8DFC8 100%)",
          }}
        />

        {/* Street grid - subtle lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.25 }}
        >
          {/* Main roads */}
          <line
            x1="0%"
            y1="55%"
            x2="100%"
            y2="55%"
            stroke="#8B7B6B"
            strokeWidth="2"
          />
          <line
            x1="0%"
            y1="65%"
            x2="100%"
            y2="65%"
            stroke="#8B7B6B"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            stroke="#8B7B6B"
            strokeWidth="1.5"
          />
          <line
            x1="35%"
            y1="0%"
            x2="35%"
            y2="100%"
            stroke="#8B7B6B"
            strokeWidth="1"
          />
          <line
            x1="65%"
            y1="0%"
            x2="65%"
            y2="100%"
            stroke="#8B7B6B"
            strokeWidth="1"
          />
          <line
            x1="0%"
            y1="40%"
            x2="100%"
            y2="40%"
            stroke="#8B7B6B"
            strokeWidth="1"
          />
          {/* Canal */}
          <path
            d="M 15% 35% Q 42% 38% 55% 45%"
            stroke="#4A7FB5"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="2"
          />
        </svg>

        {/* Canal label */}
        <div
          className="absolute font-mono"
          style={{
            top: "31%",
            left: "20%",
            fontSize: 9,
            color: "#3B6FA0",
            letterSpacing: "0.12em",
            opacity: 0.8,
            transform: "rotate(-5deg)",
          }}
        >
          小樽運河
        </div>

        {/* Sea/Bay indicator */}
        <div
          className="absolute font-mono"
          style={{
            top: "8%",
            left: "5%",
            fontSize: 9,
            color: "#3B6FA0",
            opacity: 0.5,
            letterSpacing: "0.1em",
          }}
        >
          石狩湾 ↑
        </div>

        {/* Station */}
        <div
          className="absolute"
          style={{
            top: "57%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="font-mono text-center"
            style={{
              fontSize: 8,
              color: "var(--color-charcoal)",
              letterSpacing: "0.1em",
              background: "rgba(243,237,224,0.8)",
              padding: "2px 6px",
              borderRadius: 2,
            }}
          >
            小樽駅
          </div>
        </div>

        {/* Tengu Mountain - separate with drive indicator */}
        <div
          className="absolute font-mono"
          style={{
            top: "22%",
            left: "8%",
            fontSize: 9,
            color: "var(--color-forest)",
            opacity: 0.7,
          }}
        >
          🚗 DRIVE
        </div>

        {/* Walking area outline */}
        <div
          className="absolute"
          style={{
            top: "30%",
            left: "30%",
            width: "45%",
            height: "50%",

            border: "1.5px dashed rgba(59,111,160,0.3)",

            borderRadius: 8,

            pointerEvents: "none",
          }}
        />
        <div
          className="absolute font-mono"
          style={{
            top: "83%",
            left: "52%",
            fontSize: 8,
            color: "var(--color-blue)",
            opacity: 0.5,
            letterSpacing: "0.08em",
          }}
        >
          WALKING AREA
        </div>

        {/* Map pins */}
        {mapSpots.map((s) => (
          <MapPin
            key={s.id}
            spot={s}
            isActive={activePin === s.id}
            isVisited={visitedPins.has(s.id)}
            isSaved={savedSpots.has(s.id)}
            onClick={() => handlePin(s.id)}
          />
        ))}
      </div>

      {/* Popup card */}
      <AnimatePresence>
        {activePin && activePinData && (
          <motion.div
            key={activePin}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="absolute left-4 right-4 bottom-24 overflow-hidden"
            style={{
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <div
              className="flex"
              style={{ background: "var(--color-paper)", height: 110 }}
            >
              {/* Photo */}
              <div className="relative flex-none" style={{ width: 100 }}>
                <img
                  src={`https://images.unsplash.com/${activePinData.img}?w=200&h=220&fit=crop&auto=format&q=75`}
                  alt={activePinData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1609831353201-3e31d35cc985?w=200&h=220&fit=crop&auto=format&q=75`
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 px-4 py-3 flex flex-col justify-between">
                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 16,
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {activePinData.name}
                  </div>
                  <div
                    className="label mt-0.5"
                    style={{ fontSize: 9, color: "var(--color-beige)" }}
                  >
                    {activePinData.nameEn}
                  </div>
                  <div
                    className="font-sans mt-2"
                    style={{
                      fontSize: 12,
                      color: "var(--color-charcoal-soft)",
                      opacity: 0.8,
                    }}
                  >
                    {activePinData.desc}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <motion.button
                    onClick={() => onNavigate("spot", activePin)}
                    className="font-mono flex-1 text-center py-1.5"
                    style={{
                      fontSize: 10,

                      letterSpacing: "0.1em",

                      background: "var(--color-charcoal)",

                      color: "var(--color-paper)",

                      borderRadius: 2,
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    詳細を見る
                  </motion.button>

                  <motion.button
                    onClick={() => onToggleSave(activePin)}
                    style={{
                      fontSize: 18,
                      color: savedSpots.has(activePin)
                        ? "var(--color-wine)"
                        : "var(--color-beige)",
                    }}
                    whileTap={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {savedSpots.has(activePin) ? "♥" : "♡"}
                  </motion.button>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setActivePin(null)}
                className="absolute top-2 right-2 font-mono"
                style={{
                  fontSize: 14,
                  color: "var(--color-beige)",
                  padding: 4,
                }}
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MapPin({
  spot,

  isActive,

  isVisited,

  isSaved,

  onClick,
}: {
  spot: MapSpot

  isActive: boolean

  isVisited: boolean

  isSaved: boolean

  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className="absolute flex flex-col items-center"
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        transform: "translate(-50%, -100%)",
        zIndex: isActive ? 20 : 10,
      }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Pin */}
      <motion.div
        animate={
          isActive
            ? { y: [-4, 0, -2, 0], scale: [1, 1.15, 1.05, 1] }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            width: isSaved ? 28 : 22,

            height: isSaved ? 28 : 22,

            borderRadius: "50% 50% 50% 0",

            transform: "rotate(-45deg)",

            background: isActive
              ? "var(--color-wine)"
              : isSaved
                ? "var(--color-wine)"
                : isVisited
                  ? "var(--color-forest)"
                  : spot.type === "drive"
                    ? "var(--color-amber)"
                    : "var(--color-blue)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            boxShadow: isActive
              ? "0 4px 12px rgba(0,0,0,0.3)"
              : "0 2px 6px rgba(0,0,0,0.18)",

            transition: "all 0.2s",
          }}
        >
          <span
            style={{ transform: "rotate(45deg)", fontSize: 9, color: "white" }}
          >
            {isSaved ? "♥" : isVisited ? "✓" : ""}
          </span>
        </div>
      </motion.div>

      {/* Label */}
      <div
        className="font-mono whitespace-nowrap"
        style={{
          fontSize: 8,

          letterSpacing: "0.05em",

          color: "var(--color-charcoal)",

          background: "rgba(243,237,224,0.85)",

          padding: "1px 4px",

          borderRadius: 2,

          marginTop: 3,

          opacity: isActive ? 1 : 0.8,

          fontWeight: isActive ? 500 : 400,
        }}
      >
        {spot.name}
      </div>
    </motion.button>
  )
}
