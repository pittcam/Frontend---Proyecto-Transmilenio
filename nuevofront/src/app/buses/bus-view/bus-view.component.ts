// Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { BusService } from '../../shared/bus.service';
import { RutaService } from '../../shared/ruta.service';
import { BusDTO } from '../../dto/bus-dto';
import { RutaDTO } from '../../dto/ruta-dto';
import { catchError, of, Observable } from 'rxjs';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';
import {BusRutaDiaService} from '../../shared/bus-ruta-dia.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-bus-view',
  standalone: true,
    imports: [NgIf, AsyncPipe, CommonModule, RouterLink],
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
    private authService: AuthService,
    private busRutaDiaService: BusRutaDiaService,
    private rutaService: RutaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar el bus y las rutas asignadas
    this.bus$ = this.busService.recuperarBusPorId(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Error al cargar los datos del bus';
        return of(null);
      })
    );

    // Cargar las rutas asignadas
    this.cargarRutasAsignadas(id);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cargarRutasAsignadas(busId: number): void {
    this.busService.recuperarBusPorId(busId).subscribe(
      (bus: BusDTO) => {
        this.rutasAsignadas = bus.rutas; // Asegúrate de que las rutas están correctamente asignadas al bus
        console.log('Rutas asignadas:', this.rutasAsignadas);
      },
      (error) => {
        console.error('Error al cargar las rutas asignadas', error);
      }
    );
  }


  seleccionarDias(): void {
    const busId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/buses/seleccionar-dias/${busId}`]);
  }

  irAAsignarRutas(): void {
    const busId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`asignaciones/asignar-ruta/`,busId]);
  }

  eliminarRuta(rutaId: number): void {
    const busId = Number(this.route.snapshot.paramMap.get('id'));  // Obtener el ID del bus

    // Llamar al servicio para eliminar la ruta asignada al bus
    this.busRutaDiaService.eliminarRuta(busId, rutaId).subscribe({
      next: () => {
        console.log(`Ruta con ID ${rutaId} eliminada del bus ${busId}`);
        // Actualizar la lista de rutas asignadas
        this.rutasAsignadas = this.rutasAsignadas.filter(ruta => ruta.id !== rutaId);
      },
      error: (error) => {
        console.error('Error al eliminar la ruta:', error);
        this.errorMessage = 'Error al eliminar la ruta.';
      }
    });
  }
}
