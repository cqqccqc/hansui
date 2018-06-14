import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from './db.service';
import Question from './question';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    questions: Question[];

    constructor(
        private dbService: DbService,
        private router: Router
    ) { }

    async ngOnInit() {
        // 初始化的时候去本地数据库获取数据
        this.questions = await this.dbService.queryQuestions();
        console.log(this.questions);
    }

    navToHome() {
        this.router.navigate(['/home']);
    }

    navToQuestions() {
        this.router.navigate(['/questions']);
    }
}
