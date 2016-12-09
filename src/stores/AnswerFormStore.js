import { extendObservable } from 'mobx';
import { authRef, answersRef, questionsRef, timeRef } from '../reference';

class AnswerFormStore {
  constructor() {
    extendObservable(this, {
      error: '',
      success: false,
      text: '',
    });
  }

  setAnswerText(text) {
    this.text = text;
  }

  submitAnswer(text, questionId) {
    const { currentUser } = authRef;

    const newAnswer = {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      questionId,
      text,
      timestamp: timeRef,
      uid: currentUser.uid,
    };

    // Add the answer to firebase
    // then increment answers on the question by 1
    answersRef
      .push(newAnswer)
      .then(() => {
        questionsRef
          .child(`${questionId}/answers`)
          .transaction((answers) => {
            let answerCount = answers;
            answerCount += 1;
            return answerCount;
          });
      })
      .then(() => {
        this.error = '';
        this.success = true;
        this.text = '';
      }, (error) => {
        this.error = error;
      });
  }

  resetAnswerForm() {
    this.error = '';
    this.success = false;
    this.text = '';
  }
}

export default AnswerFormStore;
