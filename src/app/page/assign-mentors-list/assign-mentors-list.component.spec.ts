import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMentorsListComponent } from './assign-mentors-list.component';

describe('AssignMentorsListComponent', () => {
  let component: AssignMentorsListComponent;
  let fixture: ComponentFixture<AssignMentorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMentorsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMentorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
