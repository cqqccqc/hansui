import { Component, OnInit } from '@angular/core';

import { ExcelService } from '../excel.service';
import { DbService } from '../db.service';
import Question from '../question';
import { QuestionService } from '../question.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    questions: Question[] = [];
    testerGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private questionService: QuestionService,
        private excelService: ExcelService,
        private dbService: DbService,
        private router: Router
    ) {
        this.testerGroup = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
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

    onCLickEvaluate() {
        this.router.navigate(['/evaluate']);
    }
}
