import { CSSObject } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { tints } from 'src/colors';
import { Activities, Activity } from 'types/activity';

import { ACTIVITY_LABEL_COL, HEADER_ROWS } from './constants';

const buttonCss: CSSObject = {
  color: tints.platinum[20],
  cursor: 'pointer',
}

interface Props {
  activities: Activities;
}

export const ActivityNames: React.FunctionComponent<Props> = (props: Props) => {
  const activityNames = Object.values(props.activities).map(
    (activity: Activity) => {
      const cssColumn = ACTIVITY_LABEL_COL + 1;
      const row = activity.position + HEADER_ROWS;
      const style: CSSObject = {
        display: 'flex',
        gridColumnStart: cssColumn,
        gridColumnEnd: cssColumn + 1,
        justifyContent: 'space-between',
        paddingRight: '1rem',
      };
      return (
        <div key={activity.id} className={`gridcell row-${row}`} css={style}>
          {activity.name}
          <FontAwesomeIcon css={buttonCss} icon={['far', 'pen']} role={'button'} />
        </div>
      );
    },
  );

  return <>{activityNames}</>;
};
ActivityNames.displayName = 'ChronoGrid.ActivityNames';
