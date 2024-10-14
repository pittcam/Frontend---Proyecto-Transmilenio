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

@Component({
  selector: 'app-seleccionar-dias',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './seleccionar-dias.component.html',
  styleUrl: './seleccionar-dias.component.css'
})
export class SeleccionarDiasComponent implements OnInit{
  ruta: RutaDTO = { id: null, nombre: '', estacionesIds: [], horaInicio: '', horaFin: '', dias: [] };
  ruta$!: Observable<RutaDTO | null>;
  estaciones: EstacionDTO[] = [];  // Declaramos la variable aquí
  errorMessage: string = '';
  diasSemana: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  busRutaDia: BusRutaDiaDTO = new BusRutaDiaDTO();


  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router
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

  volver(): void {
    this.router.navigate(['/rutas']);
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

  guardarDias() {

  }
}
