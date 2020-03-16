import * as React from 'react';

import { Row } from './Row';

interface Activity {
  id: string;
  name: string;
  position: number;
}

interface ActivityHistory {
  [time: string]: string[];
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

const initialHistory: ActivityHistory = {
  '1200': ['activity_0'],
  '1215': [],
  '1230': ['activity_2'],
  '1245': ['activity_0'],
};

function getSelectedTimes(
  activityId: string,
  history: ActivityHistory,
): string[] {
  return Object.keys(history).filter((time: string) =>
    history[time].includes(activityId),
  );
}

export const ChronoTable: React.FunctionComponent = () => {
  const [history, setHistory] = React.useState(initialHistory);

  function handleToggle(activityId: string, time: string): void {
    let newState: string[] | null = null;
    if (history[time].includes(activityId)) {
      newState = history[time].filter((id: string) => id !== activityId);
    } else {
      newState = [...history[time], activityId];
    }

    setHistory({
      ...history,
      [time]: newState,
    });
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
        <tr>
          <td />
          <td>12 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>1 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>2 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>3 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>4 PM</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
ChronoTable.displayName = 'ChronoTable';
