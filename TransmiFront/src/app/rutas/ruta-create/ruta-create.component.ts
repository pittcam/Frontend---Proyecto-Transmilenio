import { Component, OnInit } from '@angular/core';
import { RutaDTO } from '../../dto/ruta-dto';
import { EstacionService } from '../../shared/estacion.service';
import { RutaService } from '../../shared/ruta.service';
import { EstacionDTO } from '../../dto/estacion-dto';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common"; // Para redirigir tras crear la ruta


@Component({
  selector: 'app-ruta-create',
  standalone: true,
  templateUrl: './ruta-create.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./ruta-create.component.css']
})
export class RutaCreateComponent implements OnInit {
  ruta: RutaDTO = new RutaDTO(null, '', [], 5, 23, []);  // Inicializamos la ruta con valores por defecto

  // Opciones de horas de 5:00 a 23:00
  horas: number[] = [];

  // Días de la semana
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Lista de estaciones cargadas desde el servicio
  estaciones: EstacionDTO[] = [];

  // Variable de error por si la carga de estaciones o la creación falla
  errorMessage: string = '';

  constructor(
    private estacionService: EstacionService,
    private rutaService: RutaService,  // Inyectamos el RutaService para crear la ruta
    private router: Router              // Inyectamos el Router para redirigir
  ) {}

  ngOnInit(): void {
    // Generamos las horas de 5:00 a 23:00
    this.horas = Array.from({ length: 19 }, (_, i) => i + 5);
    // Inicializamos el arreglo de días vacíos
    this.ruta.dias = [];

    // Cargamos las estaciones desde el servicio
    this.cargarEstaciones();
  }

  // Método para cargar estaciones
  cargarEstaciones(): void {
    this.estacionService.obtenerEstaciones().subscribe({
      next: (estaciones) => {
        this.estaciones = estaciones;
      },
      error: (error) => {
        console.error('Error al cargar estaciones', error);
        this.errorMessage = 'Hubo un error al cargar las estaciones.';
      }
    });
  }

  // Manejar cambios en los checkboxes de estaciones
  onEstacionChange(event: any): void {
    const estacionId = +event.target.value;
    if (event.target.checked) {
      this.ruta.estacionesIds.push(estacionId);  // Agregar la estación seleccionada
    } else {
      this.ruta.estacionesIds = this.ruta.estacionesIds.filter(id => id !== estacionId);  // Quitar la estación desmarcada
    }
  }

  // Manejar cambios en los checkboxes de días
  onDiaChange(event: any): void {
    const diaIndex = +event.target.value;
    if (event.target.checked) {
      this.ruta.dias.push(diaIndex);  // Agregar el día seleccionado
    } else {
      this.ruta.dias = this.ruta.dias.filter(dia => dia !== diaIndex);  // Quitar el día desmarcado
    }
  }

  // Metodo para crear la ruta
  crearRuta(): void {
    this.rutaService.crearRuta(this.ruta).subscribe({
      next: (rutaCreada) => {
        console.log('Ruta creada con éxito:', rutaCreada);
        this.router.navigate(['/rutas']);  // Redirigir a la lista de rutas después de crearla
      },
      error: (error) => {
        console.error('Error al crear la ruta:', error);
        this.errorMessage = 'Hubo un error al crear la ruta. Inténtalo de nuevo.';
      }
    });
  }
}
