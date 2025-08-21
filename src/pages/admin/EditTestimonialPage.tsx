import { useNavigate, useParams } from "react-router-dom";
import {
  TestimonialForm,
  useEditTestimonial,
} from "../../features/admin/Testimonial";

export default function EditTestimonialPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { testimonial, loading, saving, updateTestimonial } =
    useEditTestimonial(id!);

  const handleSubmit = async (data: any) => {
    try {
      await updateTestimonial(data);
      navigate("/admin/testimonials");
    } catch (err) {
      console.error("Failed to update testimonial:", err);
    }
  };

  if (loading) return <p>Loading testimonial...</p>;
  if (!testimonial) return <p>Testimonial not found.</p>;

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
