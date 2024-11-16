import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {catchError, Observable, of} from 'rxjs';
import {RutaDTO} from '../../dto/ruta-dto';
import {EstacionDTO} from '../../dto/estacion-dto';
import {ActivatedRoute} from '@angular/router';
import {RutaService} from '../../shared/ruta.service';
import {EstacionService} from '../../shared/estacion.service';
import {RouterLink,Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-ruta-view',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,RouterLink
  ],
  templateUrl: './rutas-view.component.html',
  styleUrl: './rutas-view.component.css'
})
export class RutasViewComponent implements OnInit {
  ruta$!: Observable<RutaDTO | null>;
  estaciones: EstacionDTO[] = [];  // Creamos la variable local
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



    // Cargar las estaciones y almacenarlas en la variable local
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
    this.router.navigate(['/usuario']);
  }
}
