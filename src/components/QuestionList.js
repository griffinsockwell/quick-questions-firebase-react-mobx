import React, { PropTypes } from 'react';
import QuestionListItem from './QuestionListItem';

const QuestionList = ({ questions }) => (
  <ul className="QuestionList">
    {questions.map(question => (
      <QuestionListItem
        key={question.key}
        question={question}
      />
    ))}
  </ul>
);

QuestionList.propTypes = {
  questions: PropTypes.array,
};

export default QuestionList;
