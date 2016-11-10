import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import { Row, Col } from 'antd';


const Statistic = (props) => {
  return <div className="iris-layout-statistic">
    Statistic
    {props.children}
  </div>;
};
Statistic.propTypes = {};


const Dashboard = (props) => {
  return <div className="iris-statistic-default">
    <Row>
      <Col span={24}>

      </Col>
    </Row>
  </div>;
};
Dashboard.propTypes = {};



const Spread = () => {

  return (
    <div>
      <h1>Spread</h1>
    </div>
  );

};

const mapStateToProps = (state, props) => {
  return {
    item: state.item
  }
};

export const Statistics = {
  Dashboard: connect(mapStateToProps)(Dashboard),
  Spread: connect(mapStateToProps)(Spread)
};

export default connect()(Statistic);

