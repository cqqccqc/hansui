import { Injectable } from '@angular/core';
import Question from './question';
import { IpcService } from './ipc.service';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    constructor(private ipcService: IpcService) { }

    public async queryQuestions(): Promise<Question[]> {
        return this.ipcService.send('query-questions-message');
    }

    public async saveQuestions(questions: Question[]): Promise<boolean> {
        return this.ipcService.send('save-questions-message', questions);
    }
}
