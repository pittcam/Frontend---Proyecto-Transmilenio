import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RutaDTO } from '../../dto/ruta-dto';
import { RutaService } from '../../shared/ruta.service';
import { Router } from '@angular/router';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-ruta-list',
  templateUrl: './ruta-list.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./ruta-list.component.css']
})
export class RutaListComponent implements OnInit {

  allRutas$!: Observable<RutaDTO[]>;  // Observable para las rutas
  errorMessage: string = '';
  loading: boolean = true; // Mensaje de error

  constructor(private rutaService: RutaService, private router: Router) { }

  ngOnInit(): void {
    this.loadRutas(); // Cargamos las rutas al inicializar el componente
  }

  // Método para cargar todas las rutas
  loadRutas(): void {
    this.loading = true; // Establecemos el estado de carga en verdadero
    this.allRutas$ = this.rutaService.obtenerRutas()
      .pipe(
        catchError(error => {
          console.error("Hubo un error al cargar las rutas", error);
          this.errorMessage = "Hubo un error al cargar las rutas.";
          this.loading = false; // Terminamos el estado de carga en caso de error
          return of([]); // Devuelve un array vacío en caso de error
        })
      );
    this.allRutas$.subscribe(() => {
      this.loading = false; // Cuando se completa la carga, desactivar el estado de carga
    });
  }

  // Navegar a la vista de una ruta específica por su ID
  verRuta(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/rutas/ver', id]);
    }
  }

  // Navegar a la vista de edición de una ruta específica
  editarRuta(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/rutas/editar', id]);
    } else {
      console.error('ID de ruta no válido');
    }
  }

  // Eliminar una ruta por su ID
  eliminarRuta(id: number | null): void {
    if (id !== null) {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta ruta?');
      if (confirmDelete) {
        this.rutaService.eliminarRuta(id).subscribe({
          next: () => {
            console.log('Ruta eliminada con éxito');
            this.loadRutas(); // Recargar la lista después de eliminar
          },
          error: (error: any) => {
            console.error('Error al eliminar la ruta:', error);
            this.errorMessage = "Error al eliminar la ruta.";
          }
        });
      }
    }
  }

  // Navegar a la pantalla de creación de una nueva ruta
  crearRuta(): void {
    this.router.navigate(['/rutas/crear']);
  }

}
