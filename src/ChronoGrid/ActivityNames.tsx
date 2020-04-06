import * as React from 'react';
import { Activities, Activity } from 'types/activity';

import { ACTIVITY_LABEL_COL, HEADER_ROWS } from './constants';

interface Props {
  activities: Activities;
}

export const ActivityNames: React.FunctionComponent<Props> = (props: Props) => {
  const activityNames = Object.values(props.activities).map(
    (activity: Activity) => {
      const cssColumn = ACTIVITY_LABEL_COL + 1;
      const row = activity.position + HEADER_ROWS;
      const style = {
        gridColumnStart: cssColumn,
        gridColumnEnd: cssColumn + 1,
        paddingRight: '1rem',
      };
      return (
        <div key={activity.id} className={`gridcell row-${row}`} css={style}>
          {activity.name}
        </div>
      );
    },
  );

  return <>{activityNames}</>;
};
ActivityNames.displayName = 'ChronoGrid.ActivityNames';
