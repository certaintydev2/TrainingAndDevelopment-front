import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrenceLinkComponent } from './refrence-link.component';

describe('RefrenceLinkComponent', () => {
  let component: RefrenceLinkComponent;
  let fixture: ComponentFixture<RefrenceLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrenceLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefrenceLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
