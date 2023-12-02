type XReactType = {
  children : React.ReactNode
}
// HOOKS
type UseXDynamicPathType = () => 
  [string, (e: React.FormEvent<HTMLInputElement>) => void];

type UseXTimerType = (from: number, to: number, elapsedTime: number) => {
  timer: number;
  start: React.RefCallback;
  stop: React.RefCallback;
  reset: React.RefCallback;
};

type UseXReadingObserverType = (
  refs: { main: MutableRefObject<any>, lastChild: MutableRefObject<any> }, 
  readSpeed: number
) => {
  startTime: number,
  elapsedTime: number,
  isRead: boolean | null,
  restart : () => void
};

type UseXSelectType = (
  ref : React.MutableRefObject<HTMLElement | null>,
  listener : ((e:KeyboardEvent | PointerEvent | MouseEvent | Event) => void|any)|undefined
) => [string, boolean]

type UseXSliderType = (ref : React.MutableRefObject<HTMLElement | null>) => void

type UseXIntervalType = (callback: () => void | any, interval: number) => { clear: () => void | any }

type UseXResizeObserverType = (ref: React.RefObject<HTMLElement>) => {
  width: number;
  height: number;
};

// COMPONENTS & CONTEXT

type XRReadingObserverProps =  {
  readSpeed?:number, 
  children?: React.ReactNode 
};

type XRReadingObserverContext = {
  startTime: number,
  elapsedTime: number,
  isRead: boolean | null,
  restart : () => void
} | null

type XRCountDownType = {
  from ?: number,
  size?: number,
  color? : string,
  thickness? : number,
  to? : number,
  elapsedTime? : number,
}

type XRSpinnerType = {
  size?:number,
  color?:string,
  thickness?:number,
  className ?: string,
  id?: string
}

type XRSliderType = {
  children: React.ReactNode,
  left?: React.ReactNode,
  right?: React.ReactNode,
  className?: string,
  id?: string,
}

type XRSelectType = {
  defaultValue: string;
  data: (string | number | Record<string, any>)[];
  itemKey?: string;
  textColor? : string,
  backgroundColor? : string,
  radius? : number|string,
  borderColor? : string,
  onChanged? : ((e:KeyboardEvent | PointerEvent | MouseEvent | Event) => void|any)|undefined
  className? : string,
  id? : string,
};

type XRSkeletonType = {
  h?: number,
  w?:number,
  amount : Required<number>,
  rounded ?: number|string,
  className ?: string,
  id?: string,
}