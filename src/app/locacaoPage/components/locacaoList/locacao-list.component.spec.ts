import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoListComponent } from './locacao-list.component';

describe('LocacaoListComponent', () => {
  let component: LocacaoListComponent;
  let fixture: ComponentFixture<LocacaoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocacaoListComponent]
    });
    fixture = TestBed.createComponent(LocacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
