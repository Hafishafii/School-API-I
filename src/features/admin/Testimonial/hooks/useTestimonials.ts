import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Testimonial } from "../types";

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTestimonials = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/teachers/profiles/?page=${pageNum}`);
      const data = res.data.results || res.data; 
      setTestimonials(data);
      if (res.data.count) {
        setTotalPages(Math.ceil(res.data.count / 10)); 
      }
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await api.delete(`/teachers/profiles/${id}/`);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, deleteTestimonial, fetchTestimonials, page, totalPages };
};
