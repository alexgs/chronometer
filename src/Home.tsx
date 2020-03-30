import styled from '@emotion/styled';
import React from 'react';

import { ChronoTable } from './ChronoTable';

// const earthYellow = '#e4b363';
const gunmetal = '#253237';
// const middlePurple = '#db85c9';
const pastelRed = '#ef6461';
const platinum = '#e8e9eb';

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
  color: platinum,
  fontSize: '3rem',
  fontWeight: 800,
  padding: '1rem 1rem 1rem 10vw',
});

export const Home: React.FunctionComponent = () => {
  return (
    <>
      <Header>Chronometer</Header>
      <Body>
        <Content>
          <ChronoTable />
        </Content>
      </Body>
    </>
  );
};
Home.displayName = 'Home';
