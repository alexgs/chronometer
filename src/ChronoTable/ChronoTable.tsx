import * as React from 'react';

import { Row } from './Row';

export const ChronoTable: React.FunctionComponent = () => {
  return (
    <table>
      <thead>
        <tr>
          <td />
          <td>12 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>1 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>2 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>3 PM</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>4 PM</td>
        </tr>
      </thead>
      <tbody>
        <Row activity={'Working'} />
        <Row activity={'Gym'} />
        <Row activity={'Sleeping'} />
      </tbody>
    </table>
  );
};
ChronoTable.displayName = 'ChronoTable';
