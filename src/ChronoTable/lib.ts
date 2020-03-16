export function getEmptyDay(): string[][] {
  const hours = [];
  for (let h = 0; h < 24; h++) {
    hours[h] = ['', '', '', ''];
  }
  return hours;
}

export const HOURS: Readonly<string[][]> = getEmptyDay();
