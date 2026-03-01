import { useMemo, useState } from "react";
import Timer from "./components/Timer";
import ToggleSounds from "./components/ToggleSounds";
import Calculator from "./components/Calculator";

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

function App() {
  const [allowSound, setAllowSound] = useState(true);

  const [time, setTime] = useState(formatTime(new Date()));
  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  return (
    <main>
      <h1>Workout timer</h1>
      <Timer time={time} setTime={setTime} formatTime={formatTime} />

      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
