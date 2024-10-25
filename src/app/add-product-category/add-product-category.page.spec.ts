import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductCategoryPage } from './add-product-category.page';

describe('AddProductCategoryPage', () => {
  let component: AddProductCategoryPage;
  let fixture: ComponentFixture<AddProductCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
