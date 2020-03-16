import * as React from 'react';

interface Props {
  id: string;
  isChecked: boolean;
  onClick: (id: string) => void;
}

export const Cell: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(event: React.SyntheticEvent<HTMLInputElement>): void {
    props.onClick(event.currentTarget.name);
  }

  return (
    <td>
      <input checked={props.isChecked} name={props.id} onChange={handleClick} type={'checkbox'} />
    </td>
  )
};
Cell.displayName = 'ChronoTable.Cell';
