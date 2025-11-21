import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { BlogPost } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";
import { SocialShare } from "@/components/social-share";
import { Breadcrumb } from "@/components/breadcrumb";
import { Calendar, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return response.json();
    },
    enabled: !!slug,
  });


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-8 mt-16">
          <article className="max-w-3xl mx-auto">
            <div className="h-10 bg-muted rounded w-3/4 mb-4 animate-pulse" />
            <div className="h-6 bg-muted rounded w-1/2 mb-6 animate-pulse" />
            <div className="aspect-video bg-muted rounded mb-6 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or hasn't been published yet.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
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
        title={post.title}
        description={post.excerpt || `Read this blog post from a Teen Summit 2.0 cast member about ${post.category || 'civic engagement and youth perspectives'}.`}
        keywords={post.category ? [post.category, "teen blog", "youth voices", "civic engagement"] : ["teen blog", "youth voices"]}
        ogType="article"
        ogImage={post.coverImageUrl || undefined}
      />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <article className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {post.category && (
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-blog-post-title">
            {post.title}
          </h1>

          <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {post.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
            </div>
            <SocialShare 
              title={post.title}
              description={post.excerpt || undefined}
            />
          </div>

          {post.coverImageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img 
                src={post.coverImageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
                data-testid="img-cover"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 italic border-l-4 border-primary pl-4">
              {post.excerpt}
            </p>
          )}

          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                data-testid="content-blog-post"
              />
            </CardContent>
          </Card>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <p className="text-sm font-semibold mb-3">Tagged with:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-bold mb-2">Join the Conversation</h2>
            <p className="text-muted-foreground mb-4">
              Want to share your perspective? Teen Summit 2.0 is looking for cast members!
            </p>
            <Link href="/apply/summiteer">
              <Button>Apply to Be a Cast Member</Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
