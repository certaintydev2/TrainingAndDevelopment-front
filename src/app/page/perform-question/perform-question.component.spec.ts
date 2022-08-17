import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformQuestionComponent } from './perform-question.component';

describe('PerformQuestionComponent', () => {
  let component: PerformQuestionComponent;
  let fixture: ComponentFixture<PerformQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
