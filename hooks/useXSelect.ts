// https://github.com/ademmeral/XReact/hooks/useXSelect

import { useEffect, useState, useRef } from "react"

type PropTypes = {
  ref : React.MutableRefObject<HTMLElement | null>,
  onChanged ?: ((e:KeyboardEvent | PointerEvent | MouseEvent | Event) => void|any),
  classNames : {
    list : HTMLElement,
    button: HTMLElement
  }
}

function useXSelect({ ref, onChanged, classNames: { list, button } }: PropTypes) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState('')
  const {current : changedEvent} = useRef(new Event('changed'));


  useEffect(() => {
    const element = ref.current as HTMLSelectElement; // Hssstt, between us
    // button & menu item
    const btn = element.querySelector(`.${button}`) as HTMLElement;
    const menu = element.querySelector(`.${list}`) as HTMLElement;

    // event handlers
    const handleButtonClick = (e:Event) => {  // button click
      e.stopPropagation();
      setIsExpanded((p:boolean) => !p)
    };


    const handleMenuChildrenClick = (e: Event) => { // menu children click
      const target = e.currentTarget as HTMLLIElement;
      
      if (target) {
        element.value = target.textContent as string;
        element.dispatchEvent(changedEvent);
        setValue(target.textContent as string)
        setIsExpanded(false);
      };
    };

    const handleClickOut = (e: Event) => {    // document click
      if (!e.composedPath().includes(element))
        setIsExpanded(false);
    };
    const handleItemKeyDown = (e:Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLLIElement
      if (target && 'key' in e){
        const prevSib = target.previousElementSibling as HTMLElement
        const nextSib = target.nextElementSibling as HTMLElement
    
        if(e.key === "ArrowUp" && prevSib ) { // up
          prevSib.focus();
        } else if(e.key === "ArrowDown" && nextSib) { // down
          nextSib.focus();
        } else if(e.key === "Escape") { // escape key
          setIsExpanded(false);
        } else if(e.key === "Enter" || e.key === "Space") { // enter or spacebar key
          setValue(target.textContent as string);
          setIsExpanded(false);
          element.value = target.textContent as string;
          element.dispatchEvent(changedEvent);
          btn.focus();
        }
      }
    };
    const handleToggleKeyPress = (e:KeyboardEvent) => {
      e.preventDefault();
  
      if(e.key === "Escape") { // escape key
        setIsExpanded(false);
      } else if(e.key === "Enter" || e.key === "Space") { // enter or spacebar key
        setIsExpanded(true);
      } else if (e.key === 'ArrowDown') {
        (menu.children[0] as HTMLLIElement).focus()
      }
    };

    // dispatching
    document.addEventListener('click', handleClickOut, false)
    btn.addEventListener('click', handleButtonClick)
    btn.addEventListener('keydown', handleToggleKeyPress)
    Array.from(menu.children).forEach(li => {
      li.addEventListener('click', handleMenuChildrenClick)
      li.addEventListener('keydown', handleItemKeyDown)
    });
    element.addEventListener('changed', onChanged as EventListener)

    // component unmount
    return () => {
      document.removeEventListener('click', handleClickOut);
      btn.removeEventListener('click', handleButtonClick);
      btn.removeEventListener('keydown', handleToggleKeyPress);
      for (const li of menu.children) {
        li.removeEventListener('click', handleMenuChildrenClick)
        li.removeEventListener('keydown', handleItemKeyDown)
      };
      element.removeEventListener('changed', onChanged as EventListener)
    };

  }, [])


  return [value, isExpanded];
}

export default useXSelect