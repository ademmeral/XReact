'use client';
// https://github.com/ademmeral/XReact/hooks/useXTimer
import { useCallback, useEffect, useRef, useState } from "react";

export function useXTimer(from = 60, to = 0, elapsedTime = 1000) {
  const [timer, setTimer] = useState(from);
  const reqIdRef = useRef<number>(0);
  const countRef = useRef<number>(from);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const start = useCallback( () => {
    let startTime: number | null = null;
    const loop = (timestamp: number) => {

      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;

      if (elapsed >= elapsedTime) {
        setTimer(p => p - 1);
        startTime = timestamp;
        countRef.current--;
      }

      if (countRef.current > to) 
        reqIdRef.current = window.requestAnimationFrame(loop);
    };

    reqIdRef.current = window.requestAnimationFrame(loop);
  }, []);
  const stop = useCallback(() => window.cancelAnimationFrame(reqIdRef.current), [])
  const reset = useCallback(() => {
    if (reqIdRef.current !== 0) {
      setTimer(from)
      window.cancelAnimationFrame(reqIdRef.current);
      reqIdRef.current = 0;
    }
  }, []);
  
  return { timer : countRef.current, start, stop , reset };
}


/* =============== EXAMPLE USAGE ================= */
/*
function App() {
  const {timer, start, stop, reset} = useXTimer(60)
  console.log(timer)

  const strokeDash = { strokeDashoffset: (2 * Math.PI * r) - ((2 * Math.PI * r) * timer) / 60 }
  return (
    <div className="App">
      <div className='svg'>
        <svg width={150} height={150} >
          <circle cx={70} cy={70} r={70} style={strokeDash}></circle>
          <circle cx={70} cy={70} r={70}></circle>
        </svg>
        <span>{timer}</span>
      </div>
      <div className='buttons'>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
*/