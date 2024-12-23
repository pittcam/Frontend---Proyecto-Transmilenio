import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import { RutaService } from '../../shared/ruta.service'; // Asegúrate de que la ruta sea correcta
import { RutaDTO } from '../../dto/ruta-dto'; // Asegúrate de que la ruta sea correcta
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-ruta-list',
  standalone: true,
    imports: [NgFor, AsyncPipe, NgIf, FormsModule, RouterLink],
  templateUrl: './ruta-list.component.html',
  styleUrls: ['./ruta-list.component.css']
})
export class RutaListComponent implements OnInit {
  allRutas$!: Observable<RutaDTO[]>; // Observable para las rutas
  errorMessage: string = ''; // Mensaje de error
  nombreBuscado: string = '';

  constructor(private rutaService: RutaService, private router: Router, private authService:AuthService) {} // Inyectar Router

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

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Metodo para buscar conductor por nombre
  buscarRuta() {
    if (this.nombreBuscado.trim() !== '') {
      this.allRutas$ = this.rutaService.buscarRutaPorNombre(this.nombreBuscado).pipe(
        catchError(error => {
          console.error('Hubo un error en la búsqueda', error);
          this.errorMessage = 'No se encontraron rutas con ese nombre.';
          return of([]); // Devuelve un arreglo vacío si hay un error
        })
      );
    } else {
      // Si el campo de búsqueda está vacío, carga todas las rutas
      this.allRutas$ = this.rutaService.obtenerRutas().pipe(
        catchError(error => {
          console.error('Hubo un error al cargar las rutas', error);
          this.errorMessage = 'Hubo un error al cargar las rutas.';
          return of([]);
        })
      );
    }
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
