import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import orderBy from 'lodash/orderBy';
import { inject, observer } from 'mobx-react';
import QuestionList from './QuestionList';

class Home extends Component {
  static propTypes = {
    questions: PropTypes.object,
  }

  componentDidMount() {
    this.props.questions.startListeningForQuestions();
  }

  componentWillUnmount() {
    this.props.questions.stopListeningForQuestions();
  }

  render() {
    const { loading } = this.props.questions;
    const questions = orderBy(this.props.questions.questions, ['timestamp'], ['desc']);

    let component;
    if (loading) {
      component = (
        <div className="Home">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (questions.length) {
      component = (
        <QuestionList questions={questions} />
      );
    } else {
      component = (
        <div className="Home">
          NO ONE HAS ASKED ANY QUESTIONS
        </div>
      );
    }

    return component;
  }
}

export default inject('questions')(observer(Home));
