// https://github.com/ademmeral/XReact/components/XRSkeleton

'use client'; // for nextjs

import './rske.css';

type PropsType = {
  h?: number,
  w?:number,
  amount : Required<number>,
  rounded ?: number|string,
  className ?: string,
  id?: string,
}

function XRSkeleton({h, w, amount, rounded, className, id} : PropsType) {

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
}
export default XRSkeleton