# Teen Summit 2.0 Launch Page - Design Guidelines

## Color Palette

**Primary Color (Orange)**: HSL(25, 95%, 53%) - Energetic, warm, and youth-focused
- Used for: Primary buttons, CTAs, headings, brand accents, links
- Conveys: Energy, creativity, enthusiasm, action

**Accent Color (Blue)**: HSL(210, 100%, 56%) - Professional, trustworthy, and modern
- Used for: Secondary buttons, accents, highlights, info elements
- Conveys: Trust, stability, intelligence, academic credibility

**Color Strategy**: The orange and blue combination creates a vibrant, energetic palette that appeals to youth while maintaining institutional credibility. Orange drives action and engagement, while blue provides balance and trust.

## Design Approach

**Reference-Based Approach**: Drawing inspiration from youth media platforms (Instagram, TikTok, YouTube) combined with educational credibility (Khan Academy, Coursera) and bold brand experiences (Nike, Spotify). This creates an energetic, video-forward design that inspires while maintaining institutional trust.

**Core Principle**: Bold youth empowerment with academic credibility - vibrant, scroll-driven storytelling that treats teen voices as authoritative with orange energy and blue intelligence.

---

## Typography

**Font Families** (via Google Fonts):
- **Display/Headlines**: Montserrat (Bold 700, ExtraBold 800) - modern, impactful, youth-friendly
- **Body/Content**: Inter (Regular 400, Medium 500, SemiBold 600) - highly readable, professional
- **Accent/Quotes**: Space Grotesk (Medium 500) - distinctive character for callouts

**Type Scale**:
- Hero Headline: text-6xl md:text-7xl lg:text-8xl (Montserrat ExtraBold)
- Section Headers: text-4xl md:text-5xl (Montserrat Bold)
- Subsection Titles: text-2xl md:text-3xl (Montserrat Bold)
- Body Large: text-lg md:text-xl (Inter Medium)
- Body Text: text-base md:text-lg (Inter Regular)
- Captions: text-sm (Inter Regular)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20, 24 consistently throughout (p-4, gap-8, mt-12, py-16, space-y-20, py-24)

**Container Strategy**:
- Full-width sections with inner max-w-7xl for most content
- Text-heavy areas: max-w-4xl for optimal reading
- Hero and video sections: Full bleed (w-full)

**Grid Patterns**:
- Benefits/Features: 2-column on md:, single column on mobile (grid-cols-1 md:grid-cols-2)
- Partners logos: 3-4 columns (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
- Timeline: Vertical on mobile, horizontal scroll or alternating pattern on desktop

---

## Component Library

### Hero Section (100vh)
- Full-screen video background with overlay gradient for text readability
- Centered content with large headline, subheadline, and primary CTA
- Video controls subtly placed
- Email capture form integrated prominently
- Down arrow scroll indicator at bottom

### "For Teens" Empowerment Section
- Large, confident headline ("You Were Chosen For A Reason")
- Two-column layout: Left = narrative copy, Right = checklist of benefits with checkmark icons (Heroicons)
- Pull quote styling for NIL rights messaging
- "Uniform" callout with product-style presentation
- Strong CTA button at section end

### Sheila Johnson Tribute
- Split layout: Image portrait (left 40%) + Biography/acknowledgment text (right 60%)
- Professional headshot with subtle frame/border treatment
- Empire montage thumbnails below main image
- Quote formatting for key messaging

### Three Acts Showcase
- Three-card horizontal layout on desktop, stacked on mobile
- Each card: AI-generated imagery background, title overlay, brief description, "Learn More" expandable
- ACT I (Debate): Dynamic imagery of youth debating with DJ elements
- ACT II (Musicology): Music education, cultural elements, record/turntable imagery
- ACT III (Podcast): Studio setup, microphones, recording environment
- Joseph Joubert quote featured prominently in Debate section

### Partners Grid
- Clean logo grid with even spacing
- University of Illinois, WILL/Illinois Public Media, The Safe Haven, Hip Hop Innovation
- Grayscale logos with hover color reveal
- Acknowledgment text above grid

### Timeline Section
- Vertical timeline on mobile, horizontal or zigzag on desktop
- Timeline nodes: Focus Groups → Casting Calls → Selection Ceremony → Training → Production → Awards Ceremony
- Each node expandable for details
- Visual connectors between milestones
- Dates/seasons prominently displayed

### Theoretical Framework (Collapsible)
- Accordion/disclosure component for scholars list
- Each scholar: Name, key concept, brief description
- Expandable on click, starts collapsed to avoid overwhelming
- Organized by theme (Pedagogy, Hip-Hop Studies, Debate, Philosophy)

### Forms Section
- Side-by-side cards: "Be a Guest" and "Volunteer"
- Form fields: Name, Email, Phone, Message/Intent, File Upload
- Large, accessible form inputs
- Clear submission button
- Newsletter signup integrated separately with minimal friction

### Footer
- Multi-column layout: About (brief), Quick Links, Contact Info, Social Media
- University of Illinois branding acknowledgment
- Privacy Policy, Terms of Use links
- Copyright information

---

## Images

**Large Hero Video/Image**:
- Full-viewport hero with video montage featuring: Sheila Johnson, College of Education, The Safe Haven logo, WILL clips, public schools, solarpunk aesthetic teens, historical Teen Summit footage
- If video unavailable, use composite image with these elements in dynamic collage style
- Overlay: Dark gradient (top-to-bottom) for text legibility

**Section Images**:
- Sheila Johnson: Professional headshot (high-resolution portrait), plus 2-3 thumbnails of her business empire
- Three Acts: AI-generated imagery for each (debate scene, music classroom, podcast studio)
- Partners: Official logos (transparent PNGs)
- Timeline: Icon illustrations for each milestone phase
- "For Teens" section: Inspirational image of diverse youth in professional setting or custom uniform mockup

**Image Specifications**:
- Hero: Minimum 1920x1080, optimized video or high-res composite
- Portraits: 800x1000 minimum
- Act cards: 600x400 per card
- Logos: SVG preferred, or PNG with transparent background
- All images optimized for web (<200KB per image)

---

## Interaction Patterns

**Scroll-Driven Narrative**: Smooth scroll between sections with subtle fade-in animations for content as it enters viewport (use Intersection Observer pattern)

**Video Controls**: Custom overlay controls for hero video - play/pause, mute/unmute only

**Form Interactions**:
- Real-time validation with clear error messaging
- File upload with drag-and-drop support
- Success confirmation modal after submission

**Accordion Behavior**: Scholars section uses smooth expand/collapse with chevron icon rotation

**CTA Buttons**: Prominent, large touch targets (min 48px height), clear hierarchy (primary vs. secondary actions)

**Navigation**: Sticky header with section jump links that highlight on scroll (if needed for long-form page)

---

## Accessibility

- Minimum touch target: 48x48px for all interactive elements
- Form labels always visible, never placeholder-only
- Video: Include captions/subtitles, provide play/pause controls
- ARIA labels for icon-only buttons
- Focus states clearly visible on all interactive elements
- Color contrast ratio 4.5:1 minimum for all text
- Semantic HTML headings (h1 → h2 → h3 hierarchy)
- Alt text for all meaningful images, decorative images marked as such

---

## Responsive Behavior

**Mobile-First Breakpoints**:
- Base (mobile): Single column, full-width sections, stacked layouts
- md: (768px+): Introduce 2-column grids, side-by-side content
- lg: (1024px+): Full desktop layouts, 3-4 column grids, horizontal timelines

**Section Spacing**:
- Mobile: py-12 between major sections
- Tablet: py-16
- Desktop: py-24

**Typography Scaling**: All text sizes scale up at md: and lg: breakpoints as specified in type scale

**Video**: Maintain 16:9 aspect ratio, full-width on all devices, controls scale appropriately