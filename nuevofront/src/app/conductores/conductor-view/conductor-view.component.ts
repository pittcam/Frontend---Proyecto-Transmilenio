import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ConductorService } from '../../shared/conductor.service';
import { AsignacionService } from '../../shared/asignacion.service';
import { ConductorDTO } from '../../dto/conductor-dto';
import { BusDTO } from '../../dto/bus-dto';
import { Observable, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../shared/auth.service'; // Importar CommonModule

@Component({
  selector: 'app-conductor-view',
  standalone: true,
  imports: [CommonModule, RouterLink], // Asegúrate de incluirlo aquí
  templateUrl: './conductor-view.component.html',
  styleUrls: ['./conductor-view.component.css'],
})
export class ConductorViewComponent implements OnInit {
  conductor$!: Observable<ConductorDTO | null>;
  busesAsignados$!: Observable<BusDTO[]>;  // Lista de buses asignados
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private conductorService: ConductorService,
    private router: Router,
    private authService: AuthService,
    private asignacionService: AsignacionService // Servicio de asignaciones
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.conductor$ = this.conductorService.recuperarConductorPorId(id)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error al cargar los datos del conductor';
          return of(null);
        })
      );

    // Obtener los buses asignados a este conductor
    this.busesAsignados$ = this.asignacionService.obtenerBusesPorConductor(id)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error al cargar los buses asignados';
          return of([]);
        })
      );
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  asignarBus(conductorId: number | null): void {
    if (conductorId !== null) {
      this.router.navigate(['/asignaciones/asignar-bus', conductorId]); // Navegar hacia la asignación de bus con el ID del conductor
    } else {
      console.error('El ID del conductor es nulo');
    }
  }

}
