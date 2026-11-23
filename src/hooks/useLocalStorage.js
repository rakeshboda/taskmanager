
import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {

  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue;

    } catch (error) {
      console.warn("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(value)
      );

    } catch (error) {
      console.warn("Error saving to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
