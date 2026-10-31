# Lore UI/UX Polish Guide: Review, Ideas, Motion and Photography

*Based on your two screenshots (marketing hero and workspace home, captured 31 October 2026). Focus is experience and visual polish, not new features. Colour values are proposals; verify contrast with a checker before shipping.*

## 1. Overall impression

**You already have a distinct, credible look.** The ivory, forest-green and sage palette, the serif-plus-sans pairing and the generous whitespace feel calm and premium, and they stand apart from the purple-gradient look of most AI products. The marketing hero and the workspace home share one visual language, which is rare at this stage.

**What is working**

- A clear primary action on both screens ("Get Started Free", "Tap to speak") with a strong dark-green button.
- The Ask Lore input is the hero of the workspace home, which matches the product's core job.
- Suggestion chips lower the blank-page problem.
- Rounded cards, soft dotted-grid texture and the sage gradient give depth without noise.
- The review badge, the ⌘K hint and the greeting make the workspace feel alive.

**What holds it back from "market-ready"**

- The marketing hero is words only. Visitors cannot *see* the product, so the trust claims float without proof.
- A few copy claims overreach ("Zero-Hallucination Search").
- The workspace still carries developer and demo chrome.
- The sidebar is long and the home screen has some inconsistencies.

## 2. Specific observations and fixes

| # | What I see | Why it matters | Fix | Priority |
| --- | --- | --- | --- | --- |
| 1 | Marketing hero has no product visual above the fold | Visitors decide in seconds; text alone cannot show what Lore does | Add a live-looking product card to the right or below the CTAs (section 4.1) | High |
| 2 | "Zero-Hallucination Search" in the trust row | An absolute claim you cannot prove; sophisticated buyers will distrust it, and it contradicts your own claims policy | "Answers with sources, or an honest 'not enough evidence'" | High |
| 3 | Two competing top-right CTAs: "Launch Workspace" and, in the hero, "Get Started Free" | Unclear primary path; "Free" may conflict with pricing you have not validated | One primary label everywhere (for example "Get started" or "Request a pilot"); "Sign in" stays secondary | High |
| 4 | Badge reads "The Enterprise Organizational Intelligence Workspace" | Long, generic and jargon-heavy | A short category line aligned to your positioning, for example "Decision memory for engineering teams" | High |
| 5 | Sidebar shows "Executive Pulse" as active while the page is the personal home greeting | Navigation state contradicts the content | Keep active state tied to the route; give Home its own item | High |
| 6 | Address bar shows `#pricing` while viewing the workspace | Routing leak; looks broken when demoing | Separate marketing and app routes (`/` versus `/app/...`) | High |
| 7 | "Demo persona" switcher and "Reset Seed" sit in the top bar | Valuable for demos but unprofessional in a real product | Move into a dismissible demo toolbar or a developer flag; show only in demo workspaces | High |
| 8 | "SaaS B2B" tag beside the logo | Reads like an internal label | Remove, or replace with the workspace name or plan | Medium |
| 9 | Two ⌘K search entries (sidebar and top bar) | Redundant and visually busy | Keep one, in the top bar; use the sidebar space for a workspace switcher | Medium |
| 10 | About 14 sidebar items in 5 groups with its own scrollbar | Cognitive load; many items are future features | Show 6–8 items by default; collapse the rest into a "More" group; make it role-aware | Medium |
| 11 | Suggestion chip "How to calibrate the sensor?" | Hardware example; your wedge is software engineering | Use software prompts ("Why did we choose Postgres for billing?") | Medium |
| 12 | Headline is very large, so the four action cards are cut off below the fold | Users do not see the next step without scrolling | Reduce headline about 15–20% or tighten vertical padding so the card row peeks | Medium |
| 13 | Small italic tagline top right ("Capture knowledge. Empower tomorrow.") is low contrast and uses decorative letterforms | Hard to read and competes with the heading | Remove from the workspace, or move to the empty-state and footer | Low |
| 14 | Italic display headline uses swash letterforms ("Always Within Reach") | Beautiful but can slow reading | Keep for one short phrase only; test with real readers | Low |
| 15 | Waveform glyph beside "Tap to speak" is static | Looks like an icon rather than state | Animate only while listening (section 6) | Low |

**Contrast notes (approximate, verify):** sage `#78947E` on ivory `#F7F7F2` is only about 3:1, so use it for fills, borders and large icons, not body text. Muted coral `#B96D61` on ivory is roughly 3.6:1; use a deeper coral for any small text. Body copy in the hero subtext looks light grey on pale sage; darken it one step.

## 3. Design direction

**Concept: "a quiet library with a living pulse."** Calm, warm and editorial on the surface; precise and alive where the product is working.

**Five principles**

1. **Show the evidence.** Every answer, record and status carries its source and state visibly. Trust is the visual theme, not a footnote.
2. **Calm by default.** Motion confirms and guides; it never performs. One focal animation per screen.
3. **Warm, not decorative.** Botanical and library imagery supports brand moments; core workspace screens stay restrained.
4. **One obvious next step.** Each screen has one primary action and clear secondary paths.
5. **Honest states.** Loading, empty, error, no-evidence and permission-denied states are designed, not defaults.

## 4. Market-ready UI ideas (public website)

### 4.1 Hero redesign

- **Left:** keep the serif headline, shorten the sub-copy to two lines, one primary CTA and one "Watch the 60-second tour" link.
- **Right (or below on mobile):** a *product stage*, a softly floating Ask Lore card that plays a scripted loop: a question types in, the answer streams, two citation chips appear ("PR #248", "Decision record, approved by A. Rao"), and a green "Verified" pill settles in. Label it clearly as an illustrative demo.
- **Background:** faint dotted grid plus a slow-moving sage gradient; add a small botanical line illustration at one edge, cropped, never behind text.
- **Trust row:** swap the claim chips for evidence-style statements: "Every answer cites its source", "Permission-aware retrieval", "You approve what is shared", "Voice or text, your choice".

### 4.2 Page storyboard

| Section | Visual idea |
| --- | --- |
| Hero | Product stage described above |
| Problem | Three scattered fragments (chat bubble, PR, ticket) drifting apart, then a quiet line: "The why is nowhere." |
| How it works (Capture, Connect, Ask) | Pinned scroll scene: a voice orb becomes a record card, thread lines connect it to a PR node, then an answer card cites both |
| For three people | Tabbed cards for the expert, the new hire and the engineering lead, each with a different mini-screen |
| Evidence and trust | A split view: the generated draft on the left, highlighted transcript on the right, to show you can verify what the AI wrote |
| Integrations | Calm logo grid with "available" and "planned" states; no fake logos |
| Security and governance | Plain-language cards with small line icons; a downloadable one-page overview |
| Pricing | Three columns, one highlighted, monthly/annual toggle, transparent "what counts as usage" |
| FAQ | Smooth accordion with one answer open by default |
| Final CTA | Full-width forest-green band with ivory serif headline and a single button |

### 4.3 Credibility without fake proof

- Use "illustrative data" tags on demo content.
- Early on, replace logos with a "Built with early design partners" note or a short founder letter with a real photo.
- Add a changelog or "what we shipped" strip; real momentum beats invented numbers.

### 4.4 Pricing page polish

- Show a simple usage explainer with sliders (seats, repositories) only once pricing is validated; until then, use "Join the pilot program".
- Highlight the recommended tier with a thin sage border and a soft shadow, not a loud badge.

### 4.5 Navigation and footer

- Sticky, translucent header that gains a hairline border after the first scroll.
- Footer with four tidy columns, status link, security contact and a short mission line in serif.

## 5. Product-ready UI ideas (authenticated workspace)

### 5.1 Sidebar and shell

- Default groups: **Home, Ask Lore, Capture, Knowledge Hub, Review** (with count badge) and a collapsed **More**.
- Workspace switcher and user menu at the bottom; one global search in the top bar.
- Collapsible to an icon rail with tooltips; remember the preference.
- Active item: soft sage fill plus a 3px leading bar, never colour alone.

### 5.2 Home screen

- Keep the large Ask input; place **three live modules** below: "Needs your review", "Recently approved", "Suggested for you".
- Greeting stays friendly; drop the tagline.
- Chips refresh from real, recent knowledge so they feel personal.

### 5.3 Ask Lore answer card (the signature component)

Structure from top to bottom:

1. **Answer** in readable body text, 16–17px, maximum 70 characters per line.
2. **Inline citation chips** (small numbered pills) that open a side preview on hover or tap.
3. **Status row:** Verified (forest), Under review (sand), Stale (muted coral), Conflicting (coral outline), each with an icon and text label.
4. **Applicability line:** system, environment, date.
5. **Source rail:** cards for each source with type icon, title, owner and last-reviewed date.
6. **Next step:** "Ask an expert" or "Capture this" when evidence is thin.

**Honest no-answer state:** a calm card with a small leaf-and-question icon, "I don't have enough approved evidence to answer this," followed by the closest sources and a gentle "Ask someone who knows" button. This will become a signature of the brand.

### 5.4 Capture Studio

- **Consent bar** pinned at the top: "Recording is on. You control what is shared." with pause, stop and delete.
- **Voice orb** centred; a live transcript scrolls beneath in a soft card.
- **Progress dots** for interview chapters (Context, Why, Alternatives, Risks, Wrap-up).
- **Wrap-up screen:** the generated draft appears as a card; tapping any field highlights the matching transcript passage.
- Typed capture uses the same layout so voice is never a requirement.

### 5.5 Review Queue

- Two-pane layout: draft on the left, source transcript and PR on the right, with linked highlights.
- Keyboard shortcuts (J/K to move, A to approve, E to edit) shown in a quiet footer.
- Approving triggers a short, satisfying confirmation (section 6).

### 5.6 Knowledge detail page

- Title, status pill and owner on top; main column for context and reasoning; right rail for sources, related systems, contributors and version history.
- Sticky "review due in 12 days" strip when relevant.

### 5.7 States and polish

- **Skeletons** that match final layout, not spinners.
- **Empty states** with one illustration, one sentence, one action.
- **Error states** that say what happened and what to do next.
- **Permission-denied** that never reveals titles or snippets.
- **Command palette** (⌘K) with grouped results and recent actions.
- **First-run checklist** (connect a repository, record a first capture, invite a teammate) as a small card, not a modal tour.
- **Dark mode** designed deliberately, not inverted (tokens below).
- **Density toggle** (comfortable or compact) for power users.
- **Mobile:** bottom tab bar with Ask, Capture, Hub and Review; the voice button as a floating action.

### 5.8 Demo mode, done properly

Keep the persona switcher, but present it as a floating "Demo controls" pill in the lower corner that can be hidden. Add a slim banner "Sample data" so screenshots are always honest.

## 6. Design tokens (starting set)

| Token | Light | Dark (proposed) | Use |
| --- | --- | --- | --- |
| Surface | `#F7F7F2` | `#141A16` | Page background |
| Surface raised | `#FFFFFF` | `#1B231E` | Cards |
| Border | `#E7E9E1` | `#2A342D` | Hairlines |
| Text primary | `#202923` | `#EDEFE8` | Headings and body |
| Text secondary | `#4C5A50` | `#B5BFB6` | Supporting copy |
| Brand | `#2F4A3A` | `#8FB39A` | Buttons, active states |
| Sage | `#78947E` | `#78947E` | Fills, icons, large elements |
| Sand | `#D9B98C` | `#C9A877` | Under review |
| Coral (fill) | `#B96D61` | `#C98277` | Stale, conflict fills |
| Coral (text) | `#94483D` | `#E0A097` | Small warning text |

**Typography:** serif for display only (hero, page titles, empty-state headlines); Inter or Manrope for everything else. Suggested scale: 12, 14, 16, 18, 24, 32, 48, 64. Line height 1.5 for body, 1.1 for display.

**Shape and depth:** radius 12 (inputs), 20 (cards), 28 (hero panels). Shadows soft and tinted green-grey, for example `0 8px 30px rgba(32,41,35,0.06)`; avoid pure black shadows.

**Status system:** each status pairs colour, icon and label so meaning survives colour-blindness.

## 7. Animation and motion spec

**Rules**

- Durations: 120–180ms for micro-feedback, 240–400ms for transitions, up to 800ms for hero reveals; nothing loops loudly.
- Easing: ease-out for entrances, ease-in-out for movement, a gentle spring for confirmations.
- Animate transform and opacity only; avoid layout-shifting animations.
- Respect `prefers-reduced-motion`: replace movement with simple fades or no animation.
- One hero animation per screen; the rest stay subtle.
- Suggested tooling: CSS for simple states, Framer Motion for React transitions, Rive or Lottie for the voice orb and confirmation, GSAP ScrollTrigger only for the pinned marketing storyboard.

| Animation | Where | Behaviour | Time |
| --- | --- | --- | --- |
| Staggered page reveal | Marketing and home | Elements fade up 12px in sequence, 60ms apart | 500ms total |
| Headline word fade | Hero | Words appear softly, italic phrase last | 700ms |
| Input focus glow | Ask input | Border shifts to sage, soft 4px outer ring fades in | 160ms |
| Voice orb idle | Capture, Ask | Slow breathing scale 1.00 to 1.04 and a faint ring | 4s loop |
| Voice orb listening | Capture, Ask | Ring and bars respond to microphone amplitude; colour warms slightly | live |
| Streaming answer | Ask Lore | Text streams in; citation chips pop in with a small spring as sentences complete | per token |
| Citation hover | Answer card | Source preview card slides up 8px with fade | 180ms |
| Status pill change | Anywhere | Pill cross-fades and icon rotates once | 240ms |
| Approval confirmation | Review Queue | Check draws itself, a small leaf unfurls, card settles then collapses out of the queue | 600ms |
| Skeleton shimmer | All data loads | Slow diagonal sweep at low contrast | 1.4s loop |
| Card hover | Home cards | Lift 4px, shadow deepens, icon nudges | 180ms |
| Shared-element transition | Card to detail | The card expands into the detail header | 350ms |
| Sidebar collapse | Shell | Width eases, labels fade first | 240ms |
| Command palette | ⌘K | Scales from 0.98 and fades in; results stagger by 20ms | 180ms |
| Pinned storyboard | Marketing | Scroll drives orb to record to thread to answer; steps highlight in the left list | scroll |
| Thread-line draw | How it works | SVG lines draw between nodes, then nodes pulse once | 900ms |
| Graph settle | Knowledge Graph | Nodes ease into place with light physics, then freeze to save battery | 1.2s |
| Toasts | Global | Slide in from the bottom right, auto-dismiss in 4s, pause on hover | 200ms |
| Empty-state idle | Empty pages | Illustration has one tiny movement (a leaf sways) every 6s | subtle |
| Number count-up | Marketing stats | Only for clearly illustrative or real numbers; never fabricated | 800ms |

**Performance budget:** keep animation JavaScript under about 60 KB gzipped on the marketing site, lazy-load heavy scenes, pause off-screen animations and aim for 60 fps on mid-range laptops.

## 8. Photography and imagery ideas

**Art direction:** natural light, muted greens and warm neutrals, shallow depth of field, real workplaces, unposed moments. Colour-grade every image to the same palette: lifted ivory highlights, slightly desaturated greens, gentle grain. Avoid glowing brains, robot hands, handshakes and floating hologram stock imagery.

**Brand idea:** *tree rings and library shelves*. Layers of time and experience that you can read, matched to your serif and botanical direction.

| # | Shot | Use | Composition and light |
| --- | --- | --- | --- |
| 1 | Macro of a tree cross-section with growth rings | Hero accent, About page, loading illustrations | Top-down, soft side light, ivory background; echo the rings as concentric lines in the UI |
| 2 | Senior engineer explaining at a whiteboard to a teammate | Capture and mentor sections | Window light from the left, over-the-shoulder, genuine mid-explanation expression |
| 3 | New hire at a desk, quiet smile after finding an answer | New-hire persona | Waist-up, shallow focus on laptop edge, warm tones |
| 4 | Close-up of someone speaking thoughtfully with a headset or phone on a table | Voice capture | Candid, slightly off-centre, softly blurred background; no "call centre" look |
| 5 | Hands annotating a printed architecture diagram | Decisions and rationale | Top-down desk scene, pencil, coffee, natural shadows |
| 6 | Old archive drawers or library stacks in warm light | Knowledge Hub, About | Symmetry, deep green shelving, a single beam of light |
| 7 | Fern or moss macro with water droplets | Marketing background accents, empty states | Dark green and sage; crop to leave empty space for text |
| 8 | Two engineers at a standing desk reviewing a pull request on a monitor | GitHub integration | Screen content blurred or mock; side profile; daylight |
| 9 | Team lead walking with a coffee, laptop under arm, hallway with plants | Team lead persona | Motion blur on background, human scale |
| 10 | Abstract layered paper in sage, sand and ivory with soft shadows | Pricing, security, footers | Studio shot; gives texture without clutter |
| 11 | Thread of ink or string connecting small paper cards on a corkboard | Capture, Connect, Ask story | Macro, tilt-shift; a physical metaphor for linked knowledge |
| 12 | Quiet evening office, one lit window, a person closing their laptop | Final CTA, "knowledge stays" message | Dusk blue-green and warm lamp light |

**Treatments**

- Rounded 24px masks, occasionally arch-shaped crops to echo the library theme.
- Subtle duotone sage overlay on background photography so text stays readable.
- Gentle parallax (about 8px) on marketing images only; none in the workspace.
- In the workspace, prefer line illustrations (botanical sprigs, books, threads) over photos.

**Sourcing and honesty**

- Best: a half-day commissioned shoot with real people from your team or friends, with signed releases; it also gives you genuine "founder" imagery.
- Acceptable: licensed stock from reputable libraries, graded to match; check licence terms for commercial use.
- AI-generated imagery can be used for textures and abstract scenes with a consistent prompt style, but disclose it where appropriate and never use it to depict customers, testimonials or fake team members.
- Alt text for every image; no text baked into images.

**Prompt starter for abstract and texture images:** "Soft natural light, layered sage-green and ivory paper, shallow depth of field, subtle grain, calm editorial mood, no text, no people, wide margins for typography."

## 9. Microcopy refresh

| Where | Now | Suggested |
| --- | --- | --- |
| Hero trust chip | Zero-Hallucination Search | Sourced answers, or an honest "not enough evidence" |
| Hero badge | The Enterprise Organizational Intelligence Workspace | Decision memory for engineering teams |
| Primary CTA | Get Started Free | Get started |
| Secondary CTA | Interactive Tour | Watch the 60-second tour |
| Ask input placeholder | Ask a question or press the mic to talk... | Ask why something works the way it does |
| Empty Review Queue | (blank) | You are all caught up. New drafts will appear here. |
| No-answer state | (none) | I could not find approved evidence for this. Here is what is closest. |
| Mic permission denied | (none) | Microphone is off. You can type instead, nothing is lost. |

Tone: calm, plain, warm and exact. Avoid superlatives and absolute claims.

## 10. Implementation order

**Quick wins (1–2 days)**

1. Fix the active-nav and route issues.
2. Replace the overreaching claim and consolidate CTAs.
3. Move demo controls into a dismissible pill; remove the "SaaS B2B" tag.
4. Reduce hero headline size so the action cards peek.
5. Swap the sensor chip for software examples; darken secondary text.

**Core polish (1–2 weeks)**

1. Build the product stage for the marketing hero.
2. Create the Ask Lore answer card with citation chips, status pills and the no-answer state.
3. Add skeletons, empty states and error states; define the token file with light and dark themes.
4. Implement the staggered reveal, input focus, voice orb and approval confirmation animations.
5. Simplify the sidebar and add the icon-rail collapse.

**Later polish**

1. Pinned scroll storyboard and thread-line animation.
2. Shared-element transitions and the graph settle effect.
3. Commissioned photography and custom botanical line illustrations.
4. Mobile bottom navigation and density toggle.

## 11. Pre-launch UI checklist

- Text contrast meets WCAG AA (4.5:1 for body, 3:1 for large text and UI icons).
- Every interactive element is keyboard reachable with a visible focus ring.
- Reduced-motion mode tested on every animated screen.
- Layout checked at 375px, 768px, 1280px and 1920px widths.
- Dark mode reviewed screen by screen.
- Every list and card has loading, empty, error and permission-denied states.
- All demo and sample content is clearly labelled.
- No claim on the site that the product cannot back up.
- Lighthouse performance and accessibility scores reviewed on the marketing page.
- Screenshots and recordings reviewed for private data before sharing.

---

If you would like, the next step could be a high-fidelity mock of the redesigned hero and the Ask Lore answer card, or a motion storyboard for the voice orb and approval confirmation.
