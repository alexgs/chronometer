import { CSSObject, css } from '@emotion/core';
import * as React from 'react';

import { SEGMENT_LABEL_ROW } from './constants';
import './GridCell.css';

export const baseCellStyle: CSSObject = {
  padding: 2,
  position: 'relative',
  textAlign: 'center',
  width: '1.5rem',
};

interface Props {
  children?: React.ReactNode;
  col: number;
  row: number;
}

export const GridCell: React.FunctionComponent<Props> = (props: Props) => {
  const borderLeft = (props.col - 1) % 4 === 0 ? '1px solid lightgray' : 'none';
  const borderBottom =
    props.row === SEGMENT_LABEL_ROW ? '1px solid lightgray' : 'none';
  const borders = {
    borderBottom,
    borderLeft,
  };

  const style = css(baseCellStyle, borders);
  return (
    <div css={style} className={`gridcell col-${props.col} row-${props.row}`}>
      {props.children}
    </div>
  );
};
GridCell.displayName = 'GridCell';
