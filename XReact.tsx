import * as React from 'react';

import XRReadingObserver from "./context/XRReadingObserver/XRReadingObserver";
import { XRCountDown } from './components/XRCountDown/XRCountDown';
import { XRSelect } from './components/XRSelect/XRSelect';
import { XRSpinner } from './components/XRSpinner/XRSpinner';
import { XRSlider } from './components/XRSlider/XRSlider';
import { XRSkeleton } from './components/XRSkeleton/XRSkeleton';
import { useXDynamicPath } from './hooks/useXDynamicPath';
import { useXConnectionStatus } from './hooks/useXConnectionStatus';
import { useXResizeObserver } from './hooks/useXResizeObserver';
import { useXSelect } from './hooks/useXSelect';
import { useXSlider } from './hooks/useXSlider';
import { useXTimer } from './components/XRCountDown/useXTimer';
import { useXInterval } from './context/XRReadingObserver/useXInterval';

function XReact({ children }: XReactType) {
  return children;
}
// COMPONENTS & CONTEXT
XReact.ReadingObserver = ({ children }) => {
  return (
    <XRReadingObserver>
      {children}
    </XRReadingObserver>
  )
};
XReact.CountDown = XRCountDown;
XReact.Select = XRSelect;
XReact.Spinner = XRSpinner;
XReact.Slider = XRSlider;
XReact.Skeleton = XRSkeleton;

// HOOKS
XReact.useDynamicPath = useXDynamicPath;
XReact.useConnectionStatus = useXConnectionStatus;
XReact.useResizeObserver = useXResizeObserver;
XReact.useSelect = useXSelect;
XReact.useSlider = useXSlider;
XReact.useTimer = useXTimer;
XReact.useInterval = useXInterval;

export default XReact