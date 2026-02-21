import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import type { ListType } from "@/contexts/citiesContext";
import { Button } from "../Button";

type CitiesListProps = {
  cities: ListType[];
  currentCity: ListType | null;
  deleteCity(id: string): void;
  deleteAllCities(): void;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function CitiesList({
  cities,
  currentCity,
  deleteCity,
  deleteAllCities,
}: CitiesListProps) {
  return (
    <ul className={styles.list}>
      {cities.length >= 10 && (
        <Button type="primary" onClick={deleteAllCities}>
          Delete all
        </Button>
      )}
      {cities.map((city) => (
        <li className={styles.item} key={city.id}>
          <Link
            to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
            className={`${styles.content} ${city.id === currentCity?.id ? styles.active : ""}`}
          >
            <h3 className={styles.sigle} title={city.emoji}>
              {city.emoji}
            </h3>
            <span
              className={`truncate ${styles.cityName}`}
              title={city.cityName}
            >
              {city.cityName}
            </span>
            <time
              dateTime="pt-br"
              className={styles.time}
              title={String(city.date)}
            >
              {formatDate(city.date)}
            </time>
            <button
              className={styles.deleteButton}
              aria-label="Delete country button"
              onClick={(e) => {
                e.preventDefault();
                deleteCity(city.id);
              }}
            >
              &times;
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
