import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentLinkComponent } from './assessment-link.component';

describe('AssessmentLinkComponent', () => {
  let component: AssessmentLinkComponent;
  let fixture: ComponentFixture<AssessmentLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
