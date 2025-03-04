import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParteObraPage } from './parte-obra.page';

describe('ParteObraPage', () => {
  let component: ParteObraPage;
  let fixture: ComponentFixture<ParteObraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
