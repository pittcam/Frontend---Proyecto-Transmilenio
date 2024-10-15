import { Component, OnInit } from '@angular/core';
import { BusDTO } from '../../dto/bus-dto';
import { BusService } from '../../shared/bus.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';

@Component({
  selector: 'app-bus-create',
  standalone: true,
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.css'],
  imports: [FormsModule, AsyncPipe, NgForOf, NgIf],
})
export class BusCreateComponent implements OnInit {
  busDTO: BusDTO = new BusDTO(null, '', '', []); // Inicializa el modelo del bus con un array vacío para rutas
  error: any;
  rutas: RutaDTO[] = []; // Almacena las rutas disponibles
  selectedRutaIds: number[] = []; // Almacena los IDs de las rutas seleccionadas

  constructor(
    private busService: BusService,
    private router: Router,
    private rutaService: RutaService
  ) {}

  ngOnInit() {
    this.cargarRutasDisponibles();
  }

  // Metodo para crear el bus
  crearBus(): void {
    // Asignar las rutas seleccionadas al busDTO
    this.busDTO.rutas = this.rutas.filter(ruta => this.selectedRutaIds.includes(ruta.id!));

    // Llamar al servicio para crear el bus
    this.busService.crearBus(this.busDTO).subscribe({
      next: (data) => {
        console.log('Bus creado:', data);
        // Redirigir a la lista de buses después de la creación
        this.router.navigate(['/buses']);
      },
      error: (error) => {
        console.error('Error al crear el bus:', error);
      }
    });
  }

  // Cargar las rutas disponibles desde el servicio
  cargarRutasDisponibles() {
    this.rutaService.obtenerRutas().subscribe({
      next: (rutas) => {
        this.rutas = rutas;
        console.log('Rutas cargadas:', this.rutas);
      },
      error: (error) => {
        console.error('Error al cargar rutas:', error);
      }
    });
  }

  // Metodo para gestionar los cambios en los checkboxes de las rutas
  onRutaChange(event: any, rutaId: number): void {
    if (event.target.checked) {
      // Si el checkbox está marcado, añadir el ID a las selecciones
      this.selectedRutaIds.push(rutaId);
    } else {
      // Si el checkbox no está marcado, eliminar el ID de las selecciones
      this.selectedRutaIds = this.selectedRutaIds.filter(id => id !== rutaId);
    }
  }

  // Método para navegar a la lista de buses
  verBuses(): void {
    this.router.navigate(['/buses']);
  }
}
