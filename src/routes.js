/* eslint-disable  */
import React from 'react';
/// /import { Route, Redirect }from 'react-router';
import { Switch, Route } from 'react-router-dom';
import WebcamCapture from './pages/Auth/auth';
import QRscanner from './pages/qrscanner/QRscanner';

export default () => (
  <Switch>
    <Route exact path="/" component={WebcamCapture} />
    <Route exact path="/cam" component={WebcamCapture} />
    <Route exact path="/qr" component={QRscanner} />
  </Switch>
);
