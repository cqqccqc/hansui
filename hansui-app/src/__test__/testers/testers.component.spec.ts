import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestersComponent } from '../../app/testers/testers.component';

describe('TestersComponent', () => {
    let component: TestersComponent;
    let fixture: ComponentFixture<TestersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
