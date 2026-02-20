import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

export type ListType = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

type CitiesContextType = {
  cities: ListType[] | null;
  loading: boolean;
  error: string | null;
  currentCity: ListType | null;
  getCity(id: string): void;
  createNewCity(city: Omit<ListType, "id">): void;
};

const CitiesContext = createContext<CitiesContextType | null>(null);
const BASE_URL = "http://localhost:9000";

export function CitiesContextProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ListType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<ListType | null>(null);
  const navigate = useNavigate();

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

  async function getCity(id: string) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) throw new Error("Error to get Cities");
      const json = (await response.json()) as ListType;
      setCurrentCity(json);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error");
      setCities(null);
    } finally {
      setLoading(false);
    }
  }

  async function createNewCity(city: Omit<ListType, "id">) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error to Create new City");
      const data = (await response.json()) as ListType;
      await setCities((cities) => (cities ? [...cities, data] : [data]));
      navigate("/app/cities");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error");
      setCities(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, error, loading, currentCity, getCity, createNewCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("Error in CitiesContext");
  return context;
}
