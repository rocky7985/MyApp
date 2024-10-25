import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSinglePage } from './view-single.page';

describe('ViewSinglePage', () => {
  let component: ViewSinglePage;
  let fixture: ComponentFixture<ViewSinglePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
