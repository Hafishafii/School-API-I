// src/features/sports/hooks/useSportsGallery.ts
import { useEffect, useState, useCallback } from "react";
import api from "../../../lib/api";
import type { SportItem, Winner } from "../types";

interface ApiWinner {
  id: number;
  event: number;
  name: string;
  photo: string;
  student_class: string;
  position: Winner["position"];
}

interface ApiSport {
  id: number;
  title: string;
  description: string;
  created_at: string;
  images: { id: number; event: number; image: string }[];
  winners: ApiWinner[];
}

interface ApiPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiSport[];
}

export const useSportsGallery = () => {
  const [sports, setSports] = useState<SportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchSports = useCallback(async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.get<ApiPaginatedResponse>(`/sports/?page=${pageNum}`);
      setTotal(res.data.count);

      const mapped: SportItem[] = res.data.results.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        created_at: s.created_at,
        images: s.images.map((img) => img.image),
        winners: s.winners.map((w) => ({
          id: w.id,
          name: w.name,
          student_class: w.student_class,
          position: w.position,
          photo: w.photo,
        })),
      }));

      if (pageNum === 1) {
        setSports(mapped);
      } else {
        setSports((prev) => [...prev, ...mapped]);
      }
    } catch (err) {
      console.error("Error fetching sports:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSports(page);
  }, [page, fetchSports]);

  return { sports, loading, page, setPage, total };
};
