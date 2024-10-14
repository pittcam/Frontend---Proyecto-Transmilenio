import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RutaDTO } from '../dto/ruta-dto';
import {ConductorDTO} from '../dto/conductor-dto';
import {BusRutaDiaDTO} from '../dto/bus-ruta-dia-dto';

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las rutas
  obtenerRutas(): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas`);
  }

  // Obtener rutas disponibles (puedes modificar esta URL según tu API)
  obtenerRutasDisponibles(): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas/disponibles`);
  }

  // Eliminar una ruta por su ID
  eliminarRuta(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.SERVER_URL}/rutas/${id}`);
  }

  // Crear una nueva ruta
  crearRuta(ruta: RutaDTO): Observable<RutaDTO> {
    return this.http.post<RutaDTO>(`${environment.SERVER_URL}/rutas`, ruta, this.httpOptions);
  }

  // Obtener una ruta por su ID
  obtenerRuta(id: number): Observable<RutaDTO> {
    return this.http.get<RutaDTO>(`${environment.SERVER_URL}/rutas/${id}`);
  }


  // Actualizar una ruta existente
  actualizarRuta(id: number, ruta: RutaDTO): Observable<void> {
    return this.http.put<void>(`${environment.SERVER_URL}/rutas/${id}`, ruta, this.httpOptions);
  }

  buscarRutaPorNombre(nombre: string): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/ruta/search?nombre=${nombre}`);
  }

  // Obtener rutas disponibles (modificación redundante)
  getRutasDisponibles(): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas/disponibles`); // Asegúrate de que esta ruta sea correcta
  }

  // Nuevo método para obtener rutas por bus
  obtenerRutasPorBus(busId: number): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas/bus/${busId}`, this.httpOptions);
  }

}
