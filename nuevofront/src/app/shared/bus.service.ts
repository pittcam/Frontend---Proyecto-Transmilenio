import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BusDTO } from '../dto/bus-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusService {
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

  listarBuses(): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVER_URL}/bus`, this.httpOptions);
  }

  crearBus(busDTO: BusDTO): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVER_URL}/bus`, busDTO, this.httpOptions);
  }

  buscarBusPorPlaca(placa: string): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVER_URL}/bus/search?placa=${placa}`, this.httpOptions);
  }

  recuperarBusPorId(id: number): Observable<BusDTO> {
    return this.http.get<BusDTO>(`${environment.SERVER_URL}/bus/${id}`, this.httpOptions);
  }

  actualizarBus(bus: BusDTO): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/bus/${bus.id}`, bus, this.httpOptions);
  }

  eliminarBus(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.SERVER_URL}/bus/${id}`, this.httpOptions);
  }

  getBusesDisponibles(): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVER_URL}/bus/disponibles`, this.httpOptions);
  }

  asignarRuta(busId: number, rutaIds: number[]): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVER_URL}/bus/${busId}/asignarRutas`, rutaIds, this.httpOptions);
  }
}
