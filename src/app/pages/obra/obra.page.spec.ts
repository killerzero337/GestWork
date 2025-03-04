import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObraPage } from './obra.page';

describe('ObraPage', () => {
  let component: ObraPage;
  let fixture: ComponentFixture<ObraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
