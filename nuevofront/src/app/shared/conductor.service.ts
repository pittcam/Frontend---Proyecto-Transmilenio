import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ConductorDTO } from '../dto/conductor-dto'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root', // Asegúrate de que el servicio esté disponible en toda la aplicación
})
export class ConductorService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  listarConductores(): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVER_URL}/conductor`);
  }

  crearConductor(conductorDTO: ConductorDTO): Observable<ConductorDTO> {
    return this.http.post<ConductorDTO>(
      `${environment.SERVER_URL}/conductor`,
      conductorDTO,
      this.httpOptions
    );
  }

  buscarConductorPorNombre(nombre: string): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVER_URL}/conductor/search?nombre=${nombre}`);
  }

  recuperarConductorPorId(id: number): Observable<ConductorDTO> {
      return this.http.get<ConductorDTO>(`${environment.SERVER_URL}/conductor/${id}`);
  }

  actualizarConductor(conductor: ConductorDTO): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/conductor/${conductor.id}`, conductor);
  }

  eliminarConductor(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.SERVER_URL}/conductor/${id}`, this.httpOptions);
  }




  // Otras funciones como buscarConductores, etc.
}
