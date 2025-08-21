// src/pages/SportsPage.tsx
import { useSportsGallery } from "../features/sports";
import SportCard from "../features/sports/components/SportCard";
import { Button } from "../components/ui/button";

export default function SportsPage() {
  const { sports, loading, page, setPage, total } = useSportsGallery();

  const canLoadMore = sports.length < total;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl md:max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Sports</h1>
          <p className="text-gray-600 mt-1">
            Highlights from our Sports Day & Events.
          </p>
        </header>

        {sports.map((sport) => (
          <SportCard key={sport.id} sport={sport} />
        ))}

        {/* Load More */}
        {canLoadMore && (
          <div className="text-center mt-6">
            <Button onClick={() => setPage(page + 1)} disabled={loading}>
              {loading ? "Loading…" : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
