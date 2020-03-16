import * as React from 'react';

import { HOURS } from './lib';

export const Header: React.FunctionComponent = () => {
  const hourCells = HOURS.map((intervals: string[], hourIndex: number) => (
    <td key={hourIndex} colSpan={intervals.length}>
      {hourIndex}
    </td>
  ));
  const intervalCells = HOURS.map((intervals: string[], hourIndex: number) => {
    return intervals
      .map((_, intervalIndex: number) => {
        let text: string | null = null;
        switch (intervalIndex) {
          case 0:
            text = '00';
            break;
          case 1:
            text = '15';
            break;
          case 2:
            text = '30';
            break;
          case 3:
            text = '45';
            break;
          default:
            throw new Error(`Illegal interval index ${intervalIndex}`);
        }
        return <td key={`${hourIndex}.${intervalIndex}`}>{text}</td>;
      })
      .flat();
  });
  return (
    <>
      <tr>
        <td />
        {hourCells}
      </tr>
      <tr>
        <td />
        {intervalCells}
      </tr>
    </>
  );
};
Header.displayName = 'ChronoTable.Header';
