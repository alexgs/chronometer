import styled from '@emotion/styled';
import React from 'react';

// const earthYellow = '#e4b363';
const gunmetal = '#253237';
// const middlePurple = '#db85c9';
const pastelRed = '#ef6461';
const platinum = '#e8e9eb';

const Background = styled.div({
  backgroundColor: gunmetal,
});

const Body = styled.div({
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
  padding: '1rem',
});

export const Home: React.FunctionComponent = () => {
  return (
    <>
      <Header>Chronometer</Header>
      <Background>
        <Body>Body</Body>
      </Background>
    </>
  );
};
Home.displayName = 'Home';