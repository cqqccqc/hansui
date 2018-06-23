import { Component, OnInit, OnDestroy } from '@angular/core';
import Question from '../entity/question';
import { QuestionService } from '../service/question.service';
import Tester from '../entity/tester';
import { TesterService } from '../service/tester.service';
import Answer from '../entity/answer';
import { DbService } from '../service/db.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-evaluate',
    templateUrl: './evaluate.component.html',
    styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit, OnDestroy {

    questions: Question[] = [];

    answers: Answer[] = [];

    currentIndex = 0;
    countdown = 0;
    countdownInterval: number;

    testing = false;

    tester: Tester;

    constructor(
        private questionService: QuestionService,
        private testerService: TesterService,
        private dbService: DbService,
        private router: Router
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
        // no tester navigate to home page
        if (this.tester == null) {
            this.router.navigate(['/home']);
        }
    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        if (this.countdownInterval) {
            window.clearInterval(this.countdownInterval);
        }
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
        this.countdownInterval = window.setInterval(function () {
            if (!self.countdown--) {
                self.countdown = self.tester.interval / 1e3;
                self.answers[self.currentIndex].endTime = new Date().valueOf();
                ++self.currentIndex;
                if (self.currentIndex < self.answers.length) {
                    self.answers[self.currentIndex].startTime = new Date().valueOf();
                }

                if (self.currentIndex >= self.questions.length) {
                    window.clearInterval(self.countdownInterval);
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
        this.tester = null;
        window.localStorage.removeItem('storage_tester');
    }

    async archiveTesterAnswers() {
        this.tester.endTime = new Date().valueOf();
        const answers = this.answers;
        this.tester.answers = answers;
        const tester = this.tester;
        // save tester
        const result = await this.dbService.saveTester(tester);
        console.log(result);
    }
}
