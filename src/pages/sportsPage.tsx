import { useSportsGallery } from "../features/sports";
import SportCard from "../features/sports/components/SportCard";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

export default function SportsPage() {
  const { sports, loading, nextUrl, prevUrl, goNext, goPrev, page } =
    useSportsGallery();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Sports</h1>
          <p className="text-gray-600 mt-1">
            Highlights from our Sports Day & Events.
          </p>
          <p className="text-sm text-gray-500 mt-2">📄 Page {page}</p>
        </header>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur rounded-2xl shadow-sm ring-1 ring-gray-100 p-4 sm:p-6 space-y-4 animate-pulse"
              >
                {/* Title skeleton */}
                <Skeleton className="h-6 w-1/2 sm:w-1/3 rounded-md mx-auto" />

                {/* Description skeleton */}
                <Skeleton className="h-4 w-5/6 sm:w-4/5 rounded-md mx-auto" />
                <Skeleton className="h-4 w-4/6 sm:w-3/5 rounded-md mx-auto" />

                {/* Winners skeleton */}
                <div className="flex justify-center gap-4 mt-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex flex-col items-center gap-2">
                      <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
                      <Skeleton className="w-12 h-3 rounded-md" />
                      <Skeleton className="w-10 h-2 rounded-md" />
                    </div>
                  ))}
                </div>

                {/* Gallery skeleton */}
                <div className="flex gap-2 sm:gap-3 overflow-x-auto mt-4">
                  {Array.from({ length: 4 }).map((_, k) => (
                    <Skeleton
                      key={k}
                      className="w-32 sm:w-36 md:w-40 h-28 sm:h-32 md:h-36 lg:h-40 rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && sports.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No sports available yet.</p>
        )}

        {/* Sports list */}
        {!loading && sports.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {sports.map((sport) => (
              <SportCard key={sport.id} sport={sport} />
            ))}
          </div>
        )}

        {/* Pagination Buttons */}
        {!loading && (nextUrl || prevUrl) && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <Button
              onClick={goPrev}
              disabled={!prevUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Previous
            </Button>
            <span className="self-center text-gray-700 font-medium">
              Page {page}
            </span>
            <Button
              onClick={goNext}
              disabled={!nextUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
