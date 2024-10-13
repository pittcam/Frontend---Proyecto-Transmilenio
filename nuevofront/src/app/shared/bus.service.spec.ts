import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BusService } from './bus.service'; // Asegúrate de que la ruta sea correcta
import { BusDTO } from '../dto/bus-dto'; // Asegúrate de que la ruta sea correcta

describe('BusService', () => {
  let service: BusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importar el módulo de pruebas de HttpClient
    });
    service = TestBed.inject(BusService);
    httpMock = TestBed.inject(HttpTestingController); // Inyectar el controlador de pruebas
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Aquí puedes añadir más pruebas unitarias
  describe('listarBuses', () => {
    it('should return an array of buses', () => {
      const dummyBuses: BusDTO[] = [
        { id: 1, name: 'Bus 1' }, // Asegúrate de que coincida con tu modelo BusDTO
        { id: 2, name: 'Bus 2' },
      ];

      service.listarBuses().subscribe(buses => {
        expect(buses.length).toBe(2);
        expect(buses).toEqual(dummyBuses);
      });

      const request = httpMock.expectOne(`${environment.SERVER_URL}/bus`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyBuses); // Simular respuesta del servidor
    });
  });

  // Aquí puedes añadir más pruebas para crear, actualizar y eliminar buses

});
