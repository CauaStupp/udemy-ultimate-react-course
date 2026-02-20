import { useState } from "react";

export type LocationData = {
  lat: number;
  lng: number;
};

type UseGeolocationReturn = {
  position: LocationData | null;
  isLoading: boolean;
  error: string | null;
  countClicks: number;
  getPosition: () => void;
};

export function useGeolocation(
  defaultPosition: LocationData | null = null,
): UseGeolocationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(0);
  const [position, setPosition] = useState<LocationData | null>(
    defaultPosition,
  );
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    setCountClicks((count) => count + 1);

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { position, isLoading, error, countClicks, getPosition };
}
