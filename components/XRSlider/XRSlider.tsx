// https://github.com/ademmeral/XReact/components/XRSlider

'use client'; // for nextjs

import { useRef } from "react";
import { useSlider } from "./useXSlider"
import './xrslider.css';

type PropsType = {
  children : React.ReactNode,
  left? : React.ReactNode,
  right? : React.ReactNode,
  className? : string,
  id? : string,
}

function XRSlider({children, left, right, className, id}: PropsType) {
  const ref = useRef(null);
  useSlider(ref) // returns nothing = undefined
  return (
    <div 
      className={`xrslider_container` + className ? ` ${className}` : ''} 
      id={id ? id : ''} 
      ref={ref}
    >
      <div className="xrslider_shadow xrslider_hide">
        <button type="button" className="xrslider_arrow">
          {left}
        </button>
      </div>
      <div className="xrslider_shadow">
        <button type="button" className="xrslider_arrow">
        {right}
        </button>
      </div>
      <ul className="xrslider_list">
        {children}
      </ul>
    </div>
  )
}

export default XRSlider;