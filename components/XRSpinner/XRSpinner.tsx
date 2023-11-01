// https://github.com/ademmeral/XReact/components/XRSpinner
'use client'; // for nextjs
import './xrspinner.css';

type PropsType = {
  size?:number,
  color?:string,
  thickness?:number,
  className : string,
  id: string|number
}
function Spinner({size, color, thickness, className, id}: PropsType) {
  const wrappertStyle = {
    width : size ? `${size}px` : '100px',
    height : size ? `${size}px` : '100px',
  }
  const commonStyle = {
    borderWidth : thickness ? `${thickness}px` : '3px',
    borderStyle : 'solid',
  }
  const circleStyle = {
    ...commonStyle,
    borderTopColor: color ? color : '#ffffff',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  }
  const layerCircleStyle = {
    ...commonStyle,
    opacity : '.3',
    borderColor: color ? color : '#ffffff',
  }

  return (
    <div 
      className={'xrspinner_container' + className ? ` ${className}` : ''} 
      id={id ? id : ''}
    >
      <div className={'xrspinner_wrapper'} style={wrappertStyle}>
        <div className={'xrspinner_circle'} style={circleStyle}></div>
        <div className={'xrspinner_circle'} style={layerCircleStyle}></div>
      </div>
    </div>
  )
}
const XR = { Spinner };
export default XR;