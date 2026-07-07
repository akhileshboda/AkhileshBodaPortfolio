# Akhilesh Boda — Portfolio: A Voyage Through the Milky Way

A narrative, production-grade single-page portfolio. Visitors travel through the galaxy as they scroll — each chapter of the journey (origin in human-centered care, the 2023 transition into technology, Monash studies, projects, hackathons, the Purdue exchange, AI-first development, athletic discipline) is a celestial waypoint on one continuous flight path.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Three.js** | WebGL Milky Way flight (lazy-loaded, code-split) |
| **Motion** | Scroll-reveal & interaction animations |
| **Lucide React** | SVG icon system |

## The Experience System

The sky is tiered so the site is cinematic where it can be and dependable everywhere else (`src/journey/useExperienceTier.ts`):

- **full** — desktop-class devices: dense WebGL starfield, galactic band and core, nebulae, pointer parallax, scroll-driven camera flight.
- **lite** — touch / smaller / mid-power devices: the same flight with a lighter scene and capped pixel ratio.
- **static** — reduced-motion users, save-data connections, very low memory, or missing WebGL: a hand-crafted CSS deep-space backdrop with zero runtime cost. Also the landing spot if the WebGL context is ever lost.

Three.js is only downloaded via dynamic import when a WebGL tier is active — static-tier visitors never fetch it.

### Navigation

- Scroll is the primary control; the camera flies the Milky Way corridor as you travel.
- **↑/↓ (or ←/→, j/k)** jump between waypoints; **Home/End** jump to launch/final chapter.
- Desktop: waypoint rail (left), cockpit HUD readout (bottom-left).
- Mobile: progress hairline (top) + floating chapter chip opening a voyage-map sheet.
- Skip link, `aria-current` waypoints, focus-visible rings, and full reduced-motion support throughout.

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server
npm run build   # production build (tsc + vite)
npm run preview # preview the production build
```

## Deploying to Raspberry Pi

Deployments build the Vite site locally, sync the `dist/` output to the Pi, and run it as a PM2 static SPA process.

Prerequisites:

- SSH access to the Raspberry Pi
- `rsync` available locally and on the Pi
- PM2 installed on the Pi and available to the deploy user

```bash
DEPLOY_USER=<ssh-user> DEPLOY_HOST=<pi-host-or-ip> npm run deploy:pi
```

Optional overrides:

| Variable | Default | Purpose |
|----------|---------|---------|
| `APP_NAME` | `akhilesh-portfolio` | PM2 process name |
| `DEPLOY_PATH` | `/var/www/akhilesh-portfolio` | Remote directory that receives `dist/` |
| `PORT` | `3000` | First port to try; the script uses the next available port if this one is busy |

## Project Structure

```
src/
├── data/                        # All content lives here — edit these to update the site
│   ├── chapters.ts              # Waypoint registry: nav, HUD, atmosphere tints
│   ├── profile.ts               # Name, role, email, LinkedIn, GitHub, resume
│   ├── projects.ts              # Project cards + constellation figures
│   ├── studies.ts               # Monash degree + focus areas (add units as they're published)
│   ├── hackathons.ts            # 2024/2025 hackathon seasons
│   ├── skills.ts                # Skill themes + athletic disciplines
│   └── timeline.ts              # Flight log milestones
├── galaxy/
│   ├── engine.ts                # Three.js Milky Way scene (dynamic import only)
│   ├── GalaxyBackground.tsx     # Tier selection, lazy load, graceful fallback
│   ├── StaticSpace.tsx          # CSS deep-space backdrop (static tier / base coat)
│   └── Atmosphere.tsx           # Per-chapter nebula tint layers
├── journey/
│   ├── journeyStore.ts          # External store: scroll progress + active chapter
│   ├── useJourneyDriver.ts      # Scroll → store (rAF-throttled)
│   ├── useExperienceTier.ts     # full / lite / static detection
│   └── navigation.ts            # scrollToChapter + keyboard voyage controls
├── components/
│   ├── ChapterShell.tsx         # Section scaffold + waypoint header
│   ├── Reveal.tsx               # Reduced-motion-aware scroll reveal
│   ├── layout/                  # TopBar, VoyageRail, WaypointHUD, MobileVoyage, Footer
│   └── chapters/                # The eleven waypoint sections in flight order
├── pages/                       # Privacy, Terms, Accessibility, Credits
├── App.tsx                      # Routes + voyage page assembly
├── main.tsx                     # React entry point
└── index.css                    # Design tokens & global styles
```

## Customising Content

All portfolio content is centralised in `src/data/`:

- **Chapters/waypoints**: `chapters.ts` — labels, waypoint names, atmosphere tints
- **Projects**: `projects.ts` — cards, status, constellation star patterns
- **Monash studies**: `studies.ts` — add specific units to a focus area's `units` array to render them as chips
- **Timeline**: `timeline.ts` · **Skills & athletics**: `skills.ts` · **Hackathons**: `hackathons.ts`
- **Links & resume**: `profile.ts`
- Section copy lives in the matching component under `src/components/chapters/`

## Design System

Defined in `src/index.css` with Tailwind CSS v4's `@theme` directive:

- **Palette**: deep space (#020611) with cyan → blue → violet accents; each chapter adds its own atmosphere tint
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (HUD/waypoint labels)
- **Language**: starfields, constellations, orbital paths, cockpit readouts — no stock gradients

## Notes

- `src/firebase_example.js` and `src/firebase.d.ts` are retained as a Firebase AI reference example; the feature is not wired into the current site, so nothing Firebase-related ships in the bundle.

## License

Private — All rights reserved.
