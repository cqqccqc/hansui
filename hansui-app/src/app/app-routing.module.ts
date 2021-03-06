import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { TestersComponent } from './testers/testers.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'evaluate', component: EvaluateComponent },
    { path: 'testers', component: TestersComponent }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }
