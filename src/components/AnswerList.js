import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import orderBy from 'lodash/orderBy';
import { inject, observer } from 'mobx-react';
import AnswerListItem from './AnswerListItem';

class AnswerList extends Component {
  static propTypes = {
    answers: PropTypes.object,
    questionId: PropTypes.string,
  }

  componentDidMount() {
    this.props.answers.startListeningForAnswers(this.props.questionId);
  }

  componentWillUnmount() {
    this.props.answers.stopListeningForAnswers(this.props.questionId);
  }

  render() {
    const { loading } = this.props.answers;
    const answers = orderBy(this.props.answers.answers, ['timestamp'], ['desc']);

    let component;
    if (loading) {
      component = (
        <div className="AnswerList-empty">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (answers.length) {
      component = (
        <ul className="AnswerList">
          {answers.map(answer => (
            <AnswerListItem
              key={answer.key}
              answer={answer}
            />
          ))}
        </ul>
      );
    } else {
      component = (
        <div className="AnswerList-empty">
          NO ONE HAS ANSWERED THE QUESTION
        </div>
      );
    }

    return component;
  }
}

export default inject('answers')(observer(AnswerList));
