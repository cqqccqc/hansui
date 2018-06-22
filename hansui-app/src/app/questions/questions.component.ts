import { Component, OnInit } from '@angular/core';

import Question from '../entity/question';
import { QuestionService } from '../service/question.service';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

    questions: Question[] = [];

    constructor(
        private questionService: QuestionService,
    ) { }

    ngOnInit() {
        this.questionService.questions$.subscribe(questions => {
            this.questions = questions;
        });
        this.questionService.queryQuestions();
    }

}
