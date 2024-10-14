import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';
import { EstacionDTO } from '../../dto/estacion-dto';
import { HorarioDTO } from '../../dto/horario-dto';
import { FormsModule } from '@angular/forms';
import { EstacionService } from '../../shared/estacion.service';
import { CommonModule } from '@angular/common'; // Agrega esta importación

@Component({
  selector: 'app-ruta-create',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './ruta-create.component.html',
  styleUrls: ['./ruta-create.component.css'],
})
export class RutaCreateComponent implements OnInit {
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horaInicio: 5, horaFinal: 22, dias: [] };
  estaciones: EstacionDTO[] = [];
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: Date[] = [];
  error: string = '';

  constructor(
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEstaciones();
    this.generarHoras(); // Llamar a la función para generar horas de 5:00 a 21:00
  }

  generarHoras(): void {
    const horaInicio = 5;
    const horaFin = 22;

    // Vaciar la lista de horas por si se llama más de una vez
    this.horas = [];

    for (let hora = horaInicio; hora <= horaFin; hora++) {
      const nuevaHora = new Date();
      nuevaHora.setHours(hora, 0, 0, 0); // Establece la hora, minutos, segundos y milisegundos a 0
      this.horas.push(nuevaHora); // Añadir el objeto Date a la lista
    }
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
}
