import { extendObservable } from 'mobx';
import { questionsRef } from '../reference';

class MyQuestionsStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      questions: [],
    });
  }

  startListeningForMyQuestions(uid) {
    questionsRef
      .orderByChild('uid')
      .equalTo(uid)
      .on('value', (snap) => {
        const questions = [];
        snap.forEach((shot) => {
          questions.push({ ...shot.val(), key: shot.key });
        });
        this.loading = false;
        this.questions = questions;
      });
  }

  stopListeningForMyQuestions(uid) {
    questionsRef
      .orderByChild('uid')
      .equalTo(uid)
      .off('value');
    this.loading = true;
    this.questions = [];
  }
}

export default MyQuestionsStore;
