import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, FileText, BarChart3, User, LogOut, TrendingUp, Instagram, Youtube, Twitter, Linkedin, Music, Lightbulb, BookOpen, Sparkles, Target, CheckCircle2, Video, Upload, Pencil, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ObjectUploader } from "@/components/ObjectUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const analyticsFormSchema = z.object({
  platform: z.enum(["instagram", "tiktok", "youtube", "twitter", "linkedin"]),
  followers: z.coerce.number().int().min(0).default(0),
  likes: z.coerce.number().int().min(0).default(0),
  comments: z.coerce.number().int().min(0).default(0),
  shares: z.coerce.number().int().min(0).default(0),
  engagementRate: z.preprocess(
    (val) => val === "" || val === null || val === undefined ? undefined : val,
    z.coerce.number().int().min(0).optional()
  ),
});

const episodeFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  episodeNumber: z.coerce.number().int().min(1),
  season: z.coerce.number().int().min(1).default(1),
  topic: z.string().optional(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  duration: z.string().optional(),
  published: z.boolean().default(false),
});

const dossierFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  topic: z.string().min(1, "Topic is required"),
  description: z.string().optional(),
  fileUrl: z.string().min(1, "File is required"),
  fileSize: z.coerce.number().optional(),
  published: z.boolean().default(true),
});

const blogPostFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const platformIcons = {
  instagram: Instagram,
  tiktok: Music,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
};

const platformColors = {
  instagram: "text-primary",
  tiktok: "text-primary",
  youtube: "text-accent",
  twitter: "text-accent",
  linkedin: "text-accent",
};

export default function DashboardPage() {
  const { user, castMember, logout, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAnalyticsForm, setShowAnalyticsForm] = useState(false);
  const [showEpisodeDialog, setShowEpisodeDialog] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<any>(null);
  const [videoUploadUrl, setVideoUploadUrl] = useState<string>("");
  const [thumbnailUploadUrl, setThumbnailUploadUrl] = useState<string>("");
  const [showDossierForm, setShowDossierForm] = useState(false);
  const [dossierFileUrl, setDossierFileUrl] = useState<string>("");
  const [dossierFileSize, setDossierFileSize] = useState<number>(0);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogCoverImageUrl, setBlogCoverImageUrl] = useState<string>("");

  // Fetch latest analytics
  const { data: latestAnalytics, isLoading: analyticsLoading } = useQuery<any[]>({
    queryKey: ["/api/analytics/latest"],
    enabled: isAuthenticated,
  });

  // Analytics form
  const analyticsForm = useForm<z.infer<typeof analyticsFormSchema>>({
    resolver: zodResolver(analyticsFormSchema),
    defaultValues: {
      platform: "instagram",
      followers: 0,
      likes: 0,
      comments: 0,
      shares: 0,
    },
  });

  // Analytics mutation
  const analyticsM = useMutation({
    mutationFn: async (data: z.infer<typeof analyticsFormSchema>) => {
      return await apiRequest("POST", "/api/analytics", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/latest"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      toast({
        title: "Analytics Added",
        description: "Your social media metrics have been recorded.",
      });
      setShowAnalyticsForm(false);
      analyticsForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add analytics entry.",
        variant: "destructive",
      });
    },
  });

  const onAnalyticsSubmit = (data: z.infer<typeof analyticsFormSchema>) => {
    const payload = {
      platform: data.platform,
      followers: Number(data.followers),
      likes: Number(data.likes),
      comments: Number(data.comments),
      shares: Number(data.shares),
      engagementRate: data.engagementRate !== undefined ? Number(data.engagementRate) : undefined,
    };
    analyticsM.mutate(payload);
  };

  // Episode queries and mutations
  const { data: episodes, isLoading: episodesLoading } = useQuery<any[]>({
    queryKey: ["/api/episodes/manage"],
    enabled: isAuthenticated,
  });

  const episodeForm = useForm<z.infer<typeof episodeFormSchema>>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      episodeNumber: 1,
      season: 1,
      topic: "",
      videoUrl: "",
      thumbnailUrl: "",
      duration: "",
      published: false,
    },
  });

  const episodeCreateM = useMutation({
    mutationFn: async (data: z.infer<typeof episodeFormSchema>) => {
      return await apiRequest("POST", "/api/episodes", {
        ...data,
        videoUrl: videoUploadUrl || undefined,
        thumbnailUrl: thumbnailUploadUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/episodes/manage"] });
      queryClient.invalidateQueries({ queryKey: ["/api/episodes"] });
      toast({
        title: "Episode Created",
        description: "Your episode has been created successfully.",
      });
      setShowEpisodeDialog(false);
      setVideoUploadUrl("");
      setThumbnailUploadUrl("");
      episodeForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create episode.",
        variant: "destructive",
      });
    },
  });

  const episodeUpdateM = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return await apiRequest("PUT", `/api/episodes/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/episodes/manage"] });
      toast({
        title: "Episode Updated",
        description: "Your episode has been updated successfully.",
      });
      setShowEpisodeDialog(false);
      setEditingEpisode(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update episode.",
        variant: "destructive",
      });
    },
  });

  const getUploadUrl = async () => {
    const response = await apiRequest("POST", "/api/objects/upload", {});
    return { method: "PUT" as const, url: response.uploadURL };
  };

  const onEpisodeSubmit = (data: z.infer<typeof episodeFormSchema>) => {
    episodeCreateM.mutate(data);
  };

  // Dossier queries and mutations
  const { data: dossiers, isLoading: dossiersLoading } = useQuery<any[]>({
    queryKey: ["/api/dossiers"],
    enabled: isAuthenticated,
  });

  const dossierForm = useForm<z.infer<typeof dossierFormSchema>>({
    resolver: zodResolver(dossierFormSchema),
    defaultValues: {
      title: "",
      topic: "",
      description: "",
      fileUrl: "",
      published: true,
    },
  });

  const dossierCreateM = useMutation({
    mutationFn: async (data: z.infer<typeof dossierFormSchema>) => {
      return await apiRequest("POST", "/api/dossiers", {
        ...data,
        fileUrl: dossierFileUrl,
        fileSize: dossierFileSize,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dossiers"] });
      toast({
        title: "Dossier Uploaded",
        description: "Your dossier has been uploaded successfully.",
      });
      setShowDossierForm(false);
      setDossierFileUrl("");
      setDossierFileSize(0);
      dossierForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload dossier.",
        variant: "destructive",
      });
    },
  });

  const onDossierSubmit = (data: z.infer<typeof dossierFormSchema>) => {
    if (!dossierFileUrl) {
      toast({
        title: "Error",
        description: "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }
    dossierCreateM.mutate(data);
  };

  //Blog post queries and mutations
  const { data: blogPosts, isLoading: blogPostsLoading } = useQuery<any[]>({
    queryKey: ["/api/cast/blog/posts"],
    enabled: isAuthenticated,
  });

  const blogPostForm = useForm<z.infer<typeof blogPostFormSchema>>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: [],
    },
  });

  const blogPostCreateM = useMutation({
    mutationFn: async (data: z.infer<typeof blogPostFormSchema>) => {
      const { title, content, excerpt, category, tags } = data;
      return await apiRequest("POST", "/api/cast/blog/posts", {
        title,
        content,
        excerpt: excerpt || undefined,
        category: category || undefined,
        tags: tags && tags.length > 0 ? tags : undefined,
        coverImageUrl: blogCoverImageUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cast/blog/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Blog Post Created",
        description: "Your blog post has been created as a draft.",
      });
      setShowBlogForm(false);
      setBlogCoverImageUrl("");
      blogPostForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post.",
        variant: "destructive",
      });
    },
  });

  const onBlogPostSubmit = (data: z.infer<typeof blogPostFormSchema>) => {
    blogPostCreateM.mutate(data);
  };

  // Blog post publish mutation
  const blogPostPublishM = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("PATCH", `/api/cast/blog/posts/${id}/publish`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cast/blog/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Blog Post Published",
        description: "Your blog post is now live.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to publish blog post.",
        variant: "destructive",
      });
    },
  });

  // Blog post delete mutation
  const blogPostDeleteM = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/cast/blog/posts/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cast/blog/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Blog Post Deleted",
        description: "Your blog post has been deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post.",
        variant: "destructive",
      });
    },
  });

  const isAdmin = user?.role === "admin";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Don't render anything if not authenticated (redirect is happening)
  if (!isAuthenticated) {
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

  const initials = castMember?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "CM";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-montserrat font-bold text-2xl text-primary">
              Teen Summit 2.0
            </h1>
            <span className="text-muted-foreground">|</span>
            <span className="font-semibold">Cast Member Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={castMember?.avatarUrl || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-sm">{castMember?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-montserrat font-bold text-3xl mb-2">
            Welcome back, {castMember?.name?.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground">
            Manage your content, schedule, and portfolio
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 max-w-5xl">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="episodes" data-testid="tab-episodes">
              <Video className="h-4 w-4 mr-2" />
              Episodes
            </TabsTrigger>
            <TabsTrigger value="nil-tracker" data-testid="tab-nil-tracker">
              <TrendingUp className="h-4 w-4 mr-2" />
              Academic Civic NILS
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">
              <FileText className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="dossiers" data-testid="tab-dossiers">
              <BookOpen className="h-4 w-4 mr-2" />
              Dossiers
            </TabsTrigger>
            <TabsTrigger value="schedule" data-testid="tab-schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="profile" data-testid="tab-profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blog Posts</CardTitle>
                  <CardDescription>Your published articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Episodes</CardTitle>
                  <CardDescription>Your appearances</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming</CardTitle>
                  <CardDescription>Filming dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">0</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Complete these steps to make the most of your portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Complete your profile</p>
                    <p className="text-sm text-muted-foreground">
                      Add your bio and social media links
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Write your first blog post</p>
                    <p className="text-sm text-muted-foreground">
                      Share your thoughts with the community
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Check your schedule</p>
                    <p className="text-sm text-muted-foreground">
                      View upcoming filming dates and events
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="episodes" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Manage Episodes</h3>
                <p className="text-muted-foreground">Create and manage video episodes</p>
              </div>
              <Dialog open={showEpisodeDialog} onOpenChange={setShowEpisodeDialog}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-episode">
                    <Upload className="h-4 w-4 mr-2" />
                    Create Episode
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Episode</DialogTitle>
                  </DialogHeader>
                  <Form {...episodeForm}>
                    <form onSubmit={episodeForm.handleSubmit(onEpisodeSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={episodeForm.control} name="title" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Episode title" {...field} data-testid="input-episode-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={episodeForm.control} name="slug" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="episode-slug" {...field} data-testid="input-episode-slug" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={episodeForm.control} name="description" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Episode description" {...field} data-testid="textarea-episode-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-3 gap-4">
                        <FormField control={episodeForm.control} name="episodeNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Episode #</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-episode-number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={episodeForm.control} name="season" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Season</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-season" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={episodeForm.control} name="duration" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input placeholder="45:30" {...field} data-testid="input-duration" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={episodeForm.control} name="topic" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topic</FormLabel>
                          <FormControl>
                            <Input placeholder="Main debate topic" {...field} data-testid="input-topic" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Video Upload</label>
                        <ObjectUploader maxNumberOfFiles={1} maxFileSize={524288000} onGetUploadParameters={getUploadUrl} onComplete={(result) => { if (result.successful[0]) setVideoUploadUrl(result.successful[0].uploadURL); }}>
                          <Upload className="h-4 w-4 mr-2" />
                          {videoUploadUrl ? "Video Uploaded ✓" : "Upload Video"}
                        </ObjectUploader>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Thumbnail Upload</label>
                        <ObjectUploader maxNumberOfFiles={1} maxFileSize={10485760} onGetUploadParameters={getUploadUrl} onComplete={(result) => { if (result.successful[0]) setThumbnailUploadUrl(result.successful[0].uploadURL); }}>
                          <Upload className="h-4 w-4 mr-2" />
                          {thumbnailUploadUrl ? "Thumbnail Uploaded ✓" : "Upload Thumbnail"}
                        </ObjectUploader>
                      </div>
                      <Button type="submit" disabled={episodeCreateM.isPending} data-testid="button-submit-episode">
                        {episodeCreateM.isPending ? "Creating..." : "Create Episode"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {episodesLoading && <p>Loading episodes...</p>}
              {episodes && episodes.length === 0 && <Card><CardContent className="p-6"><p className="text-muted-foreground">No episodes yet. Create your first episode!</p></CardContent></Card>}
              {episodes && episodes.map((episode: any) => (
                <Card key={episode.id} data-testid={`episode-card-${episode.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>S{episode.season}E{episode.episodeNumber}: {episode.title}</CardTitle>
                        <CardDescription>{episode.topic || episode.description || "No description"}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${episode.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {episode.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {episode.duration && <span>⏱️ {episode.duration}</span>}
                      {episode.views > 0 && <span>👁️ {episode.views} views</span>}
                      {episode.videoUrl && <span>🎬 Video</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nil-tracker" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Academic Civic NILS Tracker</h3>
                <p className="text-muted-foreground">Track your social media growth and engagement</p>
              </div>
              {!showAnalyticsForm && (
                <Button onClick={() => setShowAnalyticsForm(true)} data-testid="button-add-analytics">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Add Analytics
                </Button>
              )}
            </div>

            {showAnalyticsForm && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Add Analytics Entry</CardTitle>
                      <CardDescription>Record your current social media metrics</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowAnalyticsForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...analyticsForm}>
                    <form onSubmit={analyticsForm.handleSubmit(onAnalyticsSubmit)} className="space-y-4">
                      <FormField
                        control={analyticsForm.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-platform">
                                  <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="tiktok">TikTok</SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={analyticsForm.control}
                          name="followers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Followers</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  data-testid="input-followers"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={analyticsForm.control}
                          name="likes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Likes</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  data-testid="input-likes"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={analyticsForm.control}
                          name="comments"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Comments</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  data-testid="input-comments"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={analyticsForm.control}
                          name="shares"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shares</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  data-testid="input-shares"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" disabled={analyticsM.isPending} data-testid="button-submit-analytics">
                        {analyticsM.isPending ? "Adding..." : "Add Analytics"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {analyticsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading analytics...</p>
              </div>
            ) : latestAnalytics && Array.isArray(latestAnalytics) && latestAnalytics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestAnalytics.map((analytics: any) => {
                  const PlatformIcon = platformIcons[analytics.platform as keyof typeof platformIcons];
                  const iconColor = platformColors[analytics.platform as keyof typeof platformColors];
                  return (
                    <Card key={analytics.id} data-testid={`card-analytics-${analytics.platform}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="capitalize">{analytics.platform}</CardTitle>
                          <PlatformIcon className={`h-6 w-6 ${iconColor}`} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Followers:</span>
                            <span className="font-semibold" data-testid={`text-followers-${analytics.platform}`}>
                              {analytics.followers.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Likes:</span>
                            <span className="font-semibold">{analytics.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Comments:</span>
                            <span className="font-semibold">{analytics.comments.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shares:</span>
                            <span className="font-semibold">{analytics.shares.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No analytics yet</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start tracking your social media growth across platforms
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Brand Growth Resources */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Grow Your Personal Brand</h3>
                </div>
                {(!latestAnalytics || !Array.isArray(latestAnalytics) || latestAnalytics.every((a: any) => a.followers === 0)) && (
                  <Button 
                    onClick={() => setShowAnalyticsForm(true)} 
                    variant="outline" 
                    size="sm"
                    data-testid="button-start-tracking"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Start Tracking
                  </Button>
                )}
              </div>
              
              {latestAnalytics && Array.isArray(latestAnalytics) && latestAnalytics.some((a: any) => a.followers > 0) && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">You're tracking {latestAnalytics.filter((a: any) => a.followers > 0).length} platform{latestAnalytics.filter((a: any) => a.followers > 0).length !== 1 ? 's' : ''}!</p>
                        <p className="text-sm text-muted-foreground">
                          Check out the platform-specific strategies below to maximize your growth on{' '}
                          {latestAnalytics
                            .filter((a: any) => a.followers > 0)
                            .map((a: any) => a.platform)
                            .slice(0, 3)
                            .join(', ')
                            .replace(/, ([^,]*)$/, ' and $1')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Ideas */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      <CardTitle>Content Ideas</CardTitle>
                    </div>
                    <CardDescription>
                      Fresh ideas for your social media posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Behind-the-Scenes</p>
                          <p className="text-sm text-muted-foreground">Share your Teen Summit filming days, rehearsals, and preparation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Educational Content</p>
                          <p className="text-sm text-muted-foreground">Teach what you learn in debate, musicology, or podcasting</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Personal Journey</p>
                          <p className="text-sm text-muted-foreground">Share your growth, challenges overcome, and lessons learned</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Community Engagement</p>
                          <p className="text-sm text-muted-foreground">Q&A sessions, polls, and responding to your followers</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Collaborations</p>
                          <p className="text-sm text-muted-foreground">Team up with other cast members for joint content</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Best Practices */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent" />
                      <CardTitle>Growth Tips</CardTitle>
                    </div>
                    <CardDescription>
                      Best practices for building your audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Post Consistently</p>
                          <p className="text-sm text-muted-foreground">Create a schedule and stick to it - consistency builds trust</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Engage Authentically</p>
                          <p className="text-sm text-muted-foreground">Reply to comments, ask questions, and build real connections</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Use Hashtags Wisely</p>
                          <p className="text-sm text-muted-foreground">Mix popular and niche tags relevant to your content</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Track Your Analytics</p>
                          <p className="text-sm text-muted-foreground">Use this tracker to see what content performs best</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Stay Positive & Professional</p>
                          <p className="text-sm text-muted-foreground">Represent Teen Summit values in all your content</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Platform-Specific Guidance */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <CardTitle>Platform-Specific Strategies</CardTitle>
                  </div>
                  <CardDescription>
                    Tailor your content for each platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(() => {
                      const trackedPlatforms = latestAnalytics && Array.isArray(latestAnalytics) 
                        ? latestAnalytics.filter((a: any) => a.followers > 0).map((a: any) => a.platform)
                        : [];
                      const isTracking = (platform: string) => trackedPlatforms.includes(platform);

                      return (
                        <>
                          <div className={`space-y-2 ${isTracking('instagram') ? 'ring-2 ring-primary/20 rounded-lg p-4 -m-4' : ''}`}>
                            <div className="flex items-center gap-2">
                              <Instagram className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold">Instagram</h4>
                              {isTracking('instagram') && <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />}
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• High-quality photos and short videos</li>
                              <li>• Use Stories for daily updates</li>
                              <li>• Reels for trending content</li>
                              <li>• Carousel posts for storytelling</li>
                            </ul>
                          </div>

                          <div className={`space-y-2 ${isTracking('tiktok') ? 'ring-2 ring-primary/20 rounded-lg p-4 -m-4' : ''}`}>
                            <div className="flex items-center gap-2">
                              <Music className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold">TikTok</h4>
                              {isTracking('tiktok') && <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />}
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Short, engaging 15-60 sec videos</li>
                              <li>• Use trending sounds and effects</li>
                              <li>• Hook viewers in first 3 seconds</li>
                              <li>• Post 1-3 times daily</li>
                            </ul>
                          </div>

                          <div className={`space-y-2 ${isTracking('youtube') ? 'ring-2 ring-accent/20 rounded-lg p-4 -m-4' : ''}`}>
                            <div className="flex items-center gap-2">
                              <Youtube className="h-5 w-5 text-accent" />
                              <h4 className="font-semibold">YouTube</h4>
                              {isTracking('youtube') && <CheckCircle2 className="h-4 w-4 text-accent ml-auto" />}
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Longer-form content (5-15 min)</li>
                              <li>• Strong titles and thumbnails</li>
                              <li>• Organize into playlists</li>
                              <li>• Shorts for quick highlights</li>
                            </ul>
                          </div>

                          <div className={`space-y-2 ${isTracking('twitter') ? 'ring-2 ring-accent/20 rounded-lg p-4 -m-4' : ''}`}>
                            <div className="flex items-center gap-2">
                              <Twitter className="h-5 w-5 text-accent" />
                              <h4 className="font-semibold">Twitter/X</h4>
                              {isTracking('twitter') && <CheckCircle2 className="h-4 w-4 text-accent ml-auto" />}
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Share thoughts and insights</li>
                              <li>• Thread longer stories</li>
                              <li>• Engage in conversations</li>
                              <li>• Repost relevant content</li>
                            </ul>
                          </div>

                          <div className={`space-y-2 ${isTracking('linkedin') ? 'ring-2 ring-accent/20 rounded-lg p-4 -m-4' : ''}`}>
                            <div className="flex items-center gap-2">
                              <Linkedin className="h-5 w-5 text-accent" />
                              <h4 className="font-semibold">LinkedIn</h4>
                              {isTracking('linkedin') && <CheckCircle2 className="h-4 w-4 text-accent ml-auto" />}
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Professional achievements</li>
                              <li>• Educational milestones</li>
                              <li>• Industry insights</li>
                              <li>• Network with mentors</li>
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold">Pro Tip</h4>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Repurpose content across platforms</li>
                              <li>• Cross-promote your accounts</li>
                              <li>• Tag @TeenSummit when relevant</li>
                              <li>• Use branded hashtags</li>
                            </ul>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Create Blog Post</CardTitle>
                    <CardDescription>
                      Share your thoughts and experiences with the community
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowBlogForm(!showBlogForm)}
                    data-testid="button-toggle-blog-form"
                  >
                    {showBlogForm ? "Cancel" : "New Post"}
                  </Button>
                </div>
              </CardHeader>
              {showBlogForm && (
                <CardContent>
                  <Form {...blogPostForm}>
                    <form onSubmit={blogPostForm.handleSubmit(onBlogPostSubmit)} className="space-y-4">
                      <FormField
                        control={blogPostForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your blog post title"
                                data-testid="input-blog-title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={blogPostForm.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Brief summary of your post"
                                rows={2}
                                data-testid="input-blog-excerpt"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={blogPostForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Write your blog post content..."
                                rows={10}
                                data-testid="input-blog-content"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={blogPostForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-blog-category">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Cast Reflections">Cast Reflections</SelectItem>
                                <SelectItem value="Behind the Scenes">Behind the Scenes</SelectItem>
                                <SelectItem value="Episode Companion">Episode Companion</SelectItem>
                                <SelectItem value="Personal Growth">Personal Growth</SelectItem>
                                <SelectItem value="Community Spotlight">Community Spotlight</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <FormLabel>Cover Image (Optional)</FormLabel>
                        <ObjectUploader
                          onUploadSuccess={(url) => {
                            setBlogCoverImageUrl(url);
                            toast({
                              title: "Image Uploaded",
                              description: "Cover image uploaded successfully.",
                            });
                          }}
                          allowedFileTypes={[".jpg", ".jpeg", ".png", ".webp"]}
                          maxFileSize={10 * 1024 * 1024}
                        />
                        {blogCoverImageUrl && (
                          <p className="text-sm text-muted-foreground" data-testid="text-cover-image-uploaded">
                            Cover image uploaded
                          </p>
                        )}
                      </div>
                      <div className="bg-muted/50 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">
                          Posts are created as drafts by default. You can submit them for approval after creation.
                        </p>
                      </div>
                      <Button
                        type="submit"
                        disabled={blogPostCreateM.isPending}
                        data-testid="button-submit-blog-post"
                      >
                        {blogPostCreateM.isPending ? "Creating..." : "Create Blog Post"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Blog Posts</CardTitle>
                <CardDescription>
                  Manage your published and draft blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blogPostsLoading ? (
                  <div className="text-center py-8">Loading blog posts...</div>
                ) : !blogPosts || blogPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No blog posts yet</p>
                    <p className="text-sm text-muted-foreground mt-2">Click "New Post" to create your first blog post</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="hover-elevate" data-testid={`card-blog-post-${post.id}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg" data-testid={`text-blog-title-${post.id}`}>
                                {post.title}
                              </CardTitle>
                              {post.excerpt && (
                                <CardDescription className="mt-2" data-testid={`text-blog-excerpt-${post.id}`}>
                                  {post.excerpt}
                                </CardDescription>
                              )}
                            </div>
                            <Badge variant={post.status === "published" ? "default" : "outline"} data-testid={`badge-status-${post.id}`}>
                              {post.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {post.category && <span className="mr-2">· {post.category}</span>}
                              {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center gap-2">
                          {post.status === "draft" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => blogPostPublishM.mutate(post.id)}
                              disabled={blogPostPublishM.isPending}
                              data-testid={`button-publish-post-${post.id}`}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Publish
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement edit functionality
                              toast({
                                title: "Coming Soon",
                                description: "Blog post editing will be available soon.",
                              });
                            }}
                            data-testid={`button-edit-post-${post.id}`}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                                blogPostDeleteM.mutate(post.id);
                              }
                            }}
                            disabled={blogPostDeleteM.isPending}
                            data-testid={`button-delete-post-${post.id}`}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Filming Schedule</CardTitle>
                <CardDescription>
                  Your upcoming filming dates and call times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming filming dates</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dossiers" className="space-y-6">
            {isAdmin && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle>Upload Research Dossier</CardTitle>
                      <CardDescription>
                        Admin only: Upload research materials for cast members
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setShowDossierForm(!showDossierForm)}
                      data-testid="button-toggle-dossier-form"
                    >
                      {showDossierForm ? "Cancel" : "New Dossier"}
                    </Button>
                  </div>
                </CardHeader>
                {showDossierForm && (
                  <CardContent>
                    <Form {...dossierForm}>
                      <form onSubmit={dossierForm.handleSubmit(onDossierSubmit)} className="space-y-4">
                        <FormField
                          control={dossierForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Research Title" data-testid="input-dossier-title" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dossierForm.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Topic</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., Healthcare, Education, Climate" data-testid="input-dossier-topic" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dossierForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Brief description of the research content"
                                  data-testid="input-dossier-description"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="space-y-2">
                          <FormLabel>Upload File (PDF, DOC, etc.)</FormLabel>
                          <ObjectUploader
                            onUploadComplete={(url, metadata) => {
                              setDossierFileUrl(url);
                              setDossierFileSize(metadata?.size || 0);
                              toast({
                                title: "File Uploaded",
                                description: "Your file has been uploaded successfully.",
                              });
                            }}
                            allowedFileTypes={[".pdf", ".doc", ".docx", ".txt"]}
                            maxFileSize={10 * 1024 * 1024}
                          />
                          {dossierFileUrl && (
                            <p className="text-sm text-muted-foreground" data-testid="text-file-uploaded">
                              File uploaded successfully
                            </p>
                          )}
                        </div>
                        <Button
                          type="submit"
                          disabled={dossierCreateM.isPending || !dossierFileUrl}
                          data-testid="button-submit-dossier"
                        >
                          {dossierCreateM.isPending ? "Uploading..." : "Upload Dossier"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                )}
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Available Dossiers</CardTitle>
                <CardDescription>
                  Research materials and debate topics for Teen Summit participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dossiersLoading ? (
                  <div className="text-center py-8">Loading dossiers...</div>
                ) : !dossiers || dossiers.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No dossiers available yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dossiers.map((dossier) => (
                      <Card key={dossier.id} className="hover-elevate" data-testid={`card-dossier-${dossier.id}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <Badge variant="outline" data-testid={`badge-topic-${dossier.id}`}>
                              {dossier.topic}
                            </Badge>
                            <FileText className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <CardTitle className="text-lg" data-testid={`text-title-${dossier.id}`}>
                            {dossier.title}
                          </CardTitle>
                          {dossier.description && (
                            <CardDescription data-testid={`text-description-${dossier.id}`}>
                              {dossier.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {dossier.fileSize && (
                                <p data-testid={`text-filesize-${dossier.id}`}>
                                  {(dossier.fileSize / 1024 / 1024).toFixed(2)} MB
                                </p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => window.open(dossier.fileUrl, "_blank")}
                              data-testid={`button-download-${dossier.id}`}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Profile editor coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
