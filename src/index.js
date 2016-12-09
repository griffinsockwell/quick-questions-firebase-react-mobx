import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';

import App from './components/App';
import Home from './components/Home';
import MyQuestions from './components/MyQuestions';
import NewQuestion from './components/NewQuestion';
import Question from './components/Question';

import stores from './stores';

import './index.css';

ReactDOM.render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/my-questions" component={MyQuestions} />
        <Route path="/new-question" component={NewQuestion} />
        <Route path="/question/:questionId" component={Question} />
        <Route path="*" component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
