import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { HorarioDTO } from '../dto/horario-dto';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  obtenerHorarios(): Observable<HorarioDTO[]> {
    return this.http.get<HorarioDTO[]>(`${environment.SERVER_URL}/horarios`);
  }

}
