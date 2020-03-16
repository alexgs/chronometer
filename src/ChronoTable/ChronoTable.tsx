import * as React from 'react';

import {
  ActivityHistory,
  ActivityHistoryHour,
  ActivityHistorySegment,
  getEmptyDay,
  TimeCoordinate
} from '../constants';

import { Header } from './Header';
import { Row } from './Row';

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

const initialHistory: ActivityHistory = getEmptyDay();

function getSelectedTimes(
  activityId: string,
  history: ActivityHistory,
): TimeCoordinate[] {
  Object.values(history).map((hour: ActivityHistoryHour) => {
    // TODO Finish this func. But I'm not sure if these data structures make sense
    hour.segments.filter((segment) => segment.activities.includes())
  });
  return [];
}

function getActivities(history: ActivityHistory, time: TimeCoordinate): string[] {
  const segments: ActivityHistorySegment[] = getSegments(history, time);
  return segments[time.segment].activities;
}

function getSegments(history: ActivityHistory, time: TimeCoordinate): ActivityHistorySegment[] {
  return history[time.hour].segments;
}

function hasActivity(history: ActivityHistory, time: TimeCoordinate, activityId: string): boolean {
  return getActivities(history, time).includes(activityId)
}

function setActivities(history: ActivityHistory, time: TimeCoordinate, activities: string[]): ActivityHistory {
  const segments: ActivityHistorySegment[] = [...getSegments(history, time)];
  segments[time.segment].activities = activities;
  return {
    ...history,
    [time.hour]: {
      segments,
      index: time.hour,
    },
  };
}

export const ChronoTable: React.FunctionComponent = () => {
  const [history, setHistory] = React.useState(initialHistory);

  function handleToggle(activityId: string, time: TimeCoordinate): void {
    let newHistory: ActivityHistory | null = null;
    if (hasActivity(history, time, activityId)) {
      newHistory = setActivities(history, time, []);
    } else {
      newHistory = setActivities(history, time, [activityId]);
    }

    setHistory(newHistory);
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
