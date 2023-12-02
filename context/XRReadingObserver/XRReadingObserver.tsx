'use client';

import * as React from 'react';
import { useRef, createContext, useContext } from "react"
import { useXReadingObserver } from "./useXReadingObserver";

const XRReadingObserverContext = createContext<XRReadingObserverContext>(null)


function XRReadingObserver({ children, readSpeed }: XRReadingObserverProps ) {
  const articleRef = useRef(null);
  const lastChildRef = useRef(null);
  const {isRead, elapsedTime, startTime, restart} = useXReadingObserver(
    {
      main : articleRef, 
      lastChild : lastChildRef
    }, readSpeed || 1000 * 60 * 60);

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

export const useXReadingObserverContext = () => 
  useContext(XRReadingObserverContext) as ReturnType<typeof useXReadingObserver>;