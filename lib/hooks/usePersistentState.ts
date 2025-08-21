import { useState, useEffect } from 'react';

function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default usePersistentState;
export { usePersistentState };
