import './index.html';
import './index.less';
import dva from 'dva';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

// 1. Initialize
const app = dva(/*{
  history: useRouterHistory(createHashHistory)({ queryKey: false })
}*/);

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/menu'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
