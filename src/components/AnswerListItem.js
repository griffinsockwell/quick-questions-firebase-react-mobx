import React, { PropTypes } from 'react';
import moment from 'moment';
import AnswerRemove from './AnswerRemove';

const AnswerListItem = ({ answer }) => (
  <li className="AnswerListItem">

    <div className="AnswerListItem-user">
      <img src={answer.photoURL} alt={answer.displayName} />
      <div>
        <h2>{answer.displayName}</h2>
        <p>answered {moment(answer.timestamp).fromNow()}</p>
      </div>
    </div>

    <div className="AnswerListItem-text">
      {answer.text}
    </div>

    <AnswerRemove answer={answer} />

  </li>
);

AnswerListItem.propTypes = {
  answer: PropTypes.object,
};

export default AnswerListItem;
