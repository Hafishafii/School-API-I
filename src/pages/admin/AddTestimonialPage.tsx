import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TestimonialForm, useAddTestimonial } from "../../features/admin/Testimonial";
import type { Testimonial } from "../../features/admin/Testimonial/types";

export default function AddTestimonialPage() {
  const { addTestimonial, isLoading, error } = useAddTestimonial();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (data: Testimonial) => {
    try {
      await addTestimonial(data);
      Swal.fire({
        icon: "success",
        title: "Testimonial added!",
        text: "Your testimonial was successfully added.",
        confirmButtonColor: "#2563eb",
      });
    } catch (err) {
      console.error("Failed to add testimonial:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: (err as any)?.message || "Something went wrong",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Testimonial</h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <TestimonialForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
