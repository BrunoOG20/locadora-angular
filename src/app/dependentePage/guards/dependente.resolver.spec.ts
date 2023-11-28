import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dependenteResolver } from './dependente.resolver';

describe('dependenteResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => dependenteResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
