'use client';
// https://github.com/ademmeral/XReact/components/XRCountDown
import { useEffect, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import './xrcountdown.css';

export type PropsType = {
  from ?: number,
  size?: number,
  color? : string,
  thickness? : number,
  to? : number,
  elapsedTime? : number,
}
export function XRCountDown({ from, size, color, thickness, to, elapsedTime}: PropsType) {
  const {timer, start, stop, reset} = useTimer(from, to, elapsedTime)
  const {current : setValues} = useRef({
    from : from || 60,
    to : to || 0,
    size : size || 70,
    thickness : thickness || 8,
    circumference : 2 * Math.PI * (size || 70),
    style : {
      
    }
  });
  
  useEffect(() => { start() }, []);

  const s = {
    circle: {
      strokeWidth: thickness ? thickness : 8,
      stroke: color ? color : '#000',
      strokeDashoffset: setValues.circumference - (setValues.circumference * timer) / (from || 60),
      transform: `translate(${setValues.thickness / 2}px, ${setValues.thickness / 2}px)`,
    },
    circleFirst: {
      strokeDasharray: setValues.circumference,
    },
    circleLast: {
      strokeOpacity: '.3'
    }
  }



  return (
    <div className='xrcountdown'>
      <svg width={ (setValues.size * 2) + setValues.thickness } height={(setValues.size * 2) + setValues.thickness} >
        <circle cx={setValues.size} cy={setValues.size} r={setValues.size} style={{...s.circle, ...s.circleFirst}}></circle>
        <circle cx={setValues.size} cy={setValues.size} r={setValues.size} style={{...s.circle, ...s.circleLast}}></circle>
      </svg>
      <span>{timer}</span>
    </div>
  );
}


/* ========== EXAMPLE USAGE ============= */
/*
function App(){
  return (
    <div className='App'>
      <XRCountDown from={60} to={20} size={150} color='blue' thickness={15} elapsedTime={50}/>
    </div>
  )
}

export default App;
*/

