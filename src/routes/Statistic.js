import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';

import _ from '../utils';
import styles from './Statistic.less';

import { Row, Col } from 'antd';


const Statistic = ( {children, menu} ) => {
  return <div className="iris-layout-statistic">
    <h1>Statistic - {eo[menu.currentKey].title}</h1>
    <hr />
    {children}
  </div>;
};


const Dashboard = ({item}) => {
  console.log(item);
  return <div className="iris-statistic-default">
    {
      _.map(
        item.data, (i, k) =>
          <Row key={k} style={{marginBottom: 20, borderBottom: 'solid 1px #eee'}}>
            <h3 style={{color: '#aaa'}}>{k}</h3>
            <h1>{i}<em style={{fontSize: 16, color: '#999'}}>个</em></h1>
          </Row>
      )
    }
  </div>;
};
Dashboard.propTypes = {};

const Spread = ({item}) => {

  return (
    <div>
      {
        _.map(
          item.data, (i, k) =>
            <Row key={k} style={{marginBottom: 20, borderBottom: 'solid 1px #eee'}}>
              <h3 style={{color: '#aaa'}}>{k}</h3>
              <h1>{i}<em style={{fontSize: 16, color: '#999'}}>个</em></h1>
            </Row>
        )
      }
      <Row>
        <ReactEcharts option={item.options} />
      </Row>
    </div>
  );
};

function mapStateToProps({menu}){
  return {
    item: eo[menu.currentKey],
    menu: menu
  }
}

export const Statistics = {
  Dashboard: connect(mapStateToProps)(Dashboard),
  Spread: connect(mapStateToProps)(Spread)
};

export default connect(mapStateToProps)(Statistic);

