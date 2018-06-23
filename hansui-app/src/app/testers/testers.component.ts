import { Component, OnInit } from '@angular/core';
import { DbService } from '../service/db.service';
import Tester from '../entity/tester';

@Component({
    selector: 'app-testers',
    templateUrl: './testers.component.html',
    styleUrls: ['./testers.component.css']
})
export class TestersComponent implements OnInit {

    testers: Tester[] = [];

    constructor(
        private dbService: DbService
    ) { }

    async ngOnInit() {
        this.testers = await this.dbService.queryTesters();
    }

}
