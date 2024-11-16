import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { RutaService } from '../../shared/ruta.service';
import { EstacionService } from '../../shared/estacion.service';
import { RutaDTO } from '../../dto/ruta-dto';
import { EstacionDTO } from '../../dto/estacion-dto';
import { catchError, Observable, of } from 'rxjs';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-ruta-view',
  standalone: true,
    imports: [CommonModule, NgIf, AsyncPipe, RouterLink],
  templateUrl: './ruta-view.component.html',
  styleUrls: ['./ruta-view.component.css'],
})
export class RutaViewComponent implements OnInit {
  ruta$!: Observable<RutaDTO | null>;
  estaciones: EstacionDTO[] = [];  // Declaramos la variable aquí
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener la ruta por ID
    this.ruta$ = this.rutaService.obtenerRuta(id).pipe(
      catchError(error => {
        this.errorMessage = 'Error al cargar los datos de la ruta';
        return of(null);
      })
    );



    // Cargar todas las estaciones y asignarlas a la variable local
    this.estacionService.obtenerEstaciones().subscribe({
      next: (data: EstacionDTO[]) => {
        this.estaciones = data;
      },
      error: (error) => {
        console.error('Error al cargar estaciones:', error);
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  volver(): void {
    this.router.navigate(['/rutas']);
  }
}
