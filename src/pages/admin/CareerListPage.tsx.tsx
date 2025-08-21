import { useState } from "react";
import { CareerCard, FilterBar, useCareers } from "../../features/admin/careerlist";

const CareerListPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { careers, count, next, previous, page_size, isLoading } = useCareers(
    currentPage,
    searchTerm,
    statusFilter
  );

  const statusOptions = ["All", "Open", "Closed"];
  const totalPages = Math.ceil(count / page_size);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">New Job Vacancies</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by job role..."
          className="px-4 py-2 w-full md:w-1/3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <FilterBar
          selected={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
          options={statusOptions}
          label="Status"
        />
      </div>

      {/* Careers Grid */}
      {isLoading ? (
        <p className="text-center text-gray-500 mt-12">Loading jobs...</p>
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
      {!isLoading && (next || previous) && (
        <div className="mt-10 flex justify-center items-center gap-2">
          <button
            onClick={() => previous && setCurrentPage((p) => p - 1)}
            disabled={!previous}
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-1 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => next && setCurrentPage((p) => p + 1)}
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
