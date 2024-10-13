import { TestBed } from '@angular/core/testing';

import { PersonService } from './ruta.service';

describe('RutaService', () => {
  let service: RutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
