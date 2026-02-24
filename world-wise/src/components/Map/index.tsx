import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { TileLayer } from "react-leaflet/TileLayer";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { useCitiesContext } from "@/contexts/citiesContext";
import { useGeolocation } from "@/hooks/useLocation";
import { Button } from "../Button";
import { useUrlPosition } from "@/hooks/useUrlPosition";

export function Map() {
  const { cities } = useCitiesContext();
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([0, 0]);
  const {
    position,
    isLoading: loadingLocation,
    getPosition,
  } = useGeolocation();
  const { mapCenter, lat, lng } = useUrlPosition();

  useEffect(() => {
    setMapPosition(mapCenter);
  }, [lat, lng]);

  useEffect(() => {
    if (position) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <section className={styles.container}>
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>

      <Button type="position" onClick={getPosition}>
        {loadingLocation ? "Loading..." : "Use your position"}
      </Button>
    </section>
  );
}

interface ChangeCenterProps {
  position: LatLngExpression;
}

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
