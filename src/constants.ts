export interface ActivityHistory {
  [key: number]: ActivityHistoryHour;
}
export type HourIndex = number;
export type SegmentIndex = number;

export interface ActivityHistoryHour {
  index: HourIndex;
  segments: ActivityHistorySegment[];
}

export interface ActivityHistorySegment {
  activities: string[];
  index: SegmentIndex;
  text: string;
}

export interface TimeCoordinate {
  hour: HourIndex;
  segment: SegmentIndex;
}

export function getEmptyDay(): ActivityHistory {
  const output: ActivityHistory = {};
  for (let h = 0; h < 24; h++) {
    const segments: ActivityHistorySegment[] = [
      {
        activities: [],
        index: 0,
        text: '00',
      },
      {
        activities: [],
        index: 1,
        text: '15',
      },
      {
        activities: [],
        index: 2,
        text: '30',
      },
      {
        activities: [],
        index: 3,
        text: '45',
      },
    ];
    output[h] = {
      segments,
      index: h,
    };
  }
  return output;
}

const TIME_COORD_SEP = '.';

export function parseTimeCoord(coord: string): TimeCoordinate {
  try {
    const numbers: number[] = coord.split(TIME_COORD_SEP).map((part: string) => parseInt(part, 10));
    return {
      hour: numbers[0],
      segment: numbers[1],
    };
  } catch (error) {
    console.error(`Error parsing time coordinate: ${coord}`, error);
    return {
      hour: 0,
      segment: 0,
    };
  }
}

export function stringifyTimeCoord(time: TimeCoordinate): string {
  return time.hour + TIME_COORD_SEP + time.segment;
}

export const HOURS: Readonly<ActivityHistoryHour[]> = Object.values(getEmptyDay());
