import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTopicViewDataComponent } from './sub-topic-view-data.component';

describe('SubTopicViewDataComponent', () => {
  let component: SubTopicViewDataComponent;
  let fixture: ComponentFixture<SubTopicViewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTopicViewDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTopicViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
