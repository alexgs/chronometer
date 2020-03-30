import { CSSObject } from '@emotion/core';
import styled from '@emotion/styled';
import * as React from 'react';
import * as History from 'types/history';

import { HOURS, printHour, stringifyTimeCode } from './lib';

const HourHeaderCell = styled.td({
  borderRight: '1px solid lightgray',
  textAlign: 'center',
});

const SegmentHeaderCell = styled.td({
  borderBottom: '1px solid lightgray',
});

export const Header: React.FunctionComponent = () => {
  const hourCells = HOURS.map((hour: History.Hour, hourId: History.HourId) => (
    <HourHeaderCell key={hourId} colSpan={hour.length}>
      {printHour(hourId)}
    </HourHeaderCell>
  ));

  const segmentCells = HOURS.map(
    (hour: History.Hour, hourId: History.HourId) => {
      return hour
        .map((_, segmentId: History.SegmentId) => {
          const css: CSSObject = {
            padding: 2,
            textAlign: 'center',
            width: '1.5rem',
          };
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
              css.borderRight = '1px solid lightgray';
              break;
            default:
              throw new Error(`Illegal segment index ${segmentId}`);
          }
          const time: string = stringifyTimeCode({
            hour: hourId,
            segment: segmentId,
          });
          return <SegmentHeaderCell key={time} css={css}>{text}</SegmentHeaderCell>;
        })
        .flat();
    },
  );

  return (
    <>
      <tr>
        <td css={{ borderRight: '1px solid lightgray' }} />
        {hourCells}
      </tr>
      <tr>
        <td css={{ borderRight: '1px solid lightgray' }} />
        {segmentCells}
      </tr>
    </>
  );
};
Header.displayName = 'ChronoTable.Header';
