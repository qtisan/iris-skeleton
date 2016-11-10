import React, { PropTypes } from 'react';
import { Router } from 'dva/router';


import Wrapper from './routes/Wrapper';
import IndexPage from './routes/IndexPage';
import Statistic from './routes/Statistic';
import { Statistics } from './routes/Statistic';

var routes = {

  path: '/',
  component: Wrapper,
  indexRoute: {component: IndexPage},
  onEnter() {
    location.href = '/#/statistic/dashboard';
  },
  childRoutes: [
    {
      path: '/statistic',
      component: Statistic,
      indexRoute: {component: Statistics.Dashboard},
      childRoutes: [
        { path: 'dashboard', component: Statistics.Dashboard },
        { path: 'spread',  component: Statistics.Spread }
      ]
    }
  ]

};

export default function({ history }) {
  return (
    <Router history={history} routes={routes} />
  );
};
