import { Component, OnInit } from '@angular/core';
import { BusDTO } from '../../dto/bus-dto';
import { BusService } from '../../shared/bus.service';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-bus-create',
  standalone: true,
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.css'],
    imports: [FormsModule, AsyncPipe, NgForOf, NgIf, RouterLink],
})
export class BusCreateComponent {
  busDTO: BusDTO = new BusDTO(null, '', '', []); // Inicializa el modelo del bus con un array vacío para rutas
  error: any;
  rutas: RutaDTO[] = []; // Almacena las rutas disponibles
  selectedRutaIds: number[] = []; // Almacena los IDs de las rutas seleccionadas

  constructor(
    private busService: BusService,
    private router: Router,
    private rutaService: RutaService,
    private authService: AuthService
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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


  // Método para navegar a la lista de buses
  verBuses(): void {
    this.router.navigate(['/buses']);
  }
}
