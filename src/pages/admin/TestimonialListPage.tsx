import { useNavigate } from "react-router-dom";
import {
  TestimonialTable,
  useTestimonials,
} from "../../features/admin/Testimonial";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";

export default function TestimonialListPage() {
  const {
    testimonials,
    loading,
    deleteTestimonial,
    fetchTestimonials,
    page,
    totalPages,
  } = useTestimonials();
  const navigate = useNavigate();

  return (
    // Full height + responsive padding
    <div className="flex flex-col min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Testimonials</h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => navigate("/admin/testimonials/add")}
        >
          + Add Testimonial
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table is scrollable on mobile
          <div className="overflow-x-auto">
            <TestimonialTable
              testimonials={testimonials}
              onDelete={deleteTestimonial}
              onEdit={(id) => navigate(`/admin/testimonials/${id}/edit`)}
            />
          </div>
        )}
      </div>

      {/* Footer (pagination) pinned at bottom */}
      <div className="flex justify-center mt-6 space-x-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => fetchTestimonials(page - 1)}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <span className="px-2 py-1 text-sm text-center w-full sm:w-auto">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => fetchTestimonials(page + 1)}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
