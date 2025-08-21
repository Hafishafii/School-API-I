import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Applicant } from "../types";

interface ApplicantsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Applicant[];
}

export const useApplicants = (jobId?: number, page: number = 1) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const page_size = 10; 

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const params: Record<string, number | string> = { page };
        if (jobId) params.job = jobId;

        const res = await api.get<ApplicantsResponse>("/applications/", { params });

        setApplicants(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch applicants");
        setApplicants([]);
        setCount(0);
        setNext(null);
        setPrevious(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId, page]);

  const getApplicantById = (id: string | number) =>
    applicants.find((a) => a.id === Number(id));

  return { applicants, getApplicantById, loading, error, count, next, previous, page_size };
};
