import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { socioResolver } from './socio.resolver';

describe('socioResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => socioResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
