import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePostPage } from './update-post.page';

describe('UpdatePostPage', () => {
  let component: UpdatePostPage;
  let fixture: ComponentFixture<UpdatePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
