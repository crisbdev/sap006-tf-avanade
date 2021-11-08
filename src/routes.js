/*eslint-disable*/
import React from 'react';
////import { Route, Redirect}from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebcamCapture from '../src/pages/auth';

export default props => (
    <BrowserRouter>
             <Switch>
                <Route exact path="/" component={WebcamCapture} /> 
             </Switch>  
         </BrowserRouter>
)