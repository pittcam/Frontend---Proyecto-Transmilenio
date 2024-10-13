import { TestBed } from '@angular/core/testing';

import { PersonService } from './asignacion.service';

describe('AsigancionService', () => {
  let service: AsignacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
