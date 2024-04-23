import { useEffect, useRef, useState } from "react";
import { WordsNumbersConverter } from "../words-numbers-converter";

const DELAY = 500;

export const useWordsToNumberConverter = (value) => {
  const [debouncedValue, setDebouncedValue] = useState();
  const timeRef = useRef();

  useEffect(() => {
    if (value) {
      timeRef.current = setTimeout(() => {
        setDebouncedValue(WordsNumbersConverter.convertToNumbers(value));
      }, DELAY);

      return () => {
        clearTimeout(timeRef.current);
      };
    }
  }, [value]);

  return debouncedValue;
};
