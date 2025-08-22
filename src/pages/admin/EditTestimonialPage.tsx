import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TestimonialForm,
  useEditTestimonial,
} from "../../features/admin/Testimonial";

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const { testimonial, loading, saving, updateTestimonial } =
    useEditTestimonial(id!);

  const handleSubmit = async (data: any) => {
    try {
      await updateTestimonial(data);
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Testimonial updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to update testimonial:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update testimonial.",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!testimonial) return <p className="p-6">Testimonial not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Testimonial</h1>
      <TestimonialForm
        onSubmit={handleSubmit}
        isLoading={saving}
        initialData={testimonial}
      />
    </div>
  );
}
