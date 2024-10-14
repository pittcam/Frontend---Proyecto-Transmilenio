// Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../shared/bus.service';
import { RutaService } from '../../shared/ruta.service';
import { BusDTO } from '../../dto/bus-dto';
import { RutaDTO } from '../../dto/ruta-dto';
import { catchError, of, Observable } from 'rxjs';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-view',
  standalone: true,
  imports: [NgIf, AsyncPipe, CommonModule],
  templateUrl: './bus-view.component.html',
  styleUrls: ['./bus-view.component.css'],
})
export class BusViewComponent implements OnInit {
  bus$!: Observable<BusDTO | null>;
  rutas$!: Observable<RutaDTO[]>;
  rutasAsignadas: RutaDTO[] = []; // Inicializa como un arreglo vacío
  errorMessage: string = '';
  selectedRutaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private rutaService: RutaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bus$ = this.busService.recuperarBusPorId(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Error al cargar los datos del bus';
        return of(null);
      })
    );
  }

  cargarRutasAsignadas(busId: number): void {
    this.rutaService.obtenerRutasPorBus(busId).subscribe(
      (rutas: RutaDTO[]) => { // Especifica el tipo de rutas
        this.rutasAsignadas = rutas; // Asigna las rutas a la propiedad
      },
      (error: any) => { // Especifica el tipo de error
        console.error('Error al cargar las rutas asignadas', error);
      }
    );
  }

  irAAsignarRutas(): void {
    const busId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/asignaciones/asignar-ruta/${busId}`]);
  }
}
