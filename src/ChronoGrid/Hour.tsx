import * as React from 'react';
import { Activities, Activity } from 'types/activity';
import * as History from 'types/history';

import { Buggle } from './Buggle';
import { GridCell } from './GridCell';
import { HourCell } from './HourCell';
import {
  HEADER_ROWS,
  LABEL_COLS,
  SEGMENT_LABEL_ROW,
  SEGMENTS_PER_HOUR,
} from './constants';
import { printHour, printSegment, stringifyTimeCode } from './lib';

function getCheckboxMaker(
  segmentData: History.Segment,
  time: History.TimeCode,
  hourIndex: number,
  onClick: (activityId: Activity['id'], timeCode: string) => void,
): (activity: Activity) => JSX.Element {
  const timeCode = stringifyTimeCode(time);
  const { segment: segmentId } = time;
  return function checkboxMaker(activity: Activity): JSX.Element {
    const id = `${activity.id}_${timeCode}`;
    const col = hourIndex * SEGMENTS_PER_HOUR + segmentId + LABEL_COLS;
    const row = activity.position + HEADER_ROWS;
    const checked = segmentData.includes(activity.id);
    return (
      <GridCell key={id} col={col} row={row}>
        <Buggle
          activityId={activity.id}
          isChecked={checked}
          onClick={onClick}
          timeCode={timeCode}
        />
      </GridCell>
    );
  };
}

interface Props {
  activities: Activities;
  hour: History.Hour;
  hourId: History.HourId;
  hourIndex: number;
  onCheckboxClick: (activityId: Activity['id'], timeCode: string) => void;
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
        props.hourIndex,
        props.onCheckboxClick,
      );
      const checkboxes = Object.values(props.activities)
        .map(maker)
        .flat();

      const col = props.hourIndex * SEGMENTS_PER_HOUR + segmentId + LABEL_COLS;
      return (
        <React.Fragment key={`fragment_${timeCode}`}>
          <GridCell
            key={`segment_${timeCode}`}
            col={col}
            row={SEGMENT_LABEL_ROW}
          >
            {printSegment(segmentId)}
          </GridCell>
          {checkboxes}
        </React.Fragment>
      );
    },
  );

  return (
    <React.Fragment key={'hour_fragment_' + props.hourId}>
      <HourCell key={'hour_label_' + props.hourId} col={props.hourIndex}>
        {printHour(props.hourId)}
      </HourCell>
      {segments}
    </React.Fragment>
  );
};
Hour.displayName = 'ChronoGrid.Hour';
