import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQueueComponent } from './card-queue.component';

describe('CardQueueComponent', () => {
  let component: CardQueueComponent;
  let fixture: ComponentFixture<CardQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
