import { motion } from "framer-motion"

type Page = "home" | "today" | "map" | "saved"

interface Props {
  current: Page

  onChange: (p: Page) => void
}

export default function BottomNav({ current, onChange }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(243,237,224,0.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(28,26,23,0.1)",
      }}
    >
      <div
        className="flex items-end justify-around px-2 pb-safe"
        style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
      >
        <NavItem
          label="HOME"
          active={current === "home"}
          onClick={() => onChange("home")}
        >
          <HomeIcon />
        </NavItem>

        {/* TODAY — center, elevated */}
        <button
          onClick={() => onChange("today")}
          className="relative flex flex-col items-center -mt-6"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <motion.div
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg"
            style={{
              background:
                current === "today"
                  ? "var(--color-charcoal)"
                  : "var(--color-blue)",
            }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span
              className="font-mono text-white leading-none"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              TODAY
            </span>
            <span
              className="font-display text-white font-bold leading-none mt-0.5"
              style={{ fontSize: 18, fontStyle: "italic" }}
            >
              03
            </span>
          </motion.div>
        </button>

        <NavItem
          label="MAP"
          active={current === "map"}
          onClick={() => onChange("map")}
        >
          <MapIcon />
        </NavItem>

        <NavItem
          label="SAVED"
          active={current === "saved"}
          onClick={() => onChange("saved")}
        >
          <HeartIcon />
        </NavItem>
      </div>
    </nav>
  )
}

function NavItem({
  label,

  active,

  onClick,

  children,
}: {
  label: string

  active: boolean

  onClick: () => void

  children: React.ReactNode
}) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 pt-3 pb-1 px-3"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div
        style={{
          color: active ? "var(--color-charcoal)" : "var(--color-beige)",
          transition: "color 0.2s",
        }}
      >
        {children}
      </div>
      <span
        className="font-mono"
        style={{
          fontSize: 9,

          letterSpacing: "0.15em",

          color: active ? "var(--color-charcoal)" : "var(--color-beige)",

          transition: "color 0.2s",
        }}
      >
        {label}
      </span>
    </motion.button>
  )
}

function HomeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}
