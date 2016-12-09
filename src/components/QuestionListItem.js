import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const QuestionListItem = ({ question }) => (
  <li className="QuestionListItem">
    <Link to={`/question/${question.key}`}>
      <div className="QuestionListItem-user">
        <img src={question.photoURL} alt={question.displayName} />
        <div>
          <h2>{question.displayName}</h2>
          <p>asked {moment(question.timestamp).fromNow()}</p>
        </div>
      </div>

      <div className="QuestionListItem-text">
        {question.text}
      </div>

      <div className="QuestionListItem-answers">
        <p>ANSWERS:</p>
        <span>{question.answers}</span>
      </div>
    </Link>
  </li>
);

QuestionListItem.propTypes = {
  question: PropTypes.object,
};

export default QuestionListItem;
