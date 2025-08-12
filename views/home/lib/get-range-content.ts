interface RangeContent {
  [key: string]: string;
}

export const getRangeContent = (
  ranges: RangeContent,
  number: number
): string => {
  if (number < 0 || number > 100) {
    return "";
  }

  for (const range in ranges) {
    const [start, end] = range.split("-").map(Number);
    if (number >= start && number <= end) {
      return ranges[range];
    }
  }

  return "";
};
