import type { ListType } from "@/contexts/citiesContext";

type StateType = {
  cities: ListType[] | null;
  isLoading: boolean;
  error: string | null;
  currentCity: ListType | null;
};

type CitiesLoadedType = {
  type: "cities/loaded";
  payload: ListType[];
};

type DeleteCityType = {
  type: "cities/delete";
};

type CityLoadedType = {
  type: "city/loaded";
  payload: ListType;
};

type CreateCityType = {
  type: "city/create";
  payload: ListType;
};

type CityDeleteType = {
  type: "city/delete";
  payload: string;
};

type LoadingType = {
  type: "cities/loading";
};

type ErrorType = {
  type: "cities/error";
  payload: string;
};

type ActionType =
  | CitiesLoadedType
  | DeleteCityType
  | CreateCityType
  | LoadingType
  | ErrorType
  | CityLoadedType
  | CityDeleteType;

type CitiesReturnType = StateType;

const initialState = {
  cities: null,
  isLoading: false,
  currentCity: null,
  error: null,
};

export function citiesReducer(
  state: StateType,
  action: ActionType,
): CitiesReturnType {
  switch (action.type) {
    case "cities/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "cities/delete":
      return initialState;
    case "cities/error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        cities: null,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/create":
      return {
        ...state,
        isLoading: false,
        cities: state.cities ? [...state.cities, action.payload] : state.cities,
      };
    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities
          ? state.cities.filter((city) => city.id !== action.payload)
          : state.cities,
      };
    default:
      throw new Error("Unknown action type");
  }
}
