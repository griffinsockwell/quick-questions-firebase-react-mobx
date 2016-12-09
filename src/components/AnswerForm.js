import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

class AnswerForm extends Component {
  static propTypes = {
    auth: PropTypes.object,
    answerForm: PropTypes.object,
    questionId: PropTypes.string,
  }

  componentWillUnmount() {
    this.props.answerForm.resetAnswerForm();
  }

  setText = (evt) => {
    const text = evt.target.value;
    this.props.answerForm.setAnswerText(text);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { questionId } = this.props;
    const { text } = this.props.answerForm;

    // Check if the user has input text
    if (text.trim()) {
      this.props.answerForm.submitAnswer(text, questionId);
    }
  }

  render() {
    const { error, success, text } = this.props.answerForm;
    const { user } = this.props.auth;

    let component;
    if (success) {
      component = (
        <div className="AnswerForm-info">
          <p>YOU HAVE POSTED AN ANSWER TO THE QUESTION!</p>
        </div>
      );
    } else if (user) {
      component = (
        <div className="AnswerForm">
          <form onSubmit={this.handleSubmit}>

            {error ? <div className="error">{error}</div> : ''}

            <textarea
              placeholder="Answer the question here..."
              onChange={this.setText}
              value={text}
            />
            <input
              type="submit"
              value="Post Answer"
            />
          </form>
        </div>
      );
    } else {
      component = (
        <div className="AnswerForm-info">
          <p>YOU MUST BE SIGNED IN TO ANSWER THE QUESTION</p>
        </div>
      );
    }

    return component;
  }
}

export default inject('auth', 'answerForm')(observer(AnswerForm));
