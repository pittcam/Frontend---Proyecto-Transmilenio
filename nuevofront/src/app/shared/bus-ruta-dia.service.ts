import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {BusRutaDiaDTO} from '../dto/bus-ruta-dia-dto';

@Injectable({
  providedIn: 'root'
})
export class BusRutaDiaService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Metodo para guardar los días seleccionados
  guardarDias(busRutaDia: BusRutaDiaDTO): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_URL}/guardar-dias`, busRutaDia);
  }
  getBusesRutaDiaDisponibles(): Observable<BusRutaDiaDTO[]> {
    return this.http.get<BusRutaDiaDTO[]>(`${environment.SERVER_URL}/bus-ruta-dia/disponibles`);
  }

}
