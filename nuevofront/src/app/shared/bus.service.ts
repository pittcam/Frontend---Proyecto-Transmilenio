import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BusDTO } from '../dto/bus-dto';
import {RutaDTO} from '../dto/ruta-dto';
import {BusRutaDiaDTO} from '../dto/bus-ruta-dia-dto'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root', // Asegúrate de que el servicio esté disponible en toda la aplicación
})
export class BusService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  listarBuses(): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVER_URL}/bus`);
  }

  crearBus(busDTO: BusDTO): Observable<BusDTO> {
    return this.http.post<BusDTO>(
      `${environment.SERVER_URL}/bus`,
      busDTO,
      this.httpOptions
    );
  }

  buscarBusPorPlaca(nombre: string): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVER_URL}/bus/search?nombre=${nombre}`);
  }

  recuperarBusPorId(id: number): Observable<BusDTO> {
    return this.http.get<BusDTO>(`${environment.SERVER_URL}/bus/${id}`);
  }

  actualizarBus(bus: BusDTO): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/bus/${bus.id}`, bus, this.httpOptions);
  }

  eliminarBus(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.SERVER_URL}/bus/${id}`, this.httpOptions);
  }

  // Método para obtener los buses con sus rutas y días
  getBusesDisponibles(): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVER_URL}/bus/disponibles`);
  }

  // Metodo para asignar múltiples rutas a un bus
  asignarRuta(busId: number, rutaIds: number[]): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVER_URL}/bus/${busId}/asignarRutas`, rutaIds, this.httpOptions);
  }

}
