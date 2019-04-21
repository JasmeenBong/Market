import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductPage } from './my-product.page';

describe('MyProductPage', () => {
  let component: MyProductPage;
  let fixture: ComponentFixture<MyProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
