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

  // Metodo para eliminar una ruta asignada a un bus
  eliminarRuta(busId: number, rutaId: number): Observable<any> {
    return this.http.delete(`${environment.SERVER_URL}/bus-ruta-dia/eliminar`, {
      params: {
        busId: busId.toString(),
        rutaId: rutaId.toString(),
      },
      ...this.httpOptions
    });
  }

}
