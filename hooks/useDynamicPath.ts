import { useRef, useEffect, useState } from 'react';

export const useDynamicPath = (ref: React.MutableRefObject<HTMLElement|null>) => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newPath = (e.target as HTMLInputElement).value;
    console.log(newPath)
    setSearch(newPath);
    window.history.pushState(null, '', newPath);
  };

  return [search, handleChange] as [string, (e: React.FormEvent<HTMLInputElement>) => void];
}