import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Applicant } from "../types";

export const useApplicant = (id?: string | number) => {
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchApplicant = async () => {
      setLoading(true);
      try {
        const res = await api.get<Applicant>(`/applications/${id}/`);
        setApplicant(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch applicant");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  return { applicant, loading, error };
};
