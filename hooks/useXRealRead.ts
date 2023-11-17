'use client';
// https://github.com/ademmeral/XReact/hooks/useXRealRead.ts

import { useEffect, useState, MutableRefObject } from "react";
// import xInterval from './xInterval';

type UseXRealRead = (ref: MutableRefObject<any>, readSpeed: number) => {
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

export const useXRealRead: UseXRealRead = (ref, readSpeed) => {
  const [isRead, setIsRead] = useState<boolean | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [observer, setObserver] = useState(new IntersectionObserver(callback))
  const [interval, setIntv] = useState<ReturnType<typeof xInterval>>();
  const [startTime, setStartTime] = useState<number>(0);


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
    setStartTime(Date.now())
    const lastSpan = document.createElement('span');
    lastSpan.setAttribute('class', 'read-section last');
    ref.current.appendChild(lastSpan, ref.current.lastChild);

    observer.observe(lastSpan);
  }
  
  useEffect(() => {
    if (elapsedTime >= readSpeed) {
      setIsRead(true);
      interval?.clear();
    }
  }, [elapsedTime])
  
  useEffect(() => {
    const refObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        if (ref.current.clientHeight <= window.innerHeight) {
          setStartTime(Date.now())
          const intv = xInterval(() => {
            setElapsedTime(p => p += 2000);
          }, 2000);
          setIntv(intv)
        }
      } else startObserver();
    });
    refObserver.observe(ref.current);

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
  const {isRead, elapsedTime, startTime, restart} = useXRealRead(articleRef, 5 * 1000);
  
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