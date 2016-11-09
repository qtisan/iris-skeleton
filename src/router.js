import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';


import Wrapper from './routes/Wrapper';
import IndexPage from './routes/IndexPage';

var routes = {

  path: '/',
  component: Wrapper,
  indexRoute: {component: IndexPage},
  childRoutes: []

};

export default function({ history }) {
  return (
    <Router history={history} routes={routes} />
  );
};
