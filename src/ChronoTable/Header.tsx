import styled from '@emotion/styled';
import * as React from 'react';
import * as History from 'types/history';

import { HOURS, printHour, stringifyTimeCode } from './lib';

const HeaderCell = styled.td({
  textAlign: 'center',
});

export const Header: React.FunctionComponent = () => {
  const hourCells = HOURS.map((hour: History.Hour, hourId: History.HourId) => (
    <HeaderCell key={hourId} colSpan={hour.length}>
      {printHour(hourId)}
    </HeaderCell>
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
