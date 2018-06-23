import Answer from './answer';

export default class Tester {
    testerIndex: number;
    name: string;
    gender: string;
    age: number;
    startTime: number;
    endTime: number;
    remark: string;
    interval: number; // 每题间隔时间
    answers: Answer[];

    constructor(name: string, age: number, gender: string, interval: number) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.interval = interval;
    }
}
