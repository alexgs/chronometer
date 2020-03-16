import * as React from 'react';

import { HOURS, stringifyTimeCode } from './lib';
import * as History from './types';

export const Header: React.FunctionComponent = () => {
  const hourCells = HOURS.map((hour: History.Hour, hourId: History.HourId) => (
    <td key={hourId} colSpan={hour.length}>
      {hourId}
    </td>
  ));
  const intervalCells = HOURS.map(
    (hour: History.Hour, hourId: History.HourId) => {
      return hour
        .map((_, segmentId: History.SegmentId) => {
          let text: string | null = null;
          switch (segmentId) {
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
              throw new Error(`Illegal segment index ${segmentId}`);
          }
          const time: string = stringifyTimeCode({
            hour: hourId,
            segment: segmentId,
          });
          return <td key={time}>{text}</td>;
        })
        .flat();
    },
  );
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
