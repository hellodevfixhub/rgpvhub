import clsx from 'clsx'

export function SkeletonCard({ className }) {
  return (
    <div className={clsx('glass-card p-5', className)}>
      <div className="flex items-start gap-4">
        <div className="skeleton w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 rounded-lg w-3/4" />
          <div className="skeleton h-3 rounded-lg w-1/2" />
          <div className="skeleton h-3 rounded-lg w-1/3" />
          <div className="flex gap-2 mt-3">
            <div className="skeleton h-7 rounded-lg w-20" />
            <div className="skeleton h-7 rounded-lg w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonBlogCard() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-40 rounded-none" />
      <div className="p-5 space-y-2">
        <div className="skeleton h-3 rounded w-1/3" />
        <div className="skeleton h-4 rounded w-full" />
        <div className="skeleton h-4 rounded w-5/6" />
        <div className="skeleton h-3 rounded w-2/3" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={clsx('skeleton h-3 rounded-lg', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  )
}

export default function Skeleton({ className, ...props }) {
  return <div className={clsx('skeleton', className)} {...props} />
}
