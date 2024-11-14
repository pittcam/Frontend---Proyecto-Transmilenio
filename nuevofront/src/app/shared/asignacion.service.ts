import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; // Ajusta la ruta según tu configuración
import { AsignacionDTO } from '../dto/asignacion-dto';
import { RutaDTO } from '../dto/ruta-dto';
import { BusDTO } from '../dto/bus-dto';
import { BusRutaDiaDTO } from '../dto/bus-ruta-dia-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private apiUrl = `${environment.SERVER_URL}/asignacion`;

  // Declaramos httpOptions que será dinámicamente actualizado
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: '', // Placeholder inicial
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.setAuthorizationHeader(); // Inicializa headers al crear la instancia
  }

  // Método para actualizar el token de autorización en headers
  private setAuthorizationHeader() {
    const token = this.authService.getToken();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization', `Bearer ${token}`
    );
  }

  // Métodos del servicio
  asignarBus(asignacion: AsignacionDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar-bus`, asignacion, this.httpOptions);
  }

  obtenerAsignacionPorConductor(conductorId: number): Observable<AsignacionDTO> {
    return this.http.get<AsignacionDTO>(`${this.apiUrl}/conductor/${conductorId}`, this.httpOptions);
  }

  agregarBusRutaDia(asignacionId: number, busRutaDia: BusRutaDiaDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar/${asignacionId}`, busRutaDia, this.httpOptions);
  }

  obtenerRutasPorBus(busId: number): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${this.apiUrl}/rutas/${busId}`, this.httpOptions);
  }

  asignarRuta(asignacion: AsignacionDTO): Observable<AsignacionDTO> {
    return this.http.post<AsignacionDTO>(`${this.apiUrl}/rutas`, asignacion, this.httpOptions);
  }

  obtenerBusesPorConductor(conductorId: number): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${this.apiUrl}/conductor/${conductorId}/buses`, this.httpOptions);
  }
}
