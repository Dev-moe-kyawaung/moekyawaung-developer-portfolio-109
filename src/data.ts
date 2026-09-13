export const profile = {
  name: "Moe Kyaw Aung",
  handle: "@moekyawaung-tech",
  role: "Senior Full-Stack / PWA Engineer",
  avatar:
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  gravatar: "https://gravatar.com/moekyawaung2026",
  github: "https://github.com/Dev-moe-kyawaung/",
  phones: ["+95 9 889 000 889", "+959 666 000 050"],
  summary:
    "I build production-grade web apps, PWAs and POS systems — 43+ deployed GitHub Pages domains, 30+ shipped Lovable apps and a long catalogue of open-source products. Systems thinking, offline-first architecture and obsessive performance tuning.",
};

export type Project = {
  id: string;
  name: string;
  icon: string;
  tag: string;
  repo: string;
  desc: string;
  stack: string[];
  metrics: { label: string; value: number }[];
  modules: string[];
};

export const projects: Project[] = [
  {
    id: "pos-ultimate",
    name: "POS Ultimate Pro Max",
    icon: "🧾",
    tag: "COMMERCE CORE",
    repo: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    desc: "Offline-first point-of-sale with multi-terminal sync, receipt engine, stock ledger and role-based access.",
    stack: ["React", "IndexedDB", "Service Worker", "Chart.js"],
    metrics: [
      { label: "Throughput", value: 94 },
      { label: "Offline", value: 100 },
      { label: "Lighthouse", value: 97 },
    ],
    modules: ["Sync Bus", "Ledger", "Receipt Engine", "Auth Matrix"],
  },
  {
    id: "social-dashboard",
    name: "Social Dashboard",
    icon: "📱",
    tag: "ANALYTICS NODE",
    repo: "https://github.com/moekyawaung-tech/social-dashboard",
    desc: "Realtime multi-network analytics surface with streaming charts, cohort filters and dark telemetry UI.",
    stack: ["React", "WebSocket", "D3", "Tailwind"],
    metrics: [
      { label: "Stream Rate", value: 88 },
      { label: "Render", value: 92 },
      { label: "Coverage", value: 81 },
    ],
    modules: ["Stream Pipe", "Aggregator", "Chart Grid", "Cohorts"],
  },
  {
    id: "video-player",
    name: "Video Player",
    icon: "🎯",
    tag: "MEDIA REACTOR",
    repo: "https://github.com/moekyawaung-tech/video-player",
    desc: "Custom HTML5 player: adaptive buffering, gesture scrub, PiP, subtitle engine and keyboard command deck.",
    stack: ["TypeScript", "MediaSource", "Canvas"],
    metrics: [
      { label: "Buffer Eff.", value: 91 },
      { label: "Input Lag", value: 96 },
      { label: "A11y", value: 89 },
    ],
    modules: ["Decoder", "Buffer Ctrl", "Gesture Layer", "Subtitles"],
  },
  {
    id: "game-collection",
    name: "Game Collection",
    icon: "🎮",
    tag: "SIMULATION ARRAY",
    repo: "https://github.com/moekyawaung-tech/game-collection",
    desc: "A hub of canvas mini-games with shared physics loop, score persistence and gamepad support.",
    stack: ["Canvas", "RAF Loop", "LocalStorage"],
    metrics: [
      { label: "FPS Stability", value: 95 },
      { label: "Bundle", value: 87 },
      { label: "Replay", value: 78 },
    ],
    modules: ["Physics", "Renderer", "Score Vault", "Input"],
  },
  {
    id: "pwa-app",
    name: "PWA App Shell",
    icon: "⚡",
    tag: "EDGE SHELL",
    repo: "https://github.com/moekyawaung-tech/pwa-app",
    desc: "Installable app shell: precache manifest, background sync, push channel and update choreography.",
    stack: ["Workbox", "Vite", "Push API"],
    metrics: [
      { label: "TTI", value: 98 },
      { label: "Cache Hit", value: 93 },
      { label: "Install", value: 100 },
    ],
    modules: ["Shell", "Precache", "Sync Queue", "Push"],
  },
  {
    id: "job-portal",
    name: "Job Portal App",
    icon: "💼",
    tag: "GRAPH SERVICE",
    repo: "https://github.com/moekyawaung-tech/Job-Portal-App",
    desc: "Two-sided marketplace: employer consoles, applicant tracking pipeline and relevance-ranked search.",
    stack: ["React", "REST", "Search Index"],
    metrics: [
      { label: "Query Speed", value: 90 },
      { label: "Match Score", value: 84 },
      { label: "Scale", value: 88 },
    ],
    modules: ["Index", "ATS Pipeline", "Employer", "Ranking"],
  },
  {
    id: "thailand-travel",
    name: "Thailand Travel",
    icon: "🌏",
    tag: "CONTENT LATTICE",
    repo: "https://github.com/moekyawaung-tech/thailand-travel",
    desc: "Immersive travel guide with map routing, lazy media galleries and itinerary builder.",
    stack: ["React", "Leaflet", "Image CDN"],
    metrics: [
      { label: "LCP", value: 93 },
      { label: "SEO", value: 96 },
      { label: "Media", value: 90 },
    ],
    modules: ["Map", "Gallery", "Itinerary", "CDN"],
  },
  {
    id: "weather-app",
    name: "Weather App",
    icon: "🌤️",
    tag: "SENSOR MESH",
    repo: "https://github.com/moekyawaung-tech/Weather-app",
    desc: "Geolocated forecasting client with animated conditions, hourly strips and resilient offline cache.",
    stack: ["API", "Geolocation", "CSS Anim"],
    metrics: [
      { label: "Freshness", value: 92 },
      { label: "Offline", value: 85 },
      { label: "Size", value: 97 },
    ],
    modules: ["Fetcher", "Cache", "Animator", "Geo"],
  },
];

export const appCollection = [
  "📱 Social Dashboard",
  "📱 PWA App",
  "📊 Admin Dashboard",
  "📈 Stock Market",
  "🎮 Game Collection",
  "🎵 Music Player",
  "💬 Chat App",
  "⚽ World Cup",
  "🛒 E-commerce",
  "💼 Portfolio",
  "💰 Money Tracker",
  "🌤️ Weather",
  "💸 Crypto",
  "📝 Todo",
  "🎯 Video Player",
  "🏆 LEGEND!",
];

export const domains = [
  "moekyawaung-tech.github.io",
  "moekyawaung-developer.github.io",
  "moekyawaung-cyber.github.io",
  "moekyawaung-senior.github.io",
  "moekyawaung-linux.github.io",
  "moekyawaung-google.github.io",
  "moekyawaung-microsoft.github.io",
  "moekyawaung-bangkok.github.io",
  "moekyawaung-china.github.io",
  "moekyawaung-designer.github.io",
  "moekyawaung-web.github.io",
  "moe-kyawaung.github.io",
];

export const lovableApps = [
  "moekyawaung.lovable.app",
  "happy-cv-creator.lovable.app",
  "dev-moekyawaung.lovable.app",
  "the-cv-palette.lovable.app",
  "cv-beacon.lovable.app",
  "profile-persuasion-hub.lovable.app",
  "moekyaw-url.lovable.app",
  "joy-codify-life.lovable.app",
];

export const gallery = [
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795847/copilot_image_1778795115579_acfm5j.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795853/copilot_image_1778794781671_kytvkc.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
];

export const extras: Record<
  string,
  { year: string; role: string; impact: string; highlights: string[] }
> = {
  "pos-ultimate": {
    year: "2025",
    role: "Architect & Lead Engineer",
    impact: "Deployed across multi-terminal retail floors with zero-loss offline transactions.",
    highlights: [
      "CRDT-style merge for conflicting offline carts",
      "Thermal receipt renderer with ESC/POS bridge",
      "Role matrix: cashier / supervisor / owner scopes",
      "Stock ledger with immutable audit trail",
    ],
  },
  "social-dashboard": {
    year: "2025",
    role: "Front-end Architect",
    impact: "Sub-100ms chart updates on live sockets with 10k+ datapoint windows.",
    highlights: [
      "Windowed virtualization for streaming series",
      "Backpressure-aware socket consumer",
      "Cohort + funnel filter composition engine",
      "Theme-token driven dark telemetry system",
    ],
  },
  "video-player": {
    year: "2024",
    role: "Media Engineer",
    impact: "Custom pipeline replacing a 300kb third-party player at a fraction of the size.",
    highlights: [
      "MediaSource adaptive buffer controller",
      "Gesture scrub with frame-preview strip",
      "WebVTT subtitle engine + styling layer",
      "Full keyboard command deck & PiP",
    ],
  },
  "game-collection": {
    year: "2024",
    role: "Engine & Gameplay",
    impact: "Shared fixed-timestep loop keeps every title locked at 60fps.",
    highlights: [
      "Fixed-timestep physics with interpolation",
      "Single renderer shared across all titles",
      "Persistent score vault + replay seeds",
      "Gamepad + touch input abstraction",
    ],
  },
  "pwa-app": {
    year: "2025",
    role: "Platform Engineer",
    impact: "Installable shell booting in under 1s on repeat visits, fully offline capable.",
    highlights: [
      "Workbox precache + runtime strategy split",
      "Background sync queue with retry ladder",
      "Push channel with permission choreography",
      "Skip-waiting update prompt UX",
    ],
  },
  "job-portal": {
    year: "2024",
    role: "Full-stack Engineer",
    impact: "Two-sided marketplace with relevance ranking over an in-memory search index.",
    highlights: [
      "Inverted index with fuzzy token matching",
      "Applicant tracking pipeline & stages",
      "Employer console with bulk actions",
      "Saved-search alerts",
    ],
  },
  "thailand-travel": {
    year: "2024",
    role: "Product Engineer",
    impact: "Media-heavy guide hitting 93 LCP through aggressive CDN + lazy strategy.",
    highlights: [
      "Route planner over Leaflet layers",
      "Responsive CDN transforms per breakpoint",
      "Itinerary builder with local persistence",
      "Structured data for rich results",
    ],
  },
  "weather-app": {
    year: "2023",
    role: "Engineer",
    impact: "Resilient client that keeps serving forecasts through total network loss.",
    highlights: [
      "Stale-while-revalidate forecast cache",
      "Animated condition scenes in pure CSS",
      "Geolocation with graceful manual fallback",
      "Under 40kb gzipped total",
    ],
  },
};

export const protocol = [
  {
    phase: "01",
    title: "Signal Intake",
    desc: "Requirements decomposed into constraints, risks and measurable success criteria before a single line is written.",
    tags: ["Discovery", "Constraints", "Risk map"],
  },
  {
    phase: "02",
    title: "Blueprint",
    desc: "Architecture diagrammed end to end — data flow, failure domains, offline strategy, and the performance budget.",
    tags: ["Architecture", "Data flow", "Budget"],
  },
  {
    phase: "03",
    title: "Core Assembly",
    desc: "Typed, testable modules built behind clean boundaries. Design system tokens first, features second.",
    tags: ["TypeScript", "Design tokens", "Modules"],
  },
  {
    phase: "04",
    title: "Reactor Tuning",
    desc: "Profiling, bundle surgery, render-path work and Lighthouse chasing until the numbers are boring.",
    tags: ["Profiling", "Bundle", "Lighthouse"],
  },
  {
    phase: "05",
    title: "Launch & Telemetry",
    desc: "Zero-downtime deploy, real-user monitoring, and an iteration loop driven by actual usage data.",
    tags: ["CI/CD", "RUM", "Iteration"],
  },
];

export const skills = [
  { name: "React / TypeScript", level: 96 },
  { name: "PWA & Offline Systems", level: 93 },
  { name: "UI Architecture", level: 91 },
  { name: "Canvas / Animation", level: 88 },
  { name: "API & Data Layers", level: 86 },
  { name: "Performance Tuning", level: 90 },
];
