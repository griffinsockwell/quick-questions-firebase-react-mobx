import AnswerFormStore from './AnswerFormStore';
import AnswersStore from './AnswersStore';
import AuthStore from './AuthStore';
import MyQuestionsStore from './MyQuestionsStore';
import QuestionFormStore from './QuestionFormStore';
import QuestionStore from './QuestionStore';
import QuestionsStore from './QuestionsStore';

module.exports = {
  answerForm: new AnswerFormStore(),
  answers: new AnswersStore(),
  auth: new AuthStore(),
  myQuestions: new MyQuestionsStore(),
  questionForm: new QuestionFormStore(),
  question: new QuestionStore(),
  questions: new QuestionsStore(),
};
