import * as React from 'react';
import * as History from 'types/history';

import { Cell } from './Cell';
import { HOURS, stringifyTimeCode } from './lib';

export interface Props {
  activityId: string;
  activityName: string;
  onToggle: (activityId: string, time: string) => void;
  selectedTimes: string[];
}

export const Row: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(time: string): void {
    props.onToggle(props.activityId, time);
  }

  const cells = HOURS.map((hour: History.Hour, hourId: History.HourId) => {
    return hour
      .map((_, segmentId: History.SegmentId) => {
        const time: string = stringifyTimeCode({
          hour: hourId,
          segment: segmentId,
        });
        return (
          <Cell
            key={time}
            id={time}
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
