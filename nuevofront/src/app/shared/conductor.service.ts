import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ConductorDTO } from '../dto/conductor-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
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

  listarConductores(): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVER_URL}/conductor`, this.httpOptions);
  }

  crearConductor(conductorDTO: ConductorDTO): Observable<ConductorDTO> {
    return this.http.post<ConductorDTO>(`${environment.SERVER_URL}/conductor`, conductorDTO, this.httpOptions);
  }

  buscarConductorPorNombre(nombre: string): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVER_URL}/conductor/search?nombre=${nombre}`, this.httpOptions);
  }

  recuperarConductorPorId(id: number): Observable<ConductorDTO> {
    return this.http.get<ConductorDTO>(`${environment.SERVER_URL}/conductor/${id}`, this.httpOptions);
  }

  actualizarConductor(conductor: ConductorDTO): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/conductor/${conductor.id}`, conductor, this.httpOptions);
  }

  eliminarConductor(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.SERVER_URL}/conductor/${id}`, this.httpOptions);
  }
}
