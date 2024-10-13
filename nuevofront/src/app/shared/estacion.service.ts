import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { EstacionDTO } from '../dto/estacion-dto'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class EstacionService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las estaciones
  obtenerEstaciones(): Observable<EstacionDTO[]> {
    return this.http.get<EstacionDTO[]>(`${environment.SERVER_URL}/estaciones`);
  }

}
