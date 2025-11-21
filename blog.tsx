import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogCardSkeleton } from "@/components/skeletons/content-card-skeleton";
import { Search, Calendar } from "lucide-react";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const categories = Array.from(
    new Set(posts.map(post => post.category).filter(Boolean))
  ).sort();

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" data-testid="heading-blog">A View from the Summit</h1>
            <p className="text-muted-foreground">
              Hear directly from our cast, crew, and community
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-blog"
              />
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  data-testid="button-category-all"
                >
                  All Categories
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`button-category-${category?.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="text-no-posts">
                {searchQuery || selectedCategory ? "No posts match your search." : "No blog posts available yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card 
                    className="group cursor-pointer hover-elevate active-elevate-2 h-full flex flex-col"
                    data-testid={`card-blog-${post.slug}`}
                  >
                    {post.coverImageUrl && (
                      <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={post.coverImageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader className="flex-1">
                      {post.category && (
                        <Badge variant="secondary" className="w-fit mb-2">
                          {post.category}
                        </Badge>
                      )}
                      
                      <CardTitle className="line-clamp-2" data-testid={`text-blog-title-${post.slug}`}>
                        {post.title}
                      </CardTitle>
                      
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3 mt-2">
                          {post.excerpt}
                        </CardDescription>
                      )}
                      
                      {post.publishedAt && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-auto pt-4">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
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
