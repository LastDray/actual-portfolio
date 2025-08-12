export type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): DebouncedFunction<T> => {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced as DebouncedFunction<T>;
};
