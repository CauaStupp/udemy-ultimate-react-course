import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import type { ListType } from "@/contexts/citiesContext";

type CitiesListProps = {
  cities: ListType[];
  currentCity: ListType | null;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function CitiesList({ cities, currentCity }: CitiesListProps) {
  return (
    <ul className={styles.list}>
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
            >
              &times;
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
