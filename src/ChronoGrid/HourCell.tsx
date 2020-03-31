import { css, CSSObject } from '@emotion/core';
import * as React from 'react';

import { baseCellStyle } from './GridCell';
import {
  HOUR_LABEL_ROW,
  LABEL_COLS,
  LEFT_SCROLL_BUTTON_COLS,
  SEGMENTS_PER_HOUR,
} from './constants';

export interface Props {
  children?: React.ReactNode;
  col: number;
}

export const HourCell: React.FunctionComponent<Props> = (props: Props) => {
  const colStart =
    props.col * SEGMENTS_PER_HOUR + LABEL_COLS + LEFT_SCROLL_BUTTON_COLS + 1;
  const gridPlacement: CSSObject = {
    borderLeft: '1px solid lightgray',
    gridColumnStart: colStart,
    gridColumnEnd: colStart + SEGMENTS_PER_HOUR,
    textAlign: 'center',
    width: 'auto',
  };
  const style = css(baseCellStyle, gridPlacement);
  return (
    <div className={`gridcell row-${HOUR_LABEL_ROW}`} css={style}>
      {props.children}
    </div>
  );
};
HourCell.displayName = 'HourLabel';
