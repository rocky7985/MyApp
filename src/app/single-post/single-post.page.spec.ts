import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePostPage } from './single-post.page';

describe('SinglePostPage', () => {
  let component: SinglePostPage;
  let fixture: ComponentFixture<SinglePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
