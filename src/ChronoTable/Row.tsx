import * as React from 'react';

import {
  ActivityHistoryHour,
  ActivityHistorySegment,
  HOURS,
  parseTimeCoord,
  stringifyTimeCoord,
  TimeCoordinate
} from '../constants';

import { Cell } from './Cell';

export interface Props {
  activityId: string;
  activityName: string;
  onToggle: (activityId: string, time: TimeCoordinate) => void;
  selectedTimes: TimeCoordinate[];
}

// function isSelected(selectedTimes: TimeCoordinate[])

export const Row: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(cellId: string): void {
    const coord: TimeCoordinate = parseTimeCoord(cellId);
    props.onToggle(props.activityId, coord);
  }

  const cells = HOURS.map((hour: ActivityHistoryHour) => {
    return hour.segments
      .map((segment: ActivityHistorySegment) => {
        const time: TimeCoordinate = {hour: hour.index, segment: segment.index};
        const cellId = stringifyTimeCoord(time);
        return (
          <Cell
            key={cellId}
            id={cellId}
            isChecked={props.selectedTimes.includes(time)}
            onClick={handleClick}
          />
        );
      })
      .flat();
  });

  return (
    <tr>
      <td>{props.activityName}</td>
      {cells}
    </tr>
  );
};
Row.displayName = 'ChronoTable.Row';
