import * as React from 'react';

import { ActivityHistoryHour, ActivityHistorySegment, HOURS } from '../constants';

export const Header: React.FunctionComponent = () => {
  const hourCells = HOURS.map((hour: ActivityHistoryHour) => {
    return (
      <td key={hour.index} colSpan={hour.segments.length}>
        {hour.index}
      </td>
    );
  });
  const intervalCells = HOURS.map((hour: ActivityHistoryHour) => {
    return hour.segments
      .map((segment: ActivityHistorySegment) => {
        return <td key={`${hour.index}.${segment.index}`}>{segment.text}</td>;
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
