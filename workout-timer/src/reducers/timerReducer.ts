type AddNumber = {
  type: "add/number";
  payload: number;
};

type AddSet = {
  type: "add/set";
  payload: number;
};

type AddSpeed = {
  type: "add/speed";
  payload: number;
};

type AddDuration = {
  type: "add/duration";
  payload: number;
};

type TimerPlus = {
  type: "add/timer";
};

type TimerLess = {
  type: "less/timer";
};

type StateType = {
  number: number;
  sets: number;
  speed: number;
  durationBreak: number;
};

type ActionType =
  | AddNumber
  | AddSet
  | AddSpeed
  | AddDuration
  | TimerPlus
  | TimerLess;

export function timerReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "add/number":
      return {
        ...state,
        number: action.payload,
      };
    case "add/set":
      return {
        ...state,
        sets: action.payload,
      };
    case "add/speed":
      return {
        ...state,
        speed: action.payload,
      };
    case "add/duration":
      return {
        ...state,
        durationBreak: action.payload,
      };
    case "add/timer":
      return {
        ...state,
        number: state.number + 1,
      };
    case "less/timer":
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      throw new Error("Action unknow");
  }
}
