import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {catchError, Observable, of} from 'rxjs';
import {RutaDTO} from '../../dto/ruta-dto';
import {RutaService} from '../../shared/ruta.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-consulta-list',
  standalone: true,
    imports: [
      AsyncPipe,
      FormsModule,
      NgForOf,
      NgIf
    ],
  templateUrl: './consulta-list.component.html',
  styleUrl: './consulta-list.component.css'
})
export class ConsultaListComponent implements OnInit {
  allRutas$!: Observable<RutaDTO[]>; // Observable para las rutas
  errorMessage: string = ''; // Mensaje de error
  loading: boolean = true; // Estado de carga
  nombreBuscado: string = '';

  constructor(private rutaService: RutaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarListaRutas();
  }

  verRuta(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/consulta', id]); // Redirigir a la vista de la ruta con el id
    }
  }

  cargarListaRutas() {
    this.allRutas$ = this.rutaService.obtenerRutas().pipe(
      catchError(error => {
        console.error('Hubo un error al cargar la lista de rutas', error);
        this.errorMessage = 'Hubo un error al cargar la lista de rutas.';
        this.loading = false; // Cambiar a false si ocurre un error
        return of([]);
      })
    );

    // Al cambiar a false una vez que los datos se cargaron correctamente
    this.allRutas$.subscribe(() => {
      this.loading = false;
    });
  }
}
