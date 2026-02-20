import { CitiesList } from "@/components/CitiesList";
import { Loading } from "@/components/Loading";
import { Message } from "@/components/Message";
import { useCitiesContext } from "@/contexts/citiesContext";

export function Cities() {
  const { cities, loading, currentCity } = useCitiesContext();

  return (
    <div className="fadeIn">
      {loading && !cities && <Loading />}
      {cities ? (
        <CitiesList cities={cities} currentCity={currentCity} />
      ) : (
        <Message />
      )}
    </div>
  );
}
