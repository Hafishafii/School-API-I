import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import type { Career } from "../types";

interface CareersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Career[];
  page_size?: number;
}

interface UseCareersParams {
  page?: number;
  search?: string;
  statusFilter?: string;
  currentPageUrl?: string | null; 
}

export const useCareers = ({
  page = 1,
  search = "",
  statusFilter = "All",
  currentPageUrl = null,
}: UseCareersParams) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = currentPageUrl || "/jobs/";
        const params: Record<string, string | boolean | number> = {};

        if (!currentPageUrl) {
          params.page = page;
          if (search) params.search = search;
          if (statusFilter === "Open") params.is_active = true;
          if (statusFilter === "Closed") params.is_active = false;
        }

        const res = await api.get<CareersResponse>(url, { params });

        setCareers(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);

        // read page_size from backend if available
        if (res.data.page_size) setPageSize(res.data.page_size);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        setCareers([]);
        setCount(0);
        setNext(null);
        setPrevious(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, search, statusFilter, currentPageUrl]);

  return { careers, count, next, previous, pageSize, isLoading };
};
