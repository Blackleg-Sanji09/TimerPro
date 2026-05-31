import "./Timer.css";
import { useState, useRef, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [timeString, setTimeString] = useState("00:00:00");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    setTimeString(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`
    );
  }, [seconds]);

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeString(e.target.value);
  };

  const handleStart = () => {
    if (intervalRef.current !== null) return;

    const [h, m, s] = timeString.split(":").map(Number);

    if (
      isNaN(h) ||
      isNaN(m) ||
      isNaN(s)
    ) {
      alert("Please enter time in HH:MM:SS format");
      return;
    }

    const totalSeconds = h * 3600 + m * 60 + s;

    setSeconds(totalSeconds);

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    handleStop();
    setSeconds(0);
    setTimeString("00:00:00");
  };

  return (
    <div className="timer-section">
      <input
        className="timer-display"
        type="text"
        value={timeString}
        onChange={handleTimeChange}
        disabled={intervalRef.current !== null}
      />

      <div className="button-group">
        <button className="btn" onClick={handleStart}>
          Start
        </button>

        <button className="btn" onClick={handleStop}>
          Stop
        </button>

        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;