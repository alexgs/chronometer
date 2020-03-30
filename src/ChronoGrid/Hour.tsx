import styled from '@emotion/styled';
import * as React from 'react';
import { Activities, Activity } from 'types/activity';
import * as History from 'types/history';

import { GridCell, CellProps } from './GridCell';
import { SegmentCell } from './SegmentCell';
import {
  HEADER_ROWS,
  HOUR_LABEL_ROW,
  LABEL_COLS,
  SEGMENT_LABEL_ROW,
  SEGMENTS_PER_HOUR,
} from './constants';
import { printHour, printSegment, stringifyTimeCode } from './lib';

const HourCell = styled(GridCell)((props: CellProps) => ({
  borderLeft: '1px solid lightgray',
  gridColumnStart: props.col * SEGMENTS_PER_HOUR + LABEL_COLS + 1,
  gridColumnEnd:
    props.col * SEGMENTS_PER_HOUR + SEGMENTS_PER_HOUR + LABEL_COLS + 1,
  textAlign: 'center',
}));

const OtherSegmentCell = styled(GridCell)({
  textAlign: 'center',
  width: '1.5rem',
});

function getCheckboxMaker(
  segmentData: History.Segment,
  time: History.TimeCode,
  onClick: (event: React.SyntheticEvent<HTMLInputElement>) => void,
  onCellMouseOut: () => void,
  onCellMouseOver: (row: number, timeCode: string) => void,
  highlightRow: number,
  highlightTimeCode: string,
): (activity: Activity) => JSX.Element {
  const timeCode = stringifyTimeCode(time);
  const { hour: hourId, segment: segmentId } = time;
  return function checkboxMaker(activity: Activity): JSX.Element {
    const id = `${activity.id}_${timeCode}`;
    const col = hourId * SEGMENTS_PER_HOUR + segmentId + LABEL_COLS;
    const row = activity.position + HEADER_ROWS;
    const checked = segmentData.includes(activity.id);
    return (
      <SegmentCell
        key={id}
        activityId={activity.id}
        checked={checked}
        col={col}
        onClick={onClick}
        row={row}
        timeCode={timeCode}
        onCellMouseOut={onCellMouseOut}
        onCellMouseOver={onCellMouseOver}
        highlightRow={highlightRow}
        highlightTimeCode={highlightTimeCode}
      />
    );
  };
}

interface Props {
  activities: Activities;
  hour: History.Hour;
  hourId: History.HourId;
  onCheckboxClick: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onCellMouseOut: () => void;
  onCellMouseOver: (row: number, timeCode: string) => void;
  highlightRow: number;
  highlightTimeCode: string;
}

export const Hour: React.FunctionComponent<Props> = (props: Props) => {
  const segments = props.hour.map(
    (segment: History.Segment, segmentId: History.SegmentId) => {
      const time: History.TimeCode = {
        hour: props.hourId,
        segment: segmentId,
      };
      const timeCode = stringifyTimeCode(time);
      const maker = getCheckboxMaker(
        segment,
        time,
        props.onCheckboxClick,
        props.onCellMouseOut,
        props.onCellMouseOver,
        props.highlightRow,
        props.highlightTimeCode,
      );
      const checkboxes = Object.values(props.activities)
        .map(maker)
        .flat();

      const col = props.hourId * SEGMENTS_PER_HOUR + segmentId + LABEL_COLS;
      return (
        <React.Fragment key={`fragment_${timeCode}`}>
          <OtherSegmentCell
            key={`segment_${timeCode}`}
            col={col}
            row={SEGMENT_LABEL_ROW}
          >
            {printSegment(segmentId)}
          </OtherSegmentCell>
          {checkboxes}
        </React.Fragment>
      );
    },
  );

  return (
    <React.Fragment key={'hour_fragment_' + props.hourId}>
      <HourCell
        key={'hour_label_' + props.hourId}
        col={props.hourId}
        row={HOUR_LABEL_ROW}
      >
        {printHour(props.hourId)}
      </HourCell>
      {segments}
    </React.Fragment>
  );
};
Hour.displayName = 'ChronoGrid.Hour';