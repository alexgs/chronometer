import { css, CSSObject } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { tints } from '../colors';

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

  const icon =
    props.direction === 'left' ? (
      <FontAwesomeIcon icon={['fad', 'chevron-double-left']} />
    ) : (
      <FontAwesomeIcon icon={['fad', 'chevron-double-right']} />
    );

  const layout: CSSObject = {
    backgroundColor: tints.gunmetal[10],
    borderBottom: '1px solid lightgray',
    borderLeft: '1px solid lightgray',
    borderTop: '1px solid lightgray',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gridColumnEnd: column + 1,
    gridColumnStart: column,
    gridRowEnd: props.activityCount + HEADER_ROWS + 1,
    gridRowStart: 1,
    justifyContent: 'center',
    padding: 2,
    width: 'auto',
    zIndex: 2,
  };
  if (props.direction === 'right') {
    layout.borderRight = '1px solid lightgray';
  }
  return (
    <div css={css(baseCellStyle, layout)} onClick={handleClick}>
      {icon}
    </div>
  );
};
ScrollButton.displayName = 'ChronoGrid.ScrollButton';
