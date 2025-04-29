'use client';

export function SkeletonCard() {
  return (
    <div className="flex items-center p-3 rounded-lg border border-border bg-card animate-pulse">
      <div className="p-2 mr-3 rounded-md bg-muted h-10 w-10"></div>
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
      </div>
      <div className="h-8 w-8 bg-muted rounded-full"></div>
    </div>
  );
}
