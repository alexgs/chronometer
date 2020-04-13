import styled from '@emotion/styled';
import React from 'react';

import { gunmetal, platinum, pastelRed } from 'src/colors';

import { ChronoGrid } from './ChronoGrid';
import { InlineEditableText } from './Global/InlineEditableText';

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
  const [text, setText] = React.useState('this is editable text');

  return (
    <>
      <Header>Chronometer</Header>
      <Body>
        <Content>
          <ChronoGrid />
        </Content>
        <Content>
          <InlineEditableText onSetText={setText} text={text} />
        </Content>
      </Body>
    </>
  );
};
Home.displayName = 'Home';
