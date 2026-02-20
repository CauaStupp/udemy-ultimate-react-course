import type { LatLngExpression } from "leaflet";
import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const mapCenter: LatLngExpression =
    lat && lng ? [parseFloat(lat), parseFloat(lng)] : [0, 0];

  return {
    mapCenter,
    lat,
    lng,
    setSearchParams,
  };
}
