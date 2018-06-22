import { Injectable } from '@angular/core';
import Tester from '../entity/tester';

@Injectable({
    providedIn: 'root'
})
export class TesterService {

    private _tester: Tester;

    constructor() {
    }

    get tester() {
        // 获取本地缓存
        const storageTester = window.localStorage.getItem('storage_tester');
        if (storageTester) {
            this._tester = Object.assign(new Tester('', undefined, '', undefined), JSON.parse(storageTester));
        }
        return this._tester;
    }
    set tester(tester: Tester) {
        // 写入本地缓存
        window.localStorage.setItem('storage_tester', JSON.stringify(tester));
        this._tester = tester;
    }
}
