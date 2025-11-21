import { z } from "zod";
import { pgTable, serial, text, timestamp, varchar, boolean, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const newsletterSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const guestApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more details about why you'd like to be a guest"),
  fileUrl: z.string().optional(),
});

export const volunteerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interests: z.string().min(10, "Please tell us about your interests and skills"),
  availability: z.string().min(1, "Please let us know your availability"),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Please provide more details"),
});

export const summiteerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  school: z.string().min(1, "School name is required"),
  grade: z.string().min(1, "Grade level is required"),
  parentName: z.string().min(1, "Parent/Guardian name is required"),
  parentEmail: z.string().email("Please enter a valid parent/guardian email address"),
  parentPhone: z.string().min(1, "Parent/Guardian phone is required"),
  
  surveyWhyJoin: z.string().min(50, "Please provide a compelling reason (at least 50 characters)"),
  surveyStandingUp: z.string().min(100, "Please provide a detailed response (at least 100 characters)"),
  surveyIssuePassion: z.string().min(20, "Please specify the issue"),
  surveyPodcastVision: z.string().min(100, "Please describe your podcast concept (at least 100 characters)"),
  surveyCivicEngagement: z.string().min(30, "Please explain your understanding"),
  surveyDebateExperience: z.string().min(100, "Please describe your experience (at least 100 characters)"),
  surveyDreamInterview: z.string().min(30, "Please name the person and question"),
  surveyHandlingDisagreement: z.string().min(100, "Please explain your approach (at least 100 characters)"),
  surveyUniqueContribution: z.string().min(30, "Please describe what makes you unique"),
  surveyCommitmentPledge: z.string().min(100, "Please explain your availability and commitment (at least 100 characters)"),
  
  parentTimeCommitment: z.string().min(10, "Parent response required"),
  parentSupportAvailability: z.string().min(10, "Parent response required"),
  parentTransportation: z.string().min(10, "Parent response required"),
  parentAcademicSupport: z.string().min(10, "Parent response required"),
  parentCommunicationPreference: z.string().min(1, "Parent response required"),
  parentEmergencyContact: z.string().min(10, "Emergency contact information required"),
  parentMedicalInfo: z.string().optional(),
  parentConsent: z.boolean().refine((val) => val === true, "Parent consent is required"),
});

export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;
export type GuestApplication = z.infer<typeof guestApplicationSchema>;
export type VolunteerApplication = z.infer<typeof volunteerApplicationSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type SummiteerApplication = z.infer<typeof summiteerApplicationSchema>;

// Drizzle table definitions
export const newsletterSignups = pgTable("newsletter_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const guestApplications = pgTable("guest_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interests: text("interests").notNull(),
  availability: text("availability").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const summiteerApplications = pgTable("summiteer_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: text("age").notNull(),
  school: text("school").notNull(),
  grade: text("grade").notNull(),
  parentName: text("parent_name").notNull(),
  parentEmail: text("parent_email").notNull(),
  parentPhone: text("parent_phone").notNull(),
  
  surveyWhyJoin: text("survey_why_join").notNull(),
  surveyStandingUp: text("survey_standing_up").notNull(),
  surveyIssuePassion: text("survey_issue_passion").notNull(),
  surveyPodcastVision: text("survey_podcast_vision").notNull(),
  surveyCivicEngagement: text("survey_civic_engagement").notNull(),
  surveyDebateExperience: text("survey_debate_experience").notNull(),
  surveyDreamInterview: text("survey_dream_interview").notNull(),
  surveyHandlingDisagreement: text("survey_handling_disagreement").notNull(),
  surveyUniqueContribution: text("survey_unique_contribution").notNull(),
  surveyCommitmentPledge: text("survey_commitment_pledge").notNull(),
  
  parentTimeCommitment: text("parent_time_commitment").notNull(),
  parentSupportAvailability: text("parent_support_availability").notNull(),
  parentTransportation: text("parent_transportation").notNull(),
  parentAcademicSupport: text("parent_academic_support").notNull(),
  parentCommunicationPreference: text("parent_communication_preference").notNull(),
  parentEmergencyContact: text("parent_emergency_contact").notNull(),
  parentMedicalInfo: text("parent_medical_info"),
  parentConsent: text("parent_consent").notNull(),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas with validation rules
export const insertNewsletterSignupSchema = createInsertSchema(newsletterSignups)
  .omit({ id: true, createdAt: true })
  .extend({
    email: z.string().email("Please enter a valid email address"),
  });

export const insertGuestApplicationSchema = createInsertSchema(guestApplications)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Please provide more details about why you'd like to be a guest"),
  });

export const insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    interests: z.string().min(10, "Please tell us about your interests and skills"),
    availability: z.string().min(1, "Please let us know your availability"),
  });

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Please provide more details"),
  });

// Base Drizzle insert schema for storage layer (parentConsent as string matching database)
const baseSummiteerInsertSchema = createInsertSchema(summiteerApplications)
  .omit({ id: true, createdAt: true });

// API validation schema (parentConsent as boolean for frontend)
export const insertSummiteerApplicationSchema = baseSummiteerInsertSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  school: z.string().min(1, "School name is required"),
  grade: z.string().min(1, "Grade level is required"),
  parentName: z.string().min(1, "Parent/Guardian name is required"),
  parentEmail: z.string().email("Please enter a valid parent/guardian email address"),
  parentPhone: z.string().min(1, "Parent/Guardian phone is required"),
  
  surveyWhyJoin: z.string().min(50, "Please provide a compelling reason (at least 50 characters)"),
  surveyStandingUp: z.string().min(100, "Please provide a detailed response (at least 100 characters)"),
  surveyIssuePassion: z.string().min(20, "Please specify the issue"),
  surveyPodcastVision: z.string().min(100, "Please describe your podcast concept (at least 100 characters)"),
  surveyCivicEngagement: z.string().min(30, "Please explain your understanding"),
  surveyDebateExperience: z.string().min(100, "Please describe your experience (at least 100 characters)"),
  surveyDreamInterview: z.string().min(30, "Please name the person and question"),
  surveyHandlingDisagreement: z.string().min(100, "Please explain your approach (at least 100 characters)"),
  surveyUniqueContribution: z.string().min(30, "Please describe what makes you unique"),
  surveyCommitmentPledge: z.string().min(100, "Please explain your availability and commitment (at least 100 characters)"),
  
  parentTimeCommitment: z.string().min(10, "Parent response required"),
  parentSupportAvailability: z.string().min(10, "Parent response required"),
  parentTransportation: z.string().min(10, "Parent response required"),
  parentAcademicSupport: z.string().min(10, "Parent response required"),
  parentCommunicationPreference: z.string().min(1, "Parent response required"),
  parentEmergencyContact: z.string().min(10, "Emergency contact information required"),
  parentMedicalInfo: z.string().optional(),
  parentConsent: z.boolean().refine((val) => val === true, "Parent consent is required"),
});

// Storage insert type (inferred from base Drizzle schema with string parentConsent)
export type SummiteerApplicationInsertDB = z.infer<typeof baseSummiteerInsertSchema>;

// Select types
export type NewsletterEntry = typeof newsletterSignups.$inferSelect;
export type GuestApplicationEntry = typeof guestApplications.$inferSelect;
export type VolunteerApplicationEntry = typeof volunteerApplications.$inferSelect;
export type ContactFormEntry = typeof contactSubmissions.$inferSelect;
export type SummiteerApplicationEntry = typeof summiteerApplications.$inferSelect;

// ============= CAST MEMBER PORTAL SYSTEM =============

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("cast_member"), // cast_member, admin, parent, educator
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Password Reset Tokens
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  used: boolean("used").notNull().default(false),
}, (table) => ({
  tokenIdx: index("password_reset_token_idx").on(table.token),
  userIdIdx: index("password_reset_user_id_idx").on(table.userId),
}));

// Cast Member profiles
export const castMembers = pgTable("cast_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  age: text("age"),
  school: text("school"),
  grade: text("grade"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  socialInstagram: text("social_instagram"),
  socialTwitter: text("social_twitter"),
  socialTiktok: text("social_tiktok"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index("cast_members_user_id_idx").on(table.userId),
}));

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull().references(() => castMembers.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImageUrl: text("cover_image_url"),
  category: text("category"), // Cast Reflections, Behind the Scenes, Episode Companion, Personal Growth, Community Spotlight
  tags: text("tags").array(),
  status: text("status").notNull().default("draft"), // draft, submitted, approved, published, rejected
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  statusIdx: index("blog_posts_status_idx").on(table.status),
  authorIdIdx: index("blog_posts_author_id_idx").on(table.authorId),
}));

// Filming schedule
export const filmingSchedule = pgTable("filming_schedule", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  callTime: text("call_time"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Cast member schedule assignments
export const castMemberSchedule = pgTable("cast_member_schedule", {
  id: serial("id").primaryKey(),
  castMemberId: integer("cast_member_id").notNull().references(() => castMembers.id),
  scheduleId: integer("schedule_id").notNull().references(() => filmingSchedule.id),
  confirmed: boolean("confirmed").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Episodes
export const episodes = pgTable("episodes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  episodeNumber: integer("episode_number").notNull(),
  season: integer("season").notNull().default(1),
  topic: text("topic"), // Main debate topic
  tags: text("tags").array(), // Keywords for filtering
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  captionsUrl: text("captions_url"), // VTT file for video captions
  transcriptUrl: text("transcript_url"), // Full text transcript for accessibility
  audioDescriptionUrl: text("audio_description_url"), // Audio description track for visually impaired users
  duration: text("duration"), // e.g., "45:30"
  views: integer("views").notNull().default(0),
  airDate: timestamp("air_date"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  publishedIdx: index("episodes_published_idx").on(table.published),
  episodeNumberIdx: index("episodes_episode_number_idx").on(table.episodeNumber),
}));

// Cast member episode appearances
export const castMemberEpisodes = pgTable("cast_member_episodes", {
  id: serial("id").primaryKey(),
  castMemberId: integer("cast_member_id").notNull().references(() => castMembers.id),
  episodeId: integer("episode_id").notNull().references(() => episodes.id),
  role: text("role"), // debater, host, discussant, guest
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Dossiers (research materials for debates)
export const dossiers = pgTable("dossiers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  topic: text("topic").notNull(), // Debate topic
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"), // Size in bytes
  fileType: text("file_type"), // MIME type (e.g., application/pdf)
  uploadedBy: integer("uploaded_by").notNull().references(() => castMembers.id),
  published: boolean("published").notNull().default(false),
  downloads: integer("downloads").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Parent profiles (linked to cast members)
export const parents = pgTable("parents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  castMemberId: integer("cast_member_id").references(() => castMembers.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Educator profiles
export const educators = pgTable("educators", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  school: text("school"),
  subject: text("subject"),
  grade: text("grade"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Social media analytics for Academic Civic NILS tracking
export const socialAnalytics = pgTable("social_analytics", {
  id: serial("id").primaryKey(),
  castMemberId: integer("cast_member_id").notNull().references(() => castMembers.id),
  platform: text("platform").notNull(), // instagram, tiktok, youtube, twitter, linkedin
  followers: integer("followers").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  shares: integer("shares").notNull().default(0),
  engagementRate: integer("engagement_rate"), // Stored as basis points (e.g., 350 = 3.50%)
  recordedAt: timestamp("recorded_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  castMember: one(castMembers, {
    fields: [users.id],
    references: [castMembers.userId],
  }),
  parent: one(parents, {
    fields: [users.id],
    references: [parents.userId],
  }),
  educator: one(educators, {
    fields: [users.id],
    references: [educators.userId],
  }),
}));

export const castMembersRelations = relations(castMembers, ({ one, many }) => ({
  user: one(users, {
    fields: [castMembers.userId],
    references: [users.id],
  }),
  blogPosts: many(blogPosts),
  scheduleAssignments: many(castMemberSchedule),
  episodeAppearances: many(castMemberEpisodes),
  socialAnalytics: many(socialAnalytics),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(castMembers, {
    fields: [blogPosts.authorId],
    references: [castMembers.id],
  }),
}));

export const filmingScheduleRelations = relations(filmingSchedule, ({ many }) => ({
  assignments: many(castMemberSchedule),
}));

export const episodesRelations = relations(episodes, ({ many }) => ({
  castAppearances: many(castMemberEpisodes),
}));

export const dossiersRelations = relations(dossiers, ({ one }) => ({
  uploader: one(castMembers, {
    fields: [dossiers.uploadedBy],
    references: [castMembers.id],
  }),
}));

export const parentsRelations = relations(parents, ({ one }) => ({
  user: one(users, {
    fields: [parents.userId],
    references: [users.id],
  }),
  castMember: one(castMembers, {
    fields: [parents.castMemberId],
    references: [castMembers.id],
  }),
}));

export const educatorsRelations = relations(educators, ({ one }) => ({
  user: one(users, {
    fields: [educators.userId],
    references: [users.id],
  }),
}));

export const socialAnalyticsRelations = relations(socialAnalytics, ({ one }) => ({
  castMember: one(castMembers, {
    fields: [socialAnalytics.castMemberId],
    references: [castMembers.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true })
  .extend({
    email: z.string().email("Please enter a valid email address"),
    passwordHash: z.string().min(1),
  });

export const insertCastMemberSchema = createInsertSchema(castMembers)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
  });

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(50, "Content must be at least 50 characters"),
    slug: z.string().optional(),
    status: z.string().optional(),
    publishedAt: z.date().nullable().optional(),
  });

export const insertEpisodeSchema = createInsertSchema(episodes)
  .omit({ id: true, createdAt: true })
  .extend({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    episodeNumber: z.number().min(1),
  });

export const insertParentSchema = createInsertSchema(parents)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
  });

export const insertEducatorSchema = createInsertSchema(educators)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
  });

export const insertFilmingScheduleSchema = createInsertSchema(filmingSchedule)
  .omit({ id: true, createdAt: true })
  .extend({
    title: z.string().min(1, "Title is required"),
    location: z.string().min(1, "Location is required"),
  });

export const insertSocialAnalyticsSchema = createInsertSchema(socialAnalytics)
  .omit({ id: true, createdAt: true })
  .extend({
    castMemberId: z.number().int().min(1),
    platform: z.enum(["instagram", "tiktok", "youtube", "twitter", "linkedin"], {
      errorMap: () => ({ message: "Platform must be one of: instagram, tiktok, youtube, twitter, linkedin" })
    }),
    followers: z.number().int().min(0),
    likes: z.number().int().min(0),
    comments: z.number().int().min(0),
    shares: z.number().int().min(0),
    engagementRate: z.number().int().min(0).nullable().optional(),
    recordedAt: z.date().optional(),
  });

export const insertDossierSchema = createInsertSchema(dossiers)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    topic: z.string().min(1, "Topic is required"),
    fileUrl: z.string().min(1, "File URL is required"),
  });

// Select types
export type User = typeof users.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type CastMember = typeof castMembers.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type FilmingSchedule = typeof filmingSchedule.$inferSelect;
export type Episode = typeof episodes.$inferSelect;
export type Parent = typeof parents.$inferSelect;
export type Educator = typeof educators.$inferSelect;
export type CastMemberEpisode = typeof castMemberEpisodes.$inferSelect;
export type SocialAnalytics = typeof socialAnalytics.$inferSelect;
export type Dossier = typeof dossiers.$inferSelect;
