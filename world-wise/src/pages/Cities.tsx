import { CitiesList } from "@/components/CitiesList";
import { Loading } from "@/components/Loading";
import { Message } from "@/components/Message";
import { useCitiesContext } from "@/contexts/citiesContext";

export default function Cities() {
  const { cities, isLoading, error, currentCity, deleteCity, deleteAllCities } =
    useCitiesContext();

  return (
    <div className="fadeIn">
      {error && !isLoading && <Message message={error} />}
      {isLoading && !cities && <Loading />}
      {cities ? (
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          deleteCity={deleteCity}
          deleteAllCities={deleteAllCities}
        />
      ) : (
        <Message />
      )}
    </div>
  );
}
