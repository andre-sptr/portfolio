# PRD: Gravity Motion Portfolio + Open Lab

Status: Draft  
Date: 2026-06-08  
Product: Andre Saputra portfolio, `andresptr.site`  
Assumption: user said "GASP"; this PRD treats it as GSAP.
Decision: user accepted the recommendation to keep the homepage readable and build a dedicated experimental playground.

## 1. Summary

Update the portfolio into a two-layer experience:

1. Portfolio Shell: a fast, readable, polished homepage for recruiters, collaborators, and clients.
2. Open Lab: a full experimental playground for physics, gravity, GSAP, WebGL, and creative motion experiments.

The homepage should still make a strong first impression through a "Gravity Core" hero, project orbit visuals, and premium scroll storytelling. The Open Lab carries the heavier experimentation: Matter.js skill sandboxes, project-card collisions, shader studies, network topology playgrounds, AI motion toys, and other interactive sketches.

This gives Andre the best of both directions: the portfolio remains usable and professional, while the lab proves deep creative frontend craft.

## 2. Current Context

The current codebase is a Vite + React + TypeScript + Tailwind/shadcn portfolio. It already includes:

- `gsap`, `@gsap/react`, `ScrollTrigger`, and `DrawSVGPlugin`
- `three`, `@react-three/fiber`, and `@react-three/drei`
- Lenis smooth scrolling with GSAP ticker integration
- Framer Motion for component-level entrances and navigation details
- Existing sections: `Hero`, `About`, `Projects`, `Experience`, `FreeTools`, `Contact`, `Footer`
- Existing motion patterns: sticky hero, floating preview cards, Three.js sphere/particles, pinned horizontal About, pinned horizontal Projects, animated timeline spine

This means the update should not start from scratch. It should consolidate and elevate the existing motion into a reusable system.

## 3. Research Inputs

Reference findings from web research:

- HAS Studio is the strongest north-star reference for the Open Lab concept: it frames the site as a creative technology playground with tools, WebGL/WebGPU, GLSL, Matter.js, cloth simulation, and the explicit invitation to drag, break, and explore: https://has.studio/
- OHZI Experiments Hub validates a separate lab model: a gallery of WebGL/WebGPU experiments organized by categories such as shaders, motion, interactive, lighting, metaballs, galaxy, and fluid gradients: https://lab.ohzi.io/
- Ian Handy's portfolio shows how a developer can turn simulations into portfolio proof: N-body gravity, ray marching, fluid dynamics, and terrain erosion are presented as concrete projects rather than decorative effects: https://www.ianhandy.com/
- Oscar Beamish's demos page is the most conservative implementation model: keep the portfolio normal, then expose an interactive demos section for physics, shaders, portals, and 3D experiments: https://oscarbeamish.dev/demos
- Barly Djaja's DriveFolio is a full 3D portfolio-game reference using React, Three.js, R3F, drei, and Rapier physics. It is useful as inspiration, but too game-like for the main homepage: https://barlydjaja.com/
- Codrops' Arnaud Rocca portfolio case study emphasizes reusable GSAP motion, custom text transitions, and fluid WebGL as a portfolio identity, not isolated effects: https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/
- Codrops' Joffrey Spitzer case study shows that restraint matters: consistent text reveals, image scaling, Flip transitions, and scroll-controlled sequences can feel premium without becoming noisy: https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/
- GSAP ScrollTrigger supports scrubbed scroll, pinning, snapping, callbacks, horizontal scroll, and responsive `matchMedia`, making it the right foundation for section storytelling: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP React guidance recommends `useGSAP()` for lifecycle cleanup and scoped selectors, important because this React app already has multiple pinned sections: https://gsap.com/resources/React/
- GSAP Observer can normalize wheel, touch, pointer, and scroll gestures for controlled section navigation or swipe-driven panels: https://gsap.com/docs/v3/Plugins/Observer/
- GSAP Draggable supports drag, bounds, hit testing, and optional momentum behavior, useful for project cards, skill chips, and dashboard modules: https://gsap.com/docs/v3/Plugins/Draggable/
- GSAP Physics2D is useful for lightweight thrown labels, particle bursts, and fake gravity, but is not a collision engine: https://gsap.com/docs/v3/Plugins/Physics2DPlugin/
- Matter.js is a browser 2D rigid body physics engine with collisions, gravity, friction, constraints, sleeping, and mobile support, making it a good fit for selective gravity scenes: https://github.com/liabru/matter-js
- Fancy Components' Gravity docs show a React pattern for wrapping DOM elements into Matter.js bodies, validating the approach of turning normal HTML cards/chips into physics-enabled objects: https://www.fancycomponents.dev/docs/components/physics/gravity
- Three.js physics guidance clarifies that real 3D physics requires a parallel physics world synchronized with rendered meshes, which supports Rapier/R3F exploration for future lab work: https://threejs.org/manual/en/physics.html
- Lenis docs show the same GSAP ticker + ScrollTrigger update pattern already present in this codebase, so the current scroll foundation is directionally correct: https://github.com/darkroomengineering/lenis

## 4. Product Goals

1. Make the first 5 seconds unmistakable: "Andre builds systems that feel alive."
2. Keep the homepage readable enough for recruiters and clients to understand Andre quickly.
3. Add an Open Lab where the site can be more experimental, tactile, and playful.
4. Showcase advanced frontend craft through GSAP, WebGL, physics-driven UI, and simulation thinking.
5. Increase project exploration depth by making projects feel inspectable and navigable.
6. Preserve performance, accessibility, SEO, and mobile usability.

## 5. Non-Goals

- Do not rebuild the site as a game.
- Do not add physics to every element.
- Do not make scroll behavior unpredictable or block native navigation.
- Do not require login, CMS, or backend changes for this phase.
- Do not sacrifice readable project summaries for visual effects.
- Do not force heavy WebGL/physics on every visitor; the Open Lab should be opt-in.

## 6. Target Users

- Recruiters and hiring managers: need fast credibility, work history, project proof, CV/contact.
- Potential collaborators/clients: need to understand what Andre can build and how to reach him.
- Technical peers: notice the quality of motion, performance, and interaction details.
- Mobile visitors: need a simplified but still premium version without heavy WebGL/physics overhead.

## 7. Design Thesis

Recommended direction: Portfolio Shell + Open Lab.

The homepage becomes a dark, high-contrast portfolio shell with gravity-inspired motion: project screenshots orbit, stack chips respond to proximity, timeline nodes connect like constellations, and CTAs feel like control-room actions. Andre is the gravitational center.

The Open Lab becomes the deeper playground: a browsable collection of experiments where users can drag, launch, collide, tune, and reset interactive systems. It should feel more experimental than the homepage, but still organized enough to prove engineering discipline.

Visual language:

- Dark technical canvas, but less one-note violet than the current palette.
- Keep electric violet as primary identity, add cyan, green, amber, and neutral white as functional accents.
- More dashboard/HUD precision: small labels, coordinates, section indexes, measured spacing, active states.
- Fewer soft blobs; prefer grids, traces, vector lines, orbital paths, collision boundaries, and data-like labels.
- Typography remains display-forward with Clash Display/Satoshi, but motion should enforce hierarchy.
- Lab surfaces can be denser and more technical than homepage surfaces: controls, reset buttons, mode toggles, sliders, and diagnostics are allowed there.

## 8. Experience Concept

### 8.1 Hero: Gravity Core

Current hero has a Three.js sphere, portrait, split name animation, and floating project cards. Upgrade it into a gravity core.

Requirements:

- Center contains Andre portrait/name as the core object.
- Project previews orbit in shallow depth on desktop and respond to pointer proximity with magnetic pull.
- On scroll, orbiting cards stretch outward or collapse into the Projects section direction.
- Add subtle vector trails or orbital rings that react to scroll progress.
- CTA remains visible, readable, and clickable within the first viewport.
- Mobile fallback uses CSS/GSAP transforms, no heavy WebGL scene.

Acceptance criteria:

- First contentful text is readable immediately or within the existing intro timeline.
- Hero does not trap scroll.
- Reduced-motion mode shows static project previews and normal CTAs.
- Include a clear "Open Lab" entry point beside the main project/contact CTAs.

### 8.2 Navigation: Control Dock

Upgrade navigation from standard pill nav into a compact dashboard dock.

Requirements:

- Keep active section detection.
- Add a mini progress map with section nodes.
- Make each nav item subtly magnetic, but reduce motion on touch devices.
- Provide "Work", "Stack", "CV", and "Contact" actions as clear commands.
- Mobile menu must remain simple and non-physics.

### 8.3 About/Stack: Physics Skill Field

Current About is already horizontal with three panels and orbiting stack chips. Upgrade stack into a controlled physics scene.

Requirements:

- Stack chips can orbit by default and become draggable/tossable when user engages.
- Option A: use GSAP Draggable for lightweight magnetic/inertia-style motion.
- Option B: use Matter.js for true collision/gravity in one bounded container.
- Recommended: Matter.js only for one contained "Skill Field" scene; GSAP for everything else.
- Skill chips should be grouped by Web, AI, Networking, IoT, Automation.
- Add a reset button/icon for the scene.

Acceptance criteria:

- Physics scene pauses offscreen.
- It can be reset.
- Links and important UI are not blocked by canvas overlays.
- Keyboard/reduced-motion users get a static categorized stack.

### 8.4 Projects: Gravity Board

Current Projects section uses pinned horizontal panels with four featured projects. Upgrade into the main showcase.

Requirements:

- Featured projects begin as orbiting or floating cards in hero, then resolve into a pinned Projects "Gravity Board."
- Each featured project has:
  - screenshot
  - role/problem
  - impact or outcome
  - stack
  - live/code links
  - category
- Add a secondary grid/archive for the remaining projects currently represented in `public/pages`.
- Use GSAP Flip for transitioning between compact card state and expanded case-study state if feasible.
- Use ScrollTrigger labels/snap for project panels on desktop.
- Mobile uses vertical case-study cards with progressive reveals.

Acceptance criteria:

- Every project card is reachable by normal scroll.
- Live/code links remain accessible and not confused with drag gestures.
- Project panel transitions never obscure text longer than 500ms.

### 8.5 Experience: Orbit Timeline

Current Experience has a vertical timeline spine. Upgrade to a constellation timeline.

Requirements:

- Timeline entries become nodes on a path, with GSAP DrawSVG drawing connections.
- Active node gently pulls nearby metadata into focus.
- Use color categories for work, education, certification.
- Add certifications as distinct smaller nodes if content is available.
- Keep text density professional and scannable.

### 8.6 Free Tools: Utility Lab

Current `FreeTools` is a separate section. Make it feel like a public utility shelf.

Requirements:

- Tools appear as compact modules or "lab instruments."
- Cards can use hover magnetic tilt, not full physics.
- If a tool is available, provide clear link/action.
- If future tool is planned, mark as "building" without fake links.

### 8.7 Contact: Launchpad

Contact should feel like the end of the system, not just a form.

Requirements:

- Contact CTAs behave like launch controls: email, LinkedIn, GitHub, CV.
- Add small "availability" and preferred collaboration types.
- Avoid a heavy form unless backend reliability is confirmed.
- Include final orbit/particle collapse as a subtle closing animation.

### 8.8 Open Lab: Experimental Playground

Add a dedicated lab route or section. Recommended route: `/lab`. If routing scope must stay minimal for the first release, use `#lab` on the homepage and promote to `/lab` later.

Open Lab requirements:

- Present experiments as a filterable gallery: Physics, Gravity, GSAP, WebGL, AI, Network, IoT, Utility.
- Each experiment has a title, short description, tech tags, interaction hint, launch/open action, and fallback screenshot or static state.
- Each interactive experiment has reset and pause controls.
- Heavy experiments are lazy loaded after the user opens them.
- The lab is allowed to be more experimental than the homepage, but each experiment must have a clear exit/back path.
- The lab should expose "How it works" notes for selected experiments to make the technical craft visible.

Initial experiment candidates:

- Falling Stack: Matter.js skill chips with gravity, collision, drag, reset, and category filters.
- Project Collision Wall: project screenshots fall into a bounded physics board, then snap into a readable archive.
- Network Topology Playground: nodes connect like infrastructure links; users can drag nodes and watch edge tension update.
- AI Debate Particle Field: agents as orbiting nodes that exchange pulses; ties back to Arena Debate.
- IoT Signal Field: sensor points emit waves, packets, or MQTT-like traces across a grid.
- Fiscal Gravity: budget categories become weighted bodies; heavier spend clusters pull nearby labels.
- Shader Garden Lite: small WebGL/GLSL visual studies, initially static or low-cost.

Acceptance criteria:

- Lab can be reached from hero and navigation.
- At least one physics experiment is fully interactive in the MVP.
- Every experiment has a reduced-motion/static fallback.
- No lab experiment blocks homepage loading.
- Users can reset or pause every running simulation.

## 9. Motion System Requirements

Create a reusable motion system instead of duplicating GSAP logic in every component.

Recommended primitives:

- `RevealText`: character/word/line reveal with responsive cleanup.
- `ScrollPanel`: pinned section helper with ScrollTrigger lifecycle and reduced-motion fallback.
- `MagneticElement`: pointer proximity spring/magnetic movement.
- `GravityScene`: optional Matter.js bounded scene for DOM chips/cards.
- `ProjectTransition`: GSAP Flip helper for card-to-detail transitions.
- `ExperimentCard`: shared lab card with tags, interaction hint, and launch state.
- `ExperimentShell`: lazy-loaded lab frame with title, controls, reset, pause, and reduced-motion fallback.
- `MotionConfig`: shared eases, durations, stagger values, and reduced-motion behavior.

Implementation rules:

- Use `useGSAP()` with scoped refs for GSAP timelines.
- Register plugins centrally.
- Clean up ScrollTriggers, Draggables, and physics runners on unmount.
- Use `ScrollTrigger.matchMedia()` or equivalent responsive branching.
- Avoid stacking multiple pinned sections without testing refresh order.
- Use `ScrollTrigger.refresh()` after images/fonts load where layout affects pinning.
- Keep Lenis + ScrollTrigger synchronized through the existing ticker pattern.

## 10. Physics Requirements

Physics should be selective and purposeful.

Use GSAP Physics2D or basic tweens for:

- particle bursts
- tossed labels without collision
- CTA micro-interactions

Use GSAP Draggable for:

- draggable project/skill chips
- bounded drag zones
- rotation/tilt interactions
- hit testing

Use Matter.js for:

- one true gravity/collision scene
- skill-chip sandbox
- optional project-card pile/sort interaction
- Open Lab physics experiments that use 2D DOM/canvas bodies

Matter.js constraints:

- Do not run globally.
- Mount only when the section is visible.
- Pause/sleep when offscreen.
- Cap body count.
- Provide static fallback.
- Keep the canvas/render layer non-interfering with links and text.

Use Rapier/R3F only for future 3D lab experiments:

- Do not add Rapier to the first homepage milestone.
- Use it only if a 3D playground concept needs real rigid bodies, colliders, or character-style navigation.
- If added, keep the 3D experience opt-in through Open Lab.

## 11. Content Requirements

Project content should move from component-local arrays into a shared data module.

Suggested data shape:

- `id`
- `title`
- `subtitle`
- `category`
- `problem`
- `solution`
- `impact`
- `role`
- `tech`
- `image`
- `liveUrl`
- `codeUrl`
- `accent`
- `featured`

Minimum featured projects for launch:

- Arena Debate
- Reka AI
- Fiscal AI Finance
- SiTiket

Secondary archive should include the remaining screenshots in `public/pages` where metadata is available.

Lab content should use a separate experiment data module.

Suggested experiment data shape:

- `id`
- `title`
- `category`
- `description`
- `tech`
- `interaction`
- `status`
- `route`
- `previewImage`
- `reducedMotionFallback`

## 12. Performance Requirements

Targets:

- Lighthouse Performance desktop >= 90
- Lighthouse Performance mobile >= 80
- LCP <= 2.5s on a typical production connection
- INP <= 200ms
- CLS <= 0.1
- Desktop animation target: 60fps on modern machines
- Mid-tier mobile: no WebGL physics scenes by default

Rules:

- Lazy load heavy sections.
- Pause Three.js offscreen, as current `ThreeScene` already starts doing.
- Cap WebGL DPR to current or lower values.
- Use `will-change` sparingly and remove it for long-lived static elements.
- Do not animate layout properties where transform/opacity can work.
- Preload only critical hero assets.
- Respect `prefers-reduced-motion`.

## 13. Accessibility Requirements

- All core content must be available without animation.
- Navigation must work with keyboard and normal anchors.
- Drag interactions need non-drag alternatives.
- Reduced-motion mode disables pinned horizontal scroll where it would feel disorienting.
- Canvas/WebGL scenes must be decorative or mirrored by semantic HTML.
- Text contrast must remain WCAG AA for body content.
- Touch targets minimum 44px.

## 14. SEO Requirements

- Preserve existing `SEO` component and schema.
- Keep project content as semantic HTML, not canvas-only.
- Add structured data for featured projects if feasible.
- Ensure CV link remains crawlable.
- Maintain sitemap/robots behavior.

## 15. Analytics Requirements

Track:

- Hero CTA click
- Open Lab click
- Experiment launch
- Experiment reset
- Experiment pause
- Project card expand
- Live demo click
- Code click
- CV download
- Contact click
- Scroll depth by section
- Reduced-motion usage if detectable without storing personal data

Success indicators:

- More visitors reach Projects and Contact.
- Higher project interaction rate.
- Lower immediate bounce from first viewport.
- No regression in Core Web Vitals.

## 16. Milestones

### Phase 0 - Baseline and Design Lock

- Capture current screenshots desktop/mobile.
- Run current build/lint.
- Record Lighthouse baseline.
- Confirm final visual direction: Portfolio Shell + Open Lab.
- Confirm Open Lab route strategy: `/lab` preferred, `#lab` acceptable for MVP.

### Phase 1 - Motion Foundation

- Centralize GSAP plugin registration and motion tokens.
- Build reusable reveal, magnetic, scroll panel, and reduced-motion helpers.
- Refactor repeated ScrollTrigger patterns where useful.

### Phase 2 - Hero Gravity Core

- Upgrade Three.js/orbit presentation.
- Connect scroll progress to hero card movement.
- Add primary Open Lab entry point.
- Preserve mobile fallback.
- Keep CTA and identity readable.

### Phase 3 - Open Lab MVP

- Add lab route/section.
- Add experiment gallery and data module.
- Implement one interactive physics experiment.
- Add experiment shell controls: reset, pause, close/back.
- Ensure lab is lazy loaded and opt-in.

### Phase 4 - Projects Gravity Board

- Move project data into shared module.
- Redesign featured project section.
- Add project archive pattern.
- Add Flip or equivalent card-to-detail transitions.

### Phase 5 - Physics Interaction Layer

- Expand one bounded Matter.js or Draggable-based skill field.
- Add reset/pause/fallback behavior.
- Validate pointer/touch/link conflicts.

### Phase 6 - Experience, Tools, Contact Polish

- Upgrade timeline to orbit/constellation.
- Convert FreeTools into Utility Lab.
- Upgrade Contact into launchpad CTAs.

### Phase 7 - QA and Release

- Browser QA desktop/mobile.
- Reduced-motion QA.
- Keyboard QA.
- Lighthouse and bundle review.
- Fix scroll refresh/pin issues.

## 17. Risks

- Too many pinned sections can cause scroll fatigue and refresh bugs.
- Physics can interfere with links if event layers are not isolated.
- Heavy WebGL + Matter.js can reduce mobile performance.
- Over-animation can weaken recruiter readability.
- GSAP premium/bonus plugin availability must be verified before relying on any plugin beyond the installed package.
- A full playground can sprawl into many unfinished experiments if the MVP scope is not constrained.

Mitigations:

- Keep homepage motion controlled; put riskier experiments in Open Lab.
- Ship only one complete lab experiment in the MVP.
- Prefer GSAP core/ScrollTrigger/useGSAP for primary flows.
- Build mobile-specific simplified experiences.
- Keep all important content visible as normal HTML.
- Use performance budgets as release blockers.

## 18. Open Questions

1. Should Open Lab ship as `/lab` immediately or start as a homepage `#lab` section?
2. Which experiment should be MVP: Falling Stack, Project Collision Wall, Network Topology Playground, or AI Debate Particle Field?
3. Should project archive include all existing screenshots now, or only projects with complete metadata?
4. Is Matter.js acceptable as a new dependency for MVP, or should gravity be simulated with GSAP/Framer first?
5. Should the palette keep electric violet as dominant, or shift toward a broader technical palette with cyan/green/amber accents?
6. Should this update include copywriting changes for stronger recruiter/client positioning?

## 19. Definition of Done

- The site has a cohesive Gravity Lab Dashboard concept across hero, projects, about/stack, experience, tools, and contact.
- The site includes a clear Open Lab entry point and an MVP lab experience.
- Motion system primitives exist and are reused.
- At least one meaningful gravity/physics interaction ships with fallback.
- Lab experiments are opt-in and do not slow homepage loading.
- Projects are easier to inspect than before.
- Mobile remains usable and fast.
- Reduced-motion mode is complete.
- Build and lint pass.
- Visual QA confirms no text overlap, broken pinned sections, or inaccessible links.
