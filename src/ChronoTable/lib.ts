import * as History from './types';
import { TimeCode } from './types';

export const HOURS: Readonly<History.Day> = getEmptyDay();

const TIME_CODE_SEP = '.';

export function getEmptyDay(): History.Day {
  const hours: History.Hour[] = [];
  for (let h = 0; h < 24; h++) {
    hours[h] = [[], [], [], []];
  }
  return hours;
}

export function parseTimeCode(time: string): TimeCode {
  try {
    const [hour, segment]: number[] = time
      .split(TIME_CODE_SEP)
      .map((x: string) => parseInt(x, 10));
    return { hour, segment };
  } catch (e) {
    return { hour: 0, segment: 0 };
  }
}

export function stringifyTimeCode(time: TimeCode): string {
  return time.hour + TIME_CODE_SEP + time.segment;
}
