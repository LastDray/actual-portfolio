import { useState, useEffect, RefObject } from "react";
import { debounce, DebouncedFunction } from "../lib/debounce";

export const useScroll = (
  ref: RefObject<HTMLElement>,
  delay: number | null = null
): number => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useEffect(() => {
    const calculatePercentage = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const percentage =
          ((windowHeight - top) / (windowHeight + height)) * 100;
        setScrollPercentage(
          Number.isFinite(percentage)
            ? Math.max(0, Math.min(100, Math.round(percentage)))
            : 0
        );
      }
    };

    const handleScroll: DebouncedFunction<() => void> | (() => void) =
      delay && delay > 0
        ? debounce(calculatePercentage, delay)
        : calculatePercentage;

    window.addEventListener("scroll", handleScroll);
    // Вызываем сразу для начального значения
    calculatePercentage();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (delay && delay > 0) {
        (handleScroll as DebouncedFunction<() => void>).cancel();
      }
    };
  }, [ref, delay]);

  return scrollPercentage;
};
