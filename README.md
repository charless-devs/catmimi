# catmimi — Creative Studio

A premium, enterprise-grade 3D marketing site for **catmimi**, a creative studio for brands with nine lives. Dark violet design system, WebGL hero, glassmorphism, and cinematic motion throughout.

> The creative studio for brands with nine lives — brand, web, 3D, product and growth design by a small senior team (and M.O.C.H.A, their Operational Creative Helper Agent).

## Experience highlights

- **Immersive WebGL hero** — an iridescent glass icosahedron with a luminous core, orbiting metallic satellites, a halo ring and drifting particles. Lit entirely by procedural lightformers (zero network fetches) with smooth mouse-parallax camera. Right-weighted on desktop, scaled and dimmed on mobile.
- **Signature mouse-scrubbed film** — the brand's background video is scrubbed by moving the cursor horizontally; the pointer becomes the playback head.
- **Cinematic preloader** — animated brand mark, progress bar, curtain lift; deep links (`/#work`) are re-applied after the curtain lifts.
- **Glass navigation** — floats as a rounded glass shell on scroll with a springy *sliding active pill* driven by scroll-spy, plus a staggered full-screen mobile menu.
- **Dimensional UI** — glassmorphism cards with cursor-tracked glow (`--mx/--my`), springy 3D tilt, light sweeps, soft layered shadows and aurora backdrops.
- **Motion system** — IntersectionObserver reveal-on-scroll with per-element stagger, scroll-linked parallax, count-up statistics, dual-direction testimonial marquees, magnetic hovers and a luminous custom cursor (fine pointers only).
- **Premium CTAs** — gradient primary buttons with glow, lift and sheen sweep; glass ghost buttons.

## Sections

`Home` (hero) · Trusted-by marquee · `About` · Stats · `Work` · `Services` · Testimonials · `Insights` · `Contact` · Footer — every nav anchor is live.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| 3D | Three.js + React Three Fiber + drei (lazy-loaded chunk) |
| Motion | Hand-rolled hooks + CSS transitions (no animation runtime) |

## Performance

- The 3D scene is **code-split and lazy-loaded** (`React.lazy` + Suspense with an animated CSS-orb fallback), so first paint ships ~88 kB gzip of JS; the WebGL chunk (~264 kB gzip) loads after boot.
- WebGL **pauses when the hero leaves the viewport** (`frameloop` toggling) and is skipped entirely for `prefers-reduced-motion`.
- DPR is clamped (≤1.75); marquees, reveals and parallax are transform/opacity-only for compositor-friendly animation.

## Accessibility

- Full `prefers-reduced-motion` support (instant text, no autoplay motion, no 3D, instant reveals).
- Semantic landmarks, labelled form controls, `aria-live` feedback, visible focus rings, keyboard-navigable menus (Escape closes).
- Custom cursor is enabled only for fine pointers without reduced motion.

## Project structure

```
src/
  App.tsx                  Page composition + boot orchestration
  index.css                Design system: tokens, glass, buttons, reveals, keyframes
  components/
    Preloader.tsx          Cinematic boot sequence
    Navbar.tsx             Glass nav, sliding active pill, mobile overlay
    Hero.tsx               Layered hero: film → scrims → 3D → content
    Scene3D.tsx            R3F scene (lazy) — glass core, satellites, ring, sparkles
    BackgroundVideo.tsx    Mouse-scrubbed film
    CustomCursor.tsx       Luminous dot + trailing ring
    About / Stats / Work / Services / Testimonials / Insights / Contact / Footer
    Marquee.tsx · SectionHeading.tsx · BrandMark.tsx · TrustedBy.tsx · ScrollProgress.tsx
  hooks/
    useTypewriter · useTilt · useGlowFollow · useMergedRef · useCountUp
    useScrollSpy · useInView · useParallax · useRevealObserver · useReducedMotion
```

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Customizing

- **Colors / type** — edit the `@theme` tokens at the top of `src/index.css` (brand violet `#863bff`, accent cyan `#22d3ee`, deep-void surfaces).
- **Content** — project case studies, services, testimonials and articles live as typed arrays at the top of their section components.
- **Contact form** — currently simulates submission; wire `handleSubmit` in `src/components/Contact.tsx` to your CRM or form endpoint.
