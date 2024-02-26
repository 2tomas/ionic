import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShatPage } from './shat.page';

describe('ShatPage', () => {
  let component: ShatPage;
  let fixture: ComponentFixture<ShatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
