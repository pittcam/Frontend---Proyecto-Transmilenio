import { TestBed } from '@angular/core/testing';

import { BusRutaDiaService } from './bus-ruta-dia.service';

describe('BusRutaDiaService', () => {
  let service: BusRutaDiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusRutaDiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
