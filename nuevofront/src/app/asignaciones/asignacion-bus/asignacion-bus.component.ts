import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../shared/bus.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsignacionService } from '../../shared/asignacion.service';
import { AsignacionDTO } from '../../dto/asignacion-dto';

@Component({
  selector: 'app-asignacion-bus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './asignacion-bus.component.html',
  styleUrls: ['./asignacion-bus.component.css'],
})
export class AsignacionBusComponent implements OnInit {
  buses: any[] = [];
  selectedBusId: number | null = null;
  conductorId: number | null = null;  // ID del conductor que se toma de la URL
  mensaje: string | null = null;

  constructor(
    private busService: BusService,
    private asignacionService: AsignacionService,
    private router: Router,
    private route: ActivatedRoute // Para obtener el ID del conductor desde la URL
  ) {}

  ngOnInit() {
    this.cargarBusesDisponibles();
    // Obtener el ID del conductor desde la URL
    this.conductorId = Number(this.route.snapshot.paramMap.get('conductorId'));

    if (!this.conductorId) {
      this.mensaje = 'Error: No se ha proporcionado un conductor válido.';
    }
  }


  cargarBusesDisponibles() {
    this.busService.getBusesDisponibles().subscribe(
      (buses) => {
        if (buses.length === 0) {
          this.mensaje = "No hay buses disponibles para asignar.";
        } else {
          this.buses = buses;
        }
      },
      (error) => {
        console.error('Error al cargar buses:', error);
        this.mensaje = "Hubo un error al cargar los buses. Intenta nuevamente.";
      }
    );
  }

  asignarBus() {
    // Verificar si el conductorId es válido
    if (!this.conductorId) {
      this.mensaje = "No se ha seleccionado un conductor válido. Por favor, inténtalo nuevamente.";
      console.error('Error: El ID del conductor es nulo o inválido.');
      return;
    }

    // Verificar si se ha seleccionado un bus
    if (!this.selectedBusId) {
      this.mensaje = "Por favor, selecciona un bus para asignar.";
      console.error('Error: No se ha seleccionado ningún bus.');
      return;
    }

    const busIdNumber = Number(this.selectedBusId);

    // Verificar si el bus seleccionado es válido (es un número)
    if (isNaN(busIdNumber)) {
      this.mensaje = "Por favor, selecciona un bus válido.";
      console.error('Error: El ID del bus seleccionado no es un número válido.');
      return;
    }

    // Si todo es válido, proceder a la asignación
    const asignacion: AsignacionDTO = {
      busId: busIdNumber,
      conductorId: this.conductorId
    };

    this.asignacionService.asignarBus(asignacion).subscribe(
      () => {
        this.mensaje = "Bus asignado exitosamente.";
        this.router.navigate(['/conductores']);
      },
      (error) => {
        this.mensaje = error.error?.message || "Error al asignar el bus. Intenta nuevamente.";
        console.error('Error al asignar el bus:', error);
      }
    );
  }

}
