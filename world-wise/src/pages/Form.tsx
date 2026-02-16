import { Button } from "@/components/Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormInputType = {
  cityName: string;
  country: string;
  date: string;
  notes: string;
};

export function Form() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState<FormInputType>({
    cityName: "",
    country: "",
    date: String(new Date()),
    notes: "",
  });

  return (
    <form className={`fadeIn ${styles.form}`}>
      <div className={styles.box}>
        <label htmlFor="cityName">City name</label>
        <input
          type="text"
          id="cityName"
          value={formInput.cityName}
          onChange={({ target }) =>
            setFormInput({ ...formInput, cityName: target.value })
          }
        />
      </div>
      <div className={styles.box}>
        <label htmlFor="date">When did you go to {formInput.cityName}?</label>
        <input
          type="text"
          id="date"
          value={formInput.date}
          onChange={({ target }) =>
            setFormInput({ ...formInput, date: target.value })
          }
        />
      </div>
      <div className={styles.box}>
        <label htmlFor="notes">
          Notes about your trip to {formInput.cityName}
        </label>
        <textarea
          name="notes"
          id="notes"
          className={styles.textArea}
          value={formInput.notes}
          onChange={({ target }) =>
            setFormInput({ ...formInput, notes: target.value })
          }
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
