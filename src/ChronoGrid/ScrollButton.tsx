import styled from '@emotion/styled';
import * as React from 'react';

import { HEADER_ROWS, LABEL_COLS, SEGMENTS_PER_HOUR } from './constants';

interface ButtonProps {
  activityCount: number;
  col: number;
}

const ButtonCell = styled.div((props: ButtonProps) => {
  return {
    gridRowStart: 1,
    gridRowEnd: props.activityCount + HEADER_ROWS + 1,
    gridColumnStart: props.col,
    gridColumnEnd: props.col + 1,
    padding: '2px 0',
  };
});

export type ScrollDirection = 'left' | 'right';

interface Props {
  activityCount: ButtonProps['activityCount'];
  onClick: (variant: ScrollDirection) => void;
  direction: ScrollDirection;
}

export const ScrollButton: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(): void {
    props.onClick(props.direction);
  }

  const col =
    props.direction === 'left'
      ? LABEL_COLS + 1
      : 24 * SEGMENTS_PER_HOUR + LABEL_COLS + 1;
  return (
    <ButtonCell
      activityCount={props.activityCount}
      col={col}
      onClick={handleClick}
    >
      {props.direction}
    </ButtonCell>
  );
};
ScrollButton.displayName = 'ChronoGrid.ScrollButton';
