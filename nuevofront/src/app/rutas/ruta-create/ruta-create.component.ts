import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';
import { EstacionDTO } from '../../dto/estacion-dto';
import { HorarioDTO } from '../../dto/horario-dto';
import { FormsModule } from '@angular/forms';
import { EstacionService } from '../../shared/estacion.service';
import { HorarioService } from '../../shared/horario.service';
import { CommonModule } from '@angular/common'; // Agrega esta importación

@Component({
  selector: 'app-ruta-create',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './ruta-create.component.html',
  styleUrls: ['./ruta-create.component.css'],
})
export class RutaCreateComponent implements OnInit {
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horarioFuncionamiento: null };
  estaciones: EstacionDTO[] = [];
  horarios: HorarioDTO[] = [];
  error: string = '';

  constructor(
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private horarioService: HorarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEstaciones();
    this.cargarHorarios();
  }

  cargarEstaciones(): void {
     this.estacionService.obtenerEstaciones().subscribe({
       next: (data: EstacionDTO[]) => {
         this.estaciones = data;
         console.log('Estaciones cargadas:', this.estaciones);
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

  crearRuta(): void {
    this.rutaService.crearRuta(this.ruta).subscribe({
      next: (data) => {
        console.log('Ruta creada:', data);
        // Redirigir a la lista de rutas después de la creación
        this.router.navigate(['/rutas']);
      },
      error: (error) => {
        console.log('Error al crear la ruta:', error);
        this.error = 'Hubo un error al crear la ruta';
      },
    });
  }

  verRutas(): void {
    this.router.navigate(['/rutas']);
  }

  onEstacionChange(event: any): void {
    const estacionId = +event.target.value; // Convertir el id a número

    if (event.target.checked) {
      // Si el checkbox está marcado, añade el ID a las estaciones seleccionadas
      this.ruta.estacionesIds.push(estacionId);
    } else {
      // Si el checkbox no está marcado, elimina el ID de las estaciones seleccionadas
      const index = this.ruta.estacionesIds.indexOf(estacionId);
      if (index > -1) {
        this.ruta.estacionesIds.splice(index, 1);
      }
    }
  }

}
