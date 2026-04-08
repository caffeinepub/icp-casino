import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  variant?: "game" | "carousel" | "transaction";
}

export function SkeletonCard({ variant = "game" }: SkeletonCardProps) {
  if (variant === "carousel") {
    return (
      <div className="relative rounded-xl overflow-hidden glass-card border aspect-[16/9] w-full animate-pulse">
        <Skeleton className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    );
  }

  if (variant === "transaction") {
    return (
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    );
  }

  // game card skeleton — matches glass-card style
  return (
    <div
      className="glass-card rounded-xl overflow-hidden"
      data-ocid="skeleton-game-card"
    >
      {/* Gold shimmer image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <div className="skeleton-shimmer absolute inset-0" />
      </div>
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}
