import { useState, useEffect, useMemo } from "react";
import { CareerCard, FilterBar, useCareers } from "../../features/admin/careerlist";

const CareerListPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);

  const { careers, count, next, previous, pageSize, isLoading } = useCareers({
    currentPageUrl,
    search: searchTerm,
    statusFilter,
  });

  const statusOptions = ["All", "Open", "Closed"];

  const totalPages = useMemo(() => Math.ceil(count / pageSize), [count, pageSize]);

  const currentPage = useMemo(() => {
    if (!currentPageUrl) return 1;
    const match = currentPageUrl.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }, [currentPageUrl]);

  const pagesArray = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handleNext = () => { if (next) setCurrentPageUrl(next); };
  const handlePrev = () => { if (previous) setCurrentPageUrl(previous); };
  const handlePageClick = (pageNum: number) => { setCurrentPageUrl(`/jobs/?page=${pageNum}`); };

  // Reset page when search/filter changes
  useEffect(() => { setCurrentPageUrl(null); }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">New Job Vacancies</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by job role..."
          className="px-4 py-2 w-full md:w-1/3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <FilterBar
          selected={statusFilter}
          onChange={setStatusFilter}
          options={statusOptions}
          label="Status"
        />
      </div>

      {/* Careers Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
        </div>
      ) : careers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {careers.map((career) => (
            <CareerCard key={career.id} {...career} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">
          No careers found for current search or filter.
        </p>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={!previous}
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {pagesArray.map((num) => (
            <button
              key={num}
              onClick={() => handlePageClick(num)}
              className={`px-3 py-1 rounded ${
                num === currentPage
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={!next}
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerListPage;
