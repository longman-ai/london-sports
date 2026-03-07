import Header from "@/components/Header"

export default function BrowseLoading() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-6xl px-5 sm:px-8 py-10">
          {/* Title skeleton */}
          <div className="mb-8">
            <div className="h-9 w-48 bg-stone-200 rounded-lg animate-pulse mb-3" />
            <div className="h-5 w-72 bg-stone-200 rounded-lg animate-pulse" />
          </div>

          {/* Filter bar skeleton */}
          <div className="flex gap-3 mb-8">
            <div className="h-10 w-32 bg-stone-200 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-stone-200 rounded-lg animate-pulse" />
            <div className="h-10 w-48 bg-stone-200 rounded-lg animate-pulse" />
          </div>

          {/* Cards grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200 p-5 animate-pulse"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-16 bg-emerald-100 rounded-full" />
                  <div className="h-5 w-20 bg-stone-100 rounded-full" />
                </div>
                <div className="h-5 w-3/4 bg-stone-200 rounded mb-2" />
                <div className="h-4 w-full bg-stone-100 rounded mb-1" />
                <div className="h-4 w-2/3 bg-stone-100 rounded mb-3" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-stone-100 rounded" />
                  <div className="h-4 w-20 bg-stone-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
