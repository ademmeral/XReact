'use client';

import { useRef, createContext, useContext } from "react"
import { useXReadingObserver } from "./useXReadingObserver";

const XRReadingObserverContext = createContext<ReturnType<typeof useXReadingObserver>|null>(null)

function XRReadingObserver({ children, readSpeed }: {readSpeed:number, children: React.ReactNode }) {
  const articleRef = useRef(null);
  const lastChildRef = useRef(null);
  const {isRead, elapsedTime, startTime, restart} = useXReadingObserver(
    {
      main : articleRef, 
      lastChild : lastChildRef
    }, readSpeed);

  return (
    <XRReadingObserverContext.Provider value={{isRead, elapsedTime, startTime, restart}}>
      <article ref={articleRef} style={{width : 'max-content', height: 'max-content'}}>
        {children}
        <span ref={lastChildRef} />
      </article>
    </XRReadingObserverContext.Provider>
  )
}

export default XRReadingObserver;

export const useReadObserverContext = () => 
  useContext(XRReadingObserverContext) as ReturnType<typeof useXReadingObserver>;