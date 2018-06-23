import Question from './question';

export default class Answer {
    question: Question;
    optionIndex: number;
    startTime: number;
    endTime: number;

    constructor(question: Question) {
        this.question = question;
    }
}
