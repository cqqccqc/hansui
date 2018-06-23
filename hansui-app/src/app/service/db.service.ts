import { Injectable } from '@angular/core';
import Question from '../entity/question';
import { IpcService } from './ipc.service';
import Tester from '../entity/tester';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    constructor(private ipcService: IpcService) { }

    public async queryQuestions(): Promise<Question[]> {
        const resultDoc = await this.ipcService.send('query-questions-message');
        if (resultDoc && resultDoc._id) {
            return resultDoc.questions;
        } else {
            return [];
        }
    }

    public async saveQuestions(questions: Question[]): Promise<boolean> {
        return this.ipcService.send('save-questions-message', questions);
    }

    public async saveTester(tester: Tester): Promise<boolean> {
        return this.ipcService.send('save-tester-message', tester);
    }

    public async queryTesters(): Promise<Tester[]> {
        const resultDocs = await this.ipcService.send('query-testers-message');
        console.log(resultDocs);
        if (resultDocs) {
            return resultDocs;
        } else {
            return [];
        }
    }
}
