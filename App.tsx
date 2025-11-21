import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import { Navigation } from "@/components/navigation";
import { BackToTop } from "@/components/back-to-top";
import { SkipToContent } from "@/components/skip-to-content";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = lazy(() => import("@/pages/home"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const ForgotPasswordPage = lazy(() => import("@/pages/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/reset-password"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const NewsletterPage = lazy(() => import("@/pages/newsletter"));
const ApplySummiteerPage = lazy(() => import("@/pages/apply-summiteer"));
const ApplyVolunteerPage = lazy(() => import("@/pages/apply-volunteer"));
const ApplyGuestPage = lazy(() => import("@/pages/apply-guest"));
const EpisodesPage = lazy(() => import("@/pages/episodes"));
const EpisodeDetailPage = lazy(() => import("@/pages/episode-detail"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const DossiersPage = lazy(() => import("@/pages/dossiers"));
const ContactPage = lazy(() => import("@/pages/contact"));
const ParentPortalPage = lazy(() => import("@/pages/parent-portal"));
const EducatorPortalPage = lazy(() => import("@/pages/educator-portal"));
const AdminPortalPage = lazy(() => import("@/pages/admin-portal"));
const AcknowledgmentsPage = lazy(() => import("@/pages/acknowledgments"));
const TermsOfUsePage = lazy(() => import("@/pages/terms"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/episodes" component={EpisodesPage} />
      <Route path="/episodes/:slug" component={EpisodeDetailPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/dossiers" component={DossiersPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/acknowledgments" component={AcknowledgmentsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/parent-portal" component={ParentPortalPage} />
      <Route path="/educator-portal" component={EducatorPortalPage} />
      <Route path="/admin-portal" component={AdminPortalPage} />
      <Route path="/newsletter" component={NewsletterPage} />
      <Route path="/apply/summiteer" component={ApplySummiteerPage} />
      <Route path="/apply/volunteer" component={ApplyVolunteerPage} />
      <Route path="/apply/guest" component={ApplyGuestPage} />
      <Route path="/terms" component={TermsOfUsePage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <SkipToContent />
          <Navigation />
          <Suspense fallback={<PageLoadingFallback />}>
            <main id="main-content" role="main" tabIndex={-1} className="focus:outline-none">
              <Router />
            </main>
          </Suspense>
          <BackToTop />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
