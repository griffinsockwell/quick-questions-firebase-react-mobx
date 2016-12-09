import { extendObservable } from 'mobx';
import { answersRef } from '../reference';

class AnswersStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      answers: [],
    });
  }

  startListeningForAnswers(questionId) {
    answersRef
      .orderByChild('questionId')
      .equalTo(questionId)
      .on('value', (snap) => {
        const answers = [];
        snap.forEach((shot) => {
          answers.push({ ...shot.val(), key: shot.key });
        });
        this.loading = false;
        this.answers = answers;
      });
  }

  stopListeningForAnswers(questionId) {
    answersRef
      .orderByChild('questionId')
      .equalTo(questionId)
      .off('value');
    this.loading = true;
    this.answers = [];
  }
}

export default AnswersStore;
