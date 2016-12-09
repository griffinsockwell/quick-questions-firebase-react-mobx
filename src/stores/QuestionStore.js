import { extendObservable } from 'mobx';
import { questionsRef } from '../reference';

class QuestionStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      question: {},
    });
  }

  fetchQuestion(questionId) {
    questionsRef
      .child(questionId)
      .once('value', (snap) => {
        const question = { ...snap.val(), key: snap.key };
        this.loading = false;
        this.question = question;
      });
  }

  resetQuestion() {
    this.loading = true;
    this.question = {};
  }
}

export default QuestionStore;
