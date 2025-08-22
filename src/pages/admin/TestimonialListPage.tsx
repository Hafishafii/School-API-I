import { useNavigate } from "react-router-dom";
import { TestimonialTable, useTestimonials } from "../../features/admin/Testimonial";
import { Button } from "../../components/ui/button";

export default function TestimonialListPage() {
  const { testimonials, loading, deleteTestimonial, fetchTestimonials, page, next, previous } =
    useTestimonials();
  const navigate = useNavigate();

  return (
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
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <TestimonialTable
              testimonials={testimonials}
              onDelete={deleteTestimonial}
              onEdit={(id) => navigate(`/admin/testimonials/${id}/edit`)}
            />
          </div>
        )}
      </div>

      {/* Footer Pagination */}
      <div className="flex justify-center mt-6 space-x-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={!previous}
          onClick={() => previous && fetchTestimonials(previous)}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <span className="px-2 py-1 text-sm text-center w-full sm:w-auto">
          Page {page}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={!next}
          onClick={() => next && fetchTestimonials(next)}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
