// Reference: blueprint:javascript_database
import type { 
  NewsletterSignup, 
  GuestApplication, 
  VolunteerApplication, 
  ContactForm,
  SummiteerApplication,
  SummiteerApplicationInsertDB,
  NewsletterEntry,
  GuestApplicationEntry,
  VolunteerApplicationEntry,
  ContactFormEntry,
  SummiteerApplicationEntry,
  User,
  CastMember,
  BlogPost,
  FilmingSchedule,
  Episode,
  SocialAnalytics,
  Dossier,
  Parent
} from "@shared/schema";
import { 
  newsletterSignups, 
  guestApplications, 
  volunteerApplications, 
  contactSubmissions,
  summiteerApplications,
  users,
  passwordResetTokens,
  castMembers,
  blogPosts,
  filmingSchedule,
  castMemberSchedule,
  episodes,
  castMemberEpisodes,
  socialAnalytics,
  dossiers,
  parents
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Newsletter
  createNewsletterSignup(signup: NewsletterSignup): Promise<NewsletterEntry>;
  getAllNewsletterSignups(): Promise<NewsletterEntry[]>;
  deleteNewsletterSignup(id: number): Promise<void>;

  // Guest Applications
  createGuestApplication(application: GuestApplication): Promise<GuestApplicationEntry>;
  getAllGuestApplications(): Promise<GuestApplicationEntry[]>;
  deleteGuestApplication(id: number): Promise<void>;

  // Volunteer Applications
  createVolunteerApplication(application: VolunteerApplication): Promise<VolunteerApplicationEntry>;
  getAllVolunteerApplications(): Promise<VolunteerApplicationEntry[]>;
  deleteVolunteerApplication(id: number): Promise<void>;

  // Contact Form
  createContactSubmission(contact: ContactForm): Promise<ContactFormEntry>;
  getAllContactSubmissions(): Promise<ContactFormEntry[]>;
  deleteContactSubmission(id: number): Promise<void>;

  // Summiteer Applications
  createSummiteerApplication(application: SummiteerApplicationInsertDB): Promise<SummiteerApplicationEntry>;
  getAllSummiteerApplications(): Promise<SummiteerApplicationEntry[]>;
  deleteSummiteerApplication(id: number): Promise<void>;

  // Users
  createUser(user: Omit<User, "id" | "createdAt">): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  updateUserPassword(userId: number, passwordHash: string): Promise<void>;

  // Password Reset
  createPasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<void>;
  getPasswordResetToken(token: string): Promise<{ userId: number; expiresAt: Date; used: boolean } | undefined>;
  markTokenAsUsed(token: string): Promise<void>;
  deleteExpiredTokens(): Promise<void>;

  // Cast Members
  createCastMember(castMember: Omit<CastMember, "id" | "createdAt">): Promise<CastMember>;
  getCastMemberById(id: number): Promise<CastMember | undefined>;
  getCastMemberByUserId(userId: number): Promise<CastMember | undefined>;
  getAllCastMembers(): Promise<CastMember[]>;
  updateCastMember(id: number, data: Partial<CastMember>): Promise<CastMember>;

  // Blog Posts
  createBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByAuthor(authorId: number): Promise<BlogPost[]>;
  getAllPublishedBlogPosts(): Promise<BlogPost[]>;
  updateBlogPost(id: number, data: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Filming Schedule
  createFilmingSchedule(schedule: Omit<FilmingSchedule, "id" | "createdAt">): Promise<FilmingSchedule>;
  getFilmingScheduleById(id: number): Promise<FilmingSchedule | undefined>;
  getAllFilmingSchedules(): Promise<FilmingSchedule[]>;
  getCastMemberSchedule(castMemberId: number): Promise<FilmingSchedule[]>;

  // Episodes
  createEpisode(episode: Omit<Episode, "id" | "createdAt">): Promise<Episode>;
  getEpisodeById(id: number): Promise<Episode | undefined>;
  getEpisodeBySlug(slug: string): Promise<Episode | undefined>;
  getAllPublishedEpisodes(): Promise<Episode[]>;
  getAllEpisodes(): Promise<Episode[]>;
  getCastMemberEpisodes(castMemberId: number): Promise<Episode[]>;
  updateEpisode(id: number, data: Partial<Episode>): Promise<Episode>;
  incrementEpisodeViews(id: number): Promise<void>;
  deleteEpisode(id: number): Promise<void>;

  // Social Analytics (Academic Civic NILS Tracking)
  createSocialAnalytics(analytics: Omit<SocialAnalytics, "id" | "createdAt">): Promise<SocialAnalytics>;
  getCastMemberAnalytics(castMemberId: number): Promise<SocialAnalytics[]>;
  getLatestAnalyticsByCastMember(castMemberId: number): Promise<SocialAnalytics[]>;

  // Dossiers
  createDossier(dossier: Omit<Dossier, "id" | "createdAt" | "updatedAt">): Promise<Dossier>;
  getDossierById(id: number): Promise<Dossier | undefined>;
  getDossierBySlug(slug: string): Promise<Dossier | undefined>;
  getAllPublishedDossiers(): Promise<Dossier[]>;
  getAllDossiers(): Promise<Dossier[]>;
  updateDossier(id: number, data: Partial<Dossier>): Promise<Dossier>;
  incrementDossierDownloads(id: number): Promise<void>;
  deleteDossier(id: number): Promise<void>;

  // Parents
  createParent(parent: Omit<Parent, "id" | "createdAt">): Promise<Parent>;
  getParentById(id: number): Promise<Parent | undefined>;
  getParentByUserId(userId: number): Promise<Parent | undefined>;
  updateParent(id: number, data: Partial<Parent>): Promise<Parent>;
}

export class DatabaseStorage implements IStorage {
  async createNewsletterSignup(signup: NewsletterSignup): Promise<NewsletterEntry> {
    const [entry] = await db
      .insert(newsletterSignups)
      .values(signup)
      .returning();
    return entry;
  }

  async getAllNewsletterSignups(): Promise<NewsletterEntry[]> {
    return await db.select().from(newsletterSignups);
  }

  async createGuestApplication(application: GuestApplication): Promise<GuestApplicationEntry> {
    const [entry] = await db
      .insert(guestApplications)
      .values(application)
      .returning();
    return entry;
  }

  async getAllGuestApplications(): Promise<GuestApplicationEntry[]> {
    return await db.select().from(guestApplications);
  }

  async createVolunteerApplication(application: VolunteerApplication): Promise<VolunteerApplicationEntry> {
    const [entry] = await db
      .insert(volunteerApplications)
      .values(application)
      .returning();
    return entry;
  }

  async getAllVolunteerApplications(): Promise<VolunteerApplicationEntry[]> {
    return await db.select().from(volunteerApplications);
  }

  async createContactSubmission(contact: ContactForm): Promise<ContactFormEntry> {
    const [entry] = await db
      .insert(contactSubmissions)
      .values(contact)
      .returning();
    return entry;
  }

  async getAllContactSubmissions(): Promise<ContactFormEntry[]> {
    return await db.select().from(contactSubmissions);
  }

  async createSummiteerApplication(application: SummiteerApplicationInsertDB): Promise<SummiteerApplicationEntry> {
    const [entry] = await db
      .insert(summiteerApplications)
      .values(application)
      .returning();
    return entry;
  }

  async getAllSummiteerApplications(): Promise<SummiteerApplicationEntry[]> {
    return await db.select().from(summiteerApplications);
  }

  async deleteNewsletterSignup(id: number): Promise<void> {
    await db.delete(newsletterSignups).where(eq(newsletterSignups.id, id));
  }

  async deleteGuestApplication(id: number): Promise<void> {
    await db.delete(guestApplications).where(eq(guestApplications.id, id));
  }

  async deleteVolunteerApplication(id: number): Promise<void> {
    await db.delete(volunteerApplications).where(eq(volunteerApplications.id, id));
  }

  async deleteContactSubmission(id: number): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  async deleteSummiteerApplication(id: number): Promise<void> {
    await db.delete(summiteerApplications).where(eq(summiteerApplications.id, id));
  }

  // Users
  async createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async updateUserPassword(userId: number, passwordHash: string): Promise<void> {
    await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
  }

  // Password Reset
  async createPasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<void> {
    await db.insert(passwordResetTokens).values({
      userId,
      token,
      expiresAt,
      used: false,
    });
  }

  async getPasswordResetToken(token: string): Promise<{ userId: number; expiresAt: Date; used: boolean } | undefined> {
    const [resetToken] = await db
      .select({
        userId: passwordResetTokens.userId,
        expiresAt: passwordResetTokens.expiresAt,
        used: passwordResetTokens.used,
      })
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));
    return resetToken;
  }

  async markTokenAsUsed(token: string): Promise<void> {
    await db.update(passwordResetTokens).set({ used: true }).where(eq(passwordResetTokens.token, token));
  }

  async deleteExpiredTokens(): Promise<void> {
    const now = new Date();
    // Delete tokens that are expired OR already used
    await db.delete(passwordResetTokens).where(
      eq(passwordResetTokens.used, true)
    );
    // Also delete tokens past their expiration time
    const { sql } = await import("drizzle-orm");
    await db.delete(passwordResetTokens).where(
      sql`${passwordResetTokens.expiresAt} < ${now}`
    );
  }

  // Cast Members
  async createCastMember(castMember: Omit<CastMember, "id" | "createdAt">): Promise<CastMember> {
    const [newMember] = await db.insert(castMembers).values(castMember).returning();
    return newMember;
  }

  async getCastMemberById(id: number): Promise<CastMember | undefined> {
    const [member] = await db.select().from(castMembers).where(eq(castMembers.id, id));
    return member;
  }

  async getCastMemberByUserId(userId: number): Promise<CastMember | undefined> {
    const [member] = await db.select().from(castMembers).where(eq(castMembers.userId, userId));
    return member;
  }

  async getAllCastMembers(): Promise<CastMember[]> {
    return await db.select().from(castMembers).where(eq(castMembers.active, true));
  }

  async updateCastMember(id: number, data: Partial<CastMember>): Promise<CastMember> {
    const [updated] = await db
      .update(castMembers)
      .set(data)
      .where(eq(castMembers.id, id))
      .returning();
    return updated;
  }

  // Blog Posts
  async createBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostsByAuthor(authorId: number): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.authorId, authorId))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getAllPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async updateBlogPost(id: number, data: Partial<BlogPost>): Promise<BlogPost> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Filming Schedule
  async createFilmingSchedule(schedule: Omit<FilmingSchedule, "id" | "createdAt">): Promise<FilmingSchedule> {
    const [newSchedule] = await db.insert(filmingSchedule).values(schedule).returning();
    return newSchedule;
  }

  async getFilmingScheduleById(id: number): Promise<FilmingSchedule | undefined> {
    const [schedule] = await db.select().from(filmingSchedule).where(eq(filmingSchedule.id, id));
    return schedule;
  }

  async getAllFilmingSchedules(): Promise<FilmingSchedule[]> {
    return await db.select().from(filmingSchedule).orderBy(filmingSchedule.date);
  }

  async getCastMemberSchedule(castMemberId: number): Promise<FilmingSchedule[]> {
    const schedules = await db
      .select({
        id: filmingSchedule.id,
        title: filmingSchedule.title,
        description: filmingSchedule.description,
        date: filmingSchedule.date,
        startTime: filmingSchedule.startTime,
        endTime: filmingSchedule.endTime,
        location: filmingSchedule.location,
        callTime: filmingSchedule.callTime,
        notes: filmingSchedule.notes,
        createdAt: filmingSchedule.createdAt,
      })
      .from(castMemberSchedule)
      .innerJoin(filmingSchedule, eq(castMemberSchedule.scheduleId, filmingSchedule.id))
      .where(eq(castMemberSchedule.castMemberId, castMemberId))
      .orderBy(filmingSchedule.date);
    return schedules;
  }

  // Episodes
  async createEpisode(episode: Omit<Episode, "id" | "createdAt">): Promise<Episode> {
    const [newEpisode] = await db.insert(episodes).values(episode).returning();
    return newEpisode;
  }

  async getEpisodeById(id: number): Promise<Episode | undefined> {
    const [episode] = await db.select().from(episodes).where(eq(episodes.id, id));
    return episode;
  }

  async getAllPublishedEpisodes(): Promise<Episode[]> {
    return await db
      .select()
      .from(episodes)
      .where(eq(episodes.published, true))
      .orderBy(desc(episodes.season), desc(episodes.episodeNumber));
  }

  async getAllEpisodes(): Promise<Episode[]> {
    return await db
      .select()
      .from(episodes)
      .orderBy(desc(episodes.season), desc(episodes.episodeNumber));
  }

  async getCastMemberEpisodes(castMemberId: number): Promise<Episode[]> {
    const memberEpisodes = await db
      .select({
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
        captionsUrl: episodes.captionsUrl,
        transcriptUrl: episodes.transcriptUrl,
        audioDescriptionUrl: episodes.audioDescriptionUrl,
        duration: episodes.duration,
        views: episodes.views,
        airDate: episodes.airDate,
        published: episodes.published,
        createdAt: episodes.createdAt,
      })
      .from(castMemberEpisodes)
      .innerJoin(episodes, eq(castMemberEpisodes.episodeId, episodes.id))
      .where(and(
        eq(castMemberEpisodes.castMemberId, castMemberId),
        eq(episodes.published, true)
      ))
      .orderBy(desc(episodes.airDate));
    return memberEpisodes;
  }

  async getEpisodeBySlug(slug: string): Promise<Episode | undefined> {
    const [episode] = await db.select().from(episodes).where(eq(episodes.slug, slug));
    return episode;
  }

  async updateEpisode(id: number, data: Partial<Episode>): Promise<Episode> {
    const [updated] = await db
      .update(episodes)
      .set(data)
      .where(eq(episodes.id, id))
      .returning();
    return updated;
  }

  async incrementEpisodeViews(id: number): Promise<void> {
    const [episode] = await db.select().from(episodes).where(eq(episodes.id, id));
    if (!episode || !episode.published) {
      throw new Error("Episode not found or not published");
    }
    await db
      .update(episodes)
      .set({ views: episode.views + 1 })
      .where(eq(episodes.id, id));
  }

  async deleteEpisode(id: number): Promise<void> {
    await db.delete(episodes).where(eq(episodes.id, id));
  }

  async createSocialAnalytics(analytics: Omit<SocialAnalytics, "id" | "createdAt">): Promise<SocialAnalytics> {
    const [entry] = await db
      .insert(socialAnalytics)
      .values(analytics)
      .returning();
    return entry;
  }

  async getCastMemberAnalytics(castMemberId: number): Promise<SocialAnalytics[]> {
    return await db
      .select()
      .from(socialAnalytics)
      .where(eq(socialAnalytics.castMemberId, castMemberId))
      .orderBy(desc(socialAnalytics.recordedAt));
  }

  async getLatestAnalyticsByCastMember(castMemberId: number): Promise<SocialAnalytics[]> {
    const allAnalytics = await db
      .select()
      .from(socialAnalytics)
      .where(eq(socialAnalytics.castMemberId, castMemberId))
      .orderBy(desc(socialAnalytics.recordedAt));
    
    const latestByPlatform = new Map<string, SocialAnalytics>();
    for (const analytics of allAnalytics) {
      if (!latestByPlatform.has(analytics.platform)) {
        latestByPlatform.set(analytics.platform, analytics);
      }
    }
    
    // Return all 5 platforms with defaults for missing entries
    const platforms: Array<'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin'> = 
      ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin'];
    
    return platforms.map(platform => {
      const existing = latestByPlatform.get(platform);
      if (existing) {
        return existing;
      }
      // Return default zeroed entry for platforms without data
      return {
        id: 0,
        castMemberId,
        platform,
        followers: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        engagementRate: null,
        recordedAt: new Date(),
        createdAt: new Date(),
      };
    });
  }

  async createDossier(dossier: Omit<Dossier, "id" | "createdAt" | "updatedAt">): Promise<Dossier> {
    const [entry] = await db
      .insert(dossiers)
      .values(dossier)
      .returning();
    return entry;
  }

  async getDossierById(id: number): Promise<Dossier | undefined> {
    const [dossier] = await db.select().from(dossiers).where(eq(dossiers.id, id));
    return dossier;
  }

  async getDossierBySlug(slug: string): Promise<Dossier | undefined> {
    const [dossier] = await db.select().from(dossiers).where(eq(dossiers.slug, slug));
    return dossier;
  }

  async getAllPublishedDossiers(): Promise<Dossier[]> {
    return await db
      .select()
      .from(dossiers)
      .where(eq(dossiers.published, true))
      .orderBy(desc(dossiers.createdAt));
  }

  async getAllDossiers(): Promise<Dossier[]> {
    return await db
      .select()
      .from(dossiers)
      .orderBy(desc(dossiers.createdAt));
  }

  async updateDossier(id: number, data: Partial<Dossier>): Promise<Dossier> {
    const [updated] = await db
      .update(dossiers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(dossiers.id, id))
      .returning();
    return updated;
  }

  async incrementDossierDownloads(id: number): Promise<void> {
    const [dossier] = await db.select().from(dossiers).where(eq(dossiers.id, id));
    if (!dossier) {
      throw new Error("Dossier not found");
    }
    await db
      .update(dossiers)
      .set({ downloads: dossier.downloads + 1 })
      .where(eq(dossiers.id, id));
  }

  async deleteDossier(id: number): Promise<void> {
    await db.delete(dossiers).where(eq(dossiers.id, id));
  }

  // Parents
  async createParent(parent: Omit<Parent, "id" | "createdAt">): Promise<Parent> {
    const [newParent] = await db.insert(parents).values(parent).returning();
    return newParent;
  }

  async getParentById(id: number): Promise<Parent | undefined> {
    const [parent] = await db.select().from(parents).where(eq(parents.id, id));
    return parent;
  }

  async getParentByUserId(userId: number): Promise<Parent | undefined> {
    const [parent] = await db.select().from(parents).where(eq(parents.userId, userId));
    return parent;
  }

  async updateParent(id: number, data: Partial<Parent>): Promise<Parent> {
    const [updated] = await db
      .update(parents)
      .set(data)
      .where(eq(parents.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
