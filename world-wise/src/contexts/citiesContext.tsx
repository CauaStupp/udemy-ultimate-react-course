import { citiesReducer } from "@/reducers/citiesReducer";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
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
  isLoading: boolean;
  error: string | null;
  currentCity: ListType | null;
  getCity(id: string): void;
  createNewCity(city: Omit<ListType, "id">): void;
  deleteCity(id: string): void;
  deleteAllCities(): void;
};

const CitiesContext = createContext<CitiesContextType | null>(null);
const BASE_URL = "http://localhost:9000";

export function CitiesContextProvider({ children }: { children: ReactNode }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    citiesReducer,
    {
      cities: null,
      isLoading: false,
      currentCity: null,
      error: null,
    },
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "cities/loading" });
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) throw new Error("Error to get Cities");
        const json = (await response.json()) as ListType[];
        dispatch({ type: "cities/loaded", payload: json });
      } catch (error: unknown) {
        dispatch({
          type: "cities/error",
          payload: error instanceof Error ? error.message : "Error",
        });
      }
    }

    fetchData();
  }, []);

  async function getCity(id: string) {
    if (currentCity && id === currentCity.id) return;

    try {
      dispatch({ type: "cities/loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) throw new Error("Error to get Cities");
      const json = (await response.json()) as ListType;
      dispatch({ type: "city/loaded", payload: json });
    } catch (error: unknown) {
      dispatch({
        type: "cities/error",
        payload: error instanceof Error ? error.message : "Error",
      });
    }
  }

  async function createNewCity(city: Omit<ListType, "id">) {
    try {
      dispatch({ type: "cities/loading" });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error to Create new City");
      const data = (await response.json()) as ListType;
      dispatch({ type: "city/create", payload: data });
      navigate("/app/cities");
    } catch (error: unknown) {
      dispatch({
        type: "cities/error",
        payload: error instanceof Error ? error.message : "Error",
      });
    }
  }

  async function deleteCity(id: string) {
    try {
      dispatch({ type: "cities/loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error to Delete City");

      dispatch({ type: "city/delete", payload: id });
    } catch (error: unknown) {
      dispatch({
        type: "cities/error",
        payload: error instanceof Error ? error.message : "Error",
      });
    }
  }

  async function deleteAllCities() {
    try {
      dispatch({ type: "cities/loading" });

      if (!cities || cities.length === 0) {
        dispatch({ type: "cities/delete" });
        return;
      }

      await Promise.all(
        cities.map(async (c) => {
          const res = await fetch(`${BASE_URL}/cities/${c.id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Error to Delete all cities");
        }),
      );

      dispatch({ type: "cities/delete" });
    } catch (error: unknown) {
      dispatch({
        type: "cities/error",
        payload: error instanceof Error ? error.message : "Error",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        error,
        isLoading,
        currentCity,
        getCity,
        createNewCity,
        deleteCity,
        deleteAllCities,
      }}
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
