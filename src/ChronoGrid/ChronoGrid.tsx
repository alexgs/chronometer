import styled from '@emotion/styled';
import * as React from 'react';
import { Activities } from 'types/activity';
import * as HistoryTypes from 'types/history';

import { ActivityNames } from './ActivityNames';
import { History } from './History';
import { ScrollButton, ScrollDirection } from './ScrollButton';
import { getEmptyDay, parseTimeCode } from './lib';

const Container = styled.div({
  display: 'grid',
  gridGap: 0,
  borderRight: '1px solid lightgray',
  width: 'fit-content',
});
Container.displayName = 'ChronoGrid.Container';

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

const initialHistory: HistoryTypes.Day = getEmptyDay();

// TODO Get grid highlighting to work
//  - I'm afraid this is going to be slow/unresponsive and we'll have to go back to ChronoTable
//  - That's fine, but I want to make the change before doing more work on ChronoGrid
// TODO Add FontAwesome arrows
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

  function handleScrollClick(direction: ScrollDirection): void {
    console.log('<<', 'Direction Clicked:', direction, '>>');
  }

  return (
    <Container>
      <ActivityNames activities={activities} />
      <ScrollButton
        activityCount={3}
        direction={'left'}
        onClick={handleScrollClick}
      />
      <History
        activities={activities}
        displayHours={8}
        history={history}
        onCheckboxClick={handleCheckboxClick}
        startHour={5}
      />
      <ScrollButton
        activityCount={3}
        direction={'right'}
        onClick={handleScrollClick}
      />
    </Container>
  );
};
ChronoGrid.displayName = 'ChronoGrid';
