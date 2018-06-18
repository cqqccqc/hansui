import { Component, OnInit } from '@angular/core';
import Question from '../question';
import { QuestionService } from '../question.service';

@Component({
    selector: 'app-evaluate',
    templateUrl: './evaluate.component.html',
    styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
    questions: Question[] = [];
    currentIndex: Number = 0;
    testing: Boolean = false;
    constructor(
        private questionService: QuestionService
    ) {
    }

    ngOnInit() {
        const self = this;
        this.questionService.questions$.subscribe(questions => {
            self.questions = questions;
            console.log(self.questions);
        });
        this.questionService.queryQuestions();
    }


}
