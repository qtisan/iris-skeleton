import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import _ from '../utils';
import styles from './Statistic.less';

import { Row, Col } from 'antd';

require('echarts/map/js/province/guizhou');

const Statistic = ( {children, menu} ) => {
  return <div className="iris-layout-statistic">
    <h1>Statistic - {eo[menu.currentKey].title}</h1>
    <hr />
    {children}
  </div>;
};


// --------------------------------dashboard----------------------------------------------

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



function mapStateToProps({menu}){
  return {
    item: eo[menu.currentKey],
    menu: menu
  }
}


const CC = {};
['Spread', 'Farmers', 'Supply'].forEach(function (C) {
  CC[C] = connect(mapStateToProps)(({item}) => {
    return (
      <div>
        {
          _.map(
            item.data, (i, k) =>
              <Row key={k} style={{marginBottom: 20, borderBottom: 'solid 1px #eee'}}>
                <h3 style={{color: '#aaa'}}>{k}</h3>
                <h1>{i}<em style={{fontSize: 16, color: '#999'}}></em></h1>
              </Row>
          )
        }
        <Row>
          <ReactEcharts option={item.options} style={{minHeight: 500}} />
        </Row>
      </div>
    );
  });
});

export const Statistics = {
  Dashboard: connect(mapStateToProps)(Dashboard), ...CC
};

export default connect(mapStateToProps)(Statistic);
