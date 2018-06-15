import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from './question.service';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    async ngOnInit() {

    }

    navToHome() {
        this.router.navigate(['/home']);
    }

    navToQuestions() {
        this.router.navigate(['/questions']);
    }
}
