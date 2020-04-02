import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDoubleLeft as fadChevronDoubleLeft,
  faChevronDoubleRight as fadChevronDoubleRight,
} from '@fortawesome/pro-duotone-svg-icons';
import { faCircle as farCircle } from '@fortawesome/pro-regular-svg-icons';
import { faCircle as fasCircle } from '@fortawesome/pro-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

library.add(fadChevronDoubleLeft, fadChevronDoubleRight, farCircle, fasCircle);

ReactDOM.render(<App />, document.getElementById('chronometer-react-v1-root'));
