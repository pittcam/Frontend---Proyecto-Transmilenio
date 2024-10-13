import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RutaService } from '../../shared/ruta.service';
import { AsignacionService } from '../../shared/asignacion.service';
import { AsignacionDTO } from '../../dto/asignacion-dto';
import { RutaDTO } from '../../dto/ruta-dto';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-asignacion-ruta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './asignacion-ruta.component.html',
  styleUrls: ['./asignacion-ruta.component.css'],
})
export class AsignacionRutaComponent implements OnInit {
  rutas: RutaDTO[] = [];
  selectedRutaIds: number[] = [];
  busId!: number;

  constructor(
    private rutaService: RutaService,
    private asignacionService: AsignacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.busId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarRutasDisponibles();
  }

  cargarRutasDisponibles() {
    this.rutaService.obtenerRutas().subscribe((rutas) => {
      this.rutas = rutas;
      console.log('Rutas cargadas:', this.rutas);
    }, error => {
      console.error('Error al cargar rutas:', error);
    });
  }

  asignarRutas() {
    this.selectedRutaIds.forEach(rutaId => {
      const asignacion: AsignacionDTO = {
        busId: this.busId,
        rutaId: rutaId,
        conductorId: 1 // Cambia esto a cómo obtienes el conductorId
      };
      this.asignacionService.asignarRuta(asignacion).subscribe(() => {
        alert('Ruta asignada exitosamente.');
      }, (error) => {
        console.error('Error al asignar la ruta:', error);
      });
    });

    // Redirigir después de la asignación
    this.router.navigate(['/buses']);
  }

  onRutaChange(event: any, rutaId: number): void {
    if (event.target.checked) {
      // Si el checkbox está marcado, añadir el ID a las selecciones
      this.selectedRutaIds.push(rutaId);
    } else {
      // Si el checkbox no está marcado, eliminar el ID de las selecciones
      this.selectedRutaIds = this.selectedRutaIds.filter(id => id !== rutaId);
    }
  }
}
