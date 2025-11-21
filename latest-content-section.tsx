import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { EpisodeCardSkeleton, BlogCardSkeleton } from "@/components/skeletons/content-card-skeleton";
import { Calendar, Clock, ArrowRight, PlayCircle } from "lucide-react";
import { format } from "date-fns";
import type { Episode, BlogPost } from "@shared/schema";

export function LatestContentSection() {
  const { data: episodes, isLoading: episodesLoading } = useQuery<Episode[]>({
    queryKey: ['/api/episodes'],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
  });

  const latestEpisodes = episodes?.slice(0, 2) || [];
  const latestPosts = blogPosts?.slice(0, 3) || [];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest from Teen Summit 2.0
            </h2>
            <p className="text-lg text-muted-foreground">
              Catch up on our newest episodes and blog posts from the cast
            </p>
          </div>
        </ScrollReveal>

        {/* Latest Episodes */}
        <div className="mb-16">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">Recent Episodes</h3>
              <a href="/episodes">
                <Button variant="ghost" data-testid="button-view-all-episodes">
                  View All Episodes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </ScrollReveal>

          {episodesLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <EpisodeCardSkeleton key={i} />
              ))}
            </div>
          ) : latestEpisodes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {latestEpisodes.map((episode, index) => (
                <ScrollReveal key={episode.id} delay={0.2 + index * 0.1}>
                  <a href={`/episodes/${episode.slug}`}>
                    <Card className="h-full hover-elevate" data-testid={`latest-episode-${index}`}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <PlayCircle className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="line-clamp-2 mb-2">
                              {episode.title}
                            </CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {episode.airDate && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {format(new Date(episode.airDate), 'MMM d, yyyy')}
                                </span>
                              )}
                              {episode.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {episode.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {episode.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No episodes published yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Latest Blog Posts */}
        <div>
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">From the Cast</h3>
              <a href="/blog">
                <Button variant="ghost" data-testid="button-view-all-blog">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </ScrollReveal>

          {blogLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={0.4 + index * 0.1}>
                  <a href={`/blog/${post.slug}`}>
                    <Card className="h-full hover-elevate" data-testid={`latest-blog-${index}`}>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 text-xl mb-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(post.publishedAt!), 'MMM d, yyyy')}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                        {post.category && (
                          <div className="mt-4">
                            <span className="text-xs font-medium text-primary">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No blog posts published yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
