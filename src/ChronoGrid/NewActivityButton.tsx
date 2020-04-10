import { CSSObject } from '@emotion/core';
import * as React from 'react';

import { platinum, earthYellow } from '../colors'; // TODO Update config so `src/colors` is valid/correct

interface Props {
  onAddActivity: (activityName: string) => void;
}

const button: CSSObject = {
  cursor: 'pointer',
};

const buttonCell: CSSObject = {
  gridColumn: 1,
  paddingRight: '1rem',
};

const input: CSSObject = {
  backgroundColor: 'black',
  border: `1px solid ${earthYellow}`,
  color: platinum,
  lineHeight: '1.2rem',
  padding: 4,

  ':focus': {
    outline: 'none',
  },
};

// TODO Handle `<enter>` press
// TODO Add "save" icon
// TODO Handle rest of the flow
export const NewActivityButton: React.FC<Props> = (props: Props) => {
  const [showInput, setShowInput] = React.useState(false);

  function handleButtonClick(): void {
    setShowInput(!showInput);
  }

  return (
    <div className={'row-5'} css={buttonCell}>
      <div
        css={[button, { display: showInput ? 'none' : 'block' }]}
        onClick={handleButtonClick}
        role={'button'}
      >
        Add New Activity
      </div>
      <input
        type={'text'}
        css={[input, { display: showInput ? 'block' : 'none' }]}
        placeholder={'Activity Name'}
      />
    </div>
  );
};
NewActivityButton.displayName = 'NewActivityButton';
