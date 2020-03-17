import styled from '@emotion/styled';
import * as React from 'react';
import { Activities, Activity } from 'types/activity';
import * as History from 'types/history';

import { getEmptyDay, printHour, printSegment, stringifyTimeCode } from './lib';

const GridContainer = styled.div({
  display: 'grid',
  gridGap: 0,
  borderBottom: '1px solid lightgray',
  borderRight: '1px solid lightgray',
  width: 'fit-content',
});

interface CellProps {
  col: number;
  row: number;
}

const GridCell = styled.div((props: CellProps) => {
  return {
    gridRowStart: props.row + 1,
    gridRowEnd: props.row + 2,
    gridColumnStart: props.col + 1,
    gridColumnEnd: props.col + 2,
    padding: 4,
    borderTop: '1px solid lightgray',
    borderLeft: '1px solid lightgray',
  };
});

const HourCell = styled(GridCell)((props: CellProps) => ({
  gridRowStart: 1,
  gridRowEnd: 2,
  gridColumnStart: props.col * 4 + 2,
  gridColumnEnd: props.col * 4 + 6,
}));

const SegmentCell = styled(GridCell)({
  width: '1rem',
});

/* eslint-disable @typescript-eslint/camelcase */
const activities: Activities = {
  activity_0: {
    id: 'activity_0',
    name: 'Working',
    position: 0,
  },
  activity_1: {
    id: 'activity_1',
    name: 'Gym',
    position: 1,
  },
  activity_2: {
    id: 'activity_2',
    name: 'Sleeping',
    position: 2,
  },
};
/* eslint-enable @typescript-eslint/camelcase */

const initialHistory: History.Day = getEmptyDay();

function getCheckboxMaker(
  hourId: History.HourId,
  segmentId: History.SegmentId,
) {
  return function checkboxMaker(
    activity: Activity,
    activityIndex: number,
  ): JSX.Element {
    const id =
      activity.id +
      '_' +
      stringifyTimeCode({ hour: hourId, segment: segmentId });
    const col = hourId * 4 + segmentId + 1;
    const row = activityIndex + 2;
    return (
      <SegmentCell key={id} col={col} row={row}>
        <input type={'checkbox'} />
      </SegmentCell>
    );
  };
}

export const ChronoGrid: React.FunctionComponent = () => {
  const [history, setHistory] = React.useState(initialHistory);

  const activityNames = Object.values(activities).map((activity: Activity) => {
    return (
      <GridCell key={activity.id} col={0} row={activity.position + 2}>
        {activity.name}
      </GridCell>
    );
  });

  const gridBody = history.map((hour: History.Hour, hourId: History.HourId) => {
    const segments = hour.map(
      (segment: History.Segment, segmentId: History.SegmentId) => {
        const maker = getCheckboxMaker(hourId, segmentId);
        const checkboxes = Object.values(activities)
          .map(maker)
          .flat();

        const id = stringifyTimeCode({ hour: hourId, segment: segmentId });
        const col = hourId * 4 + segmentId + 1;
        return (
          <React.Fragment key={`fragment_${id}`}>
            <SegmentCell key={id} col={col} row={1}>
              {printSegment(segmentId)}
            </SegmentCell>
            {checkboxes}
          </React.Fragment>
        );
      },
    );

    return (
      <React.Fragment key={'container' + hourId}>
        <HourCell key={'hour' + hourId} col={hourId} row={0}>
          {printHour(hourId)}
        </HourCell>
        {segments}
      </React.Fragment>
    );
  });
  return (
    <GridContainer>
      {activityNames}
      {gridBody}
    </GridContainer>
  );
};
ChronoGrid.displayName = 'ChronoGrid';
