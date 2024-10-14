import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RutaService } from '../../shared/ruta.service'; // Asegúrate de que la ruta sea correcta
import { RutaDTO } from '../../dto/ruta-dto'; // Asegúrate de que la ruta sea correcta
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ruta-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf],
  templateUrl: './ruta-list.component.html',
  styleUrls: ['./ruta-list.component.css']
})
export class RutaListComponent implements OnInit {
  allRutas$!: Observable<RutaDTO[]>; // Observable para las rutas
  errorMessage: string = ''; // Mensaje de error
  nombreBuscado: string = '';

  constructor(private rutaService: RutaService, private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    this.allRutas$ = this.rutaService.obtenerRutas()
      .pipe(
        catchError(error => {
          console.log("Hubo un error al cargar las rutas");
          this.errorMessage = "Hubo un error al cargar las rutas"; // Mensaje de error
          return of([]); // Devuelve un arreglo vacío en caso de error
        })
      );
  }

  buscarRuta(nombreBuscado: string): void {

}

  verRuta(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/rutas/ver', id]); // Redirigir a la vista de la ruta con el id
    }
  }

  editarRuta(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/rutas/editar', id]);
    } else {
      console.error('ID de ruta no válido');
      // Manejar el caso cuando el ID es null, si es necesario
    }
  }


  eliminarRuta(id: number | null): void {
    if (id !== null) {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta ruta?');
      if (confirmDelete) {
        this.rutaService.eliminarRuta(id).subscribe({
          next: () => {
            console.log('Ruta eliminada con éxito');
            this.ngOnInit(); // Volver a cargar la lista después de eliminar
          },
          error: (error: any) => {
            console.log(error);
            this.errorMessage = "Error al eliminar la ruta."; // Mensaje de error
          },
        });
      }
    }
  }

  // Método para navegar a la pantalla de creación de ruta
  crearRuta(): void {
    this.router.navigate(['/rutas/crear']);
  }

}
