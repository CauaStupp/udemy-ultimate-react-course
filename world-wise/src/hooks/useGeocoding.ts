import type { ListType } from "@/contexts/citiesContext";
import { useEffect, useState } from "react";

type CityFetchType = {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  locality: string;
  localityInfo: {
    administrative: {
      adminLevel: number;
      description: string;
      geonameId: number;
      isoCode: string;
      isoName: string;
      name: string;
      order: number;
      wikidataId: string;
    }[];
    informative: {
      description: string;
      geonameId: number;
      isoCode: string;
      isoName: string;
      name: string;
      order: number;
      wikidataId: string;
    }[];
  };
  localityLanguageRequested: string;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function useGeocoding(lat: string | null, lng: string | null) {
  const [geocoding, setGeocoding] = useState<Omit<ListType, "id">>({
    cityName: "",
    country: "",
    date: new Date(),
    notes: "",
    emoji: "",
    position: {
      lat: 0,
      lng: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        if (!response.ok) throw new Error("Error to get city");
        const data = (await response.json()) as CityFetchType;

        setGeocoding({
          ...geocoding,
          cityName: data.city || data.locality || "",
          country: data.countryName,
          emoji: convertToEmoji(data.countryCode),
          position: {
            lat: data.latitude,
            lng: data.longitude,
          },
        });
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error");
        console.error(error instanceof Error ? error.message : "Error");
      } finally {
        setLoading(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  return {
    geocoding,
    setGeocoding,
    loading,
    error,
  };
}
