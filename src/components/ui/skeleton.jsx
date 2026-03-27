import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-100", className)}
      {...props}
    />
  )
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-5">
      <Skeleton className="aspect-square w-full rounded-2xl bg-slate-100/50" />
      <div className="space-y-3 px-1">
        <Skeleton className="h-4 w-full bg-slate-100/50" />
        <Skeleton className="h-4 w-2/3 bg-slate-100/50" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 bg-slate-100/50" />
          <Skeleton className="h-4 w-12 bg-slate-100/50 mt-1" />
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ProductCardSkeleton }
