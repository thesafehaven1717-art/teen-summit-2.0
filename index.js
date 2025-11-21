var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  blogPostsRelations: () => blogPostsRelations,
  castMemberEpisodes: () => castMemberEpisodes,
  castMemberSchedule: () => castMemberSchedule,
  castMembers: () => castMembers,
  castMembersRelations: () => castMembersRelations,
  contactFormSchema: () => contactFormSchema,
  contactSubmissions: () => contactSubmissions,
  dossiers: () => dossiers,
  dossiersRelations: () => dossiersRelations,
  educators: () => educators,
  educatorsRelations: () => educatorsRelations,
  episodes: () => episodes,
  episodesRelations: () => episodesRelations,
  filmingSchedule: () => filmingSchedule,
  filmingScheduleRelations: () => filmingScheduleRelations,
  guestApplicationSchema: () => guestApplicationSchema,
  guestApplications: () => guestApplications,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertCastMemberSchema: () => insertCastMemberSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertDossierSchema: () => insertDossierSchema,
  insertEducatorSchema: () => insertEducatorSchema,
  insertEpisodeSchema: () => insertEpisodeSchema,
  insertFilmingScheduleSchema: () => insertFilmingScheduleSchema,
  insertGuestApplicationSchema: () => insertGuestApplicationSchema,
  insertNewsletterSignupSchema: () => insertNewsletterSignupSchema,
  insertParentSchema: () => insertParentSchema,
  insertSocialAnalyticsSchema: () => insertSocialAnalyticsSchema,
  insertSummiteerApplicationSchema: () => insertSummiteerApplicationSchema,
  insertUserSchema: () => insertUserSchema,
  insertVolunteerApplicationSchema: () => insertVolunteerApplicationSchema,
  newsletterSignupSchema: () => newsletterSignupSchema,
  newsletterSignups: () => newsletterSignups,
  parents: () => parents,
  parentsRelations: () => parentsRelations,
  socialAnalytics: () => socialAnalytics,
  socialAnalyticsRelations: () => socialAnalyticsRelations,
  summiteerApplicationSchema: () => summiteerApplicationSchema,
  summiteerApplications: () => summiteerApplications,
  users: () => users,
  usersRelations: () => usersRelations,
  volunteerApplicationSchema: () => volunteerApplicationSchema,
  volunteerApplications: () => volunteerApplications
});
import { z } from "zod";
import { pgTable, serial, text, timestamp, boolean, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var newsletterSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});
var guestApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more details about why you'd like to be a guest"),
  fileUrl: z.string().optional()
});
var volunteerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interests: z.string().min(10, "Please tell us about your interests and skills"),
  availability: z.string().min(1, "Please let us know your availability")
});
var contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Please provide more details")
});
var summiteerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  school: z.string().min(1, "School name is required"),
  grade: z.string().min(1, "Grade level is required"),
  parentName: z.string().min(1, "Parent/Guardian name is required"),
  parentEmail: z.string().email("Please enter a valid parent/guardian email address"),
  parentPhone: z.string().min(1, "Parent/Guardian phone is required"),
  whyJoin: z.string().min(20, "Please tell us more about why you want to join (at least 20 characters)")
});
var newsletterSignups = pgTable("newsletter_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var guestApplications = pgTable("guest_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interests: text("interests").notNull(),
  availability: text("availability").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var summiteerApplications = pgTable("summiteer_applications", {
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
  whyJoin: text("why_join").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertNewsletterSignupSchema = createInsertSchema(newsletterSignups).omit({ id: true, createdAt: true }).extend({
  email: z.string().email("Please enter a valid email address")
});
var insertGuestApplicationSchema = createInsertSchema(guestApplications).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please provide more details about why you'd like to be a guest")
});
var insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  interests: z.string().min(10, "Please tell us about your interests and skills"),
  availability: z.string().min(1, "Please let us know your availability")
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Please provide more details")
});
var insertSummiteerApplicationSchema = createInsertSchema(summiteerApplications).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  school: z.string().min(1, "School name is required"),
  grade: z.string().min(1, "Grade level is required"),
  parentName: z.string().min(1, "Parent/Guardian name is required"),
  parentEmail: z.string().email("Please enter a valid parent/guardian email address"),
  parentPhone: z.string().min(1, "Parent/Guardian phone is required"),
  whyJoin: z.string().min(20, "Please tell us more about why you want to join (at least 20 characters)")
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("cast_member"),
  // cast_member, admin, parent, educator
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var castMembers = pgTable("cast_members", {
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
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (table) => ({
  userIdIdx: index("cast_members_user_id_idx").on(table.userId)
}));
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull().references(() => castMembers.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImageUrl: text("cover_image_url"),
  category: text("category"),
  // Cast Reflections, Behind the Scenes, Episode Companion, Personal Growth, Community Spotlight
  tags: text("tags").array(),
  status: text("status").notNull().default("draft"),
  // draft, submitted, approved, published, rejected
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
}, (table) => ({
  statusIdx: index("blog_posts_status_idx").on(table.status),
  authorIdIdx: index("blog_posts_author_id_idx").on(table.authorId)
}));
var filmingSchedule = pgTable("filming_schedule", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  callTime: text("call_time"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var castMemberSchedule = pgTable("cast_member_schedule", {
  id: serial("id").primaryKey(),
  castMemberId: integer("cast_member_id").notNull().references(() => castMembers.id),
  scheduleId: integer("schedule_id").notNull().references(() => filmingSchedule.id),
  confirmed: boolean("confirmed").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var episodes = pgTable("episodes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  episodeNumber: integer("episode_number").notNull(),
  season: integer("season").notNull().default(1),
  topic: text("topic"),
  // Main debate topic
  tags: text("tags").array(),
  // Keywords for filtering
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  captionsUrl: text("captions_url"),
  // VTT file for video captions
  transcriptUrl: text("transcript_url"),
  // Full text transcript for accessibility
  audioDescriptionUrl: text("audio_description_url"),
  // Audio description track for visually impaired users
  duration: text("duration"),
  // e.g., "45:30"
  views: integer("views").notNull().default(0),
  airDate: timestamp("air_date"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (table) => ({
  publishedIdx: index("episodes_published_idx").on(table.published),
  episodeNumberIdx: index("episodes_episode_number_idx").on(table.episodeNumber)
}));
var castMemberEpisodes = pgTable("cast_member_episodes", {
  id: serial("id").primaryKey(),
  castMemberId: integer("cast_member_id").notNull().references(() => castMembers.id),
  episodeId: integer("episode_id").notNull().references(() => episodes.id),
  role: text("role"),
  // debater, host, discussant, guest
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var dossiers = pgTable("dossiers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  topic: text("topic").notNull(),
  // Debate topic
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  // Size in bytes
  fileType: text("file_type"),
  // MIME type (e.g., application/pdf)
  uploadedBy: integer("uploaded_by").notNull().references(() => castMembers.id),
  published: boolean("published").notNull().default(false),
  downloads: integer("downloads").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var parents = pgTable("parents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  castMemberId: integer("cast_member_id").references(() => castMembers.id),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var educators = pgTable("educators", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  school: text("school"),
  subject: text("subject"),
  grade: text("grade"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var socialAnalytics = pgTable("social_analytics", {
  id: serial("id").primaryKey(),
  castMemberId: integer("cast_member_id").notNull().references(() => castMembers.id),
  platform: text("platform").notNull(),
  // instagram, tiktok, youtube, twitter, linkedin
  followers: integer("followers").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  shares: integer("shares").notNull().default(0),
  engagementRate: integer("engagement_rate"),
  // Stored as basis points (e.g., 350 = 3.50%)
  recordedAt: timestamp("recorded_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var usersRelations = relations(users, ({ one }) => ({
  castMember: one(castMembers, {
    fields: [users.id],
    references: [castMembers.userId]
  }),
  parent: one(parents, {
    fields: [users.id],
    references: [parents.userId]
  }),
  educator: one(educators, {
    fields: [users.id],
    references: [educators.userId]
  })
}));
var castMembersRelations = relations(castMembers, ({ one, many }) => ({
  user: one(users, {
    fields: [castMembers.userId],
    references: [users.id]
  }),
  blogPosts: many(blogPosts),
  scheduleAssignments: many(castMemberSchedule),
  episodeAppearances: many(castMemberEpisodes),
  socialAnalytics: many(socialAnalytics)
}));
var blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(castMembers, {
    fields: [blogPosts.authorId],
    references: [castMembers.id]
  })
}));
var filmingScheduleRelations = relations(filmingSchedule, ({ many }) => ({
  assignments: many(castMemberSchedule)
}));
var episodesRelations = relations(episodes, ({ many }) => ({
  castAppearances: many(castMemberEpisodes)
}));
var dossiersRelations = relations(dossiers, ({ one }) => ({
  uploader: one(castMembers, {
    fields: [dossiers.uploadedBy],
    references: [castMembers.id]
  })
}));
var parentsRelations = relations(parents, ({ one }) => ({
  user: one(users, {
    fields: [parents.userId],
    references: [users.id]
  }),
  castMember: one(castMembers, {
    fields: [parents.castMemberId],
    references: [castMembers.id]
  })
}));
var educatorsRelations = relations(educators, ({ one }) => ({
  user: one(users, {
    fields: [educators.userId],
    references: [users.id]
  })
}));
var socialAnalyticsRelations = relations(socialAnalytics, ({ one }) => ({
  castMember: one(castMembers, {
    fields: [socialAnalytics.castMemberId],
    references: [castMembers.id]
  })
}));
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true }).extend({
  email: z.string().email("Please enter a valid email address"),
  passwordHash: z.string().min(1)
});
var insertCastMemberSchema = createInsertSchema(castMembers).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address")
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true }).extend({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  slug: z.string().optional(),
  status: z.string().optional(),
  publishedAt: z.date().nullable().optional()
});
var insertEpisodeSchema = createInsertSchema(episodes).omit({ id: true, createdAt: true }).extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  episodeNumber: z.number().min(1)
});
var insertParentSchema = createInsertSchema(parents).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address")
});
var insertEducatorSchema = createInsertSchema(educators).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address")
});
var insertFilmingScheduleSchema = createInsertSchema(filmingSchedule).omit({ id: true, createdAt: true }).extend({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required")
});
var insertSocialAnalyticsSchema = createInsertSchema(socialAnalytics).omit({ id: true, createdAt: true }).extend({
  castMemberId: z.number().int().min(1),
  platform: z.enum(["instagram", "tiktok", "youtube", "twitter", "linkedin"], {
    errorMap: () => ({ message: "Platform must be one of: instagram, tiktok, youtube, twitter, linkedin" })
  }),
  followers: z.number().int().min(0),
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  shares: z.number().int().min(0),
  engagementRate: z.number().int().min(0).nullable().optional(),
  recordedAt: z.date().optional()
});
var insertDossierSchema = createInsertSchema(dossiers).omit({ id: true, createdAt: true, updatedAt: true }).extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  topic: z.string().min(1, "Topic is required"),
  fileUrl: z.string().min(1, "File URL is required")
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc } from "drizzle-orm";
var DatabaseStorage = class {
  async createNewsletterSignup(signup) {
    const [entry] = await db.insert(newsletterSignups).values(signup).returning();
    return entry;
  }
  async getAllNewsletterSignups() {
    return await db.select().from(newsletterSignups);
  }
  async createGuestApplication(application) {
    const [entry] = await db.insert(guestApplications).values(application).returning();
    return entry;
  }
  async getAllGuestApplications() {
    return await db.select().from(guestApplications);
  }
  async createVolunteerApplication(application) {
    const [entry] = await db.insert(volunteerApplications).values(application).returning();
    return entry;
  }
  async getAllVolunteerApplications() {
    return await db.select().from(volunteerApplications);
  }
  async createContactSubmission(contact) {
    const [entry] = await db.insert(contactSubmissions).values(contact).returning();
    return entry;
  }
  async getAllContactSubmissions() {
    return await db.select().from(contactSubmissions);
  }
  async createSummiteerApplication(application) {
    const [entry] = await db.insert(summiteerApplications).values(application).returning();
    return entry;
  }
  async getAllSummiteerApplications() {
    return await db.select().from(summiteerApplications);
  }
  async deleteNewsletterSignup(id) {
    await db.delete(newsletterSignups).where(eq(newsletterSignups.id, id));
  }
  async deleteGuestApplication(id) {
    await db.delete(guestApplications).where(eq(guestApplications.id, id));
  }
  async deleteVolunteerApplication(id) {
    await db.delete(volunteerApplications).where(eq(volunteerApplications.id, id));
  }
  async deleteContactSubmission(id) {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }
  async deleteSummiteerApplication(id) {
    await db.delete(summiteerApplications).where(eq(summiteerApplications.id, id));
  }
  // Users
  async createUser(user) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async getUserById(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  // Cast Members
  async createCastMember(castMember) {
    const [newMember] = await db.insert(castMembers).values(castMember).returning();
    return newMember;
  }
  async getCastMemberById(id) {
    const [member] = await db.select().from(castMembers).where(eq(castMembers.id, id));
    return member;
  }
  async getCastMemberByUserId(userId) {
    const [member] = await db.select().from(castMembers).where(eq(castMembers.userId, userId));
    return member;
  }
  async getAllCastMembers() {
    return await db.select().from(castMembers).where(eq(castMembers.active, true));
  }
  async updateCastMember(id, data) {
    const [updated] = await db.update(castMembers).set(data).where(eq(castMembers.id, id)).returning();
    return updated;
  }
  // Blog Posts
  async createBlogPost(post) {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  async getBlogPostById(id) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }
  async getBlogPostsByAuthor(authorId) {
    return await db.select().from(blogPosts).where(eq(blogPosts.authorId, authorId)).orderBy(desc(blogPosts.createdAt));
  }
  async getAllPublishedBlogPosts() {
    return await db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.publishedAt));
  }
  async updateBlogPost(id, data) {
    const [updated] = await db.update(blogPosts).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(blogPosts.id, id)).returning();
    return updated;
  }
  async deleteBlogPost(id) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
  // Filming Schedule
  async createFilmingSchedule(schedule) {
    const [newSchedule] = await db.insert(filmingSchedule).values(schedule).returning();
    return newSchedule;
  }
  async getFilmingScheduleById(id) {
    const [schedule] = await db.select().from(filmingSchedule).where(eq(filmingSchedule.id, id));
    return schedule;
  }
  async getAllFilmingSchedules() {
    return await db.select().from(filmingSchedule).orderBy(filmingSchedule.date);
  }
  async getCastMemberSchedule(castMemberId) {
    const schedules = await db.select({
      id: filmingSchedule.id,
      title: filmingSchedule.title,
      description: filmingSchedule.description,
      date: filmingSchedule.date,
      startTime: filmingSchedule.startTime,
      endTime: filmingSchedule.endTime,
      location: filmingSchedule.location,
      callTime: filmingSchedule.callTime,
      notes: filmingSchedule.notes,
      createdAt: filmingSchedule.createdAt
    }).from(castMemberSchedule).innerJoin(filmingSchedule, eq(castMemberSchedule.scheduleId, filmingSchedule.id)).where(eq(castMemberSchedule.castMemberId, castMemberId)).orderBy(filmingSchedule.date);
    return schedules;
  }
  // Episodes
  async createEpisode(episode) {
    const [newEpisode] = await db.insert(episodes).values(episode).returning();
    return newEpisode;
  }
  async getEpisodeById(id) {
    const [episode] = await db.select().from(episodes).where(eq(episodes.id, id));
    return episode;
  }
  async getAllPublishedEpisodes() {
    return await db.select().from(episodes).where(eq(episodes.published, true)).orderBy(desc(episodes.season), desc(episodes.episodeNumber));
  }
  async getAllEpisodes() {
    return await db.select().from(episodes).orderBy(desc(episodes.season), desc(episodes.episodeNumber));
  }
  async getCastMemberEpisodes(castMemberId) {
    const memberEpisodes = await db.select({
      id: episodes.id,
      title: episodes.title,
      slug: episodes.slug,
      description: episodes.description,
      episodeNumber: episodes.episodeNumber,
      season: episodes.season,
      topic: episodes.topic,
      tags: episodes.tags,
      videoUrl: episodes.videoUrl,
      thumbnailUrl: episodes.thumbnailUrl,
      duration: episodes.duration,
      views: episodes.views,
      airDate: episodes.airDate,
      published: episodes.published,
      createdAt: episodes.createdAt
    }).from(castMemberEpisodes).innerJoin(episodes, eq(castMemberEpisodes.episodeId, episodes.id)).where(and(
      eq(castMemberEpisodes.castMemberId, castMemberId),
      eq(episodes.published, true)
    )).orderBy(desc(episodes.airDate));
    return memberEpisodes;
  }
  async getEpisodeBySlug(slug) {
    const [episode] = await db.select().from(episodes).where(eq(episodes.slug, slug));
    return episode;
  }
  async updateEpisode(id, data) {
    const [updated] = await db.update(episodes).set(data).where(eq(episodes.id, id)).returning();
    return updated;
  }
  async incrementEpisodeViews(id) {
    const [episode] = await db.select().from(episodes).where(eq(episodes.id, id));
    if (!episode || !episode.published) {
      throw new Error("Episode not found or not published");
    }
    await db.update(episodes).set({ views: episode.views + 1 }).where(eq(episodes.id, id));
  }
  async deleteEpisode(id) {
    await db.delete(episodes).where(eq(episodes.id, id));
  }
  async createSocialAnalytics(analytics) {
    const [entry] = await db.insert(socialAnalytics).values(analytics).returning();
    return entry;
  }
  async getCastMemberAnalytics(castMemberId) {
    return await db.select().from(socialAnalytics).where(eq(socialAnalytics.castMemberId, castMemberId)).orderBy(desc(socialAnalytics.recordedAt));
  }
  async getLatestAnalyticsByCastMember(castMemberId) {
    const allAnalytics = await db.select().from(socialAnalytics).where(eq(socialAnalytics.castMemberId, castMemberId)).orderBy(desc(socialAnalytics.recordedAt));
    const latestByPlatform = /* @__PURE__ */ new Map();
    for (const analytics of allAnalytics) {
      if (!latestByPlatform.has(analytics.platform)) {
        latestByPlatform.set(analytics.platform, analytics);
      }
    }
    const platforms = ["instagram", "tiktok", "youtube", "twitter", "linkedin"];
    return platforms.map((platform) => {
      const existing = latestByPlatform.get(platform);
      if (existing) {
        return existing;
      }
      return {
        id: 0,
        castMemberId,
        platform,
        followers: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        engagementRate: null,
        recordedAt: /* @__PURE__ */ new Date(),
        createdAt: /* @__PURE__ */ new Date()
      };
    });
  }
  async createDossier(dossier) {
    const [entry] = await db.insert(dossiers).values(dossier).returning();
    return entry;
  }
  async getDossierById(id) {
    const [dossier] = await db.select().from(dossiers).where(eq(dossiers.id, id));
    return dossier;
  }
  async getDossierBySlug(slug) {
    const [dossier] = await db.select().from(dossiers).where(eq(dossiers.slug, slug));
    return dossier;
  }
  async getAllPublishedDossiers() {
    return await db.select().from(dossiers).where(eq(dossiers.published, true)).orderBy(desc(dossiers.createdAt));
  }
  async getAllDossiers() {
    return await db.select().from(dossiers).orderBy(desc(dossiers.createdAt));
  }
  async updateDossier(id, data) {
    const [updated] = await db.update(dossiers).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(dossiers.id, id)).returning();
    return updated;
  }
  async incrementDossierDownloads(id) {
    const [dossier] = await db.select().from(dossiers).where(eq(dossiers.id, id));
    if (!dossier) {
      throw new Error("Dossier not found");
    }
    await db.update(dossiers).set({ downloads: dossier.downloads + 1 }).where(eq(dossiers.id, id));
  }
  async deleteDossier(id) {
    await db.delete(dossiers).where(eq(dossiers.id, id));
  }
  // Parents
  async createParent(parent) {
    const [newParent] = await db.insert(parents).values(parent).returning();
    return newParent;
  }
  async getParentById(id) {
    const [parent] = await db.select().from(parents).where(eq(parents.id, id));
    return parent;
  }
  async getParentByUserId(userId) {
    const [parent] = await db.select().from(parents).where(eq(parents.userId, userId));
    return parent;
  }
  async updateParent(id, data) {
    const [updated] = await db.update(parents).set(data).where(eq(parents.id, id)).returning();
    return updated;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email.toLowerCase());
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await storage.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
}
function ensureCastMember(req, res, next) {
  if (req.isAuthenticated() && (req.user.role === "cast_member" || req.user.role === "admin")) {
    return next();
  }
  res.status(403).json({ error: "Access denied. Cast members only." });
}
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ error: "Access denied. Administrators only." });
}
function ensureParent(req, res, next) {
  if (req.isAuthenticated() && (req.user.role === "parent" || req.user.role === "admin")) {
    return next();
  }
  res.status(403).json({ error: "Access denied. Parents only." });
}
var auth_default = passport;

// server/routes.ts
import { createServer } from "http";
import bcrypt2 from "bcryptjs";

// server/objectStorage.ts
import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";

// server/objectAcl.ts
var ACL_POLICY_METADATA_KEY = "custom:aclPolicy";
function isPermissionAllowed(requested, granted) {
  if (requested === "read" /* READ */) {
    return ["read" /* READ */, "write" /* WRITE */].includes(granted);
  }
  return granted === "write" /* WRITE */;
}
function createObjectAccessGroup(group) {
  switch (group.type) {
    default:
      throw new Error(`Unknown access group type: ${group.type}`);
  }
}
async function setObjectAclPolicy(objectFile, aclPolicy) {
  const [exists] = await objectFile.exists();
  if (!exists) {
    throw new Error(`Object not found: ${objectFile.name}`);
  }
  await objectFile.setMetadata({
    metadata: {
      [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy)
    }
  });
}
async function getObjectAclPolicy(objectFile) {
  const [metadata] = await objectFile.getMetadata();
  const aclPolicy = metadata?.metadata?.[ACL_POLICY_METADATA_KEY];
  if (!aclPolicy) {
    return null;
  }
  return JSON.parse(aclPolicy);
}
async function canAccessObject({
  userId,
  objectFile,
  requestedPermission
}) {
  const aclPolicy = await getObjectAclPolicy(objectFile);
  if (!aclPolicy) {
    return false;
  }
  if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
    return true;
  }
  if (!userId) {
    return false;
  }
  if (aclPolicy.owner === userId) {
    return true;
  }
  for (const rule of aclPolicy.aclRules || []) {
    const accessGroup = createObjectAccessGroup(rule.group);
    if (await accessGroup.hasMember(userId) && isPermissionAllowed(requestedPermission, rule.permission)) {
      return true;
    }
  }
  return false;
}

// server/objectStorage.ts
var REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
var objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token"
      }
    },
    universe_domain: "googleapis.com"
  },
  projectId: ""
});
var ObjectNotFoundError = class _ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
  }
};
var ObjectStorageService = class {
  constructor() {
  }
  getPublicObjectSearchPaths() {
    const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
    const paths = Array.from(
      new Set(
        pathsStr.split(",").map((path3) => path3.trim()).filter((path3) => path3.length > 0)
      )
    );
    if (paths.length === 0) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' tool and set PUBLIC_OBJECT_SEARCH_PATHS env var."
      );
    }
    return paths;
  }
  getPrivateObjectDir() {
    const dir = process.env.PRIVATE_OBJECT_DIR || "";
    if (!dir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
      );
    }
    return dir;
  }
  async searchPublicObject(filePath) {
    for (const searchPath of this.getPublicObjectSearchPaths()) {
      const fullPath = `${searchPath}/${filePath}`;
      const { bucketName, objectName } = parseObjectPath(fullPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);
      const [exists] = await file.exists();
      if (exists) {
        return file;
      }
    }
    return null;
  }
  async downloadObject(file, res, cacheTtlSec = 3600) {
    try {
      const [metadata] = await file.getMetadata();
      const aclPolicy = await getObjectAclPolicy(file);
      const isPublic = aclPolicy?.visibility === "public";
      res.set({
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Content-Length": metadata.size,
        "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`
      });
      const stream = file.createReadStream();
      stream.on("error", (err) => {
        console.error("Stream error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error streaming file" });
        }
      });
      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error downloading file" });
      }
    }
  }
  async getObjectEntityUploadURL() {
    const privateObjectDir = this.getPrivateObjectDir();
    if (!privateObjectDir) {
      throw new Error("PRIVATE_OBJECT_DIR not set.");
    }
    const objectId = randomUUID();
    const fullPath = `${privateObjectDir}/uploads/${objectId}`;
    const { bucketName, objectName } = parseObjectPath(fullPath);
    return signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900
    });
  }
  async getObjectEntityFile(objectPath) {
    if (!objectPath.startsWith("/objects/")) {
      throw new ObjectNotFoundError();
    }
    const parts = objectPath.slice(1).split("/");
    if (parts.length < 2) {
      throw new ObjectNotFoundError();
    }
    const entityId = parts.slice(1).join("/");
    let entityDir = this.getPrivateObjectDir();
    if (!entityDir.endsWith("/")) {
      entityDir = `${entityDir}/`;
    }
    const objectEntityPath = `${entityDir}${entityId}`;
    const { bucketName, objectName } = parseObjectPath(objectEntityPath);
    const bucket = objectStorageClient.bucket(bucketName);
    const objectFile = bucket.file(objectName);
    const [exists] = await objectFile.exists();
    if (!exists) {
      throw new ObjectNotFoundError();
    }
    return objectFile;
  }
  normalizeObjectEntityPath(rawPath) {
    if (!rawPath.startsWith("https://storage.googleapis.com/")) {
      return rawPath;
    }
    const url = new URL(rawPath);
    const rawObjectPath = url.pathname;
    let objectEntityDir = this.getPrivateObjectDir();
    if (!objectEntityDir.endsWith("/")) {
      objectEntityDir = `${objectEntityDir}/`;
    }
    if (!rawObjectPath.startsWith(objectEntityDir)) {
      return rawObjectPath;
    }
    const entityId = rawObjectPath.slice(objectEntityDir.length);
    return `/objects/${entityId}`;
  }
  async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
    const normalizedPath = this.normalizeObjectEntityPath(rawPath);
    if (!normalizedPath.startsWith("/")) {
      return normalizedPath;
    }
    const objectFile = await this.getObjectEntityFile(normalizedPath);
    await setObjectAclPolicy(objectFile, aclPolicy);
    return normalizedPath;
  }
  async canAccessObjectEntity({
    userId,
    objectFile,
    requestedPermission
  }) {
    return canAccessObject({
      userId,
      objectFile,
      requestedPermission: requestedPermission ?? "read" /* READ */
    });
  }
};
function parseObjectPath(path3) {
  if (!path3.startsWith("/")) {
    path3 = `/${path3}`;
  }
  const pathParts = path3.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }
  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");
  return { bucketName, objectName };
}
async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec
}) {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1e3).toISOString()
  };
  const response = await fetch(
    `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to sign object URL, errorcode: ${response.status}, make sure you're running on Replit`
    );
  }
  const { signed_url: signedURL } = await response.json();
  return signedURL;
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name, phone, age, school, grade } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Email, password, and name are required" });
      }
      const existingUser = await storage.getUserByEmail(email.toLowerCase());
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      const passwordHash = await bcrypt2.hash(password, 10);
      const user = await storage.createUser({
        email: email.toLowerCase(),
        passwordHash,
        role: "cast_member"
      });
      const castMember = await storage.createCastMember({
        userId: user.id,
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        age: age || null,
        school: school || null,
        grade: grade || null,
        bio: null,
        avatarUrl: null,
        socialInstagram: null,
        socialTwitter: null,
        socialTiktok: null,
        active: true
      });
      req.login(user, (err) => {
        if (err) {
          console.error("Login after registration error:", err);
          return res.status(500).json({ error: "Registration successful but login failed" });
        }
        return res.status(201).json({
          success: true,
          user: { id: user.id, email: user.email, role: user.role },
          castMember: { id: castMember.id, name: castMember.name }
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (!res.headersSent) {
        return res.status(500).json({ error: "Registration failed" });
      }
    }
  });
  app2.post("/api/auth/login", (req, res, next) => {
    auth_default.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }
      req.login(user, (err2) => {
        if (err2) {
          return res.status(500).json({ error: "Login failed" });
        }
        res.json({
          success: true,
          user: { id: user.id, email: user.email, role: user.role }
        });
      });
    })(req, res, next);
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });
  app2.get("/api/auth/session", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.json({ authenticated: false, user: null });
    }
    const castMember = await storage.getCastMemberByUserId(req.user.id);
    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      },
      castMember: castMember ? {
        id: castMember.id,
        name: castMember.name,
        avatarUrl: castMember.avatarUrl
      } : null
    });
  });
  app2.post("/api/newsletter/signup", async (req, res) => {
    try {
      const validatedData = insertNewsletterSignupSchema.parse(req.body);
      const entry = await storage.createNewsletterSignup(validatedData);
      console.log("New newsletter signup:", entry);
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to newsletter",
        id: entry.id
      });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          error: "Invalid data",
          details: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to subscribe to newsletter"
        });
      }
    }
  });
  app2.post("/api/guest-applications", async (req, res) => {
    try {
      const validated = insertGuestApplicationSchema.parse(req.body);
      const validatedData = {
        ...validated,
        phone: validated.phone || void 0,
        fileUrl: validated.fileUrl || void 0
      };
      const entry = await storage.createGuestApplication(validatedData);
      console.log("New guest application:", entry);
      res.status(201).json({
        success: true,
        message: "Guest application submitted successfully",
        id: entry.id
      });
    } catch (error) {
      console.error("Guest application error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          error: "Invalid data",
          details: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to submit guest application"
        });
      }
    }
  });
  app2.post("/api/volunteer-applications", async (req, res) => {
    try {
      const validated = insertVolunteerApplicationSchema.parse(req.body);
      const validatedData = {
        ...validated,
        phone: validated.phone || void 0
      };
      const entry = await storage.createVolunteerApplication(validatedData);
      console.log("New volunteer application:", entry);
      res.status(201).json({
        success: true,
        message: "Volunteer application submitted successfully",
        id: entry.id
      });
    } catch (error) {
      console.error("Volunteer application error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          error: "Invalid data",
          details: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to submit volunteer application"
        });
      }
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const entry = await storage.createContactSubmission(validatedData);
      console.log("New contact submission:", entry);
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        id: entry.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          error: "Invalid data",
          details: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to send message"
        });
      }
    }
  });
  app2.post("/api/summiteer-applications", async (req, res) => {
    try {
      const validatedData = insertSummiteerApplicationSchema.parse(req.body);
      const entry = await storage.createSummiteerApplication(validatedData);
      console.log("New summiteer application:", entry);
      res.status(201).json({
        success: true,
        message: "Summiteer application submitted successfully",
        id: entry.id
      });
    } catch (error) {
      console.error("Summiteer application error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          error: "Invalid data",
          details: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to submit summiteer application"
        });
      }
    }
  });
  app2.get("/api/admin/newsletter-signups", ensureAdmin, async (req, res) => {
    try {
      const signups = await storage.getAllNewsletterSignups();
      res.json(signups);
    } catch (error) {
      console.error("Newsletter signups fetch error:", error);
      res.status(500).json({ error: "Failed to fetch newsletter signups" });
    }
  });
  app2.delete("/api/admin/newsletter-signups/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteNewsletterSignup(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Newsletter signup delete error:", error);
      res.status(500).json({ error: "Failed to delete newsletter signup" });
    }
  });
  app2.get("/api/admin/guest-applications", ensureAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllGuestApplications();
      res.json(applications);
    } catch (error) {
      console.error("Guest applications fetch error:", error);
      res.status(500).json({ error: "Failed to fetch guest applications" });
    }
  });
  app2.delete("/api/admin/guest-applications/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteGuestApplication(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Guest application delete error:", error);
      res.status(500).json({ error: "Failed to delete guest application" });
    }
  });
  app2.get("/api/admin/volunteer-applications", ensureAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllVolunteerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Volunteer applications fetch error:", error);
      res.status(500).json({ error: "Failed to fetch volunteer applications" });
    }
  });
  app2.delete("/api/admin/volunteer-applications/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteVolunteerApplication(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Volunteer application delete error:", error);
      res.status(500).json({ error: "Failed to delete volunteer application" });
    }
  });
  app2.get("/api/admin/contact-submissions", ensureAdmin, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Contact submissions fetch error:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });
  app2.delete("/api/admin/contact-submissions/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteContactSubmission(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Contact submission delete error:", error);
      res.status(500).json({ error: "Failed to delete contact submission" });
    }
  });
  app2.get("/api/admin/summiteer-applications", ensureAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllSummiteerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Summiteer applications fetch error:", error);
      res.status(500).json({ error: "Failed to fetch summiteer applications" });
    }
  });
  app2.delete("/api/admin/summiteer-applications/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteSummiteerApplication(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Summiteer application delete error:", error);
      res.status(500).json({ error: "Failed to delete summiteer application" });
    }
  });
  app2.get("/api/cast/profile", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member profile not found" });
      }
      res.json(castMember);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });
  app2.patch("/api/cast/profile", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member profile not found" });
      }
      const updated = await storage.updateCastMember(castMember.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
  app2.get("/api/cast/schedule", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const schedule = await storage.getCastMemberSchedule(castMember.id);
      res.json(schedule);
    } catch (error) {
      console.error("Schedule fetch error:", error);
      res.status(500).json({ error: "Failed to fetch schedule" });
    }
  });
  app2.get("/api/cast/episodes", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const episodes2 = await storage.getCastMemberEpisodes(castMember.id);
      res.json(episodes2);
    } catch (error) {
      console.error("Episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });
  app2.get("/api/parent/profile", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user.id);
      if (!parent) {
        return res.status(404).json({ error: "Parent profile not found" });
      }
      res.json(parent);
    } catch (error) {
      console.error("Parent profile fetch error:", error);
      res.status(500).json({ error: "Failed to fetch parent profile" });
    }
  });
  app2.get("/api/parent/child", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user.id);
      if (!parent) {
        return res.status(404).json({ error: "Parent profile not found" });
      }
      if (!parent.castMemberId) {
        return res.status(404).json({ error: "No child linked to parent profile" });
      }
      const child = await storage.getCastMemberById(parent.castMemberId);
      if (!child) {
        return res.status(404).json({ error: "Child profile not found" });
      }
      res.json(child);
    } catch (error) {
      console.error("Child profile fetch error:", error);
      res.status(500).json({ error: "Failed to fetch child profile" });
    }
  });
  app2.get("/api/parent/child/schedule", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user.id);
      if (!parent) {
        return res.status(404).json({ error: "Parent profile not found" });
      }
      if (!parent.castMemberId) {
        return res.status(404).json({ error: "No child linked to parent profile" });
      }
      const schedule = await storage.getCastMemberSchedule(parent.castMemberId);
      res.json(schedule);
    } catch (error) {
      console.error("Child schedule fetch error:", error);
      res.status(500).json({ error: "Failed to fetch child's schedule" });
    }
  });
  app2.get("/api/parent/child/episodes", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user.id);
      if (!parent) {
        return res.status(404).json({ error: "Parent profile not found" });
      }
      if (!parent.castMemberId) {
        return res.status(404).json({ error: "No child linked to parent profile" });
      }
      const episodes2 = await storage.getCastMemberEpisodes(parent.castMemberId);
      res.json(episodes2);
    } catch (error) {
      console.error("Child episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch child's episodes" });
    }
  });
  app2.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPostById(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (post.status !== "published") {
        return res.status(403).json({ error: "Blog post not published" });
      }
      res.json(post);
    } catch (error) {
      console.error("Blog post fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  app2.get("/api/cast/blog/posts", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const posts = await storage.getBlogPostsByAuthor(castMember.id);
      res.json(posts);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.post("/api/cast/blog/posts", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const { title, content, excerpt, coverImageUrl, category, tags } = req.body;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now();
      const validatedData = insertBlogPostSchema.parse({
        title,
        slug,
        content,
        excerpt: excerpt || void 0,
        coverImageUrl: coverImageUrl || void 0,
        category: category || void 0,
        tags: tags || void 0,
        authorId: castMember.id,
        status: "draft",
        publishedAt: null
      });
      const blogData = {
        ...validatedData,
        slug,
        // Explicitly set the slug (non-optional)
        status: validatedData.status || "draft",
        excerpt: validatedData.excerpt ?? null,
        coverImageUrl: validatedData.coverImageUrl ?? null,
        category: validatedData.category ?? null,
        tags: validatedData.tags ?? null,
        publishedAt: validatedData.publishedAt ?? null
      };
      const post = await storage.createBlogPost(blogData);
      res.status(201).json(post);
    } catch (error) {
      console.error("Blog post create error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });
  app2.patch("/api/cast/blog/posts/:id", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const post = await storage.getBlogPostById(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (post.authorId !== castMember.id) {
        return res.status(403).json({ error: "Not authorized to edit this post" });
      }
      const updated = await storage.updateBlogPost(post.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Blog post update error:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });
  app2.delete("/api/cast/blog/posts/:id", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const post = await storage.getBlogPostById(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (post.authorId !== castMember.id) {
        return res.status(403).json({ error: "Not authorized to delete this post" });
      }
      await storage.deleteBlogPost(post.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Blog post delete error:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });
  app2.post("/api/cast/blog/posts/:id/submit", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const post = await storage.getBlogPostById(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (post.authorId !== castMember.id) {
        return res.status(403).json({ error: "Not authorized to submit this post" });
      }
      const updated = await storage.updateBlogPost(post.id, { status: "submitted" });
      res.json(updated);
    } catch (error) {
      console.error("Blog post submit error:", error);
      res.status(500).json({ error: "Failed to submit blog post" });
    }
  });
  app2.get("/api/episodes", async (req, res) => {
    try {
      const episodes2 = await storage.getAllPublishedEpisodes();
      res.json(episodes2);
    } catch (error) {
      console.error("Episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });
  app2.get("/api/episodes/:slug", async (req, res) => {
    try {
      const episode = await storage.getEpisodeBySlug(req.params.slug);
      if (!episode || !episode.published) {
        return res.status(404).json({ error: "Episode not found" });
      }
      res.json(episode);
    } catch (error) {
      console.error("Episode fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episode" });
    }
  });
  app2.post("/api/episodes/:id/view", async (req, res) => {
    try {
      await storage.incrementEpisodeViews(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Episode view increment error:", error);
      if (error.message?.includes("not found")) {
        res.status(404).json({ error: "Episode not found" });
      } else {
        res.status(500).json({ error: "Failed to increment view count" });
      }
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (post.status !== "published") {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Blog post fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  app2.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query || query.trim().length === 0) {
        return res.json([]);
      }
      const searchTerm = query.toLowerCase().trim();
      const results = [];
      const episodes2 = await storage.getAllPublishedEpisodes();
      const matchingEpisodes = episodes2.filter(
        (episode) => episode.title.toLowerCase().includes(searchTerm) || episode.description?.toLowerCase().includes(searchTerm) || episode.topic?.toLowerCase().includes(searchTerm) || episode.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
      matchingEpisodes.forEach((episode) => {
        results.push({
          type: "episode",
          id: episode.id,
          title: episode.title,
          description: episode.description,
          slug: episode.slug,
          url: `/episodes/${episode.slug}`
        });
      });
      const blogPosts2 = await storage.getAllPublishedBlogPosts();
      const matchingPosts = blogPosts2.filter(
        (post) => post.title.toLowerCase().includes(searchTerm) || post.excerpt?.toLowerCase().includes(searchTerm) || post.content?.toLowerCase().includes(searchTerm) || post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
      matchingPosts.forEach((post) => {
        results.push({
          type: "blog",
          id: post.id,
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          url: `/blog/${post.slug}`
        });
      });
      const dossiers2 = await storage.getAllDossiers();
      const matchingDossiers = dossiers2.filter(
        (dossier) => dossier.title.toLowerCase().includes(searchTerm) || dossier.description?.toLowerCase().includes(searchTerm) || dossier.topic?.toLowerCase().includes(searchTerm)
      );
      matchingDossiers.forEach((dossier) => {
        results.push({
          type: "dossier",
          id: dossier.id,
          title: dossier.title,
          description: dossier.description,
          url: `/dossiers#${dossier.id}`
        });
      });
      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });
  app2.post("/api/analytics", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const { platform, followers, likes, comments, shares, engagementRate, recordedAt } = req.body;
      const validatedData = insertSocialAnalyticsSchema.parse({
        castMemberId: castMember.id,
        // Always use authenticated user's cast member ID
        platform,
        followers: followers ?? 0,
        likes: likes ?? 0,
        comments: comments ?? 0,
        shares: shares ?? 0,
        engagementRate: engagementRate ?? null,
        recordedAt: recordedAt ? new Date(recordedAt) : /* @__PURE__ */ new Date()
      });
      const analyticsData = {
        ...validatedData,
        engagementRate: validatedData.engagementRate ?? null,
        recordedAt: validatedData.recordedAt ?? /* @__PURE__ */ new Date()
      };
      const analytics = await storage.createSocialAnalytics(analyticsData);
      res.status(201).json(analytics);
    } catch (error) {
      console.error("Analytics create error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid analytics data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create analytics entry" });
    }
  });
  app2.get("/api/analytics", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const analytics = await storage.getCastMemberAnalytics(castMember.id);
      res.json(analytics);
    } catch (error) {
      console.error("Analytics fetch error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });
  app2.get("/api/analytics/latest", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      const analytics = await storage.getLatestAnalyticsByCastMember(castMember.id);
      res.json(analytics);
    } catch (error) {
      console.error("Latest analytics fetch error:", error);
      res.status(500).json({ error: "Failed to fetch latest analytics" });
    }
  });
  app2.post("/api/objects/upload", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Upload URL error:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });
  app2.get("/objects/:objectPath(*)", ensureAuthenticated, async (req, res) => {
    const userId = req.user?.id?.toString();
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      const canAccess = await objectStorageService.canAccessObjectEntity({
        objectFile,
        userId
      });
      if (!canAccess) {
        return res.sendStatus(401);
      }
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Object access error:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });
  app2.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Public object error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.post("/api/episodes", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const { title, slug, description, episodeNumber, season, topic, tags, videoUrl, thumbnailUrl, duration, airDate, published } = req.body;
      if (!title || !slug || episodeNumber === void 0) {
        return res.status(400).json({ error: "Title, slug, and episode number are required" });
      }
      const objectStorageService = new ObjectStorageService();
      const userId = req.user.id.toString();
      let normalizedVideoUrl = null;
      if (videoUrl) {
        normalizedVideoUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          videoUrl,
          { owner: userId, visibility: "public" }
        );
      }
      let normalizedThumbnailUrl = null;
      if (thumbnailUrl) {
        normalizedThumbnailUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          thumbnailUrl,
          { owner: userId, visibility: "public" }
        );
      }
      const episode = await storage.createEpisode({
        title,
        slug,
        description: description || null,
        episodeNumber,
        season: season || 1,
        topic: topic || null,
        tags: tags || null,
        videoUrl: normalizedVideoUrl,
        thumbnailUrl: normalizedThumbnailUrl,
        duration: duration || null,
        views: 0,
        airDate: airDate ? new Date(airDate) : null,
        published: published || false
      });
      res.status(201).json(episode);
    } catch (error) {
      console.error("Episode create error:", error);
      res.status(500).json({ error: "Failed to create episode" });
    }
  });
  app2.put("/api/episodes/:id", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { videoUrl, thumbnailUrl, ...rest } = req.body;
      const objectStorageService = new ObjectStorageService();
      const userId = req.user.id.toString();
      const updateData = { ...rest };
      if (videoUrl) {
        updateData.videoUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          videoUrl,
          { owner: userId, visibility: "public" }
        );
      }
      if (thumbnailUrl) {
        updateData.thumbnailUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          thumbnailUrl,
          { owner: userId, visibility: "public" }
        );
      }
      const episode = await storage.updateEpisode(id, updateData);
      res.json(episode);
    } catch (error) {
      console.error("Episode update error:", error);
      res.status(500).json({ error: "Failed to update episode" });
    }
  });
  app2.get("/api/episodes/manage", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const allEpisodes = await storage.getAllEpisodes();
      res.json(allEpisodes);
    } catch (error) {
      console.error("Episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });
  app2.delete("/api/episodes/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteEpisode(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Episode delete error:", error);
      res.status(500).json({ error: "Failed to delete episode" });
    }
  });
  app2.delete("/api/dossiers/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteDossier(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Dossier delete error:", error);
      res.status(500).json({ error: "Failed to delete dossier" });
    }
  });
  app2.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : "http://localhost:5000";
      const episodes2 = await storage.getAllPublishedEpisodes();
      const blogPosts2 = await storage.getAllPublishedBlogPosts();
      const staticPages = [
        { url: "/", priority: "1.0", changefreq: "daily" },
        { url: "/episodes", priority: "0.9", changefreq: "weekly" },
        { url: "/blog", priority: "0.9", changefreq: "weekly" },
        { url: "/dossiers", priority: "0.8", changefreq: "weekly" },
        { url: "/contact", priority: "0.7", changefreq: "monthly" },
        { url: "/newsletter", priority: "0.7", changefreq: "monthly" },
        { url: "/apply/summiteer", priority: "0.8", changefreq: "monthly" },
        { url: "/apply/volunteer", priority: "0.7", changefreq: "monthly" },
        { url: "/apply/guest", priority: "0.7", changefreq: "monthly" },
        { url: "/acknowledgments", priority: "0.6", changefreq: "yearly" },
        { url: "/terms", priority: "0.3", changefreq: "yearly" },
        { url: "/privacy", priority: "0.3", changefreq: "yearly" }
      ];
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      staticPages.forEach((page) => {
        sitemap += `  <url>
`;
        sitemap += `    <loc>${baseUrl}${page.url}</loc>
`;
        sitemap += `    <changefreq>${page.changefreq}</changefreq>
`;
        sitemap += `    <priority>${page.priority}</priority>
`;
        sitemap += `  </url>
`;
      });
      episodes2.forEach((episode) => {
        sitemap += `  <url>
`;
        sitemap += `    <loc>${baseUrl}/episodes/${episode.slug}</loc>
`;
        if (episode.createdAt) {
          sitemap += `    <lastmod>${new Date(episode.createdAt).toISOString()}</lastmod>
`;
        }
        sitemap += `    <changefreq>monthly</changefreq>
`;
        sitemap += `    <priority>0.8</priority>
`;
        sitemap += `  </url>
`;
      });
      blogPosts2.forEach((post) => {
        sitemap += `  <url>
`;
        sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>
`;
        if (post.updatedAt) {
          sitemap += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
`;
        }
        sitemap += `    <changefreq>monthly</changefreq>
`;
        sitemap += `    <priority>0.7</priority>
`;
        sitemap += `  </url>
`;
      });
      sitemap += "</urlset>";
      res.header("Content-Type", "application/xml");
      res.send(sitemap);
    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).send("Failed to generate sitemap");
    }
  });
  app2.get("/robots.txt", (req, res) => {
    const baseUrl = process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : "http://localhost:5000";
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /parent-portal
Disallow: /educator-portal
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });
  app2.get("/rss/blog.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : "http://localhost:5000";
      const blogPosts2 = await storage.getAllPublishedBlogPosts();
      const sortedPosts = blogPosts2.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 20);
      let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
      rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
      rss += "  <channel>\n";
      rss += "    <title>Teen Summit 2.0 - Blog</title>\n";
      rss += "    <link>" + baseUrl + "/blog</link>\n";
      rss += "    <description>Youth voices on civic engagement, debate, and social issues from Teen Summit 2.0</description>\n";
      rss += "    <language>en-us</language>\n";
      rss += '    <atom:link href="' + baseUrl + '/rss/blog.xml" rel="self" type="application/rss+xml"/>\n';
      sortedPosts.forEach((post) => {
        const author = "Teen Summit Team";
        const pubDate = new Date(post.createdAt).toUTCString();
        rss += "    <item>\n";
        rss += "      <title>" + escapeXml(post.title) + "</title>\n";
        rss += "      <link>" + baseUrl + "/blog/" + post.slug + "</link>\n";
        rss += "      <guid>" + baseUrl + "/blog/" + post.slug + "</guid>\n";
        rss += "      <pubDate>" + pubDate + "</pubDate>\n";
        rss += "      <author>" + escapeXml(author) + "</author>\n";
        if (post.excerpt) {
          rss += "      <description>" + escapeXml(post.excerpt) + "</description>\n";
        }
        rss += "    </item>\n";
      });
      rss += "  </channel>\n";
      rss += "</rss>";
      res.header("Content-Type", "application/rss+xml");
      res.send(rss);
    } catch (error) {
      console.error("RSS feed generation error:", error);
      res.status(500).send("Failed to generate RSS feed");
    }
  });
  app2.get("/rss/episodes.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : "http://localhost:5000";
      const episodes2 = await storage.getAllPublishedEpisodes();
      const sortedEpisodes = episodes2.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 20);
      let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
      rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">\n';
      rss += "  <channel>\n";
      rss += "    <title>Teen Summit 2.0 - Episodes</title>\n";
      rss += "    <link>" + escapeXml(baseUrl + "/episodes") + "</link>\n";
      rss += "    <description>Debate, musicology, and podcasting episodes from Teen Summit 2.0 - a civic media platform empowering youth voices</description>\n";
      rss += "    <language>en-us</language>\n";
      rss += "    <copyright>\xA9 2025 Teen Summit 2.0, University of Illinois Urbana-Champaign</copyright>\n";
      rss += "    <itunes:author>Teen Summit 2.0</itunes:author>\n";
      rss += "    <itunes:summary>A reimagined civic space empowering youth voices through debate, musicology, and podcasting</itunes:summary>\n";
      rss += "    <itunes:owner>\n";
      rss += "      <itunes:name>Teen Summit 2.0</itunes:name>\n";
      rss += "      <itunes:email>teensummit@illinois.edu</itunes:email>\n";
      rss += "    </itunes:owner>\n";
      rss += '    <itunes:category text="Education"/>\n';
      rss += "    <itunes:explicit>no</itunes:explicit>\n";
      rss += '    <atom:link href="' + escapeXml(baseUrl + "/rss/episodes.xml") + '" rel="self" type="application/rss+xml"/>\n';
      sortedEpisodes.forEach((episode) => {
        const pubDate = new Date(episode.createdAt).toUTCString();
        const episodeUrl = baseUrl + "/episodes/" + episode.slug;
        rss += "    <item>\n";
        rss += "      <title>" + escapeXml(episode.title) + "</title>\n";
        rss += "      <link>" + escapeXml(episodeUrl) + "</link>\n";
        rss += '      <guid isPermaLink="true">' + escapeXml(episodeUrl) + "</guid>\n";
        rss += "      <pubDate>" + pubDate + "</pubDate>\n";
        if (episode.description) {
          rss += "      <description>" + escapeXml(episode.description) + "</description>\n";
          rss += "      <itunes:summary>" + escapeXml(episode.description) + "</itunes:summary>\n";
        }
        if (episode.duration) {
          rss += "      <itunes:duration>" + escapeXml(episode.duration) + "</itunes:duration>\n";
        }
        if (episode.episodeNumber) {
          rss += "      <itunes:episode>" + episode.episodeNumber + "</itunes:episode>\n";
        }
        if (episode.season) {
          rss += "      <itunes:season>" + episode.season + "</itunes:season>\n";
        }
        if (episode.videoUrl) {
          const videoUrl = episode.videoUrl.startsWith("http") ? episode.videoUrl : baseUrl + episode.videoUrl;
          rss += '      <enclosure url="' + escapeXml(videoUrl) + '" type="video/mp4"/>\n';
        }
        rss += "      <itunes:explicit>no</itunes:explicit>\n";
        rss += "    </item>\n";
      });
      rss += "  </channel>\n";
      rss += "</rss>";
      res.header("Content-Type", "application/rss+xml");
      res.send(rss);
    } catch (error) {
      console.error("RSS feed generation error:", error);
      res.status(500).send("Failed to generate RSS feed");
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
var PgSession = ConnectPgSimple(session);
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || "teen-summit-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1e3,
      // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  })
);
app.use(auth_default.initialize());
app.use(auth_default.session());
app.use((req, res, next) => {
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|webp|mp4|webm)$/)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
  }
  next();
});
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
