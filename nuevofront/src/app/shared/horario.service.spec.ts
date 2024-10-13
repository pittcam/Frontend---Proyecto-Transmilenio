import { TestBed } from '@angular/core/testing';

import { PersonService } from './horario.service';

describe('HorarioService', () => {
  let service: HorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
