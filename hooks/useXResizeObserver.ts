'use client';
// https://github.com/ademmeral/XReact/hooks/useResizeObserver
import { useEffect, useState } from "react";

function useResizeObserver(ref: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState({
    width: ref && ref.current ? ref.current.clientWidth : null,
    height: ref && ref.current ? ref.current.clientHeight : null
  })
  useEffect(() => {
    function callback(entries: ResizeObserverEntry[]): void {
      const target = entries[0].target as HTMLElement;
      setSize({
        width: target.clientWidth,
        height: target.clientHeight
      })
    }
    const observer = new ResizeObserver(callback)
    if (ref && ref?.current) observer.observe(ref.current);

    return () => { observer.disconnect() };
  }, [])
  return size
}

export default useResizeObserver


// /***** USAGE OF useResizeObserver *****/

// App.tsx

/* import { useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';

export default function App() {
  const appRef = useRef() as React.RefObject<HTMLDivElement>
  const size = useResizeObserver(appRef)

  console.log('Width : ',size.width, 'Height : ', size.height)
  
  return (
    <div ref={appRef}>App</div>
  )
} */