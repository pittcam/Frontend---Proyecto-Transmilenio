import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; // Ajusta la ruta según tu configuración
import { AsignacionDTO } from '../dto/asignacion-dto';
import { RutaDTO } from '../dto/ruta-dto'; // Asegúrate de importar RutaDTO
import { BusDTO } from '../dto/bus-dto'; // Importar el BusDTO para usar en obtenerBusesPorConductor

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl = `${environment.SERVER_URL}/asignacion`;

  constructor(private http: HttpClient) { }

  // Método para asignar un bus a un conductor
  asignarBus(asignacion: AsignacionDTO): Observable<AsignacionDTO> {
    return this.http.post<AsignacionDTO>(this.apiUrl, asignacion, this.httpOptions); // Asegurarse de usar las opciones HTTP
  }

  // Método para obtener rutas asignadas a un bus
  obtenerRutasPorBus(busId: number): Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${this.apiUrl}/rutas/${busId}`, this.httpOptions);

  }



  // Método para asignar una ruta a un bus
  asignarRuta(asignacion: AsignacionDTO): Observable<AsignacionDTO> {
    return this.http.post<AsignacionDTO>(`${this.apiUrl}/rutas`, asignacion, this.httpOptions);
  }

  // *Método para obtener los buses asignados a un conductor*
  obtenerBusesPorConductor(conductorId: number): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${this.apiUrl}/conductor/${conductorId}/buses`, this.httpOptions);
  }

}
