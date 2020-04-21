import styled from '@emotion/styled';
import * as React from 'react';

import { Activities, Activity } from 'types/activity';
import * as HistoryTypes from 'types/history';

import { ActivityName } from './ActivityName';
import { History } from './History';
import { NewActivityButton } from './NewActivityButton';
import { ScrollButton, ScrollDirection } from './ScrollButton';
import {
  DISPLAY_HOURS,
  LABEL_COLS,
  MAX_ROWS,
  SEGMENTS_PER_HOUR,
} from './constants';
import { getEmptyDay, parseTimeCode } from './lib';
import './ChronoGrid.css';

// NOTE: If there's something funky with row/column highlighting in the grid,
//   check that `./ChronoGrid.css` has been generated.

export const ChronoGridContext = React.createContext({ activityCount: 0 });

const Container = styled.div({
  display: 'grid',
  gridGap: 0,
  width: 'fit-content',
});
Container.displayName = 'ChronoGrid.Container';

/* eslint-disable @typescript-eslint/camelcase */
const initialActivities: Activities = {
  activity_0: {
    id: 'activity_0',
    name: 'Working',
    position: 1,
  },
  activity_1: {
    id: 'activity_1',
    name: 'Gym',
    position: 0,
  },
  activity_2: {
    id: 'activity_2',
    name: 'Sleeping',
    position: 2,
  },
};
/* eslint-enable @typescript-eslint/camelcase */

const initialHistory: HistoryTypes.Day = getEmptyDay();

export const ChronoGrid: React.FunctionComponent = () => {
  const [activities, setActivities] = React.useState(initialActivities);
  const [history, setHistory] = React.useState(initialHistory);
  const [startHour, setStartHour] = React.useState(0);

  function handleAddActivity(activityName: string): void {
    const activityId = 'activity_' + activityCount;
    const newState = { ...activities };
    newState[activityId] = {
      id: activityId,
      name: activityName,
      position: activityCount,
    };
    setActivities(newState);
  }

  function handleCheckboxClick(
    activityId: Activity['id'],
    timeCode: string,
  ): void {
    const { hour, segment } = parseTimeCode(timeCode);
    const newState = [...history];
    newState[hour] = [...history[hour]];
    if (history[hour][segment].includes(activityId)) {
      newState[hour][segment] = [];
    } else {
      newState[hour][segment] = [activityId];
    }

    setHistory(newState);
  }

  function handleDeleteActivity(target: Activity): void {
  }

  function handleEditActivity(activity: Activity): void {
    const newState = { ...activities };
    newState[activity.id] = activity;
    setActivities(newState);
  }

  function handleScrollClick(direction: ScrollDirection): void {
    if (direction === 'left') {
      setStartHour(Math.max(startHour - 1, 0));
    } else {
      setStartHour(Math.min(startHour + 1, 24 - DISPLAY_HOURS));
    }
  }

  const activityCount = Object.values(activities).length;

  const activityNames = Object.values(activities).map((activity: Activity) => (
    <ActivityName
      key={activity.id}
      activity={activity}
      onDelete={handleDeleteActivity}
      onEdit={handleEditActivity}
    />
  ));

  const hoverCols = [];
  for (let i = 0; i < SEGMENTS_PER_HOUR * DISPLAY_HOURS + LABEL_COLS; i++) {
    hoverCols.push(<div key={i} className={`hover-col col-${i}`} />);
  }

  const hoverRows = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    hoverRows.push(<div key={i} className={`hover-row row-${i}`} />);
  }

  return (
    <ChronoGridContext.Provider value={{ activityCount }}>
      <Container>
        {activityNames}
        <ScrollButton
          activityCount={activityCount}
          direction={'left'}
          onClick={handleScrollClick}
        />
        <History
          activities={activities}
          displayHours={DISPLAY_HOURS}
          history={history}
          onCheckboxClick={handleCheckboxClick}
          startHour={startHour}
        />
        <ScrollButton
          activityCount={activityCount}
          direction={'right'}
          onClick={handleScrollClick}
        />
        {hoverCols}
        {hoverRows}
        <NewActivityButton
          activityCount={activityCount}
          onAddActivity={handleAddActivity}
        />
      </Container>
    </ChronoGridContext.Provider>
  );
};
ChronoGrid.displayName = 'ChronoGrid';
