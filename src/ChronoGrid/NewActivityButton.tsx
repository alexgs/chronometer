import { CSSObject } from '@emotion/core';
import * as React from 'react';

import { InlineEditableText } from 'src/Global/InlineEditableText';
import { earthYellow, gunmetal, platinum, tints } from 'src/colors';

import { HEADER_ROWS, LABEL_COLS, SEGMENTS_PER_HOUR } from './constants';

const buttonCell: CSSObject = {
  gridColumn: 1,
  minWidth: '9rem',
  padding: '2px 1rem 2px 0',
  zIndex: 2,
};

const inactiveColor = tints.gunmetal[40];
const inlineEditableCss: CSSObject = {
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

const MAX_COLUMNS = SEGMENTS_PER_HOUR * 24 + LABEL_COLS;
const maskRowCss: CSSObject = {
  backgroundColor: gunmetal,
  gridColumn: '1 / ' + MAX_COLUMNS,
  zIndex: 1,
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
    <>
      <div className={rowClass} css={buttonCell}>
        <InlineEditableText
          css={inlineEditableCss}
          onSetText={handleSetText}
          text={'Add New Activity'}
        />
      </div>
      <div className={rowClass} css={maskRowCss} />
    </>
  );
};
NewActivityButton.displayName = 'NewActivityButton';
