import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {Router, RouterLink} from '@angular/router'; // Importar Router
import { ConductorService } from '../../shared/conductor.service';
import { ConductorDTO } from '../../dto/conductor-dto';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-conductor-list',
  standalone: true,
    imports: [NgFor, AsyncPipe, NgIf, FormsModule, RouterLink],
  templateUrl: './conductor-list.component.html',
  styleUrls: ['./conductor-list.component.css'],
})
export class ConductorListComponent implements OnInit {
  allConductors$!: Observable<ConductorDTO[]>;
  errorMessage: string = '';
  nombreBuscado: string = '';

  constructor(private conductorService: ConductorService, private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    this.cargarListaConductores();
  }

  verConductor(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/conductores/ver', id]); // Navegar con el ID del conductor
    }
  }

  eliminarConductor(id: number | null): void {
    if (id !== null) {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este conductor?');
      if (confirmDelete) {
        this.conductorService.eliminarConductor(id).subscribe({
          next: () => {
            console.log('Conductor eliminado con éxito');
            this.ngOnInit(); // Volver a cargar la lista después de eliminar
          },
          error: (error: any) => {
            console.log(error);
            this.errorMessage = "Error al eliminar el conductor.";
          },
        });
      }
    }
  }

  cargarListaConductores() {
    this.allConductors$ = this.conductorService.listarConductores().pipe(
      catchError(error => {
        console.error('Hubo un error al cargar la lista de conductores', error);
        this.errorMessage = 'Hubo un error al cargar la lista de conductores.';
        return of([]);
      })
    );
  }


  // Metodo para buscar conductor por nombre
  buscarConductor() {
    if (this.nombreBuscado.trim() !== '') {
      this.allConductors$ = this.conductorService.buscarConductorPorNombre(this.nombreBuscado).pipe(
        catchError(error => {
          console.error('Hubo un error en la búsqueda', error);
          this.errorMessage = 'No se encontraron conductores con ese nombre.';
          return of([]);
        })
      );
    } else {
      // Si no hay nombre, recargar la lista completa
      this.cargarListaConductores();
    }
  }



  editarConductor(id: number): void {
    this.router.navigate(['/conductores/editar', id]);
  }

  crearConductor(): void { // Método para crear conductor
    this.router.navigate(['/crear-conductor']); // Cambia la ruta si es necesario
  }
}
