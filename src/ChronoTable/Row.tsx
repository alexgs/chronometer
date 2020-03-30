import styled from '@emotion/styled';
import * as React from 'react';
import * as History from 'types/history';

import { Cell } from './Cell';
import { SEGMENTS_PER_HOUR } from './constants';
import { HOURS, stringifyTimeCode } from './lib';

const ChronoRow = styled.tr({
  ':hover': {
    backgroundColor: 'hotpink',
  },
});

const ActivityNameCell = styled.td({
  borderRight: '1px solid lightgray',
  paddingRight: '1rem',
});

export interface Props {
  activityId: string;
  activityName: string;
  onToggle: (activityId: string, time: string) => void;
  selectedTimes: string[];
}

export const Row: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(time: string): void {
    props.onToggle(props.activityId, time);
  }

  const cells = HOURS.map((hour: History.Hour, hourId: History.HourId) => {
    return hour
      .map((_, segmentId: History.SegmentId) => {
        const time: string = stringifyTimeCode({
          hour: hourId,
          segment: segmentId,
        });

        const css =
          segmentId === SEGMENTS_PER_HOUR - 1
            ? { borderRight: '1px solid lightgray' }
            : {};
        return (
          <Cell
            key={time}
            css={css}
            id={time}
            isChecked={props.selectedTimes.includes(time)}
            onClick={handleClick}
          />
        );
      })
      .flat();
  });

  return (
    <ChronoRow>
      <ActivityNameCell>{props.activityName}</ActivityNameCell>
      {cells}
    </ChronoRow>
  );
};
Row.displayName = 'ChronoTable.Row';
