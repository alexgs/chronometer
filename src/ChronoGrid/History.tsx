import * as React from 'react';
import { Activities } from 'types/activity';
import * as HistoryTypes from 'types/history';

import { Hour } from './Hour';

interface Props {
  activities: Activities;
  history: HistoryTypes.Day;
  onCheckboxClick: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

export const History: React.FunctionComponent<Props> = (props: Props) => {
  const hours = props.history.map(
    (hour: HistoryTypes.Hour, hourId: HistoryTypes.HourId) => {
      return (
        <Hour
          key={'hour_container_' + hourId}
          activities={props.activities}
          hour={hour}
          hourId={hourId}
          onCheckboxClick={props.onCheckboxClick}
        />
      );
    },
  );

  return <>{hours}</>;
};
History.displayName = 'ChronoGrid.History';
