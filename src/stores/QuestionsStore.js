import { extendObservable } from 'mobx';
import { questionsRef } from '../reference';

class QuestionsStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      questions: [],
    });
  }

  startListeningForQuestions() {
    questionsRef.on('value', (snap) => {
      const questions = [];
      snap.forEach((shot) => {
        questions.push({ ...shot.val(), key: shot.key });
      });
      this.loading = false;
      this.questions = questions;
    });
  }

  stopListeningForQuestions() {
    questionsRef.off('value');
    this.loading = true;
  }
}

export default QuestionsStore;
