import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RutaDTO } from '../dto/ruta-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.setAuthorizationHeader();
  }

  private setAuthorizationHeader() {
    const token = this.authService.getToken();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization', `Bearer ${token}`
    );
  }

  obtenerRutas(): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas`, this.httpOptions);
  }

  obtenerRutasDisponibles(): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas/disponibles`, this.httpOptions);
  }

  eliminarRuta(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.SERVER_URL}/rutas/${id}`, this.httpOptions);
  }

  crearRuta(ruta: RutaDTO): Observable<RutaDTO> {
    return this.http.post<RutaDTO>(`${environment.SERVER_URL}/rutas`, ruta, this.httpOptions);
  }

  obtenerRuta(id: number): Observable<RutaDTO> {
    return this.http.get<RutaDTO>(`${environment.SERVER_URL}/rutas/${id}`, this.httpOptions);
  }

  actualizarRuta(id: number, ruta: RutaDTO): Observable<void> {
    return this.http.put<void>(`${environment.SERVER_URL}/rutas/${id}`, ruta, this.httpOptions);
  }

  buscarRutaPorNombre(nombre: string): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas/search?nombre=${nombre}`, this.httpOptions);
  }

  obtenerRutasPorBus(busId: number): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVER_URL}/rutas/bus/${busId}`, this.httpOptions);
  }
}
