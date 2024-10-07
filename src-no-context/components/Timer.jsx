import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  // Update the timer every second
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {/*
        // if mins is less than 10, add a leading zero
        // if secs is less than 10, add a leading zero
      */}
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
