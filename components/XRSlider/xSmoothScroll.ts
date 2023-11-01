// https://github.com/ademmeral/xModules/xSmoothScroll
export default function xSmoothScroll(
  element = document.body, direction = 'y', 
  target = 0, duration = 1000
) {

  let reqId: number;
  
  const easing = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const startTime = Date.now();
  let startPos = direction === 'y' ? element.scrollTop : element.scrollLeft;

  function scrollStep() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easing(progress);
    const _scrollTo = startPos + (target - startPos) * ease;
    direction === 'y' ? element.scrollTop = _scrollTo : element.scrollLeft = _scrollTo;
    startPos = _scrollTo;

    if (progress < 1) {
      reqId = window.requestAnimationFrame(scrollStep);
    }
  }

  reqId = requestAnimationFrame(scrollStep);
  return {
    clear: () => window.cancelAnimationFrame(reqId)
  }
}