import { css, CSSObject } from '@emotion/core';
import * as React from 'react';

import { baseCellStyle } from './GridCell';
import { HOUR_LABEL_ROW, LABEL_COLS, SEGMENTS_PER_HOUR } from './constants';

export interface Props {
  children?: React.ReactNode;
  col: number;
}

export const HourCell: React.FunctionComponent<Props> = (props: Props) => {
  const gridPlacement: CSSObject = {
    borderLeft: '1px solid lightgray',
    gridColumnStart: props.col * SEGMENTS_PER_HOUR + LABEL_COLS + 1,
    gridColumnEnd:
      props.col * SEGMENTS_PER_HOUR + SEGMENTS_PER_HOUR + LABEL_COLS + 1,
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
