import Option from './option';

export default class Question {
    questionID: number;
    question: string;
    isMetaphor: boolean;
    options: Option[];
}
