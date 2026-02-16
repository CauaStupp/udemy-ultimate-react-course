import type { ListType } from "@/hooks/useMapCities";
import styles from "./Cities.module.css";
import { CitiesList } from "@/components/CitiesList";
import { Loading } from "@/components/Loading";

type CitiesProps = {
  cities: ListType[] | null;
  loading: boolean;
};

export function Cities({ cities, loading }: CitiesProps) {
  return (
    <div className="fadeIn">
      {loading && !cities && <Loading />}
      {cities ? (
        <CitiesList cities={cities} />
      ) : (
        <h2 className={styles.message}>
          👋 Add your first city by clicking on a city on the map
        </h2>
      )}
    </div>
  );
}
