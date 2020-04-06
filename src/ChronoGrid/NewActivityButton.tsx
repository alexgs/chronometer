import { CSSObject } from '@emotion/core';
import * as React from 'react';

interface Props {

}

const layout: CSSObject = {
  gridColumn: 1,
  paddingRight: '1rem',
};

export const NewActivityButton: React.FunctionComponent<Props> = (props: Props) => {
  return <div className={'row-5'} css={layout} role={'button'}>Add New Activity</div>
};
NewActivityButton.displayName = 'NewActivityButton';
