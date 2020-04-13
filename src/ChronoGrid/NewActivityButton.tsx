import { CSSObject } from '@emotion/core';
import * as React from 'react';

import { InlineEditableText } from 'src/Global/InlineEditableText';
import { earthYellow, gunmetal, platinum, tints } from 'src/colors';

import { HEADER_ROWS } from './constants';

const buttonCell: CSSObject = {
  gridColumn: 1,
  minWidth: '10rem',
  padding: '2px 0',
};

const inactiveColor = tints.gunmetal[40];
const customCss: CSSObject = {
  '& > span': {
    borderBottom: `1px dashed ${inactiveColor}`,
    color: inactiveColor,
  },
  '& > input': {
    backgroundColor: gunmetal,
    borderBottom: `1px solid ${earthYellow}`,
    color: platinum,
    ':focus': {
      outline: 'none',
    },
  },
};

interface Props {
  activityCount: number;
  onAddActivity: (activityName: string) => void;
}

export const NewActivityButton: React.FC<Props> = (props: Props) => {
  function handleSetText(text: string): void {
    props.onAddActivity(text);
  }

  const rowClass = 'row-' + (props.activityCount + HEADER_ROWS);
  return (
    <div className={rowClass} css={buttonCell}>
      <InlineEditableText
        css={customCss}
        onSetText={handleSetText}
        text={'Add New Activity'}
      />
    </div>
  );
};
NewActivityButton.displayName = 'NewActivityButton';
