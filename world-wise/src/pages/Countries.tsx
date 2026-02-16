import type { ListType } from "@/hooks/useMapCities";
import styles from "./Countries.module.css";
import { Loading } from "@/components/Loading";
import { CountriesList } from "@/components/CountriesList";

type CountriesProps = {
  cities: ListType[] | null;
  loading: boolean;
};

export function Countries({ cities, loading }: CountriesProps) {
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
      {loading && !countries && <Loading />}
      {countries && !loading ? (
        <CountriesList countries={countries} />
      ) : (
        <h2 className={styles.message}>
          👋 Add your first city by clicking on a city on the map
        </h2>
      )}
    </div>
  );
}
