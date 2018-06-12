import Option from './option';

export default class Question {
    id: number;
    question: string;
    isMetaphor: boolean;
    options: Option[];
}
