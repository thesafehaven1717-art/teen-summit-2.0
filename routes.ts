import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import passport from "./auth";
import { storage } from "./storage";
import { ensureAuthenticated, ensureCastMember, ensureAdmin, ensureParent, ensureEducator } from "./auth";
import { 
  insertNewsletterSignupSchema, 
  insertGuestApplicationSchema, 
  insertVolunteerApplicationSchema, 
  insertContactSubmissionSchema,
  insertSummiteerApplicationSchema,
  insertUserSchema,
  insertCastMemberSchema,
  insertBlogPostSchema,
  insertSocialAnalyticsSchema
} from "@shared/schema";
import { z } from "zod";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { sendPasswordResetEmail, sendContactConfirmation, sendApplicationConfirmation } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // ============= AUTHENTICATION ROUTES =============
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name, phone, age, school, grade } = req.body;
      
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Email, password, and name are required" });
      }

      const existingUser = await storage.getUserByEmail(email.toLowerCase());
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      
      const user = await storage.createUser({
        email: email.toLowerCase(),
        passwordHash,
        role: "cast_member",
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
        active: true,
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
    } catch (error: any) {
      console.error("Registration error:", error);
      if (!res.headersSent) {
        return res.status(500).json({ error: "Registration failed" });
      }
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Login failed" });
        }
        res.json({ 
          success: true, 
          user: { id: user.id, email: user.email, role: user.role }
        });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/session", async (req, res) => {
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
        avatarUrl: castMember.avatarUrl,
      } : null
    });
  });

  // Password Reset - Request reset link
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Normalize email to lowercase and trim whitespace (matches registration)
      const normalizedEmail = email.toLowerCase().trim();
      const user = await storage.getUserByEmail(normalizedEmail);
      if (!user) {
        // Don't reveal if user exists - security best practice
        return res.json({ 
          success: true, 
          message: "If an account exists with this email, you will receive password reset instructions." 
        });
      }

      // Generate secure random token
      const crypto = await import("crypto");
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      await storage.createPasswordResetToken(user.id, token, expiresAt);

      // Send password reset email
      const resetLink = `${req.headers.origin || 'http://localhost:5000'}/reset-password?token=${token}`;
      const emailResult = await sendPasswordResetEmail(normalizedEmail, resetLink, expiresAt);
      
      if (!emailResult.success) {
        console.error(`Failed to send password reset email to ${normalizedEmail}:`, emailResult.error);
        // Still return success to avoid revealing if email exists
      }

      res.json({ 
        success: true, 
        message: "If an account exists with this email, you will receive password reset instructions.",
        // In development, include the reset link in response for testing
        ...(process.env.NODE_ENV === "development" && { resetLink })
      });
    } catch (error) {
      console.error("Password reset request error:", error);
      res.status(500).json({ error: "Failed to process password reset request" });
    }
  });

  // Password Reset - Complete password reset with token
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({ error: "Token and password are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      const resetToken = await storage.getPasswordResetToken(token);
      
      if (!resetToken) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
      }

      if (resetToken.used) {
        return res.status(400).json({ error: "This reset link has already been used" });
      }

      if (new Date() > resetToken.expiresAt) {
        return res.status(400).json({ error: "This reset link has expired" });
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Update user password
      await storage.updateUserPassword(resetToken.userId, passwordHash);
      
      // Mark token as used
      await storage.markTokenAsUsed(token);

      console.log(`Password successfully reset for user ID: ${resetToken.userId}`);

      res.json({ 
        success: true, 
        message: "Password has been reset successfully. You can now log in with your new password." 
      });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });

  // ============= LAUNCH PAGE ROUTES =============
  // Newsletter Signup
  app.post("/api/newsletter/signup", async (req, res) => {
    try {
      const validatedData = insertNewsletterSignupSchema.parse(req.body);
      const entry = await storage.createNewsletterSignup(validatedData);
      
      console.log("New newsletter signup:", entry);
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        id: entry.id 
      });
    } catch (error: any) {
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

  // Guest Application
  app.post("/api/guest-applications", async (req, res) => {
    try {
      const validated = insertGuestApplicationSchema.parse(req.body);
      const validatedData = {
        ...validated,
        phone: validated.phone || undefined,
        fileUrl: validated.fileUrl || undefined,
      };
      const entry = await storage.createGuestApplication(validatedData);
      
      console.log("New guest application:", entry);
      
      // Send confirmation email (fire-and-forget to avoid blocking response)
      sendApplicationConfirmation(
        validatedData.email, 
        validatedData.name, 
        'Guest'
      ).then(result => {
        if (!result.success) {
          console.error(`Failed to send Guest application confirmation email:`, result.error);
        }
      }).catch(err => {
        console.error('Error sending Guest application confirmation:', err);
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Guest application submitted successfully",
        id: entry.id 
      });
    } catch (error: any) {
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

  // Volunteer Application
  app.post("/api/volunteer-applications", async (req, res) => {
    try {
      const validated = insertVolunteerApplicationSchema.parse(req.body);
      const validatedData = {
        ...validated,
        phone: validated.phone || undefined,
      };
      const entry = await storage.createVolunteerApplication(validatedData);
      
      console.log("New volunteer application:", entry);
      
      // Send confirmation email (fire-and-forget to avoid blocking response)
      sendApplicationConfirmation(
        validatedData.email, 
        validatedData.name, 
        'Volunteer'
      ).then(result => {
        if (!result.success) {
          console.error(`Failed to send Volunteer application confirmation email:`, result.error);
        }
      }).catch(err => {
        console.error('Error sending Volunteer application confirmation:', err);
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Volunteer application submitted successfully",
        id: entry.id 
      });
    } catch (error: any) {
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

  // Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const entry = await storage.createContactSubmission(validatedData);
      
      console.log("New contact submission:", entry);
      
      // Send confirmation email (fire-and-forget to avoid blocking response)
      sendContactConfirmation(validatedData.email, validatedData.name).then(result => {
        if (!result.success) {
          console.error(`Failed to send contact confirmation email:`, result.error);
        }
      }).catch(err => {
        console.error('Error sending contact confirmation:', err);
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        id: entry.id 
      });
    } catch (error: any) {
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

  // Summiteer Application
  app.post("/api/summiteer-applications", async (req, res) => {
    try {
      const validatedData = insertSummiteerApplicationSchema.parse(req.body);
      
      // Transform boolean parentConsent to string for database storage
      const dataForStorage = {
        ...validatedData,
        parentConsent: validatedData.parentConsent.toString(),
      };
      
      const entry = await storage.createSummiteerApplication(dataForStorage);
      
      console.log("New summiteer application:", entry);
      
      // Send confirmation email (fire-and-forget to avoid blocking response)
      sendApplicationConfirmation(
        validatedData.email, 
        validatedData.name, 
        'Summiteer'
      ).then(result => {
        if (!result.success) {
          console.error(`Failed to send Summiteer application confirmation email:`, result.error);
        }
      }).catch(err => {
        console.error('Error sending Summiteer application confirmation:', err);
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Summiteer application submitted successfully",
        id: entry.id 
      });
    } catch (error: any) {
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

  // ============= ADMIN ROUTES =============
  
  // Get all newsletter signups
  app.get("/api/admin/newsletter-signups", ensureAdmin, async (req, res) => {
    try {
      const signups = await storage.getAllNewsletterSignups();
      res.json(signups);
    } catch (error) {
      console.error("Newsletter signups fetch error:", error);
      res.status(500).json({ error: "Failed to fetch newsletter signups" });
    }
  });

  // Delete newsletter signup
  app.delete("/api/admin/newsletter-signups/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteNewsletterSignup(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Newsletter signup delete error:", error);
      res.status(500).json({ error: "Failed to delete newsletter signup" });
    }
  });

  // Get all guest applications
  app.get("/api/admin/guest-applications", ensureAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllGuestApplications();
      res.json(applications);
    } catch (error) {
      console.error("Guest applications fetch error:", error);
      res.status(500).json({ error: "Failed to fetch guest applications" });
    }
  });

  // Delete guest application
  app.delete("/api/admin/guest-applications/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteGuestApplication(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Guest application delete error:", error);
      res.status(500).json({ error: "Failed to delete guest application" });
    }
  });

  // Get all volunteer applications
  app.get("/api/admin/volunteer-applications", ensureAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllVolunteerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Volunteer applications fetch error:", error);
      res.status(500).json({ error: "Failed to fetch volunteer applications" });
    }
  });

  // Delete volunteer application
  app.delete("/api/admin/volunteer-applications/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteVolunteerApplication(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Volunteer application delete error:", error);
      res.status(500).json({ error: "Failed to delete volunteer application" });
    }
  });

  // Get all contact submissions
  app.get("/api/admin/contact-submissions", ensureAdmin, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Contact submissions fetch error:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Delete contact submission
  app.delete("/api/admin/contact-submissions/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteContactSubmission(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Contact submission delete error:", error);
      res.status(500).json({ error: "Failed to delete contact submission" });
    }
  });

  // Get all summiteer applications
  app.get("/api/admin/summiteer-applications", ensureAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllSummiteerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Summiteer applications fetch error:", error);
      res.status(500).json({ error: "Failed to fetch summiteer applications" });
    }
  });

  // Delete summiteer application
  app.delete("/api/admin/summiteer-applications/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteSummiteerApplication(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Summiteer application delete error:", error);
      res.status(500).json({ error: "Failed to delete summiteer application" });
    }
  });

  // ============= CAST MEMBER PORTAL ROUTES =============
  
  // Get current cast member profile
  app.get("/api/cast/profile", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member profile not found" });
      }
      res.json(castMember);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Update cast member profile
  app.patch("/api/cast/profile", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // Get cast member's filming schedule
  app.get("/api/cast/schedule", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // Get cast member's episode appearances
  app.get("/api/cast/episodes", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      
      const episodes = await storage.getCastMemberEpisodes(castMember.id);
      res.json(episodes);
    } catch (error) {
      console.error("Episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  // ============= PARENT ROUTES =============

  // Get parent's own profile
  app.get("/api/parent/profile", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user!.id);
      if (!parent) {
        return res.status(404).json({ error: "Parent profile not found" });
      }
      res.json(parent);
    } catch (error) {
      console.error("Parent profile fetch error:", error);
      res.status(500).json({ error: "Failed to fetch parent profile" });
    }
  });

  // Get parent's child (cast member) profile
  app.get("/api/parent/child", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user!.id);
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

  // Get parent's child's filming schedule
  app.get("/api/parent/child/schedule", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user!.id);
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

  // Get parent's child's episode appearances
  app.get("/api/parent/child/episodes", ensureParent, async (req, res) => {
    try {
      const parent = await storage.getParentByUserId(req.user!.id);
      if (!parent) {
        return res.status(404).json({ error: "Parent profile not found" });
      }
      
      if (!parent.castMemberId) {
        return res.status(404).json({ error: "No child linked to parent profile" });
      }
      
      const episodes = await storage.getCastMemberEpisodes(parent.castMemberId);
      res.json(episodes);
    } catch (error) {
      console.error("Child episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch child's episodes" });
    }
  });

  // ============= BLOG POST ROUTES =============
  
  // Get all published blog posts (public)
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post (public)
  app.get("/api/blog/posts/:id", async (req, res) => {
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

  // Get my blog posts (cast member only)
  app.get("/api/cast/blog/posts", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // Create blog post (cast member only)
  app.post("/api/cast/blog/posts", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      
      const { title, content, excerpt, coverImageUrl, category, tags } = req.body;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
      
      const validatedData = insertBlogPostSchema.parse({
        title,
        slug,
        content,
        excerpt: excerpt || undefined,
        coverImageUrl: coverImageUrl || undefined,
        category: category || undefined,
        tags: tags || undefined,
        authorId: castMember.id,
        status: "draft",
        publishedAt: null,
      });
      
      // Ensure status is defined and nullable fields are properly converted
      const blogData = {
        ...validatedData,
        slug: slug, // Explicitly set the slug (non-optional)
        status: validatedData.status || "draft",
        excerpt: validatedData.excerpt ?? null,
        coverImageUrl: validatedData.coverImageUrl ?? null,
        category: validatedData.category ?? null,
        tags: validatedData.tags ?? null,
        publishedAt: validatedData.publishedAt ?? null,
      };
      
      const post = await storage.createBlogPost(blogData);
      res.status(201).json(post);
    } catch (error: any) {
      console.error("Blog post create error:", error);
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });

  // Update blog post (cast member only)
  app.patch("/api/cast/blog/posts/:id", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // Delete blog post (cast member only)
  app.delete("/api/cast/blog/posts/:id", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // Publish blog post (cast member only)
  app.patch("/api/cast/blog/posts/:id/publish", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }
      
      const post = await storage.getBlogPostById(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      if (post.authorId !== castMember.id) {
        return res.status(403).json({ error: "Not authorized to publish this post" });
      }
      
      const updated = await storage.updateBlogPost(post.id, { status: "published" });
      res.json(updated);
    } catch (error) {
      console.error("Blog post publish error:", error);
      res.status(500).json({ error: "Failed to publish blog post" });
    }
  });

  // Submit blog post for review (cast member only)
  app.post("/api/cast/blog/posts/:id/submit", ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // NOTE: Admin endpoints have been removed for security reasons.
  // These endpoints exposed sensitive PII (including minor and guardian data) without authentication.
  // 
  // To access submission data:
  // 1. Use the Database pane in Replit to view the production database directly
  // 2. Implement a proper admin panel with authentication when ready
  // 3. For development, you can query the database directly using the execute_sql_tool
  //
  // Tables available:
  // - newsletter_signups
  // - guest_applications
  // - volunteer_applications
  // - contact_submissions
  // - summiteer_applications (CONTAINS SENSITIVE MINOR DATA - requires extra protection)

  // ========== PUBLIC EPISODES API ==========
  
  // Get all published episodes
  app.get("/api/episodes", async (req, res) => {
    try {
      const episodes = await storage.getAllPublishedEpisodes();
      res.json(episodes);
    } catch (error) {
      console.error("Episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  // Get episode by slug
  app.get("/api/episodes/:slug", async (req, res) => {
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

  // Increment episode view count
  app.post("/api/episodes/:id/view", async (req, res) => {
    try {
      await storage.incrementEpisodeViews(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Episode view increment error:", error);
      if (error.message?.includes("not found")) {
        res.status(404).json({ error: "Episode not found" });
      } else {
        res.status(500).json({ error: "Failed to increment view count" });
      }
    }
  });

  // ========== PUBLIC BLOG API ==========
  
  // Get all published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
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

  // ========== SEARCH API ==========
  
  // Search across episodes, blog posts, and dossiers
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim().length === 0) {
        return res.json([]);
      }

      const searchTerm = query.toLowerCase().trim();
      const results: any[] = [];

      // Search episodes
      const episodes = await storage.getAllPublishedEpisodes();
      const matchingEpisodes = episodes.filter(episode => 
        episode.title.toLowerCase().includes(searchTerm) ||
        episode.description?.toLowerCase().includes(searchTerm) ||
        episode.topic?.toLowerCase().includes(searchTerm) ||
        episode.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      );

      matchingEpisodes.forEach(episode => {
        results.push({
          type: "episode",
          id: episode.id,
          title: episode.title,
          description: episode.description,
          slug: episode.slug,
          url: `/episodes/${episode.slug}`,
        });
      });

      // Search blog posts
      const blogPosts = await storage.getAllPublishedBlogPosts();
      const matchingPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm) ||
        post.content?.toLowerCase().includes(searchTerm) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      );

      matchingPosts.forEach(post => {
        results.push({
          type: "blog",
          id: post.id,
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          url: `/blog/${post.slug}`,
        });
      });

      // Search dossiers
      const dossiers = await storage.getAllDossiers();
      const matchingDossiers = dossiers.filter(dossier =>
        dossier.title.toLowerCase().includes(searchTerm) ||
        dossier.description?.toLowerCase().includes(searchTerm) ||
        dossier.topic?.toLowerCase().includes(searchTerm)
      );

      matchingDossiers.forEach(dossier => {
        results.push({
          type: "dossier",
          id: dossier.id,
          title: dossier.title,
          description: dossier.description,
          url: `/dossiers#${dossier.id}`,
        });
      });

      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });

  // ========== ACADEMIC CIVIC NILS TRACKER API (SOCIAL ANALYTICS) ==========
  
  // Create new analytics entry (cast members only)
  app.post("/api/analytics", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
      if (!castMember) {
        return res.status(404).json({ error: "Cast member not found" });
      }

      // Cast member ID derived from session only - not from request body
      const { platform, followers, likes, comments, shares, engagementRate, recordedAt } = req.body;
      
      const validatedData = insertSocialAnalyticsSchema.parse({
        castMemberId: castMember.id, // Always use authenticated user's cast member ID
        platform,
        followers: followers ?? 0,
        likes: likes ?? 0,
        comments: comments ?? 0,
        shares: shares ?? 0,
        engagementRate: engagementRate ?? null,
        recordedAt: recordedAt ? new Date(recordedAt) : new Date(),
      });
      
      // Normalize undefined to null for nullable fields
      const analyticsData = {
        ...validatedData,
        engagementRate: validatedData.engagementRate ?? null,
        recordedAt: validatedData.recordedAt ?? new Date(),
      };
      
      const analytics = await storage.createSocialAnalytics(analyticsData);
      res.status(201).json(analytics);
    } catch (error: any) {
      console.error("Analytics create error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid analytics data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create analytics entry" });
    }
  });

  // Get all analytics for authenticated cast member
  app.get("/api/analytics", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // Get latest analytics by platform for authenticated cast member
  app.get("/api/analytics/latest", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const castMember = await storage.getCastMemberByUserId(req.user!.id);
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

  // ============= OBJECT STORAGE ROUTES =============
  
  // Get upload URL for object entity
  app.post("/api/objects/upload", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Upload URL error:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  // Serve private objects with ACL check
  app.get("/objects/:objectPath(*)", ensureAuthenticated, async (req, res) => {
    const userId = req.user?.id?.toString();
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      const canAccess = await objectStorageService.canAccessObjectEntity({
        objectFile,
        userId,
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

  // Serve public objects
  app.get("/public-objects/:filePath(*)", async (req, res) => {
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

  // ============= EPISODE MANAGEMENT ROUTES =============
  
  // Create episode (cast members only)
  app.post("/api/episodes", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const { title, slug, description, episodeNumber, season, topic, tags, videoUrl, thumbnailUrl, duration, airDate, published } = req.body;
      
      if (!title || !slug || episodeNumber === undefined) {
        return res.status(400).json({ error: "Title, slug, and episode number are required" });
      }

      const objectStorageService = new ObjectStorageService();
      const userId = req.user!.id.toString();

      // Normalize and set ACL for video URL
      let normalizedVideoUrl = null;
      if (videoUrl) {
        normalizedVideoUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          videoUrl,
          { owner: userId, visibility: "public" }
        );
      }

      // Normalize and set ACL for thumbnail URL
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
        captionsUrl: null,
        transcriptUrl: null,
        audioDescriptionUrl: null,
        duration: duration || null,
        views: 0,
        airDate: airDate ? new Date(airDate) : null,
        published: published || false,
      });

      res.status(201).json(episode);
    } catch (error: any) {
      console.error("Episode create error:", error);
      res.status(500).json({ error: "Failed to create episode" });
    }
  });

  // Update episode (cast members only)
  app.put("/api/episodes/:id", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { videoUrl, thumbnailUrl, ...rest } = req.body;
      
      const objectStorageService = new ObjectStorageService();
      const userId = req.user!.id.toString();

      const updateData: any = { ...rest };

      // Normalize and set ACL for video URL if provided
      if (videoUrl) {
        updateData.videoUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          videoUrl,
          { owner: userId, visibility: "public" }
        );
      }

      // Normalize and set ACL for thumbnail URL if provided
      if (thumbnailUrl) {
        updateData.thumbnailUrl = await objectStorageService.trySetObjectEntityAclPolicy(
          thumbnailUrl,
          { owner: userId, visibility: "public" }
        );
      }

      const episode = await storage.updateEpisode(id, updateData);
      res.json(episode);
    } catch (error: any) {
      console.error("Episode update error:", error);
      res.status(500).json({ error: "Failed to update episode" });
    }
  });

  // Get all episodes (cast members only - includes unpublished)
  app.get("/api/episodes/manage", ensureAuthenticated, ensureCastMember, async (req, res) => {
    try {
      const allEpisodes = await storage.getAllEpisodes();
      res.json(allEpisodes);
    } catch (error) {
      console.error("Episodes fetch error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  // Delete episode (admin only)
  app.delete("/api/episodes/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteEpisode(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Episode delete error:", error);
      res.status(500).json({ error: "Failed to delete episode" });
    }
  });

  // Delete dossier (admin only)
  app.delete("/api/dossiers/:id", ensureAdmin, async (req, res) => {
    try {
      await storage.deleteDossier(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Dossier delete error:", error);
      res.status(500).json({ error: "Failed to delete dossier" });
    }
  });

  // ============= SEO AND CONTENT DISCOVERY =============
  
  // Sitemap.xml for search engines
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : "http://localhost:5000";

      const episodes = await storage.getAllPublishedEpisodes();
      const blogPosts = await storage.getAllPublishedBlogPosts();

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
        { url: "/privacy", priority: "0.3", changefreq: "yearly" },
      ];

      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Add static pages
      staticPages.forEach(page => {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
        sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
        sitemap += `    <priority>${page.priority}</priority>\n`;
        sitemap += `  </url>\n`;
      });

      // Add episode pages
      episodes.forEach((episode: any) => {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}/episodes/${episode.slug}</loc>\n`;
        if (episode.createdAt) {
          sitemap += `    <lastmod>${new Date(episode.createdAt).toISOString()}</lastmod>\n`;
        }
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.8</priority>\n`;
        sitemap += `  </url>\n`;
      });

      // Add blog post pages
      blogPosts.forEach((post: any) => {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        if (post.updatedAt) {
          sitemap += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n`;
        }
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.7</priority>\n`;
        sitemap += `  </url>\n`;
      });

      sitemap += '</urlset>';

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).send("Failed to generate sitemap");
    }
  });

  // robots.txt for search engine crawlers
  app.get("/robots.txt", (req, res) => {
    const baseUrl = process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : "http://localhost:5000";

    const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /parent-portal
Disallow: /educator-portal
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // RSS feed for blog posts
  app.get("/rss/blog.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : "http://localhost:5000";

      const blogPosts = await storage.getAllPublishedBlogPosts();
      const sortedPosts = blogPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 20); // Latest 20 posts

      let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
      rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
      rss += '  <channel>\n';
      rss += '    <title>Teen Summit 2.0 - Blog</title>\n';
      rss += '    <link>' + baseUrl + '/blog</link>\n';
      rss += '    <description>Youth voices on civic engagement, debate, and social issues from Teen Summit 2.0</description>\n';
      rss += '    <language>en-us</language>\n';
      rss += '    <atom:link href="' + baseUrl + '/rss/blog.xml" rel="self" type="application/rss+xml"/>\n';

      sortedPosts.forEach((post: any) => {
        const author = 'Teen Summit Team';
        const pubDate = new Date(post.createdAt).toUTCString();
        
        rss += '    <item>\n';
        rss += '      <title>' + escapeXml(post.title) + '</title>\n';
        rss += '      <link>' + baseUrl + '/blog/' + post.slug + '</link>\n';
        rss += '      <guid>' + baseUrl + '/blog/' + post.slug + '</guid>\n';
        rss += '      <pubDate>' + pubDate + '</pubDate>\n';
        rss += '      <author>' + escapeXml(author) + '</author>\n';
        if (post.excerpt) {
          rss += '      <description>' + escapeXml(post.excerpt) + '</description>\n';
        }
        rss += '    </item>\n';
      });

      rss += '  </channel>\n';
      rss += '</rss>';

      res.header('Content-Type', 'application/rss+xml');
      res.send(rss);
    } catch (error) {
      console.error("RSS feed generation error:", error);
      res.status(500).send("Failed to generate RSS feed");
    }
  });

  // RSS feed for episodes
  app.get("/rss/episodes.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : "http://localhost:5000";

      const episodes = await storage.getAllPublishedEpisodes();
      const sortedEpisodes = episodes.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 20); // Latest 20 episodes

      let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
      rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">\n';
      rss += '  <channel>\n';
      rss += '    <title>Teen Summit 2.0 - Episodes</title>\n';
      rss += '    <link>' + escapeXml(baseUrl + '/episodes') + '</link>\n';
      rss += '    <description>Debate, musicology, and podcasting episodes from Teen Summit 2.0 - a civic media platform empowering youth voices</description>\n';
      rss += '    <language>en-us</language>\n';
      rss += '    <copyright>© 2025 Teen Summit 2.0, University of Illinois Urbana-Champaign</copyright>\n';
      rss += '    <itunes:author>Teen Summit 2.0</itunes:author>\n';
      rss += '    <itunes:summary>A reimagined civic space empowering youth voices through debate, musicology, and podcasting</itunes:summary>\n';
      rss += '    <itunes:owner>\n';
      rss += '      <itunes:name>Teen Summit 2.0</itunes:name>\n';
      rss += '      <itunes:email>teensummit@illinois.edu</itunes:email>\n';
      rss += '    </itunes:owner>\n';
      rss += '    <itunes:category text="Education"/>\n';
      rss += '    <itunes:explicit>no</itunes:explicit>\n';
      rss += '    <atom:link href="' + escapeXml(baseUrl + '/rss/episodes.xml') + '" rel="self" type="application/rss+xml"/>\n';

      sortedEpisodes.forEach((episode: any) => {
        const pubDate = new Date(episode.createdAt).toUTCString();
        const episodeUrl = baseUrl + '/episodes/' + episode.slug;
        
        rss += '    <item>\n';
        rss += '      <title>' + escapeXml(episode.title) + '</title>\n';
        rss += '      <link>' + escapeXml(episodeUrl) + '</link>\n';
        rss += '      <guid isPermaLink="true">' + escapeXml(episodeUrl) + '</guid>\n';
        rss += '      <pubDate>' + pubDate + '</pubDate>\n';
        if (episode.description) {
          rss += '      <description>' + escapeXml(episode.description) + '</description>\n';
          rss += '      <itunes:summary>' + escapeXml(episode.description) + '</itunes:summary>\n';
        }
        if (episode.duration) {
          rss += '      <itunes:duration>' + escapeXml(episode.duration) + '</itunes:duration>\n';
        }
        if (episode.episodeNumber) {
          rss += '      <itunes:episode>' + episode.episodeNumber + '</itunes:episode>\n';
        }
        if (episode.season) {
          rss += '      <itunes:season>' + episode.season + '</itunes:season>\n';
        }
        if (episode.videoUrl) {
          // Ensure absolute URL for video
          const videoUrl = episode.videoUrl.startsWith('http') ? episode.videoUrl : baseUrl + episode.videoUrl;
          rss += '      <enclosure url="' + escapeXml(videoUrl) + '" type="video/mp4"/>\n';
        }
        rss += '      <itunes:explicit>no</itunes:explicit>\n';
        rss += '    </item>\n';
      });

      rss += '  </channel>\n';
      rss += '</rss>';

      res.header('Content-Type', 'application/rss+xml');
      res.send(rss);
    } catch (error) {
      console.error("RSS feed generation error:", error);
      res.status(500).send("Failed to generate RSS feed");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
