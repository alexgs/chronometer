import * as React from 'react';


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

  function handleClick(event: React.SyntheticEvent<HTMLInputElement>): void {
    const name: keyof typeof mark = event.currentTarget.name as keyof typeof mark;
    setMark({
      ...mark,
      [name]: !mark[name],
    });
  }

  return (
    <tr>
      <td>{props.activity}</td>
      <td>
        <input checked={mark['1200']} name={'1200'} onChange={handleClick} type={'checkbox'} />
      </td>
      <td>
        <input checked={mark['1215']} name={'1215'} onChange={handleClick} type={'checkbox'} />
      </td>
      <td>
        <input checked={mark['1230']} name={'1230'} onChange={handleClick} type={'checkbox'} />
      </td>
      <td>
        <input checked={mark['1245']} name={'1245'} onChange={handleClick} type={'checkbox'} />
      </td>
    </tr>
  );
};
Row.displayName = 'ChronoTable.Row';
