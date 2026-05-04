import { Product } from '@/types'

/**
 * Paraura product data — sourced from skywalk.info
 * Organised into categories: classic, lightweight, competition, miniwing, tandem
 * Harnesses, reserves and accessories are in separate arrays below
 */

// ── CLASSIC WINGS ────────────────────────────────────────────
export const classicWings: Product[] = [
  {
    id: '1',
    name: 'Skywalk Mescal 7',
    slug: 'mescal-7',
    category: 'classic',
    description:
      "The Mescal 7 is Skywalk's latest EN-A glider — purpose-built to give new pilots the easiest, safest entry into paragliding. With 40 cells, a low aspect ratio of 4.8, and Skywalk's signature Jet Flaps, it sets new standards in the beginner segment. Calm in the air, precise on the brakes, and genuinely fun to fly. Not just a school wing — a capable companion for your first XC adventures too.",
    specs: {
      certification: 'EN-A',
      cells: '40',
      flat_area: '26.5 m²',
      aspect_ratio: '4.8',
      top_speed: '46 km/h',
      glider_weight: '4.2–5.1 kg',
      technology: 'Jet Flaps, Shark Nose, Mini-ribs, Winglets, Rigid Foil leading edge',
      flying_goal: 'leisure',
      conditions: 'coastal,mixed',
    },
    images: ['/images/MESCAL7/hero.jpg'],
    wing_level: 'A',
    weight_ranges: [
      { size: 'XXS', min_weight: 50, max_weight: 70 },
      { size: 'XS', min_weight: 60, max_weight: 80 },
      { size: 'S', min_weight: 70, max_weight: 90 },
      { size: 'M', min_weight: 80, max_weight: 100 },
      { size: 'L', min_weight: 95, max_weight: 115 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/mescal7/',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Skywalk Tequila 6',
    slug: 'tequila-6',
    category: 'classic',
    description:
      "The Tequila 6 is Skywalk's legendary EN-B sports-intermediate — six generations of refinement distilled into the ideal wing for post-school pilots and XC beginners. Combines easy, forgiving flight characteristics with genuine XC capability. Built from exceptionally robust materials — perfect for South African launch sites. The wing that record-breaking pilots trust for 300 km flatland flights.",
    specs: {
      certification: 'EN-B',
      cells: '50',
      flat_area: '24.97 m²',
      aspect_ratio: '5.22',
      top_speed: '52 km/h',
      glider_weight: '4.6–5.8 kg',
      technology: 'Jet Flaps, Shark Nose, Mini-ribs, C-wires, Rigid Foil leading edge',
      flying_goal: 'leisure,xc',
      conditions: 'coastal,thermal-inland,mixed',
    },
    images: ['/images/TEQUILA6/hero.jpeg'],
    wing_level: 'B',
    weight_ranges: [
      { size: '75', min_weight: 55, max_weight: 75 },
      { size: '85', min_weight: 65, max_weight: 85 },
      { size: '95', min_weight: 75, max_weight: 95 },
      { size: '105', min_weight: 85, max_weight: 105 },
      { size: '115', min_weight: 95, max_weight: 115 },
      { size: '135', min_weight: 105, max_weight: 135 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/tequila6/',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Skywalk Arak 2',
    slug: 'arak-2',
    category: 'classic',
    description:
      "The Arak 2 is Skywalk's versatile EN-B all-rounder — the multi-tool of the range. Covers the full spectrum of paragliding from leisure flying to serious XC. The Speed Control system makes accelerated flight intuitive and safe. Built robustly for demanding conditions, it handles everything South African flying throws at it while remaining accessible to intermediate pilots.",
    specs: {
      certification: 'EN-B',
      cells: '49',
      flat_area: '25.1 m²',
      aspect_ratio: '5.22',
      top_speed: '53 km/h',
      glider_weight: '3.95–5.2 kg',
      technology: 'Jet Flaps, Shark Nose, Mini-ribs, Speed Control',
      flying_goal: 'leisure,xc',
      conditions: 'coastal,thermal-inland,mixed',
    },
    images: ['/images/ARAK2/hero.jpg'],
    wing_level: 'B',
    weight_ranges: [
      { size: '75', min_weight: 55, max_weight: 75 },
      { size: '85', min_weight: 65, max_weight: 85 },
      { size: '95', min_weight: 75, max_weight: 95 },
      { size: '105', min_weight: 85, max_weight: 105 },
      { size: '115', min_weight: 95, max_weight: 115 },
      { size: '135', min_weight: 105, max_weight: 135 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/arak2/',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Skywalk Chili 5',
    slug: 'chili-5',
    category: 'classic',
    description:
      "The Chili 5 is Skywalk's high-end EN-B — the performance reference in its class. 57 cells, aspect ratio of 5.6, and the Speed Control system for rear-riser management on bar. It flies intuitively; pilot and glider quickly become one unit. Easy to core in thermals, fast on glide, and demanding enough to keep experienced pilots engaged. The wing for ambitious XC pilots who want every advantage without crossing into EN-C territory.",
    specs: {
      certification: 'EN-B',
      cells: '57',
      flat_area: '26.35 m²',
      aspect_ratio: '5.6',
      top_speed: '54 km/h',
      glider_weight: '4.5–5.6 kg',
      technology: 'Jet Flaps, Shark Nose, Mini-ribs, C-wires, Speed Control, Rigid Foil leading edge',
      flying_goal: 'xc,leisure',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/CHILI5/hero.jpg'],
    wing_level: 'B',
    weight_ranges: [
      { size: 'XXS', min_weight: 55, max_weight: 85 },
      { size: 'XS', min_weight: 70, max_weight: 95 },
      { size: 'S', min_weight: 85, max_weight: 105 },
      { size: 'M', min_weight: 95, max_weight: 115 },
      { size: 'L', min_weight: 105, max_weight: 135 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/chili5/',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Skywalk Mint',
    slug: 'mint',
    category: 'classic',
    description:
      "The Mint is Skywalk's new two-line EN-C — replacing the Cayenne after two decades. 68 cells, aspect ratio of 6.4, and two-liner technology that sharpens the performance leap from B to C class while remaining accessible to sports-class pilots. Direct, communicative, tight-turning in thermals, and fast on bar. Winner of the 2025 South Africa pre-PWC Sports Class. If you're ready to step beyond EN-B, the Mint is the most exciting wing at this level.",
    specs: {
      certification: 'EN-C',
      cells: '68',
      flat_area: '22.70 m²',
      aspect_ratio: '6.4',
      top_speed: '58 km/h',
      glider_weight: '4.30–5.30 kg',
      technology: 'Two-liner, Shark Nose, Jet Flaps, Mini-ribs',
      flying_goal: 'xc,competition',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/MINT/hero.jpg'],
    wing_level: 'C',
    weight_ranges: [
      { size: '75', min_weight: 55, max_weight: 75 },
      { size: '85', min_weight: 65, max_weight: 85 },
      { size: '95', min_weight: 75, max_weight: 95 },
      { size: '105', min_weight: 85, max_weight: 105 },
      { size: '115', min_weight: 95, max_weight: 115 },
      { size: '125', min_weight: 105, max_weight: 125 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/mint/',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Skywalk Poison 4',
    slug: 'poison-4',
    category: 'classic',
    description:
      "The Poison 4 is Skywalk's two-line EN-D competition glider — built for experienced pilots who demand the absolute maximum in performance. Exceptional glide, impressive top speed, and remarkable precision with EN-D certified passive safety. Designed for competition and serious XC distance pilots who know exactly what they're asking for. Not a wing for the faint-hearted — but for those ready, nothing competes.",
    specs: {
      certification: 'EN-D',
      cells: '72',
      flat_area: '21.0 m²',
      aspect_ratio: '6.9',
      top_speed: '63 km/h',
      glider_weight: '4.8–5.4 kg',
      technology: 'Two-liner, Shark Nose, X-Alps materials, Dyneema construction',
      flying_goal: 'competition,xc',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/POISON/hero.jpeg'],
    wing_level: 'D',
    weight_ranges: [
      { size: 'XS', min_weight: 65, max_weight: 85 },
      { size: 'S', min_weight: 75, max_weight: 95 },
      { size: 'M', min_weight: 85, max_weight: 105 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/poison4/',
    created_at: new Date().toISOString(),
  },
]

// ── LIGHTWEIGHT WINGS ────────────────────────────────────────
export const lightweightWings: Product[] = [
  {
    id: '7',
    name: 'Skywalk Masala 4',
    slug: 'masala-4',
    category: 'lightweight',
    description:
      "The Masala 4 is Skywalk's lightest EN-A wing — the perfect companion for pilots who want to hike in and fly out. At just 2.8–3.7 kg, it packs into the smallest bag and grows with you through your first flying years. EN-A certified across the full weight range. Not a compromise — a genuinely capable wing that happens to weigh almost nothing.",
    specs: {
      certification: 'EN-A',
      cells: '38',
      flat_area: '23.5 m²',
      aspect_ratio: '4.80',
      top_speed: '46 km/h',
      glider_weight: '2.8–3.7 kg',
      technology: 'Lightweight construction, Shark Nose, Mini-ribs',
      flying_goal: 'leisure,hike-and-fly',
      conditions: 'coastal,mixed',
    },
    images: ['/images/MASALA4/hero.jpg'],
    wing_level: 'A',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 80 },
      { size: 'S', min_weight: 70, max_weight: 90 },
      { size: 'M', min_weight: 80, max_weight: 100 },
      { size: 'L', min_weight: 90, max_weight: 110 },
      { size: 'XL', min_weight: 100, max_weight: 120 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/masala4/',
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Skywalk Arak Air',
    slug: 'arak-air',
    category: 'lightweight',
    description:
      "The Arak Air is the ultralight evolution of Skywalk's legendary Arak. At just 2.9 kg, it brings X-Alps construction technology to the EN-B class — 30% lighter than the standard Arak with a considerably smaller pack size. The perfect glider for pilots who want to hike deep and fly far without sacrificing passive safety or versatile handling. Capable of 300 km+ flights. Fits in the smallest hike & fly backpack.",
    specs: {
      certification: 'EN-B',
      cells: '52',
      flat_area: '23.8 m²',
      aspect_ratio: '5.6',
      top_speed: '53 km/h',
      glider_weight: '2.9–3.6 kg',
      technology: 'X-Alps ultralight construction, Shark Nose, Mini-ribs, Dyneema risers option',
      flying_goal: 'hike-and-fly,xc',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/ARAK AIR2/hero.jpg'],
    wing_level: 'B',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 80 },
      { size: 'S', min_weight: 70, max_weight: 90 },
      { size: 'M', min_weight: 80, max_weight: 100 },
      { size: 'L', min_weight: 90, max_weight: 110 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/arak-air/',
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Skywalk Cumeo 2',
    slug: 'cumeo-2',
    category: 'lightweight',
    description:
      "The Cumeo 2 is Skywalk's high-end EN-B in intelligent lightweight construction. 57 cells, aspect ratio of 5.6 — the same performance DNA as the Chili 5 but substantially lighter. Speed Control system for confident accelerated flight. The ideal travel companion for XC pilots who want to hike to the launch and not compromise on performance when they get there.",
    specs: {
      certification: 'EN-B',
      cells: '57',
      flat_area: '25.1 m²',
      aspect_ratio: '5.6',
      top_speed: '54 km/h',
      glider_weight: '3.35–4.15 kg',
      technology: 'Lightweight construction, Shark Nose, Mini-ribs, Speed Control',
      flying_goal: 'xc,hike-and-fly',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/CUMEO2/hero.jpeg'],
    wing_level: 'B',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 80 },
      { size: 'S', min_weight: 70, max_weight: 90 },
      { size: 'M', min_weight: 80, max_weight: 100 },
      { size: 'L', min_weight: 90, max_weight: 110 },
      { size: 'XL', min_weight: 100, max_weight: 120 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/cumeo2/',
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Skywalk Sage',
    slug: 'sage',
    category: 'lightweight',
    description:
      "The Sage is Skywalk's ultralight EN-C two-liner — 3.5 kg of pure performance for hike & fly, vol-biv, and serious XC. 68 cells, aspect ratio of 6.4, and sports-class racing capability in a wing that fits in a daypack. Built for experienced pilots who demand the best glide-to-weight ratio available. The Sage brings competition-grade technology to the mountains.",
    specs: {
      certification: 'EN-C',
      cells: '68',
      flat_area: '22.7 m²',
      aspect_ratio: '6.40',
      top_speed: '58 km/h',
      glider_weight: '3.5–4.15 kg',
      technology: 'Two-liner, ultralight construction, Shark Nose, Mini-ribs',
      flying_goal: 'xc,hike-and-fly,competition',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/SAGE/hero.jpeg'],
    wing_level: 'C',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 80 },
      { size: 'S', min_weight: 70, max_weight: 90 },
      { size: 'M', min_weight: 80, max_weight: 100 },
      { size: 'L', min_weight: 90, max_weight: 110 },
      { size: 'XL', min_weight: 100, max_weight: 120 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/sage/',
    created_at: new Date().toISOString(),
  },
]

// ── COMPETITION WINGS ────────────────────────────────────────
export const competitionWings: Product[] = [
  {
    id: '11',
    name: 'Skywalk X-Alps 6',
    slug: 'x-alps-6',
    category: 'competition',
    description:
      "Built for the Red Bull X-Alps, the X-Alps 6 is Skywalk's most advanced wing. Two-liner B-steering, 73 cells, aspect ratio of 6.6, and ultralight construction at just 3.45–3.8 kg. It combines the intuitive handling of the Sage with the outright performance of the Poison at speed. For elite pilots who compete at the highest level or demand the absolute maximum from every flight.",
    specs: {
      certification: 'EN-D',
      cells: '73',
      flat_area: '21.5 m²',
      aspect_ratio: '6.6',
      top_speed: '65+ km/h',
      glider_weight: '3.45–3.8 kg',
      technology: 'Two-liner, X-Alps ultralight construction, B-steering, Dyneema',
      flying_goal: 'competition,xc,hike-and-fly',
      conditions: 'thermal-inland,mixed',
    },
    images: ['/images/XALPS6/hero.jpeg'],
    wing_level: 'D',
    weight_ranges: [
      { size: 'S', min_weight: 70, max_weight: 90 },
      { size: 'M', min_weight: 80, max_weight: 100 },
      { size: 'L', min_weight: 90, max_weight: 110 },
      { size: 'XL', min_weight: 100, max_weight: 120 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/x-alps6/',
    created_at: new Date().toISOString(),
  },
]

// ── MINIWINGS ────────────────────────────────────────────────
export const miniwings: Product[] = [
  {
    id: '12',
    name: 'Skywalk Spirit',
    slug: 'spirit',
    category: 'miniwing',
    description:
      "The Spirit is Skywalk's ultra-light alpine descent tool — 1.75 kg and designed for mountaineers who want to fly down. 33 cells, aspect ratio of 4.33, EN-A to C depending on size and loading. Packs into your climbing pack without compromise. For pilots who approach their launches on foot, crampons, or rope — and want a wing that matches that commitment to the mountains.",
    specs: {
      certification: 'EN-A/B/C (size dependent)',
      cells: '33',
      flat_area: '14.5–22 m²',
      aspect_ratio: '4.33',
      glider_weight: '1.75–2.35 kg',
      technology: 'Ultralight alpine construction',
      flying_goal: 'hike-and-fly',
      conditions: 'mixed',
    },
    images: ['/images/SPIRIT/hero.jpeg'],
    wing_level: 'B',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 85 },
      { size: 'S', min_weight: 75, max_weight: 100 },
      { size: 'M', min_weight: 90, max_weight: 115 },
      { size: 'L', min_weight: 100, max_weight: 120 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/spirit/',
    created_at: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'Skywalk Tonic 2',
    slug: 'tonic-2',
    category: 'miniwing',
    description:
      "The Tonic 2 is the fun machine — the go-kart of the air. EN-B/C certified miniwing with a trimmer riser for an extended speed window. Built for strong wind flying, dunes, freestyle, and ground handling training. If you want to feel more connected to the air than any full-size wing can offer, the Tonic 2 is the answer. Three sizes, serious fun.",
    specs: {
      certification: 'EN-B/C',
      cells: '33',
      flat_area: '12.5–16.5 m²',
      aspect_ratio: '4.33',
      glider_weight: '2.4–2.8 kg',
      technology: 'Trimmer riser, extended speed window',
      flying_goal: 'leisure,hike-and-fly',
      conditions: 'coastal,mixed',
    },
    images: ['/images/TONIC2/hero.jpeg'],
    wing_level: 'C',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 85 },
      { size: 'S', min_weight: 75, max_weight: 100 },
      { size: 'M', min_weight: 90, max_weight: 115 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/tonic2/',
    created_at: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'Skywalk Pace',
    slug: 'pace',
    category: 'miniwing',
    description:
      "The Pace is Skywalk's single-skin speed riding and hike & fly wing. Ultra-minimalist single-surface construction — the lightest possible tool for pilots who want to cover mountain terrain fast. Designed for speed riding alongside skiers and snowboarders in winter, and pure hike & fly in summer. The Pace is for pilots who want the absolute minimum between them and the air.",
    specs: {
      certification: 'EN-B/C',
      cells: '28',
      glider_weight: '1.2–1.8 kg',
      technology: 'Single skin construction',
      flying_goal: 'hike-and-fly',
      conditions: 'mixed',
    },
    images: ['/images/PACE/hero.jpeg'],
    wing_level: 'B',
    weight_ranges: [
      { size: 'XS', min_weight: 60, max_weight: 85 },
      { size: 'S', min_weight: 75, max_weight: 100 },
      { size: 'M', min_weight: 90, max_weight: 115 },
    ],
    is_lightweight: true,
    skywalk_url: 'https://skywalk.info/project/pace/',
    created_at: new Date().toISOString(),
  },
]

// ── TANDEM WINGS ─────────────────────────────────────────────
export const tandemWings: Product[] = [
  {
    id: '15',
    name: "Skywalk Join't 5",
    slug: 'joint-5',
    category: 'tandem',
    description:
      "The Join't 5 is Skywalk's professional tandem wing — EN-B certified and built for the demands of commercial tandem operations. 49 cells, three sizes covering the full commercial weight range from 100–240 kg all-up. A 15 cm trimmer range, big-ears-aid system, and adjustable brake pulley give the professional pilot all the tools needed for safe, controlled passenger flights day after day. Robust construction for intensive daily use.",
    specs: {
      certification: 'EN-B (Tandem)',
      cells: '49',
      aspect_ratio: '5.4',
      glider_weight: '6.8–7.7 kg',
      technology: 'Trimmer system, big-ears-aid, adjustable brake pulley',
      flying_goal: 'tandem',
      conditions: 'coastal,thermal-inland,mixed',
    },
    images: ["/images/JOIN'T5/hero.jpeg"],
    wing_level: 'B',
    weight_ranges: [
      { size: '200', min_weight: 100, max_weight: 200 },
      { size: '220', min_weight: 120, max_weight: 220 },
      { size: '240', min_weight: 140, max_weight: 240 },
    ],
    is_lightweight: false,
    skywalk_url: 'https://skywalk.info/project/joint5/',
    created_at: new Date().toISOString(),
  },
]

// ── ALL WINGS COMBINED ───────────────────────────────────────
export const placeholderProducts: Product[] = [
  ...classicWings,
  ...lightweightWings,
  ...competitionWings,
  ...miniwings,
  ...tandemWings,
]

// ── HARNESSES ────────────────────────────────────────────────
export const harnesses = [
  {
    id: 'h1',
    name: 'Skywalk Cruise',
    slug: 'cruise',
    category: 'harness',
    type: 'classic',
    description:
      'The Cruise is the comfortable companion for everyday flying. Airbag back protection, generous storage, and a relaxed fit make it the go-to harness for pilots who value comfort on long XC flights. Suitable for all pilot levels.',
    images: ['/images/CRUISE/hero.jpeg'],
    skywalk_url: 'https://skywalk.info/project/cruise/',
  },
  {
    id: 'h2',
    name: 'Skywalk Sleeve',
    slug: 'sleeve',
    category: 'harness',
    type: 'lightweight',
    description:
      "The Sleeve is Skywalk's compact, packable lightweight harness for hike & fly. Minimal weight, full back protection option, and a pack size that fits alongside your wing. The practical choice for pilots who earn their launches on foot.",
    images: ['/images/SLEEVE/hero.jpeg'],
    skywalk_url: 'https://skywalk.info/project/sleeve/',
  },
  {
    id: 'h3',
    name: 'Skywalk Core',
    slug: 'core',
    category: 'harness',
    type: 'lightweight',
    description:
      "The Core is Skywalk's ultralight harness — minimal weight with a full back protection option. Designed for pilots who want the lightest possible setup without compromising safety. Packs small, flies well.",
    images: ['/images/CORE/hero.jpeg'],
    skywalk_url: 'https://skywalk.info/project/core/',
  },
  {
    id: 'h4',
    name: 'Skywalk Breeze 2',
    slug: 'breeze-2',
    category: 'harness',
    type: 'lightweight',
    description:
      'The Breeze 2 combines a lightweight harness with an integrated rescue container — ideal for hike & fly pilots who want everything in one system. Optimised weight and pack size without sacrificing the safety of a dedicated rescue deployment.',
    images: ['/images/BREEZE2/hero.jpeg'],
    skywalk_url: 'https://skywalk.info/project/breeze2/',
  },
  {
    id: 'h5',
    name: 'Skywalk Range X-Alps 3',
    slug: 'range-x-alps-3',
    category: 'harness',
    type: 'competition',
    description:
      "The Range X-Alps 3 is Skywalk's competition and X-Alps harness. Pod design for maximum aerodynamics, minimal weight, and the performance demanded by pilots racing at the highest level. Worn by Skywalk athletes in the Red Bull X-Alps.",
    images: [],
    skywalk_url: 'https://skywalk.info/project/range-x-alps3/',
  },
  {
    id: 'h6',
    name: 'Skywalk Range X-Alps 3 Athlete Version',
    slug: 'range-x-alps-3-av',
    category: 'harness',
    type: 'competition',
    description:
      "The Athlete Version of the Range X-Alps 3 — same competition-grade aerodynamics and performance, upgraded with premium materials for professional athletes. The harness worn by Skywalk's elite team pilots.",
    images: [],
    skywalk_url: 'https://skywalk.info/project/range-x-alps-3-av/',
  },
  {
    id: 'h7',
    name: 'Skywalk Guide & Guest',
    slug: 'guide-and-guest',
    category: 'harness',
    type: 'tandem',
    description:
      "The Guide & Guest is Skywalk's tandem harness set — pilot and passenger harnesses designed to work together. Secure, comfortable for the passenger, and giving the guide full control. The complete solution for professional tandem operations.",
    images: [],
    skywalk_url: 'https://skywalk.info/project/guide-guest/',
  },
]

// ── RESERVES ─────────────────────────────────────────────────
export const reserves = [
  {
    id: 'r1',
    name: 'Skywalk Salsa',
    slug: 'salsa',
    category: 'reserve',
    description:
      "The Salsa is Skywalk's all-round rescue parachute. Round design, reliable deployment, and a stable descent make it the trusted choice for everyday XC pilots. Available in multiple sizes to match pilot weight.",
    skywalk_url: 'https://skywalk.info/project/salsa/',
  },
  {
    id: 'r2',
    name: 'Skywalk TAPA X-Alps',
    slug: 'tapa-x-alps',
    category: 'reserve',
    description:
      "The TAPA X-Alps is Skywalk's ultralight rescue for hike & fly pilots. Minimum pack volume, minimum weight, fast opening, and stable descent. When every gram matters and the mountains demand a reserve you can trust.",
    skywalk_url: 'https://skywalk.info/project/tapa-x-alps/',
  },
  {
    id: 'r3',
    name: 'Skywalk Pepper Cross Light',
    slug: 'pepper-cross-light',
    category: 'reserve',
    description:
      "The Pepper Cross Light is Skywalk's lightweight cross-braced reserve. Fast opening, stable descent, and a more controlled sink rate than a standard round. For pilots who want the performance of a cross-braced design in a lightweight package.",
    skywalk_url: 'https://skywalk.info/project/pepper-cross-light/',
  },
]

// ── ACCESSORIES ──────────────────────────────────────────────
export const accessories = [
  {
    id: 'a1',
    name: 'Skywalk Hike Backpack',
    slug: 'hike',
    description: 'Dedicated paragliding hiking backpack. Designed around carrying a wing, harness, and reserve with the ergonomics of a proper mountain pack.',
    skywalk_url: 'https://skywalk.info/project/hike/',
  },
  {
    id: 'a2',
    name: 'Skywalk Alpine Backpack',
    slug: 'alpine',
    description: 'Larger alpine touring pack for multi-day vol-biv and expedition flying. Carries everything you need for days in the mountains.',
    skywalk_url: 'https://skywalk.info/project/alpine/',
  },
  {
    id: 'a3',
    name: 'Skywalk Tube Bags',
    slug: 'tubebags',
    description: 'Cylindrical packing bags in multiple sizes. The preferred lightweight wing storage solution for hike & fly pilots.',
    skywalk_url: 'https://skywalk.info/project/tubebags/',
  },
  {
    id: 'a4',
    name: 'Skywalk Easy Bag',
    slug: 'easy-bag',
    description: 'Simple, fast packing bag system. Gets your wing packed and protected quickly — ideal for flying sites where you want to minimise turnaround time.',
    skywalk_url: 'https://skywalk.info/project/easy-bag/',
  },
]
