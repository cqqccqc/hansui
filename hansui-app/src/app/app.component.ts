import { Component, OnInit } from '@angular/core';

import { ExcelService } from './excel.service';
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
        private excelService: ExcelService,
        private dbService: DbService) {
    }

    async ngOnInit() {
        // 初始化的时候去本地数据库获取数据
        this.questions = await this.dbService.queryQuestions();
        console.log(this.questions);
    }

    onClickFileBtn(file: HTMLInputElement): void {
        file.click();
    }

    async onFileChange(file: HTMLInputElement) {
        if (!file || file.value.indexOf('.xlsx') < 0) {
            window.alert('不是excel文件');
            return;
        }
        this.questions = await this.excelService.getQuestionFromExcel(file.files[0]);
        try {
            // save into local db
            const result = await this.dbService.saveQuestions(this.questions);
            console.log(result);
        } catch (e) {
            console.error(e);
        } finally {
            file.value = null;
        }
    }
}
