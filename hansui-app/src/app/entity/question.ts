import Option from './option';

export default class Question {
    _id: string;
    questionIndex: number;
    question: string;
    isMetaphor: boolean;
    options: Option[];
}
