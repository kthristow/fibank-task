import { useCallback, useEffect, useState } from "react";
import {
  type SwapiPeopleResponse,
  type SwapiPerson,
  fetchSwapiPeople,
} from "../api/api";
import { getCache, setCache } from "../lib/cache";

export type UsePeopleTableResult = {
  people: SwapiPerson[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  showOfflineModal: boolean;
  closeOfflineModal: () => void;
  refetch: () => void;
};

const PAGE_SIZE = 10;

export const usePeopleTable = (): UsePeopleTableResult => {
  const [people, setPeople] = useState<SwapiPerson[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const fetchPage = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    const cacheKey = `swapi_people_page_${page}`;

    try {
      const cached = getCache<SwapiPeopleResponse>(cacheKey);

      if (cached) {
        setPeople(cached.results);
        setTotalPages(Math.ceil(cached.count / PAGE_SIZE));
        setLoading(false);
        return;
      }

      const response = await fetchSwapiPeople(page);
      setCache(cacheKey, response);
      setPeople(response.results);
      setTotalPages(Math.ceil(response.count / PAGE_SIZE));
    } catch {
      setError("Failed to load Star Wars characters. Please try again.");
      if (!navigator.onLine) {
        setShowOfflineModal(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, reloadFlag, fetchPage]);

  const goToPage = (page: number) => {
    setCurrentPage((prev) => {
      if (page < 1) return prev;
      if (page > totalPages) return prev;
      return page;
    });
  };

  const closeOfflineModal = () => setShowOfflineModal(false);
  const refetch = () => setReloadFlag((x) => x + 1);

  return {
    people,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    showOfflineModal,
    closeOfflineModal,
    refetch,
  };
};
