import styles from "./styles.module.css";

type CountriesProps = {
  countries: {
    emoji: string;
    country: string;
  }[];
};

export function CountriesList({ countries }: CountriesProps) {
  return (
    <ul className={styles.list}>
      {countries.map((city) => (
        <li className={styles.item} key={city.country}>
          <h3 className={styles.sigle}>{city.emoji}</h3>
          <span className={`truncate ${styles.cityName}`} title={city.country}>
            {city.country}
          </span>
        </li>
      ))}
    </ul>
  );
}
