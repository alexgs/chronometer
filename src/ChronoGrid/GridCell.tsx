import * as React from 'react';
import styled from '@emotion/styled';

import { SEGMENT_LABEL_ROW } from './constants';
import './GridCell.css';

export interface CellProps {
  children: any;
  col: number;
  row: number;
}

// export const GridCell = styled.div((props: CellProps) => {
//   const borderLeft = (props.col - 1) % 4 === 0 ? '1px solid lightgray' : 'none';
//   const borderBottom =
//     props.row === SEGMENT_LABEL_ROW ? '1px solid lightgray' : 'none';
//   return {
//     borderBottom,
//     borderLeft,
//     gridRowStart: props.row + 1,
//     gridRowEnd: props.row + 2,
//     gridColumnStart: props.col + 1,
//     gridColumnEnd: props.col + 2,
//     padding: '2px 0',
//   };
// });

export const GridCell: React.FunctionComponent<CellProps> = (props: CellProps) => {
  return (
    <div className={`gridcell col-${props.col} row-${props.row}`}>
      {props.children}
    </div>
  )
};
