import styled from '@emotion/styled';
import * as React from 'react';
import { Activities } from 'types/activity';
import * as HistoryTypes from 'types/history';

import { ActivityNames } from './ActivityNames';
import { History } from './History';
import { ScrollButton, ScrollDirection } from './ScrollButton';
import { DISPLAY_HOURS, LABEL_COLS, SEGMENTS_PER_HOUR } from './constants';
import { getEmptyDay, parseTimeCode } from './lib';
import './ChronoGrid.css';

// NOTE: If there's something funky with row/column highlighting in the grid,
//   check that `./ChronoGrid.css` has been generated.

const Container = styled.div({
  display: 'grid',
  gridGap: 0,
  // gridTemplateColumns: '',
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

  const hoverCols = [];
  for (let i = 0; i < SEGMENTS_PER_HOUR * DISPLAY_HOURS + LABEL_COLS; i++) {
    hoverCols.push(<div key={i} className={`hover-col col-${i}`} />);
  }

  const maxRows = 8;
  const hoverRows = [];
  for (let i = 0; i < maxRows; i++) {
    hoverRows.push(<div key={i} className={`hover-row row-${i}`} />);
  }

  const activityCount = Object.values(activities).length;
  return (
    <Container>
      <ActivityNames activities={activities} />
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
        startHour={5}
      />
      <ScrollButton
        activityCount={activityCount}
        direction={'right'}
        onClick={handleScrollClick}
      />
      {hoverCols}
      {hoverRows}
    </Container>
  );
};
ChronoGrid.displayName = 'ChronoGrid';
