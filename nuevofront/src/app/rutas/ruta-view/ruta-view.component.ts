import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaService } from '../../shared/ruta.service';
import { EstacionService } from '../../shared/estacion.service';
import { RutaDTO } from '../../dto/ruta-dto';
import { EstacionDTO } from '../../dto/estacion-dto';
import { catchError, Observable, of } from 'rxjs';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta-view',
  standalone: true,
  imports: [CommonModule, NgIf, AsyncPipe],
  templateUrl: './ruta-view.component.html',
  styleUrls: ['./ruta-view.component.css'],
})
export class RutaViewComponent implements OnInit {
  ruta$!: Observable<RutaDTO | null>;
  estaciones$!: Observable<EstacionDTO[] | null>;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ruta$ = this.rutaService.obtenerRuta(id).pipe(
      catchError(error => {
        this.errorMessage = 'Error al cargar los datos de la ruta';
        return of(null);
      })
    );

    // Cargar estaciones
    this.estaciones$ = this.estacionService.obtenerEstaciones();

  }

  volver(): void {
    this.router.navigate(['/rutas']);
  }
}
