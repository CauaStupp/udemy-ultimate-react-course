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

type AddDurationBreak = {
  type: "add/durationBreak";
  payload: number;
};

type AddDuration = {
  type: "add/duration";
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
  duration: number;
};

type ActionType =
  | AddNumber
  | AddSet
  | AddSpeed
  | AddDurationBreak
  | TimerPlus
  | TimerLess
  | AddDuration;

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
    case "add/durationBreak":
      return {
        ...state,
        durationBreak: action.payload,
      };
    case "add/duration":
      return {
        ...state,
        duration:
          (state.number * state.sets * state.speed) / 60 +
          (state.sets - 1) * state.durationBreak,
      };
    case "add/timer":
      return {
        ...state,
        duration: state.duration >= 0 ? Math.floor(state.duration) + 1 : 0,
      };
    case "less/timer":
      return {
        ...state,
        duration: state.duration > 1 ? Math.ceil(state.duration) - 1 : 0,
      };
    default:
      throw new Error("Action unknow");
  }
}
