import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Testimonial } from "../types";

export const useEditTestimonial = (id: string | number) => {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/teachers/profiles/${id}/`);
        setTestimonial(res.data);
      } catch (err: any) {
        setError("Failed to fetch testimonial");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const updateTestimonial = async (data: Testimonial) => {
    setSaving(true);
    setError(null);

    try {
      const res = await api.put(`/teachers/profiles/${id}/`, {
        teachers_name: data.teachers_name,
        tittle: data.tittle,
        description: data.description,
      });

      setTestimonial(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { testimonial, loading, saving, error, updateTestimonial };
};
