import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';
import { EstacionDTO } from '../../dto/estacion-dto';
import { HorarioDTO } from '../../dto/horario-dto';
import { FormsModule } from '@angular/forms';
import { EstacionService } from '../../shared/estacion.service';
import { HorarioService } from '../../shared/horario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ruta-edit.component.html',
  styleUrls: ['./ruta-edit.component.css'],
})
export class RutaEditComponent implements OnInit {
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horarioFuncionamiento: null };
  estaciones: EstacionDTO[] = [];
  horarios: HorarioDTO[] = [];
  error: string = '';

  constructor(
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private horarioService: HorarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEstaciones();
    this.cargarHorarios();
    this.cargarRuta();
  }

  cargarEstaciones(): void {
    this.estacionService.obtenerEstaciones().subscribe({
      next: (data: EstacionDTO[]) => {
        this.estaciones = data;
      },
      error: (error) => {
        console.error('Error al cargar estaciones:', error);
      }
    });
  }

  cargarHorarios(): void {
    this.horarioService.obtenerHorarios().subscribe({
      next: (data: HorarioDTO[]) => {
        this.horarios = data;
      },
      error: (error) => {
        console.error('Error al cargar horarios:', error);
      }
    });
  }

  cargarRuta(): void {
    const id = this.route.snapshot.params['id']; // Obtener el ID de la ruta desde la URL
    this.rutaService.obtenerRuta(id).subscribe({
      next: (data: RutaDTO) => {
        this.ruta = data;
      },
      error: (error) => {
        console.error('Error al cargar la ruta:', error);
      }
    });
  }

  actualizarRuta(): void {
    if (this.ruta.id !== null) {
      this.rutaService.actualizarRuta(this.ruta.id, this.ruta).subscribe({
        next: (data) => {
          console.log('Ruta actualizada:', data);
          this.router.navigate(['/rutas']);
        },
        error: (error: any) => {
          console.error('Error al actualizar la ruta:', error);
          this.error = 'Hubo un error al actualizar la ruta';
        },
      });
    } else {
      this.error = 'ID de ruta no válido';
    }
  }

  verRutas(): void {
    this.router.navigate(['/rutas']);
  }

  onEstacionChange(event: any): void {
    const estacionId = +event.target.value; // Convertir el id a número

    if (event.target.checked) {
      this.ruta.estacionesIds.push(estacionId);
    } else {
      const index = this.ruta.estacionesIds.indexOf(estacionId);
      if (index > -1) {
        this.ruta.estacionesIds.splice(index, 1);
      }
    }
  }
}
