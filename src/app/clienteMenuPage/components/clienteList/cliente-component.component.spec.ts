import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteComponent } from './cliente-component.component';

describe('ClienteListComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteComponent]
    });
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
