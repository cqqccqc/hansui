import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription, of, Subject, from } from 'rxjs';

import Question from './question';
import { DbService } from './db.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    questions$: Observable<Question[]>;
    private questionsSubject = new Subject<Question[]>();

    constructor(
        private dbService: DbService
    ) {
        this.questions$ = this.questionsSubject.pipe();
    }

    public async queryQuestions(): Promise<Question[]> {
        const resultDoc = await this.dbService.queryQuestions();
        this.questionsSubject.next(resultDoc);
        return resultDoc;
    }
}
