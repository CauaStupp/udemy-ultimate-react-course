import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { Loading } from "@/components/Loading";
import { useCitiesContext } from "@/contexts/citiesContext";
import { useEffect } from "react";
import { BackButton } from "@/components/BackButton";

const formatDate = (date: Date): string | null => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(d);
};

export default function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCitiesContext();

  useEffect(() => {
    id && getCity(id);
  }, [id]);

  if (isLoading) return <Loading />;
  if (currentCity)
    return (
      <div className={`fadeIn ${styles.container}`}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span className={styles.emoji}>{currentCity.emoji}</span>{" "}
            {currentCity.cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {currentCity.cityName} on</h6>
          <p>{formatDate(currentCity.date)}</p>
        </div>

        {currentCity.notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{currentCity.notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {currentCity.cityName} on Wikipedia &rarr;
          </a>
        </div>

        <BackButton />
      </div>
    );
}
