import { useRef, useEffect, useState } from 'react';

export const useXDynamicPath:UseXDynamicPathType = () => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newPath = (e.target as HTMLInputElement).value;
    setSearch(newPath);
    window.history.pushState(null, '', newPath);
  };

  return [search, handleChange];
}