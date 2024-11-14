import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { EstacionDTO } from '../dto/estacion-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {
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

  obtenerEstaciones(): Observable<EstacionDTO[]> {
    return this.http.get<EstacionDTO[]>(`${environment.SERVER_URL}/estaciones`, this.httpOptions);
  }
}
