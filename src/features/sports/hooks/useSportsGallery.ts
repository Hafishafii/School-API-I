import { useEffect, useState, useCallback } from "react";
import api from "../../../lib/api";
import type { SportItem, Winner } from "../types";

interface ApiWinner {
  id: number;
  event: number;
  name: string;
  photo: string;
  student_class: string;
  position: string;
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

const normalizePosition = (pos: string): Winner["position"] => {
  if (pos === "1" || pos.toLowerCase() === "first") return "1st";
  if (pos === "2" || pos.toLowerCase() === "second") return "2nd";
  if (pos === "3" || pos.toLowerCase() === "third") return "3rd";
  return "3rd";
};

export const useSportsGallery = () => {
  const [sports, setSports] = useState<SportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const fetchSports = useCallback(async (url?: string) => {
    if (!url) url = "/sports/"; 

    setLoading(true);
    try {
      const res = await api.get<ApiPaginatedResponse>(url);

      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);

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
          position: normalizePosition(w.position),
          photo: w.photo,
        })),
      }));

      setSports(mapped);
    } catch (err) {
      console.error("Error fetching sports:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSports("/sports/");
  }, [fetchSports]);

  const goNext = () => {
    if (nextUrl) {
      setPage((p) => p + 1);
      fetchSports(nextUrl);
    }
  };

  const goPrev = () => {
    if (prevUrl) {
      setPage((p) => Math.max(1, p - 1));
      fetchSports(prevUrl);
    }
  };

  return {
    sports,
    loading,
    page,
    nextUrl,
    prevUrl,
    goNext,
    goPrev,
  };
};
