import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    ngOninit() {

    }

    onClickFileBtn(file: HTMLInputElement): void {
        file.click();
    }

    onFileChange(file: HTMLInputElement): void {
        console.log(file);
        console.log(file.value);
        if (!file || file.value.indexOf('.xlsx')) {
            window.alert('不是excel文件');
            return;
        }
    }
}
