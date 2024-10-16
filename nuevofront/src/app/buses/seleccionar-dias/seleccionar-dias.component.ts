import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { RutaDTO } from '../../dto/ruta-dto';
import { EstacionDTO } from '../../dto/estacion-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaService } from '../../shared/ruta.service';
import { EstacionService } from '../../shared/estacion.service';
import { BusRutaDiaDTO } from '../../dto/bus-ruta-dia-dto';
import { BusDTO } from '../../dto/bus-dto';
import { BusRutaDiaService } from '../../shared/bus-ruta-dia.service';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-seleccionar-dias',
  standalone: true,
  templateUrl: './seleccionar-dias.component.html',
  styleUrls: ['./seleccionar-dias.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    AsyncPipe
  ]
})
export class SeleccionarDiasComponent implements OnInit {
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horaInicio: '', horaFin: '', dias: [] };
  ruta$!: Observable<RutaDTO | null>;
  estaciones: EstacionDTO[] = [];
  errorMessage: string = '';
  diasSemana: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  busRutaDia: BusRutaDiaDTO = new BusRutaDiaDTO(new BusDTO(null, '', ''), this.ruta, []);
  busId!: number; // Variable para almacenar el ID del bus

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router,
    private busRutaDiaService: BusRutaDiaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.busId = id; // Guardar el ID del bus

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

  // Método para volver a la vista del bus
  volver(): void {
    this.router.navigate([`/buses/ver/${this.busId}`]); // Redirigir al componente de detalles del bus con su ID
  }

  // Capturar cambios en los días seleccionados
  onDiaChange(event: any): void {
    const dia = event.target.value;
    if (event.target.checked) {
      this.busRutaDia.dias.push(dia); // Añadir el día a la lista si está seleccionado
    } else {
      const index = this.busRutaDia.dias.indexOf(dia);
      if (index > -1) {
        this.busRutaDia.dias.splice(index, 1); // Eliminar el día si se deselecciona
      }
    }
  }

  // Guardar los días seleccionados y redirigir al componente de detalles del bus
  guardarDias(): void {
    this.busRutaDia.ruta = this.ruta; // Asignar la ruta seleccionada al DTO

    // Llamar al servicio para guardar la relación entre bus, ruta y días
    this.busRutaDiaService.guardarDias(this.busRutaDia).subscribe({
      next: (response) => {
        console.log('Días guardados exitosamente:', response);
        this.router.navigate([`/buses/ver/${this.busId}`]); // Redirigir a la vista del bus después de guardar
      },
      error: (error) => {
        console.error('Error al guardar los días:', error);
        this.errorMessage = 'Error al guardar los días de la ruta';
      }
    });
  }
}
