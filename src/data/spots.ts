export interface Spot {
  id: string

  name: string

  nameEn: string

  category: string

  description: string

  area: string

  duration: string

  vibe: string[]

  image: string

  thumbImage?: string

  day: number

  type: "FIX" | "PLAN" | "OPTION"

  mapsUrl?: string

  memo?: string
}

const PH = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`

export const spots: Spot[] = [
  {
    id: "otaru-bine",

    name: "小樽バイン",

    nameEn: "OTARU BINE",

    category: "WINE / LUNCH",

    description:
      "歴史ある石造りの倉庫を改装したワインレストラン。小樽ワインを樽から直接グラスに注いでくれる。ゆっくりとしたランチにちょうどいい。",

    area: "小樽中心部 / 色内",

    duration: "60〜90分",

    vibe: ["ワイン", "ゆっくり", "ランチ"],

    image: PH("photo-1774705740253-fc1e515aa4ee", 800, 1000),

    thumbImage: PH("photo-1774705740253-fc1e515aa4ee", 400, 500),

    day: 3,

    type: "PLAN",

    mapsUrl: "https://maps.google.com/?q=小樽バイン",

    memo: "ワイン飲みたい🍷",
  },

  {
    id: "kitaichi-glass",

    name: "北一硝子 三号館",

    nameEn: "KITAICHI GLASS",

    category: "CRAFT / SHOPPING",

    description:
      "明治時代の倉庫を改築したガラス工芸品店。167個の石油ランプが灯す幻想的な空間が有名。ガラス細工の器やアクセサリーが揃う。",

    area: "堺町通り",

    duration: "30〜45分",

    vibe: ["レトロ", "アート", "お土産"],

    image: PH("photo-1609831353201-3e31d35cc985", 800, 1000),

    thumbImage: PH("photo-1609831353201-3e31d35cc985", 400, 500),

    day: 3,

    type: "OPTION",

    mapsUrl: "https://maps.google.com/?q=北一硝子三号館",
  },

  {
    id: "otaru-orgel",

    name: "小樽オルゴール堂",

    nameEn: "OTARU ORGEL DO",

    category: "MUSIC / SHOPPING",

    description:
      "明治45年建造の旧共成株式会社倉庫を利用したオルゴール専門店。3,000種類以上が並ぶ。蒸気時計が目印。",

    area: "堺町通り",

    duration: "30〜45分",

    vibe: ["レトロ", "お土産", "フォト"],

    image: PH("photo-1673750254142-792fbd6cf7d3", 800, 1000),

    thumbImage: PH("photo-1673750254142-792fbd6cf7d3", 400, 500),

    day: 3,

    type: "OPTION",

    mapsUrl: "https://maps.google.com/?q=小樽オルゴール堂",
  },

  {
    id: "tengu-mountain",

    name: "天狗山",

    nameEn: "TENGU MOUNTAIN",

    category: "DRIVE / VIEW",

    description:
      "小樽市街と石狩湾を一望できる標高532mの展望台。ロープウェイで登れる。晴れた日は積丹半島まで見える。夕暮れが格別。",

    area: "小樽郊外 / 要ドライブ",

    duration: "60〜90分",

    vibe: ["ドライブ", "絶景", "夕暮れ"],

    image: PH("photo-1545105511-839f4a45a030", 800, 1000),

    thumbImage: PH("photo-1545105511-839f4a45a030", 400, 500),

    day: 3,

    type: "OPTION",

    mapsUrl: "https://maps.google.com/?q=天狗山ロープウェイ",

    memo: "疲れてなかったら",
  },

  {
    id: "otaru-canal",

    name: "小樽運河",

    nameEn: "OTARU CANAL",

    category: "WALK / SCENERY",

    description:
      "大正12年に完成した全長1,140mの運河。石造りの倉庫群が立ち並ぶ景観は、かつて「北のウォール街」と呼ばれた小樽の面影を今に伝える。",

    area: "小樽中心部",

    duration: "30〜60分",

    vibe: ["散歩", "フォト", "夕暮れ"],

    image: PH("photo-1545014393-76c7b8936c76", 800, 1000),

    thumbImage: PH("photo-1545014393-76c7b8936c76", 400, 500),

    day: 3,

    type: "OPTION",

    mapsUrl: "https://maps.google.com/?q=小樽運河",

    memo: "夕方よさそう",
  },

  {
    id: "otaru-warehouse",

    name: "小樽倉庫No.1",

    nameEn: "OTARU WAREHOUSE No.1",

    category: "BEER / DINNER",

    description:
      "運河沿いの石造り倉庫を改装したブリュワリーレストラン。醸造タンクを眺めながら出来立ての小樽ビールが飲める。",

    area: "運河沿い",

    duration: "90〜120分",

    vibe: ["ビール", "ディナー", "雰囲気"],

    image: PH("photo-1598176314960-249219ed5409", 800, 1000),

    thumbImage: PH("photo-1598176314960-249219ed5409", 400, 500),

    day: 2,

    type: "PLAN",

    mapsUrl: "https://maps.google.com/?q=小樽倉庫No1",

    memo: "ここ行こ",
  },

  {
    id: "tanaka-sake",

    name: "田中酒造 本店",

    nameEn: "TANAKA SAKE",

    category: "SAKE / SHOP",

    description:
      "明治35年創業の老舗酒蔵。北海道の厳選された米と伏流水で仕込んだ純米酒が揃う。試飲もできる。空港前の最後のお買い物に最適。",

    area: "小樽 / 祝津",

    duration: "30〜45分",

    vibe: ["日本酒", "お土産", "ローカル"],

    image: PH("photo-1534678275982-a3989afe85e6", 800, 1000),

    thumbImage: PH("photo-1534678275982-a3989afe85e6", 400, 500),

    day: 4,

    type: "PLAN",

    mapsUrl: "https://maps.google.com/?q=田中酒造本店",
  },
]

export const getSpotById = (id: string) => spots.find((s) => s.id === id)
