import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteFormComponent } from './dependente-form.component';

describe('DependenteFormComponent', () => {
  let component: DependenteFormComponent;
  let fixture: ComponentFixture<DependenteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependenteFormComponent]
    });
    fixture = TestBed.createComponent(DependenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
