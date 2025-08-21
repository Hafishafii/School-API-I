import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Applicant } from "../types";

interface ApplicantsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Applicant[];
}

export const useApplicants = (initialJobId?: number, initialUrl?: string) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobId] = useState(initialJobId);
  const [url, setUrl] = useState(initialUrl || "/applications/");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const params = jobId ? { job: jobId } : undefined;
        const res = await api.get<ApplicantsResponse>(url, { params });

        setApplicants(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);

        // Parse query params from the current URL
        const searchParams = new URLSearchParams(url.split("?")[1]);
        const page = parseInt(searchParams.get("page") || "1");
        const size = parseInt(searchParams.get("page_size") || "10");

        setPageSize(size);
        setCurrentPage(page);
        setTotalPages(Math.ceil(res.data.count / size));
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
  }, [url, jobId]);

  const getApplicantById = (id: string | number) =>
    applicants.find((a) => a.id === Number(id));

  const getVisiblePages = (windowSize = 5) => {
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, windowSize);
    }
    if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - windowSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    applicants,
    getApplicantById,
    loading,
    error,
    count,
    next,
    previous,
    setUrl,
    currentPage,
    totalPages,
    pageSize,      
    setPageSize,   
    getVisiblePages,
  };
};
