import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppagePage } from './shoppage.page';

describe('ShoppagePage', () => {
  let component: ShoppagePage;
  let fixture: ComponentFixture<ShoppagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
