import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Career } from "../types";

interface CareersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Career[];
}

export const useCareers = (
  page: number,
  search: string,
  statusFilter: string
) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const page_size = 10; 

  useEffect(() => {
    setIsLoading(true);

    const params: Record<string, string | boolean | number> = { page };
    if (search) params.search = search;
    if (statusFilter === "Open") params.is_active = true;
    if (statusFilter === "Closed") params.is_active = false;

    api
      .get<CareersResponse>("/jobs/", { params })
      .then((res) => {
        setCareers(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
        setCareers([]);
        setCount(0);
        setNext(null);
        setPrevious(null);
      })
      .finally(() => setIsLoading(false));
  }, [page, search, statusFilter]);

  return { careers, count, next, previous, page_size, isLoading };
};
