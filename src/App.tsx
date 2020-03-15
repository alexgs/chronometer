import React from 'react';
import { hot } from 'react-hot-loader/root';

import './App.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: React.FunctionComponent<Props> = () => {
  return <div>Hello Chronometer!</div>;
};
App.displayName = 'App';

export default hot(App);
