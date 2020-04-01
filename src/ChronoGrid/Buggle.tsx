import styled, { CSSObject } from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Activity } from 'types/activity';

export const basicBox: CSSObject = {
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,
};

const Container = styled.div({
  ...basicBox,
  cursor: 'pointer',
});

// TODO Move all colors and tints into a separate file
const CheckedBox = styled.div({
  ...basicBox,
  display: 'none',
  [`${Container} > input:checked ~ &`]: {
    color: '#DB85C9',
    display: 'block',
  },
});

const EmptyBox = styled.div({
  ...basicBox,
  color: '#DB85C9',
  display: 'block',
  [`${Container} > input:checked ~ &`]: {
    display: 'none',
  },
});

const HiddenInput = styled.input({
  position: 'absolute',
  width: 1,
  height: 1,
  opacity: 0,
  zIndex: -1,
  overflow: 'hidden',
});

interface Props {
  activityId: Activity['id'];
  isChecked: boolean;
  onClick: (activityId: Activity['id'], timeCode: string) => void;
  timeCode: string;
}

// "Buggle" is a portmanteau of "bubble toggle." The Buggles were the first
// band ever played on MTV. The song was "Video Killed the Radio Star."
export const Buggle: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(event: React.SyntheticEvent<HTMLDivElement>): void {
    const dataset = event.currentTarget.dataset;
    if (!dataset['activityId'] || !dataset['timeCode']) {
      console.error('Error with dataset', dataset);
      return;
    }
    props.onClick(props.activityId, props.timeCode);
  }

  const noOp = (): void => {
    /* no operation */
  };

  return (
    <Container
      data-activity-id={props.activityId}
      data-time-code={props.timeCode}
      onClick={handleClick}
    >
      <HiddenInput
        type={'checkbox'}
        checked={props.isChecked}
        onChange={noOp}
      />
      <CheckedBox>
        <FontAwesomeIcon icon={['fas', 'circle']} />
      </CheckedBox>
      <EmptyBox>
        <FontAwesomeIcon icon={['far', 'circle']} />
      </EmptyBox>
    </Container>
  );
};
Buggle.displayName = 'Buggle';
