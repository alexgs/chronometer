import styled from '@emotion/styled';
import * as React from 'react';
import { Activities } from 'types/activity';
import * as History from 'types/history';

import { ActivityNames } from './ActivityNames';
import { Hour } from './Hour';
import { getEmptyDay, parseTimeCode } from './lib';

const GridContainer = styled.div({
  display: 'grid',
  gridGap: 0,
  borderRight: '1px solid lightgray',
  width: 'fit-content',
});

/* eslint-disable @typescript-eslint/camelcase */
const activities: Activities = {
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

const initialHistory: History.Day = getEmptyDay();

export const ChronoGrid: React.FunctionComponent = () => {
  const [history, setHistory] = React.useState(initialHistory);

  function handleCheckboxClick(
    event: React.SyntheticEvent<HTMLInputElement>,
  ): void {
    const dataset = event.currentTarget.dataset;
    if (!dataset['activityId'] || !dataset['timeCode']) {
      console.error('Error with dataset', dataset);
      return;
    }

    const { hour, segment } = parseTimeCode(dataset.timeCode);
    const activityId = dataset.activityId;
    const newState = [...history];
    newState[hour] = [...history[hour]];
    if (history[hour][segment].includes(activityId)) {
      newState[hour][segment] = [];
    } else {
      newState[hour][segment] = [activityId];
    }

    setHistory(newState);
  }

  const gridBody = history.map((hour: History.Hour, hourId: History.HourId) => {
    return (
      <Hour
        key={'hour_container_' + hourId}
        activities={activities}
        hour={hour}
        hourId={hourId}
        onCheckboxClick={handleCheckboxClick}
      />
    );
  });

  return (
    <GridContainer>
      <ActivityNames activities={activities} />
      {gridBody}
    </GridContainer>
  );
};
ChronoGrid.displayName = 'ChronoGrid';
