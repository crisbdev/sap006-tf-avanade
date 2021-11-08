/*eslint-disable*/
import React from "react";
////import { Route, Redirect}from 'react-router';
import { Switch, Route } from "react-router-dom";
import WebcamCapture from "../src/pages/auth";

export default (props) => (
    <Switch>
      <Route exact path="/" component={WebcamCapture} />
    </Switch>
);
