import styles from "./Countries.module.css";
import { Loading } from "@/components/Loading";
import { CountriesList } from "@/components/CountriesList";
import { useCitiesContext } from "@/contexts/citiesContext";

export function Countries() {
  const { cities, isLoading } = useCitiesContext();
  const countries =
    cities &&
    cities.reduce((arr: { country: string; emoji: string }[], city) => {
      if (!arr.map((item) => item.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    }, []);

  return (
    <div className="fadeIn">
      {isLoading && !countries && <Loading />}
      {countries && !isLoading ? (
        <CountriesList countries={countries} />
      ) : (
        <h2 className={styles.message}>
          👋 Add your first city by clicking on a city on the map
        </h2>
      )}
    </div>
  );
}
