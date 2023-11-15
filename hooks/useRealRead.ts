'use client';
// https://github.com/ademmeral/XReact/hooks/useRealRead.ts

import { useEffect, useState, useRef, MutableRefObject } from "react";


type UseRealReadHook = (ref: MutableRefObject<any>, readSpeed: number) => {
  startTime: number,
  elapsedTime: number,
  isRead: boolean | null,
  restart : () => void
};

export const useRealRead: UseRealReadHook = (ref, readSpeed) => {
  const [isRead, setIsRead] = useState<boolean | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [observer, setObserver] = useState(new IntersectionObserver(callback))
  let { current: startTime } = useRef(Date.now());

  function callback (entries:IntersectionObserverEntry[]) {
    const targ = entries[0];
    if (targ.isIntersecting) {
      const elapsed = Math.round(targ.time)
      setElapsedTime(elapsed)
      if (elapsed >= readSpeed) setIsRead(true)
      else setIsRead(false);
      observer.disconnect();
    }
  };

  function restart(){
    observer.disconnect();
    ref.current.removeChild(ref.current.lastElementChild);
    setObserver(new IntersectionObserver(callback));
  };

  function startObserver(){
    const lastSpan = document.createElement('span');
    lastSpan.setAttribute('class', 'read-section last');
    ref.current.appendChild(lastSpan, ref.current.lastChild);

    observer.observe(lastSpan);
  }

  useEffect(() => {
    startObserver();
    return () => {
      observer.disconnect();
    };
  }, [observer]);

  return { isRead, startTime, elapsedTime, restart };
};


/* ========== EXAMPLE USAGE =============== */
// measures elapsed time then destroy itself :'(
// but you can restart it :')
/*
function App() {
  const articleRef = useRef(null)
  const {isRead, elapsedTime, startTime, restart} = useRealRead(articleRef, 5 * 1000);
  
  useEffect(() => {

    if (!isRead) restart();

  }, [isRead])

  return (
    <div id="App">
      <article ref={articleRef}> Tons of Texts... </article>
    </div>
  )
}
*/