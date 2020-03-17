import styled from '@emotion/styled';
import * as React from 'react';
import { Activities, Activity } from 'types/activity';
import * as History from 'types/history';

import { getEmptyDay, printHour, printSegment, stringifyTimeCode } from './lib';

const ACTIVITY_LABEL_COL = 0;
const HEADER_ROWS = 2;
const HOUR_LABEL_ROW = 0;
const LABEL_COLS = 1;
const SEGMENT_LABEL_ROW = 1;
const SEGMENTS_PER_HOUR = 4;

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
  gridColumnStart: props.col * SEGMENTS_PER_HOUR + LABEL_COLS + 1,
  gridColumnEnd:
    props.col * SEGMENTS_PER_HOUR + SEGMENTS_PER_HOUR + LABEL_COLS + 1,
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
  timeCode: string,
) {
  return function checkboxMaker(activity: Activity): JSX.Element {
    const id = `${activity.id}_${timeCode}`;
    const col = hourId * SEGMENTS_PER_HOUR + segmentId + LABEL_COLS;
    const row = activity.position + HEADER_ROWS;
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
      <GridCell
        key={activity.id}
        col={ACTIVITY_LABEL_COL}
        row={activity.position + HEADER_ROWS}
      >
        {activity.name}
      </GridCell>
    );
  });

  const gridBody = history.map((hour: History.Hour, hourId: History.HourId) => {
    const segments = hour.map(
      (segment: History.Segment, segmentId: History.SegmentId) => {
        const timeCode = stringifyTimeCode({
          hour: hourId,
          segment: segmentId,
        });
        const maker = getCheckboxMaker(hourId, segmentId, timeCode);
        const checkboxes = Object.values(activities)
          .map(maker)
          .flat();

        const col = hourId * SEGMENTS_PER_HOUR + segmentId + LABEL_COLS;
        return (
          <React.Fragment key={`fragment_${timeCode}`}>
            <SegmentCell
              key={`segment_${timeCode}`}
              col={col}
              row={SEGMENT_LABEL_ROW}
            >
              {printSegment(segmentId)}
            </SegmentCell>
            {checkboxes}
          </React.Fragment>
        );
      },
    );

    return (
      <React.Fragment key={'container' + hourId}>
        <HourCell key={'hour' + hourId} col={hourId} row={HOUR_LABEL_ROW}>
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
