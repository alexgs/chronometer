import * as React from 'react';

import { Header } from './Header';
import { Row } from './Row';
import { getEmptyDay, parseTimeCode } from './lib';
import * as History from './types';

interface Activity {
  id: string;
  name: string;
  position: number;
}

interface Activities {
  [id: string]: Activity;
}

/* eslint-disable @typescript-eslint/camelcase */
const activities: Activities = {
  activity_0: {
    id: 'activity_0',
    name: 'Working',
    position: 0,
  },
  activity_1: {
    id: 'activity_1',
    name: 'Gym',
    position: 1,
  },
  activity_2: {
    id: 'activity_2',
    name: 'Sleeping',
    position: 2,
  },
};
/* eslint-enable @typescript-eslint/camelcase */

const initialHistory: History.Day = getEmptyDay();

function getSelectedTimes(activityId: string, history: History.Day): string[] {
  const output: string[] = [];
  history.forEach((hour: History.Hour, hourId: History.HourId) => {
    hour.forEach((segment: History.Segment, segmentId: History.SegmentId) => {
      if (segment.includes(activityId)) {
        output.push(hourId + '.' + segmentId);
      }
    });
  });
  return output;
}

export const ChronoTable: React.FunctionComponent = () => {
  const [history, setHistory] = React.useState(initialHistory);

  function handleToggle(activityId: string, time: string): void {
    const { hour, segment } = parseTimeCode(time);
    const newState = [...history];
    newState[hour] = [...history[hour]];
    if (history[hour][segment].includes(activityId)) {
      newState[hour][segment] = [];
    } else {
      newState[hour][segment] = [activityId];
    }

    setHistory(newState);
  }

  const rows = Object.values(activities).map((activity: Activity) => {
    return (
      <Row
        key={activity.id}
        activityId={activity.id}
        activityName={activity.name}
        onToggle={handleToggle}
        selectedTimes={getSelectedTimes(activity.id, history)}
      />
    );
  });

  return (
    <table>
      <thead>
        <Header />
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
ChronoTable.displayName = 'ChronoTable';
