import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteListComponent } from './dependente-list.component';

describe('DependenteListComponent', () => {
  let component: DependenteListComponent;
  let fixture: ComponentFixture<DependenteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependenteListComponent]
    });
    fixture = TestBed.createComponent(DependenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
