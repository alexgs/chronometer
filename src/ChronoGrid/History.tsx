import * as React from 'react';
import { Activities } from 'types/activity';
import * as HistoryTypes from 'types/history';

import { Hour } from './Hour';

interface Props {
  activities: Activities;
  displayHours: number;
  history: HistoryTypes.Day;
  onCheckboxClick: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  startHour: number;
}

export const History: React.FunctionComponent<Props> = (props: Props) => {
  const sliceStart = props.startHour;
  const sliceEnd = props.startHour + props.displayHours;
  const hours = props.history
    .slice(sliceStart, sliceEnd)
    .map((hour: HistoryTypes.Hour, hourIndex: number) => {
      return (
        <Hour
          key={'hour_container_' + hourIndex}
          activities={props.activities}
          hour={hour}
          hourId={hourIndex + props.startHour}
          hourIndex={hourIndex}
          onCheckboxClick={props.onCheckboxClick}
        />
      );
    });

  return <>{hours}</>;
};
History.displayName = 'ChronoGrid.History';
