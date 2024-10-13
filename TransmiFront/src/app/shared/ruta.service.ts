import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RutaDTO } from '../dto/ruta-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private apiUrl = `${environment}/rutas`; // URL base de la API

  constructor(private http: HttpClient) { }

  // Obtener todas las rutas
  obtenerRutas(): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(this.apiUrl)
      .pipe(
        catchError(error => this.handleError(error)) // Manejamos errores
      );
  }

  // Obtener una ruta por ID
  obtenerRutaPorId(id: number): Observable<RutaDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RutaDTO>(url)
      .pipe(
        catchError(error => this.handleError(error)) // Manejamos errores
      );
  }

  // Crear una nueva ruta
  crearRuta(ruta: RutaDTO): Observable<RutaDTO> {
    return this.http.post<RutaDTO>(this.apiUrl, ruta)
      .pipe(
        catchError(error => this.handleError(error)) // Manejamos errores
      );
  }

  // Actualizar una ruta existente
  actualizarRuta(id: number, ruta: RutaDTO): Observable<RutaDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<RutaDTO>(url, ruta)
      .pipe(
        catchError(error => this.handleError(error)) // Manejamos errores
      );
  }

  // Eliminar una ruta
  eliminarRuta(id: number): Observable<any> { // Cambiamos a 'Observable<any>'
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(error => this.handleError(error)) // Manejamos errores
      );
  }

  // Manejo simplificado de errores
  private handleError(error: any): Observable<any> {
    console.error('Error en la petición del servicio', error);
    // Retornamos un valor observable vacío o el error para que no detenga la aplicación
    return new Observable();
  }
}
