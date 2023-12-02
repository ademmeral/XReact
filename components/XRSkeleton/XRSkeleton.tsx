'use client'; // for nextjs

// https://github.com/ademmeral/XReact/components/XRSkeleton

import * as React from 'react';
import './rske.css';

export function XRSkeleton({h, w, amount, rounded, className, id} : XRSkeletonType) {

  const styleLi = {
    borderRadius : !rounded ? 0 : typeof rounded === 'string' ? rounded : `${rounded}px`,
    height: h ? `${h}px` : '100%',
    width : w ? `${w}px` : 'auto',
    flex: !w ? `1` : 'auto',
  }

  return (
    <div className={`xrskeleton_container` + className ? ` ${className}` : ''}>
      <ul className="xrskeleton_list" >
        {[...Array(amount).keys()]
          .map((k) => (
          <li 
            key={k} 
            className={`xrskeleton`}
            style={styleLi}
            id={id ? id : ''}
          ></li>
        ))}
      </ul>
    </div>
  )
};