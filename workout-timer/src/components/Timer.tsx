import { useEffect } from "react";

type TimerProps = {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  formatTime(date: Date): string;
};

function Timer({ time, setTime, formatTime }: TimerProps) {
  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <time>For your workout on {time}</time>;
}

export default Timer;
