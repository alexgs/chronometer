import * as React from 'react';

import { Cell } from './Cell';

export interface Props {
  activityId: string;
  activityName: string;
  onToggle: (activityId: string, time: string) => void;
  selectedTimes: string[];
}

const times = ['1200', '1215', '1230', '1245'];

export const Row: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(time: string): void {
    props.onToggle(props.activityId, time);
  }

  const cells = times.map((time: string) => {
    return (
      <Cell
        key={time}
        id={time}
        isChecked={props.selectedTimes.includes(time)}
        onClick={handleClick}
      />
    );
  });

  return (
    <tr>
      <td>{props.activityName}</td>
      {cells}
    </tr>
  );
};
Row.displayName = 'ChronoTable.Row';
