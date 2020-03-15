import React from 'react';
import { hot } from 'react-hot-loader/root';

import { Home } from './Home';
import './App.css';

const App: React.FunctionComponent = () => {
  return <Home />;
};
App.displayName = 'App';

export default hot(App);
