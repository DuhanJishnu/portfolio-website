"use client"

export function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full bg-primary opacity-20"></div>
        <div className="absolute top-3 left-3 h-10 w-10 animate-pulse rounded-full bg-primary"></div>
      </div>
    </div>
  )
}

