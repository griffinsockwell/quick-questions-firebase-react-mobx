import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

class QuestionForm extends Component {
  static propTypes = {
    questionForm: PropTypes.object,
  }

  setText = (evt) => {
    const text = evt.target.value;
    this.props.questionForm.setQuestionText(text);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { text } = this.props.questionForm;

    // Check if the user has input text
    if (text.trim()) {
      this.props.questionForm.submitQuestion(text);
    }
  }

  render() {
    const { error, text } = this.props.questionForm;

    return (
      <form
        className="QuestionForm"
        onSubmit={this.handleSubmit}
      >

        {error ? <div className="error">{error}</div> : ''}

        <textarea
          placeholder="Ask question here..."
          onChange={this.setText}
          value={text}
        />
        <input
          type="submit"
          value="Post Question"
        />
      </form>
    );
  }
}

export default inject('questionForm')(observer(QuestionForm));
