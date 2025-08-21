// src/features/admin/Testimonial/hooks/useAddTestimonial.ts
import { useState } from "react";
import api from "../../../../lib/api";
import type { Testimonial } from "../types";

export const useAddTestimonial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addTestimonial = async (testimonial: Testimonial) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("teachers_name", testimonial.teachers_name);
      formData.append("tittle", testimonial.tittle);
      formData.append("description", testimonial.description);

      if (testimonial.image instanceof File) {
        // ✅ must match backend field name
        formData.append("prof_pic", testimonial.image);
      }

      const res = await api.post("/teachers/profiles/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { addTestimonial, isLoading, error, success };
};
