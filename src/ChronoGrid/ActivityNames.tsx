import styled from '@emotion/styled';
import * as React from 'react';
import { Activities, Activity } from 'types/activity';

import { GridCell } from './GridCell';
import { ACTIVITY_LABEL_COL, HEADER_ROWS } from './constants';

const NameCell = styled(GridCell)({
  paddingRight: '1em',
});

interface Props {
  activities: Activities;
}

export const ActivityNames: React.FunctionComponent<Props> = (props: Props) => {
  const activityNames = Object.values(props.activities).map(
    (activity: Activity) => {
      return (
        <NameCell
          key={activity.id}
          col={ACTIVITY_LABEL_COL}
          row={activity.position + HEADER_ROWS}
        >
          {activity.name}
        </NameCell>
      );
    },
  );

  return <>{activityNames}</>;
};
ActivityNames.displayName = 'ChronoGrid.ActivityNames';
