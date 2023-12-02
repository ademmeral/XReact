
export const useXInterval:UseXIntervalType = (callback:any, interval:number) => {
  
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