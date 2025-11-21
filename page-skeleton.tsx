import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 mb-8" data-testid="skeleton-page-header">
      <Skeleton className="h-12 w-64 mx-auto" />
      <Skeleton className="h-4 w-96 mx-auto" />
    </div>
  );
}

export function ArticleContentSkeleton() {
  return (
    <div className="space-y-4" data-testid="skeleton-article-content">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="my-6">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function VideoPlayerSkeleton() {
  return (
    <div className="space-y-4" data-testid="skeleton-video-player">
      <Skeleton className="w-full aspect-video rounded-lg" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
