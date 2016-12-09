import { extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import { authRef, questionsRef, timeRef } from '../reference';

class QuestionFormStore {
  constructor() {
    extendObservable(this, {
      error: '',
      text: '',
    });
  }

  setQuestionText(text) {
    this.text = text;
  }

  submitQuestion(text) {
    const { currentUser } = authRef;

    const newQuestion = {
      answers: 0,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      text,
      timestamp: timeRef,
      uid: currentUser.uid,
    };

    const questionKey = questionsRef.push().key;

    // Add the question to firebase
    // then push the browser to the question
    questionsRef
      .child(questionKey)
      .set(newQuestion)
      .then(() => {
        this.error = '';
        this.text = '';
        browserHistory.push(`/question/${questionKey}`);
      }, (error) => {
        this.error = error;
      });
  }
}

export default QuestionFormStore;
