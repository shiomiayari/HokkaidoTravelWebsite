export interface DayData {
  day: number

  date: string

  dateShort: string

  city: string

  cityEn: string

  headline: string[]

  subline: string

  heroImage: string

  color: string
}

const IMG = (id: string, w = 800, h = 1100) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`

export const days: DayData[] = [
  {
    day: 1,

    date: "01 SEP",

    dateShort: "01",

    city: "大阪 → 新千歳 → 札幌",

    cityEn: "OSAKA → SAPPORO",

    headline: ["HELLO,", "HOKKAIDO."],

    subline: "大阪から北海道へ。今日から4日間の旅がはじまる。",

    heroImage: IMG("photo-1741225235666-5fd931fd40e1", 800, 1100),

    color: "#3B6FA0",
  },

  {
    day: 2,

    date: "02 SEP",

    dateShort: "02",

    city: "札幌 → 小樽",

    cityEn: "SAPPORO → OTARU",

    headline: ["SAPPORO", "→ OTARU"],

    subline: "札幌を遊んで、小樽へ。夜は運河沿いで乾杯。",

    heroImage: IMG("photo-1719338136676-cac017b5260e", 800, 1100),

    color: "#2A4036",
  },

  {
    day: 3,

    date: "03 SEP",

    dateShort: "03",

    city: "小樽",

    cityEn: "OTARU",

    headline: ["SLOW DAY", "IN OTARU."],

    subline: "今日は小樽をゆっくり歩く日。",

    heroImage: IMG("photo-1609831353201-3e31d35cc985", 800, 1100),

    color: "#8B1A2F",
  },

  {
    day: 4,

    date: "04 SEP",

    dateShort: "04",

    city: "小樽 → 新千歳",

    cityEn: "OTARU → CHITOSE",

    headline: ["ONE LAST", "MORNING."],

    subline: "最後の小樽の朝。ゆっくり過ごして、帰ろう。",

    heroImage: IMG("photo-1545014393-76c7b8936c76", 800, 1100),

    color: "#C07C2A",
  },
]
