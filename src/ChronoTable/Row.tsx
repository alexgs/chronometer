import * as React from 'react';

import { Cell } from './Cell';

export interface Props {
  activity: string;
}

export const Row: React.FunctionComponent<Props> = (props: Props) => {
  const [mark, setMark] = React.useState({
    '1200': false,
    '1215': false,
    '1230': false,
    '1245': false,
  });

  function handleClick(id: string): void {
    const name: keyof typeof mark = id as keyof typeof mark;
    setMark({
      ...mark,
      [name]: !mark[name],
    });
  }

  return (
    <tr>
      <td>{props.activity}</td>
      <Cell id={'1200'} isChecked={mark['1200']} onClick={handleClick}/>
      <Cell id={'1215'} isChecked={mark['1215']} onClick={handleClick}/>
      <Cell id={'1230'} isChecked={mark['1230']} onClick={handleClick}/>
      <Cell id={'1245'} isChecked={mark['1245']} onClick={handleClick}/>
    </tr>
  );
};
Row.displayName = 'ChronoTable.Row';
