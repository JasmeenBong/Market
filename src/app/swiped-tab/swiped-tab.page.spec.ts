import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipedTabPage } from './swiped-tab.page';

describe('SwipedTabPage', () => {
  let component: SwipedTabPage;
  let fixture: ComponentFixture<SwipedTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipedTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipedTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
