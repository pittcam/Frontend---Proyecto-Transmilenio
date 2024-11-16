import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Role } from '../dto/role';
import { Auth } from '../dto/auth';
import { environment } from '../../environments/environment.development';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  rol: Role | null = null;
  username: string | null = null;

  private baseUrl = `${environment.SERVER_URL}/autenticacion`;
  private registerUrl = `${environment.SERVER_URL}/usuarios`;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth_token');
    this.rol = localStorage.getItem('auth_role') as Role | null;
    this.username = localStorage.getItem('username');
  }

  public register(user: any): Observable<any> {
    return this.http.post(`${this.registerUrl}`, user, { observe: 'response' }).pipe(
      tap((response) => {
        console.log('Usuario registrado exitosamente', response);
      }),
      map((response) => response.body || {}), // Manejar caso de respuesta vacía
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(() => new Error(error.message || 'Error al registrar usuario.'));
      })
    );
  }


  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.refresh().toPromise();
      return true;
    } catch {
      return false;
    }
  }

  public login(username: string, password: string): Observable<string> {
    console.log('Iniciando proceso de login en AuthService');

    return this.http
      .post<Auth>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((data) => {
          console.log('Respuesta recibida del servidor:', data);

          // Asignación y almacenamiento de token y rol
          this.token = data.accessToken;
          this.rol = data.rol;
          this.username = username;

          localStorage.setItem('auth_token', this.token);
          localStorage.setItem('auth_role', this.rol);
          localStorage.setItem('username', username);

          // Verificación de token y rol
          console.log('Token guardado:', this.token);
          console.log('Role asignado:', this.rol);
        }),
        map((data) => {
          console.log('Rol devuelto por el servidor:', data.rol);
          return data.rol;
        })
      );
  }

  public logout(): void {
    console.log('Cerrando sesión y eliminando datos de autenticación');
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('username');
  }

  public getToken(): string {
    return this.token!;
  }

  public refresh(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .post<Auth>(`${this.baseUrl}/refresh`, {}, { headers })
      .pipe(
        tap((data) => {
          this.token = data.accessToken;
          localStorage.setItem('auth_token', this.token);
          console.log('Token actualizado en refresh:', this.token);
        }),
        map((data) => data.accessToken)
      );
  }
}
