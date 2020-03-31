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
  gridTemplateColumns: '',
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
      <History
        activities={activities}
        displayHours={2}
        history={history}
        onCheckboxClick={handleCheckboxClick}
        startHour={0}
      />
      <div className={'hover-col col-0'} />
      <div className={'hover-col col-1'} />
      <div className={'hover-col col-2'} />
      <div className={'hover-col col-3'} />
      <div className={'hover-col col-4'} />
      <div className={'hover-col col-5'} />
      <div className={'hover-col col-6'} />
      <div className={'hover-col col-7'} />
      <div className={'hover-col col-8'} />
      <div className={'hover-row row-0'} />
      <div className={'hover-row row-1'} />
      <div className={'hover-row row-2'} />
      <div className={'hover-row row-3'} />
      <div className={'hover-row row-4'} />
    </Container>
  );
};
ChronoGrid.displayName = 'ChronoGrid';
