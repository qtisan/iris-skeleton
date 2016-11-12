
import _ from '../utils';
import eo from '../services/statistic';

export default {

  namespace: 'menu',

  state: {
    items: { },
    currentKey: _.getCurrentPath()
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'query' });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({
        type: 'initMenu',
        payload: {
          items: eo
        }
      });
    }
  },

  reducers: {
    initMenu(state, action) {
      return { ...state, ...action.payload };
    },
    redirect(state, action) {
      return { ...state, currentKey: action.payload.key };
    }
  }

}

