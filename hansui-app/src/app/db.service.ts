import { Injectable } from '@angular/core';
import Question from './question';
import { IpcService } from './ipc.service';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    constructor(private ipcService: IpcService) { }

    public async queryQuestions(): Promise<Question[]> {
        const resultDoc = await this.ipcService.send('query-questions-message');
        return resultDoc;
    }

    public async saveQuestions(questions: Question[]): Promise<boolean> {
        return this.ipcService.send('save-questions-message', questions);
    }
}
