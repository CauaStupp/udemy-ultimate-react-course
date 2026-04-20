import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  key: string,
): [value: T, setValue: Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initialState;
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      // support legacy plain values (e.g. "dark"/"light" or string booleans)
      if (typeof initialState === "boolean") {
        if (storedValue === "dark") return true as unknown as T;
        if (storedValue === "light") return false as unknown as T;
        if (storedValue === "true") return true as unknown as T;
        if (storedValue === "false") return false as unknown as T;
      }
      // fallback: return raw stored string coerced to T
      return storedValue as unknown as T;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
