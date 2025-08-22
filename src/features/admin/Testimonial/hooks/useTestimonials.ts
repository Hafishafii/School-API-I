import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../../../lib/api";
import type { Testimonial } from "../types";

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  const fetchTestimonials = async (urlOrPage: string | number = 1) => {
    setLoading(true);
    try {
      let url = "";
      if (typeof urlOrPage === "string") {
        url = urlOrPage;
      } else {
        url = `/teachers/profiles/?page=${urlOrPage}`;
      }

      const res = await api.get(url);
      const data = res.data.results || res.data;

      setTestimonials(data);
      setNext(res.data.next || null);
      setPrevious(res.data.previous || null);
      if (typeof urlOrPage === "number") setPage(urlOrPage);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/teachers/profiles/${id}/`);
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        Swal.fire("Deleted!", "The testimonial has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete testimonial:", err);
        Swal.fire("Error", "Failed to delete testimonial.", "error");
      }
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, deleteTestimonial, fetchTestimonials, page, next, previous };
};
