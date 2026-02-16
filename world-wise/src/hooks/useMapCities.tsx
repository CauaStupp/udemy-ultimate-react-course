import { useEffect, useState } from "react";

export type ListType = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

const BASE_URL = "http://localhost:9000";

type UseMapCitiesReturn = {
  cities: ListType[] | null;
  loading: boolean;
  error: string | null;
};

export function useMapCities(): UseMapCitiesReturn {
  const [cities, setCities] = useState<ListType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) throw new Error("Error to get Cities");
        const json = (await response.json()) as ListType[];
        setCities(json);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error");
        setLoading(false);
        setCities(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    cities,
    loading,
    error,
  };
}
