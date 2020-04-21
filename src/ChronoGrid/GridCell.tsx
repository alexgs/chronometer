import { CSSObject, css } from '@emotion/core';
import * as React from 'react';

import { HEADER_ROWS, SEGMENT_LABEL_ROW, SEGMENTS_PER_HOUR } from './constants';
import { ChronoGridContext } from './ChronoGrid';

export const baseCellStyle: CSSObject = {
  padding: '2px 0',
  position: 'relative',
  textAlign: 'center',
};

interface Props {
  children?: React.ReactNode;
  col: number;
  customCss?: CSSObject;
  row: number;
}

export const GridCell: React.FunctionComponent<Props> = (props: Props) => {
  const { activityCount } = React.useContext(ChronoGridContext);

  function showBottomBorder(): boolean {
    if (props.row - HEADER_ROWS === activityCount - 1) {
      return true;
    }
    return props.row === SEGMENT_LABEL_ROW;
  }

  const borderLeft =
    (props.col - 1) % SEGMENTS_PER_HOUR === 0 ? '1px solid lightgray' : 'none';
  const borderBottom = showBottomBorder() ? '1px solid lightgray' : 'none';
  const borders = {
    borderBottom,
    borderLeft,
  };

  const gridCellCss = css(baseCellStyle, borders, props.customCss);
  return (
    <div
      css={gridCellCss}
      className={`gridcell col-${props.col} row-${props.row}`}
    >
      {props.children}
    </div>
  );
};
GridCell.displayName = 'GridCell';
