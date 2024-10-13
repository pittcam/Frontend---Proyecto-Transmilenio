import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EstacionDTO } from '../dto/estacion-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  private apiUrl = `${environment}/estaciones`; // URL base de la API para estaciones

  constructor(private http: HttpClient) { }

  // Obtener todas las estaciones
  obtenerEstaciones(): Observable<EstacionDTO[]> {
    return this.http.get<EstacionDTO[]>(this.apiUrl)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  // Obtener una estación por ID
  obtenerEstacionPorId(id: number): Observable<EstacionDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EstacionDTO>(url)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }



  // Manejo básico de errores
  private handleError(error: any): Observable<any> {
    console.error('Error en la petición del servicio de estaciones', error);
    return new Observable();
  }
}
