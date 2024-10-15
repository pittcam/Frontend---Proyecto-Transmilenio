import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../shared/bus.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsignacionService } from '../../shared/asignacion.service';
import { BusRutaDiaDTO } from '../../dto/bus-ruta-dia-dto';
import {BusRutaDiaService} from '../../shared/bus-ruta-dia.service'; // Usamos BusRutaDiaDTO

@Component({
  selector: 'app-asignacion-bus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './asignacion-bus.component.html',
  styleUrls: ['./asignacion-bus.component.css'],
})
export class AsignacionBusComponent implements OnInit {
  busesRutaDia: BusRutaDiaDTO[] = []; // Lista de BusRutaDiaDTO[]
  selectedBusRutaDia!: BusRutaDiaDTO; // Objeto seleccionado de tipo BusRutaDiaDTO
  asignacionId: number | null = null;
  conductorId: number | null = null;
  mensaje: string | null = null;

  constructor(
    private busService: BusService,
    private asignacionService: AsignacionService,
    private busRutaDiaService: BusRutaDiaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.conductorId = Number(this.route.snapshot.paramMap.get('conductorId'));
    if (!this.conductorId) {
      this.mensaje = 'Error: No se ha proporcionado un conductor válido.';
      return;
    }
    this.cargarBusesDisponibles();
    this.obtenerAsignacion();
  }

  cargarBusesDisponibles() {
    this.busRutaDiaService.getBusesRutaDiaDisponibles().subscribe(
      (busesRutaDia) => {
        if (!busesRutaDia || busesRutaDia.length === 0) {  // Verifica si es null o undefined
          this.mensaje = 'No hay buses disponibles para asignar.';
        } else {
          this.busesRutaDia = busesRutaDia;
        }
      },
      (error) => {
        this.mensaje = 'Hubo un error al cargar los buses.';
        console.error('Error cargando buses:', error);  // Agrega este log para verificar el error
      }
    );
  }

  obtenerAsignacion() {
    this.asignacionService.obtenerAsignacionPorConductor(this.conductorId!).subscribe(
      (asignacion) => {
        this.asignacionId = asignacion.id ?? null; // Asigna la ID de la asignación
        console.log('Asignación obtenida:', asignacion); // Verificar el objeto asignación
      },
      (error) => {
        this.mensaje = 'No se encontró ninguna asignación para este conductor.';
        console.error('Error al obtener asignación:', error); // Agrega este log detallado
        console.error('URL:', error.url); // Loguea la URL
        console.error('Status:', error.status); // Loguea el estado HTTP
        console.error('Detalles del error:', error.message); // Detalles adicionales
      }
    );
  }



  asignarBus() {
    if (!this.asignacionId || !this.selectedBusRutaDia) {
      this.mensaje = 'Por favor, selecciona un bus y días para asignar.';
      return;
    }

    this.asignacionService.agregarBusRutaDia(this.asignacionId, this.selectedBusRutaDia).subscribe(
      () => {
        this.mensaje = 'Bus asignado exitosamente a la asignación existente.';
        this.router.navigate(['/conductores']);
      },
      (error) => {
        this.mensaje = `Error al asignar el bus: ${error.message || 'Intenta nuevamente.'}`;
        console.error('Detalles del error:', error);
      }
    );


  }
}
