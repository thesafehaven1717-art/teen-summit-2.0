import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  LogOut, 
  FileText, 
  Video, 
  Users, 
  Mail, 
  MessageSquare,
  Briefcase,
  UserPlus,
  Eye,
  Trash2,
  Edit,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

export default function AdminPortalPage() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch all data
  const { data: episodes } = useQuery<any[]>({
    queryKey: ["/api/episodes"],
    enabled: isAuthenticated,
  });

  const { data: blogPosts } = useQuery<any[]>({
    queryKey: ["/api/blog/posts"],
    enabled: isAuthenticated,
  });

  const { data: dossiers } = useQuery<any[]>({
    queryKey: ["/api/dossiers"],
    enabled: isAuthenticated,
  });

  const { data: summiteerApps } = useQuery<any[]>({
    queryKey: ["/api/admin/summiteer-applications"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: guestApps } = useQuery<any[]>({
    queryKey: ["/api/admin/guest-applications"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: volunteerApps } = useQuery<any[]>({
    queryKey: ["/api/admin/volunteer-applications"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: contactSubmissions } = useQuery<any[]>({
    queryKey: ["/api/admin/contact-submissions"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: newsletterSignups } = useQuery<any[]>({
    queryKey: ["/api/admin/newsletter-signups"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
    if (!isLoading && isAuthenticated && user?.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin portal.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, user, setLocation, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    setLocation("/");
  };

  const publishedEpisodes = episodes?.filter((ep: any) => ep.published) || [];
  const draftEpisodes = episodes?.filter((ep: any) => !ep.published) || [];
  const publishedPosts = blogPosts?.filter((post: any) => post.published) || [];
  const draftPosts = blogPosts?.filter((post: any) => !post.published) || [];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-montserrat font-bold text-2xl text-primary">
              Teen Summit 2.0
            </h1>
            <span className="text-muted-foreground">|</span>
            <span className="font-semibold">Admin Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-montserrat font-bold text-3xl mb-2">
            Production Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage content, applications, and platform administration
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="applications" data-testid="tab-applications">Applications</TabsTrigger>
            <TabsTrigger value="episodes" data-testid="tab-episodes">Episodes</TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">Blog</TabsTrigger>
            <TabsTrigger value="dossiers" data-testid="tab-dossiers">Dossiers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Episodes
                  </CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{episodes?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {publishedEpisodes.length} published, {draftEpisodes.length} drafts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Blog Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogPosts?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {publishedPosts.length} published, {draftPosts.length} drafts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Summiteer Apps
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summiteerApps?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Applications received
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Newsletter
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newsletterSignups?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Subscribers
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest submissions across all forms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm">Summiteer Applications</span>
                      </div>
                      <Badge>{summiteerApps?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-accent" />
                        <span className="text-sm">Guest Applications</span>
                      </div>
                      <Badge>{guestApps?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="text-sm">Volunteer Applications</span>
                      </div>
                      <Badge>{volunteerApps?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-accent" />
                        <span className="text-sm">Contact Submissions</span>
                      </div>
                      <Badge>{contactSubmissions?.length || 0}</Badge>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setActiveTab("applications")}
                    data-testid="button-view-applications"
                  >
                    View All Applications
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setLocation("/dashboard/episodes/new")}
                    data-testid="button-create-episode"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Create New Episode
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setLocation("/dashboard/blog/new")}
                    data-testid="button-create-post"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Create Blog Post
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setLocation("/dashboard/dossiers/new")}
                    data-testid="button-create-dossier"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Create Dossier
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setLocation("/dashboard/filming")}
                    data-testid="button-manage-schedule"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Filming Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <ApplicationsView
              summiteerApps={summiteerApps}
              guestApps={guestApps}
              volunteerApps={volunteerApps}
              contactSubmissions={contactSubmissions}
              newsletterSignups={newsletterSignups}
            />
          </TabsContent>

          {/* Episodes Tab */}
          <TabsContent value="episodes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Episodes Management</h3>
              <Button onClick={() => setLocation("/dashboard/episodes/new")} data-testid="button-new-episode">
                <Video className="h-4 w-4 mr-2" />
                New Episode
              </Button>
            </div>
            <EpisodesTable episodes={episodes || []} />
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Blog Posts Management</h3>
              <Button onClick={() => setLocation("/dashboard/blog/new")} data-testid="button-new-post">
                <FileText className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
            <BlogPostsTable posts={blogPosts || []} />
          </TabsContent>

          {/* Dossiers Tab */}
          <TabsContent value="dossiers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Dossiers Management</h3>
              <Button onClick={() => setLocation("/dashboard/dossiers/new")} data-testid="button-new-dossier">
                <FileText className="h-4 w-4 mr-2" />
                New Dossier
              </Button>
            </div>
            <DossiersTable dossiers={dossiers || []} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Applications View Component
function ApplicationsView({ 
  summiteerApps, 
  guestApps, 
  volunteerApps, 
  contactSubmissions, 
  newsletterSignups 
}: any) {
  const [activeAppTab, setActiveAppTab] = useState("summiteer");

  return (
    <Tabs value={activeAppTab} onValueChange={setActiveAppTab}>
      <TabsList>
        <TabsTrigger value="summiteer" data-testid="subtab-summiteer">
          Summiteer ({summiteerApps?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="guest" data-testid="subtab-guest">
          Guest ({guestApps?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="volunteer" data-testid="subtab-volunteer">
          Volunteer ({volunteerApps?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="contact" data-testid="subtab-contact">
          Contact ({contactSubmissions?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="newsletter" data-testid="subtab-newsletter">
          Newsletter ({newsletterSignups?.length || 0})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="summiteer">
        <SummiteerApplicationsTable applications={summiteerApps || []} />
      </TabsContent>

      <TabsContent value="guest">
        <GuestApplicationsTable applications={guestApps || []} />
      </TabsContent>

      <TabsContent value="volunteer">
        <VolunteerApplicationsTable applications={volunteerApps || []} />
      </TabsContent>

      <TabsContent value="contact">
        <ContactSubmissionsTable submissions={contactSubmissions || []} />
      </TabsContent>

      <TabsContent value="newsletter">
        <NewsletterSignupsTable signups={newsletterSignups || []} />
      </TabsContent>
    </Tabs>
  );
}

// Application Tables
function SummiteerApplicationsTable({ applications }: { applications: any[] }) {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/summiteer-applications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/summiteer-applications"] });
      toast({ title: "Application deleted successfully" });
    },
  });

  if (!applications.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No applications yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app: any) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.age}</TableCell>
              <TableCell>{app.school}</TableCell>
              <TableCell>{app.grade}</TableCell>
              <TableCell>{format(new Date(app.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(app.id)}
                  data-testid={`button-delete-app-${app.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function GuestApplicationsTable({ applications }: { applications: any[] }) {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/guest-applications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/guest-applications"] });
      toast({ title: "Application deleted successfully" });
    },
  });

  if (!applications.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No applications yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app: any) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.phone || "—"}</TableCell>
              <TableCell className="max-w-xs truncate">{app.message}</TableCell>
              <TableCell>{format(new Date(app.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(app.id)}
                  data-testid={`button-delete-guest-${app.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function VolunteerApplicationsTable({ applications }: { applications: any[] }) {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/volunteer-applications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/volunteer-applications"] });
      toast({ title: "Application deleted successfully" });
    },
  });

  if (!applications.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No applications yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Interests</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app: any) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.phone || "—"}</TableCell>
              <TableCell className="max-w-xs truncate">{app.interests}</TableCell>
              <TableCell>{format(new Date(app.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(app.id)}
                  data-testid={`button-delete-volunteer-${app.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function ContactSubmissionsTable({ submissions }: { submissions: any[] }) {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/contact-submissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({ title: "Submission deleted successfully" });
    },
  });

  if (!submissions.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No submissions yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((sub: any) => (
            <TableRow key={sub.id}>
              <TableCell className="font-medium">{sub.name}</TableCell>
              <TableCell>{sub.email}</TableCell>
              <TableCell>{sub.subject}</TableCell>
              <TableCell className="max-w-xs truncate">{sub.message}</TableCell>
              <TableCell>{format(new Date(sub.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(sub.id)}
                  data-testid={`button-delete-contact-${sub.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function NewsletterSignupsTable({ signups }: { signups: any[] }) {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/newsletter-signups/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletter-signups"] });
      toast({ title: "Signup deleted successfully" });
    },
  });

  if (!signups.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No signups yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signups.map((signup: any) => (
            <TableRow key={signup.id}>
              <TableCell className="font-medium">{signup.email}</TableCell>
              <TableCell>{format(new Date(signup.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(signup.id)}
                  data-testid={`button-delete-newsletter-${signup.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// Episodes Table
function EpisodesTable({ episodes }: { episodes: any[] }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/episodes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/episodes"] });
      toast({ title: "Episode deleted successfully" });
    },
  });

  if (!episodes.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No episodes yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Season</TableHead>
            <TableHead>Episode</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {episodes.map((episode: any) => (
            <TableRow key={episode.id}>
              <TableCell className="font-medium">{episode.title}</TableCell>
              <TableCell>{episode.season}</TableCell>
              <TableCell>{episode.episodeNumber}</TableCell>
              <TableCell>
                <Badge variant={episode.published ? "default" : "secondary"}>
                  {episode.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(episode.airDate), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setLocation(`/dashboard/episodes/${episode.id}`)}
                    data-testid={`button-edit-episode-${episode.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteMutation.mutate(episode.id)}
                    data-testid={`button-delete-episode-${episode.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// Blog Posts Table
function BlogPostsTable({ posts }: { posts: any[] }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/blog/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Post deleted successfully" });
    },
  });

  if (!posts.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No posts yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: any) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(post.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setLocation(`/dashboard/blog/${post.id}`)}
                    data-testid={`button-edit-post-${post.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteMutation.mutate(post.id)}
                    data-testid={`button-delete-post-${post.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// Dossiers Table
function DossiersTable({ dossiers }: { dossiers: any[] }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/dossiers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dossiers"] });
      toast({ title: "Dossier deleted successfully" });
    },
  });

  if (!dossiers.length) {
    return <Card><CardContent className="py-8 text-center text-muted-foreground">No dossiers yet</CardContent></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dossiers.map((dossier: any) => (
            <TableRow key={dossier.id}>
              <TableCell className="font-medium">{dossier.title}</TableCell>
              <TableCell className="max-w-md truncate">{dossier.description}</TableCell>
              <TableCell>{format(new Date(dossier.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setLocation(`/dashboard/dossiers/${dossier.id}`)}
                    data-testid={`button-edit-dossier-${dossier.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteMutation.mutate(dossier.id)}
                    data-testid={`button-delete-dossier-${dossier.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
