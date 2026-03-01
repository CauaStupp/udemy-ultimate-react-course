import { memo, useCallback, useReducer, type ChangeEvent } from "react";
import clickSound from "../assets/ClickSound.m4a";
import { timerReducer } from "../reducers/timerReducer";

type CalculatorProps = {
  workouts: {
    name: string;
    numExercises: number;
  }[];
  allowSound: boolean;
};

function Calculator({ workouts, allowSound }: CalculatorProps) {
  const [{ number, sets, speed, durationBreak }, dispatch] = useReducer(
    timerReducer,
    {
      number: workouts?.at(0)?.numExercises ?? 0,
      sets: 3,
      speed: 90,
      durationBreak: 5,
    },
  );

  const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const playSound = useCallback(
    (e: ChangeEvent) => {
      e.preventDefault;
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    },
    [allowSound],
  );

  return (
    <>
      <form onChange={(e) => playSound(e)}>
        <div>
          <label>Type of workout</label>
          <select
            value={number}
            onChange={(e) =>
              dispatch({ type: "add/number", payload: Number(+e.target.value) })
            }
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) =>
              dispatch({ type: "add/set", payload: Number(e.target.value) })
            }
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) =>
              dispatch({ type: "add/speed", payload: Number(e.target.value) })
            }
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) =>
              dispatch({
                type: "add/duration",
                payload: Number(e.target.value),
              })
            }
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={() => dispatch({ type: "less/timer" })}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={() => dispatch({ type: "add/timer" })}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
