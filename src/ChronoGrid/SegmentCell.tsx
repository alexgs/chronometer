import styled from '@emotion/styled';
import * as React from 'react';

import { GridCell } from './GridCell';
import './SegmentCell.css';

const Cell = styled(GridCell)({
  textAlign: 'center',
  width: '1.5rem',
});

interface Props {
  activityId: string;
  checked: boolean;
  col: number;
  isHovered?: boolean;
  onClick: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  row: number;
  timeCode: string;
  onCellMouseOut: () => void;
  onCellMouseOver: (row: number, timeCode: string) => void;
  highlightRow: number;
  highlightTimeCode: string;
}

export const SegmentCell: React.FunctionComponent<Props> = (props: Props) => {
  function handleMouseOver(): void {
    // console.log('mouse-over');
    props.onCellMouseOver(props.row, props.timeCode);
  }

  function handleMouseOut(): void {
    // console.log('mouse-out');
    props.onCellMouseOut();
  }

  let highlightClass = undefined;
  if (
    props.highlightTimeCode === props.timeCode ||
    props.highlightRow === props.row
  ) {
    highlightClass = 'highlight-bitch';
  }
  return (
    <Cell
      className={highlightClass}
      col={props.col}
      row={props.row}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <input
        type={'checkbox'}
        checked={props.checked}
        data-activity-id={props.activityId}
        data-time-code={props.timeCode}
        onChange={props.onClick}
      />
    </Cell>
  );
};
SegmentCell.displayName = 'ChronoGrid.SegmentCell';
