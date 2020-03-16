import * as React from 'react';

import { HOURS } from '../constants';

import { Cell } from './Cell';

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

  const cells = HOURS.map((intervals: string[], hourIndex: number) => {
    return intervals
      .map((_, intervalIndex: number) => {
        const time: string = hourIndex + '.' + intervalIndex;
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
