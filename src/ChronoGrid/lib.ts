import * as History from 'types/history';
import { HourId, SegmentId, TimeCode } from 'types/history';

export const HOURS: Readonly<History.Day> = getEmptyDay();

const TIME_CODE_SEP = '.';

export function getEmptyDay(): History.Day {
  const hours: History.Hour[] = [];
  for (let h = 0; h < 24; h++) {
    hours[h] = [[], [], [], []];
  }
  return hours;
}

export function printHour(id: HourId): string {
  const nooner: string = id < 12 ? 'am' : 'pm';
  let hour: string | null = null;
  if (id === 0) {
    hour = '12';
  } else if (id <= 12) {
    hour = `${id}`;
  } else {
    hour = `${id - 12}`;
  }
  return `${hour} ${nooner}`;
}

export function printSegment(id: SegmentId): string {
  switch (id) {
    case 0:
      return '00';
    case 1:
      return '15';
    case 2:
      return '30';
    case 3:
      return '45';
    default:
      throw new Error(`Illegal segment ID ${id}`);
  }
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
