import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import styles from '../index.less';

const Wrapper = (props) => {

  return (
    <div>
      AppMenu
      {props.children}
    </div>
  );

};

Wrapper.propTypes = {};

export default connect()(Wrapper);
