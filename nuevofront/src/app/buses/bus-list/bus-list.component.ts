import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BusService } from '../../shared/bus.service'; // Asegúrate de que la ruta sea correcta
import { BusDTO } from '../../dto/bus-dto'; // Asegúrate de que la ruta sea correcta
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf],
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
})
export class BusListComponent implements OnInit {
  allBuses$!: Observable<BusDTO[]>;
  errorMessage: string = '';

  constructor(private busService: BusService, private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    this.allBuses$ = this.busService.listarBuses()
      .pipe(
        catchError(error => {
          console.log("Hubo un error");
          this.errorMessage = "Hubo un error";
          return of([]);
        })
      );
  }

  verBus(id: number | null): void {
      if (id !== null) {
        this.router.navigate(['/buses/ver', id]); // Redirigir a la vista del bus con el id
      }
    }

  eliminarBus(id: number | null): void {
    if (id !== null) {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este bus?');
      if (confirmDelete) {
        this.busService.eliminarBus(id).subscribe({
          next: () => {
            console.log('Bus eliminado con éxito');
            this.ngOnInit(); // Volver a cargar la lista después de eliminar
          },
          error: (error: any) => {
            console.log(error);
            this.errorMessage = "Error al eliminar el bus.";
          },
        });
      }
    }
  }

  editarBus(id: number): void {
    this.router.navigate(['/buses/editar', id]);
  }

  crearBus(): void {
    this.router.navigate(['/buses/crear']); // Asegúrate de que la ruta sea la correcta
  }
}
