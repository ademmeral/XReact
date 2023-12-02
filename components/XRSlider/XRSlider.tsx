'use client'; // for nextjs
// https://github.com/ademmeral/XReact/components/XRSlider

import * as React from 'react';
import { useRef } from "react";
import { useXSlider } from "./useXSlider"
import './xrslider.css';


export function XRSlider({children, left, right, className, id}: XRSliderType) {
  const ref = useRef(null);
  useXSlider(ref) // returns nothing = undefined
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
