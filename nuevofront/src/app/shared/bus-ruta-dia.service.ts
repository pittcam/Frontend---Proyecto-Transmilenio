import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BusRutaDiaDTO } from '../dto/bus-ruta-dia-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusRutaDiaService {
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

  guardarDias(busRutaDia: BusRutaDiaDTO): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/bus-ruta-dia/guardar-dias`, busRutaDia, {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    });
  }

  eliminarRuta(busId: number, rutaId: number): Observable<any> {
    return this.http.delete(`${environment.SERVER_URL}/bus-ruta-dia/eliminar`, {
      params: { busId: busId.toString(), rutaId: rutaId.toString() },
      ...this.httpOptions
    });
  }

  getBusesRutaDiaDisponibles(): Observable<BusRutaDiaDTO[]> {
    return this.http.get<BusRutaDiaDTO[]>(`${environment.SERVER_URL}/bus-ruta-dia/disponibles`, this.httpOptions);
  }
}
