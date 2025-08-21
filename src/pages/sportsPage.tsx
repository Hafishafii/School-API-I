import { useSportsGallery } from "../features/sports";
import SportCard from "../features/sports/components/SportCard";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

export default function SportsPage() {
  const { sports, loading, nextUrl, prevUrl, goNext, goPrev, page } =
    useSportsGallery();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl md:max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Sports</h1>
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
                className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
              >
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <Skeleton className="h-36 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && sports.length === 0 && (
          <p className="text-center text-gray-600">No sports available yet.</p>
        )}

        {/* Sports list */}
        {!loading &&
          sports.map((sport) => <SportCard key={sport.id} sport={sport} />)}

        {/* Pagination Buttons */}
        {!loading && (
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={goPrev}
              disabled={!prevUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="self-center text-gray-700 font-medium">
              Page {page}
            </span>
            <Button
              onClick={goNext}
              disabled={!nextUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
