import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Episode } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";
import { SocialShare } from "@/components/social-share";
import { Breadcrumb } from "@/components/breadcrumb";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function EpisodeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const { data: episode, isLoading } = useQuery<Episode>({
    queryKey: ["/api/episodes", slug],
    queryFn: async () => {
      const response = await fetch(`/api/episodes/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch episode");
      return response.json();
    },
    enabled: !!slug,
  });

  const incrementViewMutation = useMutation({
    mutationFn: async (episodeId: number) => {
      const response = await fetch(`/api/episodes/${episodeId}/view`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to increment views");
      return response.json();
    },
  });

  useEffect(() => {
    if (episode && !incrementViewMutation.data) {
      const timer = setTimeout(() => {
        incrementViewMutation.mutate(episode.id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [episode, incrementViewMutation]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-muted rounded-lg animate-pulse mb-6" />
            <div className="h-10 bg-muted rounded w-3/4 mb-4 animate-pulse" />
            <div className="h-6 bg-muted rounded w-1/2 mb-6 animate-pulse" />
            <div className="h-32 bg-muted rounded animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-5xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Episode Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The episode you're looking for doesn't exist or hasn't been published yet.
            </p>
            <Link href="/episodes">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Episodes
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={episode.title}
        description={episode.description || `Watch Episode ${episode.episodeNumber} of Teen Summit 2.0 featuring debate and discussion on ${episode.topic || 'critical social issues'}.`}
        keywords={episode.tags || ["teen debate", "civic engagement", "youth media"]}
        ogType="video.episode"
        ogImage={episode.thumbnailUrl || undefined}
      />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Episodes", href: "/episodes" },
              { label: episode.title },
            ]}
          />

          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
            {episode.videoUrl ? (
              <video
                controls
                className="w-full h-full"
                poster={episode.thumbnailUrl || undefined}
                data-testid="video-player"
              >
                <source src={episode.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-lg mb-2">Video coming soon</p>
                  <p className="text-sm text-white/60">This episode is being processed</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" data-testid="badge-episode-number">
                Episode {episode.episodeNumber}
              </Badge>
              {episode.season > 1 && (
                <Badge variant="outline">Season {episode.season}</Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span data-testid="text-views">{episode.views.toLocaleString()} views</span>
              </div>
              {episode.airDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(episode.airDate).toLocaleDateString()}</span>
                </div>
              )}
              <SocialShare 
                title={episode.title}
                description={episode.description || undefined}
              />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-episode-title">
            {episode.title}
          </h1>

          {episode.topic && (
            <p className="text-lg font-medium text-foreground/90 mb-4" data-testid="text-episode-topic">
              {episode.topic}
            </p>
          )}

          {episode.tags && episode.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {episode.tags.map(tag => (
                <Badge key={tag} variant="outline" data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {episode.description && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Episode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap" data-testid="text-episode-description">
                  {episode.description}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>What is Teen Summit 2.0?</CardTitle>
              <CardDescription>
                A reimagined civic engagement series teaching critical thinking through debate, music, and dialogue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">The Three-Act Format</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Act I - The Debate:</strong> Teams argue both sides of complex issues</li>
                  <li><strong>Act II - The Musicology:</strong> DJ Silkee provides cultural context through sound</li>
                  <li><strong>Act III - The Podcast:</strong> Cast members process and reflect on what they learned</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="outline">Learn More About the Show</Button>
                </Link>
                <Link href="/apply/summiteer">
                  <Button>Apply to Be a Cast Member</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
