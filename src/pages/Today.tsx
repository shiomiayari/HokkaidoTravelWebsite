import { useState, useRef } from "react"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

import { days } from "../data/days"

import { spots } from "../data/spots"

type Page = "home" | "today" | "map" | "saved" | "spot"

interface Props {
  onNavigate: (p: Page, id?: string) => void

  savedSpots: Set<string>

  onToggleSave: (id: string) => void
}

const whereNextOptions = [
  {
    id: "tengu",

    letter: "A",

    title: "天狗山",

    subtitle: "TENGU MOUNTAIN",

    desc: "ドライブして小樽の絶景を一望。夕暮れが格別。",

    img: "photo-1545105511-839f4a45a030",

    spotId: "tengu-mountain",
  },

  {
    id: "canal",

    letter: "B",

    title: "小樽運河",

    subtitle: "OTARU CANAL",

    desc: "石造りの倉庫群を眺めながら、ゆっくり散歩。",

    img: "photo-1545014393-76c7b8936c76",

    spotId: "otaru-canal",
  },

  {
    id: "cafe",

    letter: "C",

    title: "カフェ巡り",

    subtitle: "CAFÉ TOUR",

    desc: "気になるカフェへ。堺町通りをぶらぶら。",

    img: "photo-1673750254142-792fbd6cf7d3",

    spotId: null,
  },

  {
    id: "hotel",

    letter: "D",

    title: "ホテルで一休み",

    subtitle: "ONE MORE WINE",

    desc: "休憩がてら、ワインを一杯。",

    img: "photo-1774705740253-fc1e515aa4ee",

    spotId: null,
  },
]

function Badge({ type }: { type: "FIX" | "PLAN" | "OPTION" }) {
  const styles: Record<string, React.CSSProperties> = {
    FIX: { background: "var(--color-charcoal)", color: "var(--color-paper)" },

    PLAN: {
      background: "transparent",
      color: "var(--color-charcoal)",
      border: "1px solid var(--color-charcoal)",
    },

    OPTION: { background: "var(--color-blue)", color: "white" },
  }

  return (
    <span
      className="font-mono"
      style={{
        ...styles[type],
        fontSize: 9,
        letterSpacing: "0.12em",
        padding: "2px 6px",
        borderRadius: 2,
        display: "inline-block",
      }}
    >
      {type}
    </span>
  )
}

export default function Today({ onNavigate, savedSpots, onToggleSave }: Props) {
  const [activeDay, setActiveDay] = useState(3)

  const [dayTransitioning, setDayTransitioning] = useState(false)

  const [transitionNum, setTransitionNum] = useState("")

  const [selectedWhere, setSelectedWhere] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const nightRef = useRef<HTMLDivElement>(null)

  const day = days[activeDay - 1]

  const { scrollYProgress } = useScroll({ container: containerRef })

  const nightBg = useTransform(scrollYProgress, [0.6, 0.85], [
    "rgba(243,237,224,0)",
    "rgba(18,13,8,0.95)",
  ])

  const changeDay = (n: number) => {
    if (n === activeDay) return

    setTransitionNum(String(n).padStart(2, "0"))

    setDayTransitioning(true)

    setTimeout(() => {
      setActiveDay(n)

      setDayTransitioning(false)

      setSelectedWhere(null)
    }, 550)
  }

  const otaruSpots = spots.filter((s) => s.day === 3)

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto"
      style={{
        height: "100dvh",
        paddingBottom: 100,
        background: "var(--color-paper)",
      }}
    >
      {/* DAY TRANSITION OVERLAY */}
      <AnimatePresence>
        {dayTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,

              background: "var(--color-charcoal)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              pointerEvents: "none",
            }}
          >
            <motion.span
              className="font-display text-paper"
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{
                fontSize: 160,
                fontStyle: "italic",
                fontWeight: 200,
                lineHeight: 1,
              }}
            >
              {transitionNum}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DAY SWITCHER */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(243,237,224,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(28,26,23,0.08)",
        }}
      >
        <div className="label" style={{ color: "var(--color-blue)" }}>
          TODAY
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((n) => (
            <motion.button
              key={n}
              onClick={() => changeDay(n)}
              className="font-mono relative"
              style={{
                width: 36,
                height: 28,

                fontSize: 11,

                color:
                  activeDay === n
                    ? "var(--color-paper)"
                    : "var(--color-charcoal)",

                background:
                  activeDay === n ? "var(--color-charcoal)" : "transparent",

                borderRadius: 2,

                transition: "all 0.2s",
              }}
              whileTap={{ scale: 0.9 }}
            >
              {String(n).padStart(2, "0")}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* HERO SECTION */}
          <div
            className="relative overflow-hidden"
            style={{ height: "65vw", maxHeight: 280 }}
          >
            <motion.img
              src={`https://images.unsplash.com/${
                activeDay === 1
                  ? "photo-1741225235666-5fd931fd40e1"
                  : activeDay === 2
                    ? "photo-1719338136676-cac017b5260e"
                    : activeDay === 3
                      ? "photo-1609831353201-3e31d35cc985"
                      : "photo-1545014393-76c7b8936c76"
              }?w=800&h=500&fit=crop&auto=format&q=80`}
              alt={day.city}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.75) saturate(1.05)" }}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)",
              }}
            />
            <div className="absolute bottom-4 left-6">
              <div
                className="font-mono text-white/50"
                style={{ fontSize: 10, letterSpacing: "0.2em" }}
              >
                DAY {String(activeDay).padStart(2, "0")} · {day.date}
              </div>
              <div className="label text-white/40" style={{ fontSize: 10 }}>
                {day.city}
              </div>
            </div>
          </div>

          {/* EDITORIAL HEADLINE */}
          <div className="px-6 pt-8 pb-6">
            <div
              className="font-mono mb-3"
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--color-blue)",
              }}
            >
              DAY {String(activeDay).padStart(2, "0")}
            </div>
            {day.headline.map((line, i) => (
              <div
                key={i}
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(40px, 12vw, 56px)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--color-charcoal)",
                  marginTop: i > 0 ? -4 : 0,
                }}
              >
                {line}
              </div>
            ))}
            <p
              className="font-sans mt-4"
              style={{
                fontSize: 15,
                color: "var(--color-charcoal-soft)",
                lineHeight: 1.7,
              }}
            >
              {day.subline}
            </p>
          </div>

          <div className="rule mx-6" />

          {/* SCHEDULE */}
          {activeDay === 3 ? (
            <Day03Schedule
              onNavigate={onNavigate}
              savedSpots={savedSpots}
              onToggleSave={onToggleSave}
              selectedWhere={selectedWhere}
              setSelectedWhere={setSelectedWhere}
              otaruSpots={otaruSpots}
              nightRef={nightRef}
              nightBg={nightBg}
            />
          ) : activeDay === 1 ? (
            <Day01Schedule onNavigate={onNavigate} />
          ) : activeDay === 2 ? (
            <Day02Schedule onNavigate={onNavigate} />
          ) : (
            <Day04Schedule onNavigate={onNavigate} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function TimeBlock({
  time,

  title,

  desc,

  type,

  onClick,
}: {
  time?: string

  title: string

  desc?: string

  type: "FIX" | "PLAN" | "OPTION"

  onClick?: () => void
}) {
  return (
    <motion.div
      className="flex gap-4 py-4"
      style={{
        borderBottom: "1px solid rgba(28,26,23,0.07)",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
      whileTap={onClick ? { backgroundColor: "rgba(28,26,23,0.03)" } : {}}
    >
      <div style={{ width: 48, flexShrink: 0, paddingTop: 2 }}>
        {time && (
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: "var(--color-blue)",
              letterSpacing: "0.05em",
            }}
          >
            {time}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div
            className="font-sans"
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--color-charcoal)",
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
          <Badge type={type} />
        </div>
        {desc && (
          <div
            className="font-sans mt-1"
            style={{
              fontSize: 13,
              color: "var(--color-charcoal-soft)",
              opacity: 0.8,
            }}
          >
            {desc}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 pt-8 pb-2">
      <div
        className="label"
        style={{ fontSize: 10, color: "var(--color-beige)" }}
      >
        {children}
      </div>
    </div>
  )
}

function Day03Schedule({
  onNavigate,

  savedSpots,

  onToggleSave,

  selectedWhere,

  setSelectedWhere,

  otaruSpots,

  nightRef,

  nightBg,
}: {
  onNavigate: (p: any, id?: string) => void

  savedSpots: Set<string>

  onToggleSave: (id: string) => void

  selectedWhere: string | null

  setSelectedWhere: (id: string) => void

  otaruSpots: typeof spots

  nightRef: React.RefObject<HTMLDivElement | null>

  nightBg: any
}) {
  const [choiceConfirmed, setChoiceConfirmed] = useState(false)

  const confirmChoice = (id: string) => {
    setSelectedWhere(id)

    setChoiceConfirmed(true)

    setTimeout(() => setChoiceConfirmed(false), 2000)
  }

  return (
    <>
      <SectionLabel>朝</SectionLabel>
      <div className="px-6">
        <TimeBlock
          type="PLAN"
          title="ホテルで朝食"
          desc="ゆっくりめに起きて、ホテルの朝食を楽しむ。"
        />
      </div>

      <SectionLabel>午前</SectionLabel>
      <div className="px-6 pb-2">
        <div
          className="font-sans mb-3"
          style={{ fontSize: 15, fontWeight: 500 }}
        >
          堺町をぶらぶら
        </div>
        <div
          className="font-sans mb-4"
          style={{
            fontSize: 13,
            color: "var(--color-charcoal-soft)",
            opacity: 0.8,
          }}
        >
          その日の気分でお気に入りを見つけよう。
        </div>

        {/* Spot cards - horizontal scroll */}
        <div
          className="flex gap-3 -mx-6 px-6 overflow-x-auto pb-3"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {otaruSpots
            .filter(
              (s) =>
                s.type === "OPTION" &&
                s.id !== "otaru-canal" &&
                s.id !== "tengu-mountain",
            )
            .map((spot) => (
              <motion.button
                key={spot.id}
                onClick={() => onNavigate("spot", spot.id)}
                className="relative flex-none overflow-hidden"
                style={{
                  width: 130,
                  height: 170,
                  borderRadius: 4,
                  scrollSnapAlign: "start",
                }}
                whileTap={{ scale: 0.96 }}
              >
                <img
                  src={`https://images.unsplash.com/${spot.image.split("/").pop()?.split("?")[0]}?w=300&h=400&fit=crop&auto=format&q=75`}
                  alt={spot.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.7)" }}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1609831353201-3e31d35cc985?w=300&h=400&fit=crop&auto=format&q=75`
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <Badge type={spot.type} />
                  <div
                    className="font-display text-white mt-1 leading-tight"
                    style={{ fontSize: 12, fontStyle: "italic" }}
                  >
                    {spot.name}
                  </div>
                </div>
              </motion.button>
            ))}
        </div>
      </div>

      <SectionLabel>昼</SectionLabel>
      <div className="px-6">
        {/* Otaru Bine feature */}
        <motion.button
          onClick={() => onNavigate("spot", "otaru-bine")}
          className="relative w-full overflow-hidden mb-4 text-left"
          style={{ borderRadius: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative" style={{ height: 180 }}>
            <img
              src="https://images.unsplash.com/photo-1774705740253-fc1e515aa4ee?w=700&h=400&fit=crop&auto=format&q=80"
              alt="小樽バイン"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.75)" }}
            />
            {/* Tape strip decoration */}
            <div
              className="tape absolute"
              style={{
                top: 12,
                left: -4,
                padding: "2px 16px 2px 12px",
                transform: "rotate(-1deg)",
              }}
            >
              <span
                className="font-mono text-amber-900"
                style={{ fontSize: 10, letterSpacing: "0.1em" }}
              >
                LUNCH PICK
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
              }}
            />
            <div className="absolute bottom-4 left-4">
              <div
                className="font-display text-white"
                style={{ fontSize: 22, fontStyle: "italic" }}
              >
                小樽バイン
              </div>
              <div className="label text-white/60" style={{ fontSize: 10 }}>
                WINE / LUNCH · 60〜90分
              </div>
            </div>
          </div>
        </motion.button>

        <TimeBlock
          type="PLAN"
          title="小樽バイン"
          desc="ワインとランチ。歴史ある建物でゆっくり過ごす。"
          onClick={() => onNavigate("spot", "otaru-bine")}
        />
      </div>

      {/* WHERE NEXT */}
      <div
        className="pt-12 pb-6"
        style={{ background: "var(--color-paper-dark)" }}
      >
        <div className="px-6 mb-2">
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--color-blue)",
            }}
          >
            午後
          </div>
          <div
            className="font-display"
            style={{
              fontSize: "clamp(36px, 11vw, 52px)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            WHERE NEXT?
          </div>
          <div
            className="font-sans mt-2"
            style={{
              fontSize: 14,
              color: "var(--color-charcoal-soft)",
              opacity: 0.8,
            }}
          >
            次、どこ行く？
          </div>
        </div>

        {/* Choice cards - horizontal snap scroll */}
        <div
          className="overflow-x-auto flex gap-3 px-6 pt-6 pb-4"
          style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: 24 }}
        >
          {whereNextOptions.map((opt) => {
            const isSelected = selectedWhere === opt.id

            return (
              <motion.button
                key={opt.id}
                onClick={() => {
                  confirmChoice(opt.id)

                  if (opt.spotId) onNavigate("spot", opt.spotId)
                }}
                className="relative flex-none text-left overflow-hidden"
                style={{
                  width: "72vw",

                  maxWidth: 300,

                  height: 200,

                  scrollSnapAlign: "start",

                  borderRadius: 4,

                  border: isSelected
                    ? "2px solid var(--color-wine)"
                    : "2px solid transparent",

                  transition: "border 0.2s",
                }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={`https://images.unsplash.com/${opt.img}?w=600&h=400&fit=crop&auto=format&q=75`}
                  alt={opt.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: `brightness(${isSelected ? 0.55 : 0.7})` }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)",
                  }}
                />

                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div>
                    <div
                      className="font-display text-white/30"
                      style={{
                        fontSize: 64,
                        fontStyle: "italic",
                        fontWeight: 200,
                        lineHeight: 1,
                        position: "absolute",
                        right: 12,
                        top: 8,
                      }}
                    >
                      {opt.letter}
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-display text-white"
                      style={{ fontSize: 20, fontStyle: "italic" }}
                    >
                      {opt.title}
                    </div>
                    <div
                      className="label text-white/60"
                      style={{ fontSize: 9 }}
                    >
                      {opt.subtitle}
                    </div>
                    <div
                      className="font-sans text-white/80 mt-1"
                      style={{ fontSize: 12 }}
                    >
                      {opt.desc}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 left-3"
                    style={{
                      background: "var(--color-wine)",

                      color: "white",

                      padding: "3px 8px",

                      borderRadius: 2,

                      fontFamily: "var(--font-mono)",

                      fontSize: 9,

                      letterSpacing: "0.1em",
                    }}
                  >
                    ✓ GOOD CHOICE
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* NIGHT SECTION */}
      <div
        ref={nightRef as any}
        className="pt-12 pb-8"
        style={{ background: "var(--color-warm-dark)" }}
      >
        <div className="px-6">
          <div
            className="label mb-6"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}
          >
            夜 · NIGHT
          </div>

          {/* Ramen */}
          <div className="mb-8">
            <div
              className="font-display text-white"
              style={{
                fontSize: "clamp(40px, 12vw, 56px)",
                fontStyle: "italic",
                fontWeight: 200,
                lineHeight: 1,
              }}
            >
              RAMEN
            </div>
            <div
              className="font-sans mt-2"
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
              }}
            >
              まずラーメン。
              <br />
              <span style={{ fontSize: 13, opacity: 0.7 }}>
                北海道といえばやっぱりこれ。
              </span>
            </div>
          </div>

          <div
            className="rule"
            style={{ borderColor: "rgba(255,255,255,0.08)", marginBottom: 32 }}
          />

          {/* One More */}
          <div>
            <div
              className="font-mono mb-2"
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              その後は
            </div>
            <div
              className="font-display text-white"
              style={{
                fontSize: "clamp(28px, 9vw, 40px)",
                fontStyle: "italic",
                fontWeight: 200,
                lineHeight: 1.1,
              }}
            >
              ONE MORE?
            </div>
            <div
              className="font-sans mt-3"
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
              }}
            >
              そのあと、レトロな飲み屋街へ。
              <br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                北一ホールや小樽の夜を楽しんで。
              </span>
            </div>

            {/* Wine illustration area */}
            <motion.div
              className="float-anim mt-8 text-center"
              style={{ fontSize: 48, opacity: 0.4 }}
            >
              🍷
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

function Day01Schedule({
  onNavigate,
}: {
  onNavigate: (p: any, id?: string) => void
}) {
  return (
    <>
      <div className="px-6">
        <TimeBlock
          time="11:50"
          type="FIX"
          title="小野原出発"
          desc="自宅を出発。関空へ向かう。"
        />
        <TimeBlock
          time="14:00"
          type="FIX"
          title="関西国際空港 到着"
          desc="チェックインと荷物預け。余裕を持って。"
        />
        <TimeBlock
          time="15:30"
          type="FIX"
          title="✈ 飛行機 出発"
          desc="関空 → 新千歳。約1時間45分。"
        />
        <TimeBlock
          time="17:35"
          type="FIX"
          title="新千歳空港 到着"
          desc="北海道、到着。"
        />
        <TimeBlock
          time="19:00頃"
          type="PLAN"
          title="札幌 到着"
          desc="JRかバスで市内へ。"
        />
        <TimeBlock
          time="19:30頃"
          type="PLAN"
          title="ニューオータニイン札幌"
          desc="ホテルにチェックイン。荷物を置いて、夜へ。"
        />
      </div>

      <div className="px-6 pt-8">
        <div className="label mb-4" style={{ color: "var(--color-beige)" }}>
          夜
        </div>
        <div
          className="font-display mb-3"
          style={{ fontSize: 28, fontStyle: "italic" }}
        >
          お寿司と日本酒。
        </div>
        <div
          className="font-sans mb-4"
          style={{
            fontSize: 14,
            color: "var(--color-charcoal-soft)",
            opacity: 0.8,
          }}
        >
          北海道初日の夜は海鮮で決まり。
        </div>

        <motion.button
          onClick={() => onNavigate("map")}
          className="flex items-center gap-3 py-3"
          style={{
            borderBottom: "1px solid rgba(28,26,23,0.08)",
            width: "100%",
            textAlign: "left",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex-1">
            <div
              className="font-sans"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              回転寿しトリトン
            </div>
            <div
              className="label"
              style={{ fontSize: 9, color: "var(--color-blue)" }}
            >
              OPTION · 北海道の寿司
            </div>
          </div>
          <span style={{ color: "var(--color-blue)", fontSize: 16 }}>↗</span>
        </motion.button>

        <div
          className="mt-6 pt-6"
          style={{ borderTop: "1px solid rgba(28,26,23,0.07)" }}
        >
          <div
            className="font-sans"
            style={{
              fontSize: 14,
              color: "var(--color-charcoal-soft)",
              opacity: 0.8,
            }}
          >
            その後はホテルで二次会。
          </div>
        </div>
      </div>
    </>
  )
}

function Day02Schedule({
  onNavigate,
}: {
  onNavigate: (p: any, id?: string) => void
}) {
  return (
    <>
      <div className="px-6">
        <div
          className="label mb-2 pt-4"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          朝
        </div>
        <TimeBlock
          type="PLAN"
          title="ホテルで軽く朝食"
          desc="かなり軽め。11時までにチェックアウト。"
        />

        <div
          className="label mb-2 pt-4"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          午前 · 札幌
        </div>
        <TimeBlock type="OPTION" title="プリクラ" desc="記念に一枚。" />
        <TimeBlock
          type="PLAN"
          title="二条市場"
          desc="海鮮を食べ歩く。新鮮な海の幸を堪能。"
        />

        <div
          className="label mb-2 pt-6"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          昼過ぎ · 移動
        </div>
        <TimeBlock
          type="PLAN"
          title="小樽へ移動"
          desc="JRで約35分。荷物はホテルに預ける。"
        />
        <TimeBlock
          type="PLAN"
          title="ホテルに荷物を置く"
          desc="チェックイン後、身軽に観光。"
        />

        <div
          className="label mb-2 pt-6"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          夕方
        </div>

        {/* Wine time feature */}
        <div
          className="relative overflow-hidden mb-4"
          style={{ borderRadius: 4 }}
        >
          <img
            src="https://images.unsplash.com/photo-1779221596208-94d03c53ff85?w=700&h=300&fit=crop&auto=format&q=80"
            alt="Wine time"
            className="w-full object-cover"
            style={{ height: 160, filter: "brightness(0.65)" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
            }}
          />
          <div className="absolute bottom-4 left-4">
            <div className="font-mono text-white/50" style={{ fontSize: 10 }}>
              17:00頃
            </div>
            <div
              className="font-display text-white"
              style={{ fontSize: 24, fontStyle: "italic" }}
            >
              WINE TIME
            </div>
            <div className="font-sans text-white/70" style={{ fontSize: 12 }}>
              ホテルでワイン。一息つく。
            </div>
          </div>
        </div>

        <div
          className="label mb-2 pt-4"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          夜
        </div>
        <TimeBlock
          type="PLAN"
          title="小樽倉庫No.1"
          desc="運河沿いの醸造所レストランで夕食。"
          onClick={() => onNavigate("spot", "otaru-warehouse")}
        />
      </div>
    </>
  )
}

function Day04Schedule({
  onNavigate,
}: {
  onNavigate: (p: any, id?: string) => void
}) {
  return (
    <>
      <div className="px-6">
        <div
          className="label mb-2 pt-4"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          朝
        </div>
        <TimeBlock
          type="PLAN"
          title="ホテルで朝食"
          desc="最後の小樽の朝。ゆっくりと。"
        />

        <div
          className="label mb-2 pt-4"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          午前
        </div>
        <TimeBlock
          type="PLAN"
          title="田中酒造 本店"
          desc="明治35年創業。北海道の日本酒をお土産に。"
          onClick={() => onNavigate("spot", "tanaka-sake")}
        />

        <div className="pt-8 pb-4">
          <div
            className="font-display"
            style={{
              fontSize: "clamp(32px, 10vw, 48px)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            LAST OTARU TIME
          </div>
          <div
            className="font-sans mt-3"
            style={{
              fontSize: 14,
              color: "var(--color-charcoal-soft)",
              opacity: 0.8,
              lineHeight: 1.7,
            }}
          >
            あとはその日の気分で。
            <br />
            お土産、カフェ、運河——
            <br />
            好きな小樽の最後を過ごして。
          </div>
        </div>

        <div
          className="label mb-2 pt-4"
          style={{ fontSize: 10, color: "var(--color-beige)" }}
        >
          午後 · 帰路
        </div>
        <TimeBlock
          time="15:30"
          type="FIX"
          title="小樽 出発"
          desc="新千歳空港へ向かう。"
        />
        <TimeBlock
          time="17:30頃"
          type="FIX"
          title="新千歳空港 到着"
          desc="お疲れ様でした。いい旅だった。"
        />
      </div>
    </>
  )
}
