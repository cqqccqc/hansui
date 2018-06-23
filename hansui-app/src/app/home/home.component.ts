import { Component, OnInit } from '@angular/core';

import { ExcelService } from '../service/excel.service';
import { DbService } from '../service/db.service';
import Question from '../entity/question';
import { QuestionService } from '../service/question.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Tester from '../entity/tester';
import { TesterService } from '../service/tester.service';


const INTERVAL = 10 * 1e3;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    questions: Question[] = [];
    tester: Tester = new Tester('', undefined, '', INTERVAL);

    constructor(
        private questionService: QuestionService,
        private excelService: ExcelService,
        private dbService: DbService,
        private testerService: TesterService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const self = this;
        this.questionService.questions$.subscribe(questions => {
            self.questions = questions;
        });
        this.questionService.queryQuestions();
    }

    onClickFileBtn(file: HTMLInputElement): void {
        file.click();
    }

    async onFileChange(file: HTMLInputElement) {
        if (!file || file.value.indexOf('.xlsx') < 0) {
            window.alert('不是excel文件');
            return;
        }
        const questions = await this.excelService.getQuestionFromExcel(file.files[0]);
        try {
            // save into local db
            const result = await this.dbService.saveQuestions(questions);
            console.log(result);
        } catch (e) {
            console.error(e);
        } finally {
            file.value = null;
        }
    }

    onClickEvaluate() {
        // 校验
        const tester = this.tester;
        this.testerService.tester = tester;

        // 恢复
        this.tester = new Tester('', undefined, '', INTERVAL);
        this.router.navigate(['/evaluate']);
    }
}
