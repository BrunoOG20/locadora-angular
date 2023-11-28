import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteComponent } from './dependente-component.component';

describe('DependenteComponent', () => {
  let component: DependenteComponent;
  let fixture: ComponentFixture<DependenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependenteComponent]
    });
    fixture = TestBed.createComponent(DependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
