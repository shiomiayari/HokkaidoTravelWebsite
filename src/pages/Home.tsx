import { useRef, useState, useEffect } from "react"

import { motion, useScroll, useTransform, useInView } from "framer-motion"

type Page = "home" | "today" | "map" | "saved" | "spot"

interface Props {
  onNavigate: (p: Page, id?: string) => void
}

const PATH_D = "M30 20 L30 90 Q30 110 30 130 L30 200 Q30 220 30 240 L30 300"

const PATH_LENGTH = 280 // approximate length

export default function Home({ onNavigate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const routeRef = useRef<HTMLDivElement>(null)

  const [heroLoaded, setHeroLoaded] = useState(false)

  const { scrollYProgress } = useScroll({ container: containerRef })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80])

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08])

  const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -40])

  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  // Scroll-linked route draw

  const { scrollYProgress: routeProgress } = useScroll({
    target: routeRef,

    container: containerRef,

    offset: ["start end", "end center"],
  })

  const dashOffset = useTransform(routeProgress, [0, 1], [PATH_LENGTH, 0])

  const planeY = useTransform(routeProgress, [0, 1], [0, 280])

  // Cities appear in view

  const routeInView = useInView(routeRef, { once: true, margin: "-10% 0px" })

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto"
      style={{ paddingBottom: 80, position: "relative" }}
    >
      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative" style={{ height: "100dvh" }}>
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1545105511-839f4a45a030?w=900&h=1300&fit=crop&auto=format&q=85"
            alt="北海道の風景"
            className="w-full h-full object-cover"
            onLoad={() => setHeroLoaded(true)}
            style={{ filter: "brightness(0.72) saturate(1.1)" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,

              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-between px-6"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <div className="pt-16">
            <motion.div
              className="label text-white/60"
              initial={{ opacity: 0 }}
              animate={heroLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              FUMIRI × KAZUYA
            </motion.div>
            <motion.h1
              className="font-display text-white leading-none mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.5,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontSize: "clamp(72px, 22vw, 96px)",
                fontStyle: "italic",
                fontWeight: 200,
              }}
            >
              OUR
            </motion.h1>
            <motion.h1
              className="font-display text-white leading-none -mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.65,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontSize: "clamp(72px, 22vw, 96px)",
                fontStyle: "italic",
                fontWeight: 200,
              }}
            >
              HOKKAIDO
            </motion.h1>
            <motion.div
              className="font-mono text-white/70 mt-4"
              initial={{ opacity: 0 }}
              animate={heroLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{ fontSize: 11, letterSpacing: "0.2em" }}
            >
              01 — 04 SEP 2026
            </motion.div>
          </div>

          <div className="pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div className="flex gap-8 mb-6">
                {[
                  ["4", "DAYS"],
                  ["2", "CITIES"],
                  ["1", "TRIP"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div
                      className="font-display text-white font-light"
                      style={{ fontSize: 36, fontStyle: "italic" }}
                    >
                      {n}
                    </div>
                    <div className="label text-white/60">{l}</div>
                  </div>
                ))}
              </div>
              <motion.button
                onClick={() => onNavigate("today")}
                className="flex items-center gap-3"
                whileTap={{ scale: 0.96 }}
              >
                <span className="font-sans text-white/90 text-sm">
                  今日の予定を見る
                </span>
                <span className="text-white/70">→</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ opacity: 0.5 }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: "white",
              margin: "0 auto",
            }}
          />
        </motion.div>
      </div>

      {/* ── INTRO ────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="label mb-6" style={{ color: "var(--color-blue)" }}>
          THE JOURNEY
        </div>
        <p
          className="font-sans"
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--color-charcoal-soft)",
          }}
        >
          大阪を出発して、北の大地へ。
          <br />
          4日間、2つの街。
          <br />
          二人だけの北海道旅行。
        </p>
        <div className="rule mt-8 mb-10" />

        {/* Polaroid strip */}
        <div
          className="flex gap-3 -mx-2 overflow-x-auto pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {[
            {
              src: "photo-1741225235666-5fd931fd40e1",
              label: "SAPPORO",
              rotate: "-2deg",
            },

            {
              src: "photo-1609831353201-3e31d35cc985",
              label: "OTARU",
              rotate: "1.5deg",
            },

            {
              src: "photo-1672110233006-1366586fa08a",
              label: "JOURNEY",
              rotate: "-1deg",
            },
          ].map(({ src, label, rotate }) => (
            <div
              key={src}
              className="polaroid flex-none"
              style={{
                width: 140,
                scrollSnapAlign: "center",
                transform: `rotate(${rotate})`,
              }}
            >
              <img
                src={`https://images.unsplash.com/${src}?w=300&h=380&fit=crop&auto=format&q=80`}
                alt={label}
                className="w-full aspect-[3/4] object-cover"
              />
              <div
                className="label mt-2 text-center"
                style={{ color: "var(--color-beige)", fontSize: 9 }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRAVEL ROUTE ─────────────────────────────── */}
      <section
        ref={routeRef}
        className="px-6 py-12"
        style={{ background: "var(--color-charcoal)", color: "white" }}
      >
        <div
          className="label mb-8"
          style={{ color: "var(--color-blue-light)", opacity: 0.7 }}
        >
          ROUTE
        </div>
        <div className="label mb-2 text-white/40" style={{ fontSize: 10 }}>
          01 SEP — 04 SEP 2026
        </div>

        <div className="flex gap-6">
          {/* Animated SVG route line — driven by Framer Motion style, no GSAP */}
          <div className="relative flex-none" style={{ width: 60 }}>
            <svg
              width="60"
              height="320"
              viewBox="0 0 60 320"
              overflow="visible"
            >
              {/* Static background faint path */}
              <path
                d={PATH_D}
                stroke="rgba(74,127,176,0.2)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Animated draw path */}
              <motion.path
                d={PATH_D}
                stroke="#4A7FB5"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                style={{
                  pathLength: routeProgress,
                }}
              />
              {/* City dots */}
              {[20, 130, 200, 300].map((y, i) => (
                <motion.circle
                  key={i}
                  cx="30"
                  cy={y}
                  r="4"
                  fill="#4A7FB5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={routeInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: i * 0.18,
                    duration: 0.4,
                    type: "spring",
                  }}
                  style={{ transformOrigin: `30px ${y}px` }}
                />
              ))}
            </svg>

            {/* Plane follows line */}
            <motion.div
              style={{
                position: "absolute",
                top: 16,
                left: 22,
                fontSize: 15,
                y: planeY,
              }}
            >
              ✈
            </motion.div>
          </div>

          {/* City labels */}
          <div
            className="flex flex-col justify-between"
            style={{ height: 320, paddingTop: 12, paddingBottom: 12 }}
          >
            {[
              { sub: "DEPARTURE", city: "大阪", detail: "関西国際空港" },

              { sub: "ARRIVE", city: "新千歳", detail: "新千歳空港" },

              { sub: "DAY 01 — 02", city: "SAPPORO", detail: "札幌" },

              { sub: "DAY 02 — 04", city: "OTARU", detail: "小樽" },
            ].map(({ sub, city, detail }, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, x: -12 }}
                animate={routeInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.5 }}
              >
                <div
                  className="font-mono text-white/40"
                  style={{ fontSize: 10, letterSpacing: "0.15em" }}
                >
                  {sub}
                </div>
                <div
                  className="font-display text-white"
                  style={{ fontSize: 22, fontStyle: "italic" }}
                >
                  {city}
                </div>
                <div
                  className="font-mono text-white/30"
                  style={{ fontSize: 10 }}
                >
                  {detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAY OVERVIEW ─────────────────────────────── */}
      <section className="py-12">
        <div className="px-6 mb-6">
          <div className="label" style={{ color: "var(--color-blue)" }}>
            ITINERARY
          </div>
        </div>

        <div
          className="overflow-x-auto flex gap-4 px-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {[
            {
              day: "01",
              city: "SAPPORO",
              sub: "大阪 → 北海道へ",
              img: "photo-1741225235666-5fd931fd40e1",
              color: "#3B6FA0",
            },

            {
              day: "02",
              city: "SAPPORO\n→ OTARU",
              sub: "札幌から小樽へ",
              img: "photo-1719338136676-cac017b5260e",
              color: "#2A4036",
            },

            {
              day: "03",
              city: "OTARU",
              sub: "ゆっくり歩く日",
              img: "photo-1609831353201-3e31d35cc985",
              color: "#8B1A2F",
            },

            {
              day: "04",
              city: "LAST\nMORNING",
              sub: "小樽 → 新千歳",
              img: "photo-1545014393-76c7b8936c76",
              color: "#C07C2A",
            },
          ].map(({ day, city, sub, img, color }) => (
            <motion.button
              key={day}
              onClick={() => onNavigate("today")}
              className="relative flex-none overflow-hidden"
              style={{
                width: 180,
                height: 240,
                scrollSnapAlign: "start",
                borderRadius: 4,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={`https://images.unsplash.com/${img}?w=400&h=500&fit=crop&auto=format&q=75`}
                alt={city}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.65)" }}
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div>
                  <div
                    className="font-mono text-white/50"
                    style={{ fontSize: 10, letterSpacing: "0.2em" }}
                  >
                    DAY
                  </div>
                  <div
                    className="font-display text-white leading-none"
                    style={{
                      fontSize: 56,
                      fontStyle: "italic",
                      fontWeight: 200,
                      opacity: 0.9,
                    }}
                  >
                    {day}
                  </div>
                </div>
                <div>
                  <div
                    className="font-display text-white leading-tight mb-1"
                    style={{
                      fontSize: 14,
                      fontStyle: "italic",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {city}
                  </div>
                  <div
                    className="font-sans text-white/60"
                    style={{ fontSize: 11 }}
                  >
                    {sub}
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: color,
                }}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="px-6 py-12 text-center">
        <div
          className="font-display"
          style={{
            fontSize: 13,
            fontStyle: "italic",
            color: "var(--color-beige)",
          }}
        >
          A private interactive travel magazine
        </div>
        <div
          className="label mt-1"
          style={{ fontSize: 9, color: "var(--color-beige)", opacity: 0.6 }}
        >
          FUMIRI × KAZUYA · SEP 2026
        </div>
      </section>
    </div>
  )
}
