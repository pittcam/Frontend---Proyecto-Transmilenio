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
export class RutasViewComponent implements OnInit{
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
    this.router.navigate(['/usuario']);
  }

}

