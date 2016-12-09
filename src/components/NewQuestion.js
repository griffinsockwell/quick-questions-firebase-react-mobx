import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import QuestionForm from './QuestionForm';

class NewQuestion extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.auth.user === null) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div className="NewQuestion">
        <QuestionForm />
      </div>
    );
  }
}

export default inject('auth')(observer(NewQuestion));
