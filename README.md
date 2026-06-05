# Akhil — Personal Portfolio v1

A premium, narrative-driven single-page portfolio built as a personal autobiography and product development showcase. Designed to communicate a product-focused developer identity across mobile, systems, security, and AI.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Motion** | Scroll-reveal & interaction animations |
| **Lucide React** | SVG icon system |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
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
├── components/
│   ├── Navbar.tsx              # Floating glass navigation
│   ├── Hero.tsx                # Full-viewport cinematic hero
│   ├── AboutStory.tsx          # Origin story / autobiography
│   ├── IdentityPillars.tsx     # Six professional identity cards
│   ├── ExperienceAIVA.tsx      # AIVA product operations
│   ├── Projects.tsx            # Featured project showcase
│   ├── MobileDevelopment.tsx   # iOS / Android / Flutter focus
│   ├── SystemsAndAI.tsx        # Homelab, AkhilOS, AI experimentation
│   ├── AthleticDiscipline.tsx  # Athletic background & discipline
│   ├── Timeline.tsx            # Visual journey timeline
│   ├── CurrentMission.tsx      # Career direction statement
│   └── Contact.tsx             # Contact links & footer
├── data/
│   ├── projects.ts             # Project card data
│   ├── timeline.ts             # Timeline milestone data
│   └── skills.ts               # Identity pillars, platforms, athletics
├── utils/
│   └── animations.ts           # Reusable Motion variants
├── App.tsx                     # Main application layout
├── main.tsx                    # React entry point
└── index.css                   # Design system & global styles
```

## Customising Content

All portfolio content is centralised in the `src/data/` directory:

- **Projects**: Edit `src/data/projects.ts` to add, remove, or update project cards
- **Timeline**: Edit `src/data/timeline.ts` to adjust journey milestones
- **Identity/Skills**: Edit `src/data/skills.ts` to modify pillar cards, mobile platforms, or athletic disciplines
- **Copy**: Section copy is in the respective component files under `src/components/`
- **Contact links**: Update URLs in `src/components/Contact.tsx`
- **Resume link**: Update the href in `Navbar.tsx` and `Hero.tsx`

## Design System

The design system is defined in `src/index.css` using Tailwind CSS v4's `@theme` directive:

- **Background**: Deep dark (#0A0A0F → #111118)
- **Accent**: Blue (#3B82F6) and Purple (#8B5CF6) gradients
- **Typography**: Inter (sans), JetBrains Mono (mono)
- **Effects**: Dot-grid texture, glassmorphism, card glow, gradient text

## v2 Roadmap

Planned enhancements for future versions:

- [ ] Multi-page routing with dedicated project case study pages
- [ ] Dark/light mode toggle
- [ ] Blog / writing section
- [ ] Interactive AkhilOS terminal demo
- [ ] CMS integration for content management
- [ ] Analytics integration
- [ ] Custom domain & deployment optimisation
- [ ] Testimonials / references section

## License

Private — All rights reserved.
