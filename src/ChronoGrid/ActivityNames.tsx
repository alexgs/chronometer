import * as React from 'react';
import { Activities, Activity } from 'types/activity';

import { ACTIVITY_LABEL_COL, HEADER_ROWS } from './constants';

interface Props {
  activities: Activities;
}

export const ActivityNames: React.FunctionComponent<Props> = (props: Props) => {
  const activityNames = Object.values(props.activities).map(
    (activity: Activity) => {
      const row = activity.position + HEADER_ROWS;
      return (
        <div
          key={activity.id}
          className={`gridcell col-${ACTIVITY_LABEL_COL} row-${row}`}
          css={{
            paddingRight: '1em',
          }}
        >
          {activity.name}
        </div>
      );
    },
  );

  return <>{activityNames}</>;
};
ActivityNames.displayName = 'ChronoGrid.ActivityNames';
