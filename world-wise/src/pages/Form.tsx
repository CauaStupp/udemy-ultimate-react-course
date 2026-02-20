import { Button } from "@/components/Button";
import styles from "./Form.module.css";
import { BackButton } from "@/components/BackButton";
import { useUrlPosition } from "@/hooks/useUrlPosition";
import { useGeocoding } from "@/hooks/useGeocoding";
import { Loading } from "@/components/Loading";
import { Message } from "@/components/Message";
import DatePicker from "react-datepicker";
import { useCitiesContext } from "@/contexts/citiesContext";

export function Form() {
  const { lat, lng } = useUrlPosition();
  const { geocoding, setGeocoding, loading, error } = useGeocoding(lat, lng);
  const { createNewCity, loading: citiesLoading } = useCitiesContext();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!geocoding.cityName || !geocoding.date)
      return alert("Need City Name and Date!");

    createNewCity(geocoding);
  }

  if ((!geocoding && !error && !loading) || !lat || !lng) return <Message />;
  if (loading && !error) return <Loading />;
  if (citiesLoading) return <Loading />;
  return (
    <form className={`fadeIn ${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.box}>
        <label htmlFor="cityName">City name</label>
        <input
          type="text"
          id="cityName"
          value={geocoding.cityName}
          onChange={({ target }) =>
            setGeocoding({ ...geocoding, cityName: target.value })
          }
        />
      </div>
      <div className={styles.box}>
        <label htmlFor="date">When did you go to {geocoding.cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date: any) => setGeocoding({ ...geocoding, date: date })}
          selected={geocoding.date}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className={styles.box}>
        <label htmlFor="notes">
          Notes about your trip to {geocoding.cityName}
        </label>
        <textarea
          name="notes"
          id="notes"
          className={styles.textArea}
          value={geocoding.notes}
          onChange={({ target }) =>
            setGeocoding({ ...geocoding, notes: target.value })
          }
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
