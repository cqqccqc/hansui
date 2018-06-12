import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

import { AOA, ExcelReader } from './excelReader';
import Question from './question';
import Option from './option';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    questions: Question[];

    constructor() { }

    public async getQuestionFromExcel(excelFile: File) {
        if (!excelFile) {
            return Promise.reject('no excel file');
        }
        try {
            const jsonData = await this.readFile(excelFile);
            this.questions = this.mapToQuestion(jsonData);
            return Promise.resolve(this.questions);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    private async readFile(excelFile: File) {
        if (!excelFile) {
            return Promise.reject('no file');
        }
        const excelReader = new ExcelReader();
        const result: any = await excelReader.readAsBinaryString(excelFile);
        /* read workbook */
        const bstr: string = result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const jsonData = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log(jsonData);
        return Promise.resolve(jsonData);
    }

    private mapToQuestion(json: AOA): Question[] {
        // 第0行是标题
        const titleRow: string[] = json[0];
        // 截取后数组
        const valueRows: string[][] = json.slice(1, json.length);
        const questions: Question[] = [];
        const groupedQuestions: string[][][] = [];

        let tempQuestions: string[][];
        for (const valueRow of valueRows) {
            // 偶数行数据题目选项全，奇数行只有选项，所以两行算一题
            const index = valueRows.indexOf(valueRow);
            if (index % 2 === 0) {
                tempQuestions = [];
                tempQuestions.push(valueRow);
            } else {
                tempQuestions.push(valueRow);
                groupedQuestions.push(tempQuestions);
            }
        }
        console.log(groupedQuestions);
        for (const groupedRow of groupedQuestions) {
            const questionRow = groupedRow[0];
            const optionRow = groupedRow[1];

            const question = new Question;
            question.id = parseInt(questionRow[0], 10);
            question.question = questionRow[1];
            question.isMetaphor = questionRow[2] === '是';

            const optionOne = new Option;
            const optionTwo = new Option;

            optionOne.id = parseInt(questionRow[3], 10);
            optionOne.content = questionRow[4];
            optionOne.isCorrect = questionRow[5] === '是';

            optionTwo.id = parseInt(optionRow[3], 10);
            optionTwo.content = optionRow[4];
            optionTwo.isCorrect = optionRow[5] === '是';

            const options: Option[] = [];
            options.push(optionOne);
            options.push(optionTwo);

            question.options = options;

            questions.push(question);
        }
        console.log(questions);
        return questions;
    }
}
