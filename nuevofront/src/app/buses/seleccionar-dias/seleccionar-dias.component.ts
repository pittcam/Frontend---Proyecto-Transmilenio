import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {RutaDTO} from '../../dto/ruta-dto';
import {EstacionDTO} from '../../dto/estacion-dto';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaService} from '../../shared/ruta.service';
import {EstacionService} from '../../shared/estacion.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BusRutaDiaDTO} from '../../dto/bus-ruta-dia-dto';
import {BusDTO} from '../../dto/bus-dto';
import {RouterLink} from '@angular/router';
import {BusRutaDiaService} from '../../shared/bus-ruta-dia.service';

@Component({
  selector: 'app-seleccionar-dias',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,RouterLink
  ],
  templateUrl: './seleccionar-dias.component.html',
  styleUrl: './seleccionar-dias.component.css'
})
export class SeleccionarDiasComponent implements OnInit {
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horaInicio: '', horaFin: '', dias: [] };
  ruta$!: Observable<RutaDTO | null>;
  estaciones: EstacionDTO[] = [];  // Declaramos la variable aquí
  errorMessage: string = '';
  diasSemana: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  busRutaDia: BusRutaDiaDTO = new BusRutaDiaDTO(new BusDTO(null, '', ''), this.ruta, []); // Inicializa con un bus vacío y la ruta actual

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router,
    private busRutaDiaService: BusRutaDiaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener la ruta por ID
    this.ruta$ = this.rutaService.obtenerRuta(id).pipe(
      catchError(error => {
        this.errorMessage = 'Error al cargar los datos de la ruta';
        return of(null);
      })
    );

    // Cargar todas las estaciones y asignarlas a la variable local
    this.estacionService.obtenerEstaciones().subscribe({
      next: (data: EstacionDTO[]) => {
        this.estaciones = data;
      },
      error: (error) => {
        console.error('Error al cargar estaciones:', error);
      }
    });
  }

  // Metodo para volver al componente anterior
  volver(): void {
    this.router.navigate(['/buses/crear']);
  }

  // Capturar cambios en los días seleccionados
  onDiaChange(event: any): void {
    const dia = event.target.value;
    if (event.target.checked) {
      // Añadir el día a la lista si está seleccionado
      this.busRutaDia.dias.push(dia);
    } else {
      // Eliminar el día si se deselecciona
      const index = this.busRutaDia.dias.indexOf(dia);
      if (index > -1) {
        this.busRutaDia.dias.splice(index, 1);
      }
    }
  }

  // Guardar los días seleccionados
  guardarDias(): void {
    // Asignar la ruta seleccionada al DTO (esto ya debería estar en la ruta actual)
    this.busRutaDia.ruta = this.ruta;

    // Aquí llamarías a un servicio que maneje la lógica de guardar la relación entre bus, ruta y días
    this.busRutaDiaService.guardarDias(this.busRutaDia).subscribe({
      next: (response) => {
        console.log('Días guardados exitosamente:', response);
        this.router.navigate(['/buses/crear']); // Volver al listado de rutas después de guardar
      },
      error: (error) => {
        console.error('Error al guardar los días:', error);
        this.errorMessage = 'Error al guardar los días de la ruta';
      }
    });
  }
}
