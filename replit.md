# Teen Summit 2.0 - Launch Page

## Overview
Teen Summit 2.0 is a civic media platform designed to empower youth through debate, musicology, and podcasting. This full-stack web application features a hybrid multi-page architecture, offering a storytelling landing page, dedicated application forms (newsletter, Summiteer, volunteer, guest), and authenticated portals for Cast Members, Parents, and Educators. The platform showcases published episodes, blog content, and includes features like a blog system, filming schedules, episode tracking, video uploads, and Academic Civic NILS analytics within the Cast Member Portal. The project aims to create an engaging, youth-focused experience, blending modern media inspiration with academic rigor, while highlighting the program's structure, partners, and impact.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend is a React 18 TypeScript application using Vite, Wouter for routing, Shadcn/ui (New York style variant), Radix UI primitives, and Tailwind CSS for styling. TanStack Query manages state and data fetching, while React Hook Form and Zod handle forms and validation. Framer Motion is used for animations. Key features include a sticky navigation, mobile menu, a custom ObjectUploader for large files (up to 500MB), HTML5 video player, masonry blog layout, SEO components, and a countdown timer.

**Mobile-First & Responsive Design:**
- Fluid typography system using CSS clamp() for all text sizes (xs through 9xl)
- iOS safe-area insets support for notch-equipped devices (applies only on mobile breakpoint)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Mobile-optimized layouts with Tailwind responsive utilities across all components

**Public Pages:** Landing, Episodes, Blog, Dossiers, Acknowledgments, application forms (Summiteer with comprehensive surveys, Guest, Volunteer, Newsletter), Contact, Terms, Privacy.

**Summiteer Application System:**
- **Student Survey (10 Questions):** Comprehensive assessment including short-answer (30-100 chars) and long-answer (100-500 chars) questions covering motivation, civic engagement experience, podcast vision, debate skills, leadership examples, conflict resolution, and 12-week commitment pledge
- **Parent Survey (8 Questions):** Detailed parent/guardian commitment assessment covering time availability, transportation, academic support, communication preferences, emergency contacts, and medical information
- **Progressive Multi-Step Form:** Guided application flow with validation at each step
- **Parent Resources Section:** Comprehensive information about program expectations, filming location (University of Illinois Urbana-Champaign), time commitment (Spring 2026 shooting, Fall 2026 release), and parental support requirements
- **Type-Safe Data Flow:** Separate validation schemas for API (boolean consent) and database storage (string consent) with proper transformation in route handlers

**Authenticated Portals** (each with distinct, role-specific features):
- **Cast Member Portal** (for students/Summiters):
  - Personal profile management with bio, avatar, social media links
  - Academic Civic NILS Tracker (social media analytics across 5 platforms)
  - Blog post creation and management (draft/publish workflow)
  - Personal episode appearances and filming schedule
  - Team directory showing all cast members
  - Dossiers access for debate preparation

- **Parent Portal** (for parents/guardians):
  - Real-time view of child's cast member profile
  - Child's upcoming filming schedule with dates, times, locations
  - Child's episode appearances
  - Parent amenities information (on-site viewing, meals, refreshments)
  - Canvas Learning Platform access
  - Comprehensive policies: pickup/drop-off, uniform requirements, code of conduct
  - Digital safety guidelines and zero tolerance policies
  - Campus safety liaison officer information
  - Required forms and permission slips downloads
  - Recent activity feed for child's participation

- **Admin Portal** (for program administrators):
  - Dashboard with statistics overview (total applications, episodes, posts)
  - Application management across all types (Summiteer, Guest, Volunteer, Contact, Newsletter)
  - Content management (Episodes, Blog Posts, Dossiers) with full CRUD
  - Ability to view and delete any content or application
  - Comprehensive data tables with search and filtering

- **Educator Portal** (for teachers and educational partners):
  - Educational resource library
  - Curriculum materials and lesson plans
  - Classroom integration guides
  - Student engagement strategies
  - Canvas LMS integration information

Command Palette search is implemented using `cmdk` for cross-content search across episodes, blog posts, and dossiers. Professional loading states are provided via skeleton components, and custom error pages (404, 500) enhance user experience.

### Backend
The backend is an Express.js server built with Node.js and TypeScript, providing RESTful API endpoints. It manages form submissions (newsletter, guest, volunteer, contact, Summiteer), CRUD operations for episodes and blog posts (including video/image uploads and workflow management), dossier management, object storage, social analytics tracking, and filming schedule management. All endpoints feature Zod schema validation and error handling.

**Authentication & Authorization:** Passport.js with bcrypt password hashing and PostgreSQL session storage. Role-based middleware functions:
- `ensureAuthenticated` - Requires any authenticated user
- `ensureCastMember` - Cast members and admins only
- `ensureParent` - Parents and admins only
- `ensureEducator` - Educators and admins only
- `ensureAdmin` - Administrators only

**API Routes by Role:**
- **/api/cast/*** - Cast member endpoints (profile, schedule, episodes, blog posts, analytics)
- **/api/parent/*** - Parent endpoints (child profile, child schedule, child episodes)
- **/api/admin/*** - Admin endpoints (all applications, content management, delete operations)
- **/api/search** - Global search across episodes, blog posts, and dossiers

All parent routes fetch data linked to the parent's child (cast member) via the `parents` table `castMemberId` foreign key.

### Data Storage
A PostgreSQL database, accessed via Neon serverless connection and managed with Drizzle ORM, handles data persistence. Key tables:
- **Applications:** 
  - `newsletter_signups` - Email newsletter subscriptions
  - `guest_applications` - Guest speaker applications
  - `volunteer_applications` - Program volunteer applications
  - `contact_submissions` - General contact form submissions
  - `summiteer_applications` - Comprehensive student applications with 10 student survey questions and 8 parent survey questions, including civic engagement assessments, debate experience, podcast vision, leadership examples, parental consent, time commitment, transportation plans, academic support, emergency contacts, and medical information
- **Users & Profiles:** `users` (with roles: cast_member, admin, parent, educator), `cast_members`, `parents`, `educators`
- **Content:** `blog_posts`, `episodes`, `dossiers`
- **Scheduling:** `filming_schedule`, `cast_member_schedule`
- **Relationships:** `cast_member_episodes` (many-to-many)
- **Analytics:** `social_analytics` (Academic Civic NILS tracking)

The `parents` table links to `cast_members` via `castMemberId` foreign key, enabling parents to view their child's information.

### Key Architectural Decisions
1.  **Hybrid Multi-Page Architecture:** Combines various page types for optimized SEO, performance, and analytics.
2.  **Permanent Data Persistence:** All form submissions and application data stored in PostgreSQL via Drizzle ORM.
3.  **Modular Component Design:** Isolated React components for maintainability.
4.  **Shared Validation Schemas:** Zod schemas shared between frontend and backend for data consistency.
5.  **Youth-Focused Design System:** Orange and blue color scheme with custom Tailwind configuration and 80s retro branding.
6.  **Comprehensive Animation System:** Framer Motion for scroll-triggered animations and interactive effects.
7.  **Role-Based Authentication:** Passport.js with bcrypt hashing and PostgreSQL session storage for granular access control.
8.  **Academic Civic NILS Tracker:** Integrated social media analytics for personal brand building.
9.  **Object Storage Integration:** Google Cloud Storage via Replit for large file uploads (up to 500MB) using an Uppy-based component.
10. **Episode Management System:** Full CRUD for episodes with video upload, draft/publish workflow, and public display.
11. **SEO, Accessibility, and UX Enhancements:** Dynamic sitemap.xml, robots.txt, RSS feeds (blog and podcast), skip-to-content link, ARIA labels, breadcrumb navigation, and print-friendly styles.
12. **Type-Safe Survey System:** Dual schema architecture with separate validation (API-facing boolean consent) and storage schemas (database-facing string consent) ensuring end-to-end type safety with proper transformations in route handlers. Comprehensive 18-field application capturing student motivation, civic engagement experience, debate skills, parental commitment, transportation logistics, and emergency information.

## External Dependencies

*   **UI Libraries:** React, Radix UI, Shadcn/ui, Tailwind CSS, Embla Carousel, Lucide React.
*   **Form & Validation:** React Hook Form, Zod, @hookform/resolvers, drizzle-zod.
*   **Data Management:** TanStack Query.
*   **Database & ORM:** PostgreSQL, Drizzle ORM, @neondatabase/serverless, drizzle-kit.
*   **Backend Framework:** Express.js, Node.js, Passport.js, connect-pg-simple.
*   **Build Tools:** Vite, esbuild, TypeScript, PostCSS.
*   **Fonts:** Google Fonts (Montserrat, Inter, Space Grotesh).
*   **Animation:** Framer Motion.
*   **File Upload:** Uppy (@uppy/core, @uppy/dashboard, @uppy/aws-s3).
*   **Object Storage:** @google-cloud/storage (via Replit integration).
*   **Search:** cmdk.