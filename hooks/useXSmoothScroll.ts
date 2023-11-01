// https://github.com/ademmeral/XReact/hooks/useXSmoothScroll

import { useRef, useEffect } from 'react';

type RefType = {
  ref: { current: React.MutableRefObject<HTMLElement> }
}
const useXSmoothScroll = (ref: RefType, direction = 'y', target = 0, duration = 1_000) => {
  let { current: reqId } = useRef(0);

  useEffect(() => {
    const easing = (t:number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const startTime = Date.now();
    let startPos = direction === 'y' ? ref.current.scrollTop : ref.current.scrollLeft;

    function xScrollStep() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easing(progress);
      const _scrollTo = startPos + (target - startPos) * ease;
      direction === 'y' ? ref.current.scrollTop = _scrollTo : ref.current.scrollLeft = _scrollTo;
      startPos = _scrollTo;

      if (progress < 1)
        reqId = window.requestAnimationFrame(xScrollStep);
    }

    reqId = requestAnimationFrame(xScrollStep);
    return () => {
      window.cancelAnimationFrame(reqId);
    }
  }, [])
  return () => window.cancelAnimationFrame(reqId); // returns a clean function
}

export default useXSmoothScroll;