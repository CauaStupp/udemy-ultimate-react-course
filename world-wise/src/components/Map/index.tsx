import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";

export function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <section className={styles.container} onClick={() => navigate("/app/form")}>
      {lat}
      {lng}

      <div className={styles.buttonContainer}>
        <button className={styles.button}>Change position</button>
      </div>
    </section>
  );
}
