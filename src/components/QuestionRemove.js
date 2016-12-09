import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { questionsRef, answersRef } from '../reference';

class QuestionRemove extends Component {
  static propTypes = {
    auth: PropTypes.object,
    question: PropTypes.object,
  }

  handleRemove = () => {
    const { question } = this.props;

    // Remove the question
    // then find all the answers for the question
    // then remove all the answers
    // then push the browser home
    questionsRef
      .child(question.key)
      .remove()
      .then(() => answersRef.orderByChild('questionId').equalTo(question.key).once('value'))
      .then((snap) => {
        snap.forEach((shot) => {
          answersRef.child(shot.key).remove();
        });
      })
      .then(() => {
        browserHistory.push('/');
      });
  }

  render() {
    const { user } = this.props.auth;
    const { question } = this.props;

    const uid = user !== null ? user.uid : null;

    let component;
    if (uid === question.uid) {
      component = (
        <div className="QuestionRemove">
          <button onClick={this.handleRemove}>Remove Question</button>
        </div>
      );
    } else {
      component = <div />;
    }

    return component;
  }
}

export default inject('auth')(observer(QuestionRemove));
