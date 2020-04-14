import styled from '@emotion/styled';
import React from 'react';

import { earthYellow, gunmetal, pastelRed, platinum } from 'src/colors';

import { ChronoGrid } from './ChronoGrid';

const Body = styled.div({
  backgroundColor: gunmetal,
});

const Content = styled.div({
  backgroundColor: gunmetal,
  color: platinum,
  margin: '0 auto',
  padding: '1rem 0',
  width: '80vw',
});

const Header = styled.div({
  backgroundColor: pastelRed,
  borderBottom: `4px solid ${earthYellow}`,
  color: platinum,
  fontSize: '3rem',
  fontWeight: 800,
  padding: '0.5rem 1rem 0.5rem 10vw',
});

export const Home: React.FunctionComponent = () => {
  return (
    <>
      <Header>Chronometer</Header>
      <Body>
        <Content>
          <ChronoGrid />
        </Content>
      </Body>
    </>
  );
};
Home.displayName = 'Home';
