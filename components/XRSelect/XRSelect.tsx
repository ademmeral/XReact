// https://github.com/ademmeral/XReact/components/XRSelect
import * as React from 'react';
import { useRef } from "react";
import { useXSelect } from "./useXSelect";
import './xrselect.css';


export const XRSelect = ({ ...p }: XRSelectType) => {
  const selectionRef = useRef(null);
  const [selectedValue, isExpanded] = useXSelect(selectionRef, p.onChanged);
  // console.log('rendering...')
  const style = {
    borderRadius: !p.radius
      ? '0' : typeof p.radius === 'string'
        ? p.radius : `${p.radius}px`,
    backgroundColor: p.backgroundColor || 'rgba(0, 0, 0, .3)',
    color: p.textColor || '#fff',
    borderWidth : '2px',
    borderColor : p.borderColor || 'transparent'
  }
  const cls = p.className ? ` ${p.className}` : ''
  return (
    <div
      className={"xrselect_container" + cls} 
      id={p.id ? p.id : ''} 
      ref={selectionRef}
    >
      <button
        className={`xrselect_toggle${isExpanded ? " xrselect_active" : ""}`}
        style={style}
        type="button"
        role="select"
        aria-haspopup="true"
      >
        <span>{selectedValue || p.defaultValue}</span>
        <div className="xrselect_arrow" />
      </button>
      <ul
        className="xrselect_list"
        style={{
          ...style, 
          display: isExpanded ? 'block' : 'none' 
        }}
        role="listbox"
        aria-expanded="true"
      >
        <li role="option" tabIndex={0} style={{backgroundColor : style.backgroundColor}}>
          {p.defaultValue}
        </li>
        {
          p.data.map((el, i) => {
            let item = el.constructor.name === 'object'
              ? el[p.itemKey as keyof typeof p.itemKey]
              : el as string;
            return (
              <li 
                key={i} 
                role="option" 
                tabIndex={i + 1} 
                style={{backgroundColor : style.backgroundColor}}
                className={`xrselect_options`}  
              >
                {item}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

/***** EXAMPLE USAGE *****/
/*
function App() {
  return (
    <div className="App">
      <XR.Select 
        defaultValue="--mark as" 
        data={["BMW", "MERCEDES", "TOYOTA", WV, HYUNDAI]}
        backgroundColor = {'red'}
        textColor = {'#fff'}
        radius={10}
        borderColor='pink'
        onChanged={(e) => console.log(e.target.value)}  // Just as we used for inputs/etc..
      />
    </div>
  );
}
*/