import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RutaService } from '../../shared/ruta.service';
import { RutaDTO } from '../../dto/ruta-dto';
import { BusService } from '../../shared/bus.service';
import { catchError, of } from 'rxjs';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-asignacion-ruta',
  standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './asignacion-ruta.component.html',
  styleUrls: ['./asignacion-ruta.component.css'],
})
export class AsignacionRutaComponent implements OnInit {
  rutas: RutaDTO[] = [];
  selectedRutaIds: number[] = [];
  busId!: number;

  constructor(
    private rutaService: RutaService,
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.busId = +this.route.snapshot.paramMap.get('id')!; // Obtener el ID del bus
    this.cargarRutasDisponibles(); // Cargar las rutas disponibles
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Cargar todas las rutas disponibles desde el servicio
  cargarRutasDisponibles() {
    this.rutaService.obtenerRutas().subscribe(
      (rutas) => {
        this.rutas = rutas;
        console.log('Rutas cargadas:', this.rutas);
      },
      (error) => {
        console.error('Error al cargar rutas:', error);
      }
    );
  }

  // Asignar múltiples rutas a un bus
  asignarRutas() {
    // Asignar todas las rutas seleccionadas al bus
    this.busService.asignarRuta(this.busId, this.selectedRutaIds).subscribe(
      (bus) => {
        alert('Rutas asignadas exitosamente.');
        this.router.navigate(['/buses/ver/', this.busId]); // Redirigir después de la asignación
      },
      (error) => {
        console.error('Error al asignar las rutas:', error);
      }
    );
  }


  // Método para gestionar los cambios en los checkboxes
  onRutaChange(event: any, rutaId: number): void {
    if (event.target.checked) {
      this.selectedRutaIds.push(rutaId); // Añadir el ID si está seleccionado
    } else {
      this.selectedRutaIds = this.selectedRutaIds.filter(id => id !== rutaId); // Eliminar si está deseleccionado
    }
  }
}
