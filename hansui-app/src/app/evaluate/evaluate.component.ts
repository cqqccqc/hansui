import { Component, OnInit } from '@angular/core';
import Question from '../entity/question';
import { QuestionService } from '../service/question.service';
import Tester from '../entity/tester';
import { TesterService } from '../service/tester.service';


@Component({
    selector: 'app-evaluate',
    templateUrl: './evaluate.component.html',
    styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

    questions: Question[] = [];
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
            console.log(self.questions);
        });
        this.questionService.queryQuestions();
        this.tester = this.testerService.tester;
        console.log(this.tester);
    }


}
