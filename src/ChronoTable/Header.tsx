import * as React from 'react';

import { HOURS, printHour, printSegment, stringifyTimeCode } from './lib';
import * as History from './types';

export const Header: React.FunctionComponent = () => {
  const hourCells = HOURS.map((hour: History.Hour, hourId: History.HourId) => (
    <td key={hourId} colSpan={hour.length}>
      {printHour(hourId)}
    </td>
  ));
  const intervalCells = HOURS.map(
    (hour: History.Hour, hourId: History.HourId) => {
      return hour
        .map((_, segmentId: History.SegmentId) => {
          const text: string = printSegment(segmentId);
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
