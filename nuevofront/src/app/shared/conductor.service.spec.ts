import { TestBed } from '@angular/core/testing';

import { PersonService } from './conductor.service';

describe('ConductorService', () => {
  let service: ConductorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
