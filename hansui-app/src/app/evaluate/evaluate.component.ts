import { Component, OnInit } from '@angular/core';
import Question from '../entity/question';
import { QuestionService } from '../service/question.service';
import Tester from '../entity/tester';
import { TesterService } from '../service/tester.service';
import Answer from '../entity/answer';


@Component({
    selector: 'app-evaluate',
    templateUrl: './evaluate.component.html',
    styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

    questions: Question[] = [];

    answers: Answer[] = [];

    currentIndex = 0;
    countdown = 0;

    testing = false;

    tester: Tester;

    constructor(
        private questionService: QuestionService,
        private testerService: TesterService
    ) { }

    ngOnInit() {
        const self = this;
        this.questionService.questions$.subscribe(questions => {
            self.questions = questions;
            self.initAnswers();
            if (self.tester != null && !self.testing) {
                self.tester.startTime = new Date().valueOf();
                self.startTest();
            }
        });
        this.questionService.queryQuestions();
        this.tester = this.testerService.tester;
        console.log(this.tester);
    }

    initAnswers() {
        this.answers = [];
        for (const question of this.questions) {
            const answer = new Answer(question);
            this.answers.push(answer);
        }
    }

    startTest() {
        const self = this;
        this.countdown = this.tester.interval / 1e3;
        this.testing = true;
        this.answers[self.currentIndex].startTime = new Date().valueOf();
        const countdownInterval = window.setInterval(function () {
            if (!self.countdown--) {
                self.countdown = self.tester.interval / 1e3;
                self.answers[self.currentIndex].endTime = new Date().valueOf();
                ++self.currentIndex;
                if (self.currentIndex < self.answers.length) {
                    self.answers[self.currentIndex].startTime = new Date().valueOf();
                }

                if (self.currentIndex >= self.questions.length) {
                    window.clearInterval(countdownInterval);
                    console.log(self.currentIndex);
                    console.log(self.answers);
                    self.archiveTesterAnswers();
                    self.endTest();
                }
            }
        }, 1e3);
    }

    endTest() {
        this.testing = false;
        this.answers = [];
    }

    archiveTesterAnswers() {
        this.tester.endTime = new Date().valueOf();
        const answers = this.answers;
        this.tester.answers = answers;
        console.log(this.tester);
        // save tester
    }
}
