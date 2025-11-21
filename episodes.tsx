import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Episode } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";
import { EpisodeCardSkeleton } from "@/components/skeletons/content-card-skeleton";
import { Play, Search, Calendar, Eye } from "lucide-react";

export default function Episodes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: episodes = [], isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const allTags = Array.from(
    new Set(episodes.flatMap(ep => ep.tags || []))
  ).sort();

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = !searchQuery || 
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.topic?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = !selectedTag || episode.tags?.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Episodes"
        description="Watch Teen Summit 2.0 episodes featuring teen-led debates, musicology analysis, and critical discussions on social issues. Streaming now."
        keywords={["teen debate episodes", "youth podcast", "civic discourse", "social justice debates", "teen media"]}
      />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" data-testid="heading-episodes">Latest Episodes</h1>
            <p className="text-muted-foreground">
              Watch Teen Summit 2.0 episodes featuring debate, music, and critical thinking
            </p>
          </div>

          <div className="mb-8 space-y-4" role="search" aria-label="Search episodes">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search episodes by title, topic, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-episodes"
                aria-label="Search episodes"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  data-testid="button-tag-all"
                >
                  All Topics
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    data-testid={`button-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <EpisodeCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="text-no-episodes">
                {searchQuery || selectedTag ? "No episodes match your search." : "No episodes available yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map(episode => (
                <Link key={episode.id} href={`/episodes/${episode.slug}`}>
                  <Card 
                    className="group cursor-pointer hover-elevate active-elevate-2 overflow-hidden"
                    data-testid={`card-episode-${episode.slug}`}
                  >
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      {episode.thumbnailUrl ? (
                        <img 
                          src={episode.thumbnailUrl} 
                          alt={episode.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
                          <Play className="w-16 h-16 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-gray-900 ml-1" />
                        </div>
                      </div>
                      {episode.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {episode.duration}
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary" data-testid={`badge-episode-number-${episode.episodeNumber}`}>
                          Episode {episode.episodeNumber}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span data-testid={`text-views-${episode.slug}`}>{episode.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="line-clamp-2" data-testid={`text-episode-title-${episode.slug}`}>
                        {episode.title}
                      </CardTitle>
                      
                      {episode.topic && (
                        <CardDescription className="text-sm font-medium text-foreground/80">
                          {episode.topic}
                        </CardDescription>
                      )}
                      
                      {episode.description && (
                        <CardDescription className="line-clamp-2 mt-2">
                          {episode.description}
                        </CardDescription>
                      )}
                      
                      {episode.airDate && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(episode.airDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
