import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoFormComponent } from './locacao-form.component';

describe('LocacaoFormComponent', () => {
  let component: LocacaoFormComponent;
  let fixture: ComponentFixture<LocacaoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocacaoFormComponent]
    });
    fixture = TestBed.createComponent(LocacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
