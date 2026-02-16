import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import type {} from "@/pages/Cities";
import type { ListType } from "@/hooks/useMapCities";

type CitiesListProps = {
  cities: ListType[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function CitiesList({ cities }: CitiesListProps) {
  return (
    <ul className={styles.list}>
      {cities.map((city) => (
        <li className={styles.item} key={city.id}>
          <Link
            to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
            className={styles.content}
          >
            <h3 className={styles.sigle}>{city.emoji}</h3>
            <span className={styles.cityName}>{city.cityName}</span>
            <time dateTime="pt-br" className={styles.time}>
              {formatDate(city.date)}
            </time>
            <button className={styles.deleteButton}>&times;</button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
