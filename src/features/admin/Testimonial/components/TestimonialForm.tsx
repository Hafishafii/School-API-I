import { useEffect, useState } from "react";
import type { Testimonial } from "../types";

interface TestimonialFormProps {
  onSubmit: (data: Testimonial) => void | Promise<void>;
  isLoading?: boolean;
  initialData?: Testimonial;
}

export function TestimonialForm({
  onSubmit,
  isLoading = false,
  initialData,
}: TestimonialFormProps) {
  const [formData, setFormData] = useState<Testimonial>({
    teachers_name: "",
    tittle: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        teachers_name: initialData.teachers_name || "",
        tittle: initialData.tittle || "",
        description: initialData.description || "",
        image: initialData.prof_pic || undefined,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.teachers_name.trim()) {
      newErrors.teachers_name = "Teacher name is required.";
    } else if (formData.teachers_name.length < 2) {
      newErrors.teachers_name = "Name must be at least 2 characters.";
    }

    if (!formData.tittle.trim()) {
      newErrors.tittle = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (imageFile) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(imageFile.type)) {
        newErrors.image = "Only JPG, PNG, or WEBP files are allowed.";
      }
      if (imageFile.size > 2 * 1024 * 1024) {
        newErrors.image = "Image must be smaller than 2MB.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...formData, image: imageFile || formData.image });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Teacher Name */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="teachers_name">
          Teacher Name
        </label>
        <input
          type="text"
          id="teachers_name"
          name="teachers_name"
          value={formData.teachers_name}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 focus:ring ${
            errors.teachers_name ? "border-red-500" : "focus:ring-blue-500"
          }`}
          placeholder="Enter teacher's name"
          required
        />
        {errors.teachers_name && (
          <p className="text-red-500 text-sm mt-1">{errors.teachers_name}</p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tittle">
          Title
        </label>
        <input
          type="text"
          id="tittle"
          name="tittle"
          value={formData.tittle}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 focus:ring ${
            errors.tittle ? "border-red-500" : "focus:ring-blue-500"
          }`}
          placeholder="Enter title"
          required
        />
        {errors.tittle && (
          <p className="text-red-500 text-sm mt-1">{errors.tittle}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full border rounded-lg px-3 py-2 focus:ring ${
            errors.description ? "border-red-500" : "focus:ring-blue-500"
          }`}
          placeholder="Enter testimonial description"
          required
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="image">
          Image (optional)
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}

        {/* ✅ Show preview if editing */}
        {typeof formData.image === "string" && (
          <img
            src={formData.image}
            alt="Current"
            className="mt-2 w-24 h-24 object-cover rounded"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Testimonial"}
      </button>
    </form>
  );
}
