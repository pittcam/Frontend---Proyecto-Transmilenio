import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';
import { EstacionDTO } from '../../dto/estacion-dto';
import { FormsModule } from '@angular/forms';
import { EstacionService } from '../../shared/estacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ruta-edit.component.html',
  styleUrls: ['./ruta-edit.component.css'],
})
export class RutaEditComponent implements OnInit {
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horaInicio: 0, horaFinal: 0, dias: [] };
  estaciones: EstacionDTO[] = [];
  horas: number[] = [];
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  error: string = '';

  constructor(
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEstaciones();
    this.cargarRuta();
    this.generarHoras(); // Generar horas de 5:00 a 21:00
  }

  generarHoras(): void {
    const horaInicio = 5;
    const horaFin = 21;
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      this.horas.push(hora);
    }
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

  onDiaChange(event: any): void {
    const dia = event.target.value;
    if (event.target.checked) {
      // Añadir el día a la lista si está seleccionado
      this.ruta.dias.push(dia);
    } else {
      // Eliminar el día si se deselecciona
      const index = this.ruta.dias.indexOf(dia);
      if (index > -1) {
        this.ruta.dias.splice(index, 1);
      }
    }
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
}
