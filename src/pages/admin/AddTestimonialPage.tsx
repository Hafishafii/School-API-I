import { useNavigate } from "react-router-dom";
import {
  TestimonialForm,
  useAddTestimonial,
} from "../../features/admin/Testimonial";
import type { Testimonial } from "../../features/admin/Testimonial/types";
import { Skeleton } from "../../components/ui/skeleton";

export default function AddTestimonialPage() {
  const navigate = useNavigate();
  const { addTestimonial, isLoading, success, error } = useAddTestimonial();

  const handleSubmit = async (data: Testimonial) => {
    try {
      await addTestimonial(data);
      navigate("/admin/testimonials/");
    } catch (err) {
      console.error("Failed to add testimonial:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Testimonial</h1>

      {/* ✅ Show skeleton while saving/loading */}
      {isLoading ? (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <Skeleton className="h-10 w-full" /> {/* Teacher Name */}
          <Skeleton className="h-10 w-full" /> {/* Title */}
          <Skeleton className="h-24 w-full" /> {/* Description */}
          <Skeleton className="h-12 w-32" />   {/* Button */}
        </div>
      ) : (
        <TestimonialForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}

      {success && (
        <p className="text-green-600 mt-2">Testimonial added successfully!</p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
