import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { HomeComponent } from './home/home.component';
import { EvaluateComponent } from './evaluate/evaluate.component';

@NgModule({
    declarations: [
        AppComponent,
        QuestionsComponent,
        HomeComponent,
        EvaluateComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatRadioModule,

        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
