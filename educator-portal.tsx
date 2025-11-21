import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Video, FileText, LogOut, Download, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function EducatorPortalPage() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: episodes } = useQuery<any[]>({
    queryKey: ["/api/episodes"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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

  const publishedEpisodes = episodes?.filter((ep: any) => ep.published) || [];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-montserrat font-bold text-2xl text-primary">
              Teen Summit 2.0
            </h1>
            <span className="text-muted-foreground">|</span>
            <span className="font-semibold">Educator Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
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
            Welcome to Educator Resources
          </h2>
          <p className="text-muted-foreground">
            Access curriculum materials, episode library, and teaching resources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Episodes Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{publishedEpisodes.length}</p>
              <p className="text-sm text-muted-foreground">Published episodes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent">12</p>
              <p className="text-sm text-muted-foreground">Ready-to-use plans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discussion Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">Topic guides</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Episode Library
              </CardTitle>
              <CardDescription>Browse all published episodes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access full episode archive organized by topic, season, and curriculum standards
              </p>
              <Button className="w-full" onClick={() => setLocation("/episodes")} data-testid="button-browse-episodes">
                Browse Episodes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                Curriculum Resources
              </CardTitle>
              <CardDescription>Teaching materials and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Available Resources:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Debate preparation guides</li>
                  <li>• Critical thinking worksheets</li>
                  <li>• Media literacy activities</li>
                  <li>• Civic engagement projects</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" data-testid="button-download-resources">
                <Download className="h-4 w-4 mr-2" />
                Download Resources
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Standards Alignment
              </CardTitle>
              <CardDescription>Common Core & State Standards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Episodes aligned with ELA, Social Studies, and Media Literacy standards
              </p>
              <Button variant="outline" className="w-full" data-testid="button-view-standards">
                View Standards
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Professional Development
              </CardTitle>
              <CardDescription>Training and workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Join webinars on facilitating youth debates and media literacy instruction
              </p>
              <Button variant="outline" className="w-full" data-testid="button-view-training">
                View Training
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use These Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><strong>1. Browse Episodes:</strong> Select episodes by topic or standard alignment</p>
            <p><strong>2. Download Materials:</strong> Get lesson plans and discussion guides</p>
            <p><strong>3. Facilitate Discussions:</strong> Use provided questions and activities</p>
            <p><strong>4. Extend Learning:</strong> Connect to current events and student interests</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
