import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import type { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      passwordHash: string;
      role: string;
      createdAt: Date;
    }
  }
}

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

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
}

export function ensureCastMember(req: any, res: any, next: any) {
  if (req.isAuthenticated() && (req.user.role === "cast_member" || req.user.role === "admin")) {
    return next();
  }
  res.status(403).json({ error: "Access denied. Cast members only." });
}

export function ensureAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ error: "Access denied. Administrators only." });
}

export function ensureParent(req: any, res: any, next: any) {
  if (req.isAuthenticated() && (req.user.role === "parent" || req.user.role === "admin")) {
    return next();
  }
  res.status(403).json({ error: "Access denied. Parents only." });
}

export function ensureEducator(req: any, res: any, next: any) {
  if (req.isAuthenticated() && (req.user.role === "educator" || req.user.role === "admin")) {
    return next();
  }
  res.status(403).json({ error: "Access denied. Educators only." });
}

export default passport;
