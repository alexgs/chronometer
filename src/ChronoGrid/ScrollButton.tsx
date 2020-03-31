import { css, CSSObject } from '@emotion/core';
import * as React from 'react';

import { baseCellStyle } from './GridCell';
import {
  DISPLAY_HOURS,
  HEADER_ROWS,
  LABEL_COLS,
  LEFT_SCROLL_BUTTON_COLS,
  SEGMENTS_PER_HOUR,
} from './constants';

export type ScrollDirection = 'left' | 'right';

interface Props {
  activityCount: number;
  onClick: (variant: ScrollDirection) => void;
  direction: ScrollDirection;
}

export const ScrollButton: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(): void {
    props.onClick(props.direction);
  }

  const column =
    props.direction === 'left'
      ? LABEL_COLS + 1
      : DISPLAY_HOURS * SEGMENTS_PER_HOUR +
        LABEL_COLS +
        LEFT_SCROLL_BUTTON_COLS +
        1;
  const borders: CSSObject = {
    borderLeft: '1px solid lightgray',
  };
  const position: CSSObject = {
    gridColumnEnd: column + 1,
    gridColumnStart: column,
    gridRowEnd: props.activityCount + HEADER_ROWS + 1,
    gridRowStart: 1,
    padding: '2px 0',
  };
  return (
    <div css={css(baseCellStyle, position, borders)} onClick={handleClick}>
      {props.direction}
    </div>
  );
};
ScrollButton.displayName = 'ChronoGrid.ScrollButton';
