import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from './service/question.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    testing: Boolean = false;

    constructor(
        private questionService: QuestionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.questionService.queryQuestions();
    }

    navToHome() {
        this.router.navigate(['/home']);
    }

    navToQuestions() {
        this.router.navigate(['/questions']);
    }

    navToTesters() {
        this.router.navigate(['/testers']);
    }
}
