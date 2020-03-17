import styled from '@emotion/styled';
import * as React from 'react';
import { Activities } from 'types/activity';
import * as History from 'types/history';

import { getEmptyDay } from './lib';

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
  const borderRight = props.col % 4 === 0 ? '1px solid hotpink' : 'none';
  return {
    gridRowStart: props.row + 1,
    gridRowEnd: props.row + 2,
    gridColumnStart: props.col + 1,
    gridColumnEnd: props.col + 2,
    padding: 4,
    borderTop: '1px solid lightgray',
    borderLeft: '1px solid lightgray',
    borderRight,
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

export const AltTable: React.FunctionComponent = () => {
  return (
    <GridContainer>
      <GridCell col={0} row={2}>
        Working
      </GridCell>
      <GridCell col={0} row={3}>
        Gym
      </GridCell>
      <GridCell col={0} row={4}>
        Sleeping
      </GridCell>
      <HourCell col={0} row={0}>
        12 am
      </HourCell>
      <SegmentCell col={1} row={1}>
        00
      </SegmentCell>
      <SegmentCell col={1} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={1} row={3}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={1} row={4}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={2} row={1}>
        15
      </SegmentCell>
      <SegmentCell col={2} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={2} row={3}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={2} row={4}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={3} row={1}>
        30
      </SegmentCell>
      <SegmentCell col={3} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={3} row={3}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={3} row={4}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={4} row={1}>
        45
      </SegmentCell>
      <SegmentCell col={4} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={4} row={3}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={4} row={4}>
        <input type={'checkbox'} />
      </SegmentCell>
      <HourCell col={1} row={0}>
        1 am
      </HourCell>
      <SegmentCell col={5} row={1}>
        00
      </SegmentCell>
      <SegmentCell col={5} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={6} row={1}>
        15
      </SegmentCell>
      <SegmentCell col={6} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={7} row={1}>
        30
      </SegmentCell>
      <SegmentCell col={7} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
      <SegmentCell col={8} row={1}>
        45
      </SegmentCell>
      <SegmentCell col={8} row={2}>
        <input type={'checkbox'} />
      </SegmentCell>
    </GridContainer>
  );
};
AltTable.displayName = 'AltTable';
