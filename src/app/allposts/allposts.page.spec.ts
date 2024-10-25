import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllpostsPage } from './allposts.page';

describe('AllpostsPage', () => {
  let component: AllpostsPage;
  let fixture: ComponentFixture<AllpostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
