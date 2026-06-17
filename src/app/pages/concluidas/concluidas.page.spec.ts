import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluidasPage } from './concluidas.page';

describe('ConcluidasPage', () => {
  let component: ConcluidasPage;
  let fixture: ComponentFixture<ConcluidasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcluidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
