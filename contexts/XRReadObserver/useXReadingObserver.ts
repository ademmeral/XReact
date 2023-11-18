'use client';
// https://github.com/ademmeral/XReact/hooks/useXReadObserver.ts

import { useEffect, useState, MutableRefObject } from "react";
// import xInterval from './xInterval';

type UseXReadingObserver = (
  refs: { main: MutableRefObject<any>, lastChild: MutableRefObject<any> }, 
  readSpeed: number
) => {
  startTime: number,
  elapsedTime: number,
  isRead: boolean | null,
  restart : () => void
};

function xInterval(callback:any, interval:number) {
  let startTime = 0;
  let reqId:any;
  function loop(timestamp:any) {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;

    if (elapsed >= interval) {
      callback();
      startTime = timestamp;
    }

    reqId = window.requestAnimationFrame(loop);
  }

  reqId = window.requestAnimationFrame(loop);

  return {
    clear : function(){cancelAnimationFrame(reqId)}
  }
}

export const useXReadingObserver: UseXReadingObserver = ({main, lastChild}, readSpeed) => {
  const [isRead, setIsRead] = useState<boolean | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [observer, setObserver] = useState(new IntersectionObserver(callback, {threshold : 0, rootMargin: '0px'}))
  const [interval, setIntv] = useState<ReturnType<typeof xInterval>>();
  const [startTime, setStartTime] = useState<number>(0);
  const [refObserver, setRefObserver] = useState(new IntersectionObserver(refCallback, {threshold : 1, rootMargin: '0px'}))


  function callback (entries:IntersectionObserverEntry[]) {
    const targ = entries[0];
    if (targ.isIntersecting) {
      const elapsed = Math.round(targ.time)
      setElapsedTime(elapsed)
      if (elapsed >= readSpeed) setIsRead(true)
      else setIsRead(false);
      observer.disconnect();
      refObserver.disconnect();
    }
  };

  function restart(){
    observer.disconnect();
    refObserver.disconnect();
    setObserver(new IntersectionObserver(callback));
    setRefObserver(new IntersectionObserver(refCallback));
  };

  function startObserver(){
    setStartTime(Date.now())
    observer.observe(lastChild.current);
  }
  function refCallback(entries: IntersectionObserverEntry[]) {
    if (entries[0].isIntersecting) {
      if (main.current.clientHeight <= window.innerHeight) {
        setStartTime(Date.now())
        const intv = xInterval(() => {
          setElapsedTime(p => p += 2000);
        }, 2000);
        setIntv(intv)
      }
    } else startObserver();
  };

  useEffect(() => {
    if (elapsedTime >= readSpeed) {
      setIsRead(true);
      interval?.clear();
    }
  }, [elapsedTime])
  
  useEffect(() => {
    refObserver.observe(main.current);
    return () => {
      refObserver.disconnect();
      observer.disconnect();
    }
  }, [observer]);

  return { isRead, startTime, elapsedTime, restart };
};


/* ========== EXAMPLE USAGE =============== */
// measures elapsed time then destroy itself :'(
// but you can restart it :')
/*
function App() {
  const articleRef = useRef(null)
  const {isRead, elapsedTime, startTime, restart} = useXReadingObserver(articleRef, 5 * 1000);
  
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