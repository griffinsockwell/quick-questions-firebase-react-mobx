import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Spinner from 'react-spinkit';
import orderBy from 'lodash/orderBy';
import { inject, observer } from 'mobx-react';
import QuestionList from './QuestionList';

class MyQuestions extends Component {
  static propTypes = {
    auth: PropTypes.object,
    myQuestions: PropTypes.object,
  }

  componentDidMount() {
    const { user } = this.props.auth;
    if (user === null) {
      browserHistory.push('/');
    } else {
      this.props.myQuestions.startListeningForMyQuestions(user.uid);
    }
  }

  componentWillUnmount() {
    const { user } = this.props.auth;
    this.props.myQuestions.stopListeningForMyQuestions(user.uid);
  }

  render() {
    const { loading } = this.props.myQuestions;
    const questions = orderBy(this.props.myQuestions.questions, ['timestamp'], ['desc']);

    let component;
    if (loading) {
      component = (
        <div className="MyQuestions">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (questions.length) {
      component = (
        <QuestionList questions={questions} />
      );
    } else {
      component = (
        <div className="MyQuestions">
          YOU HAVE NOT ASKED ANY QUESTIONS
        </div>
      );
    }

    return component;
  }
}

export default inject('auth', 'myQuestions')(observer(MyQuestions));
