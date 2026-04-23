export const calculatePercentage = (part: number, whole: number): number => {
  if (whole === 0) return 0;
  return Math.round((part / whole) * 100);
};

export const getCellsToFill = (part: number, whole: number): number => {
  // Number of 100-grid cells to fill based on the part and whole
  // e.g. part 1 of 50 whole = 2 cells
  return Math.round((part / whole) * 100);
};
