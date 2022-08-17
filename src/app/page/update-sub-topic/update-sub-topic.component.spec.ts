import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubTopicComponent } from './update-sub-topic.component';

describe('UpdateSubTopicComponent', () => {
  let component: UpdateSubTopicComponent;
  let fixture: ComponentFixture<UpdateSubTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
