import { CSSObject } from '@emotion/core';
import * as React from 'react';

interface Props {
  className?: string;
  id: string;
  isChecked: boolean;
  onClick: (id: string) => void;
}

const cellStyle: CSSObject = {
  padding: 2,
  textAlign: 'center',
  width: '1.5rem',
};

export const Cell: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(event: React.SyntheticEvent<HTMLInputElement>): void {
    props.onClick(event.currentTarget.name);
  }

  return (
    <td className={props.className} css={cellStyle}>
      <input
        checked={props.isChecked}
        name={props.id}
        onChange={handleClick}
        type={'checkbox'}
      />
    </td>
  );
};
Cell.displayName = 'ChronoTable.Cell';
