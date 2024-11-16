import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'; // Importa ActivatedRoute para obtener parámetros de la ruta
import { FormsModule } from '@angular/forms';
import { ConductorDTO } from '../../dto/conductor-dto';
import { ConductorService } from '../../shared/conductor.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-conductor-edit',
  standalone: true,
    imports: [FormsModule, RouterLink],
  templateUrl: './conductor-edit.component.html',
  styleUrls: ['./conductor-edit.component.css'],
})
export class ConductorEditComponent implements OnInit { // Implementa OnInit
  conductorDTO: ConductorDTO; // Inicializa el conductorDTO
  error: any;
  mensaje: string = '';

  constructor(
    private conductorService: ConductorService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute // Para acceder a los parámetros de la ruta
  ) {
    this.conductorDTO = new ConductorDTO(null, '', '', '', '');
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; // Obtiene el ID del conductor de la URL
    this.cargarConductor(id);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cargarConductor(id: number) {
    this.conductorService.recuperarConductorPorId(id).subscribe({
      next: (data) => {
        this.conductorDTO = data; // Asigna el conductor recuperado al conductorDTO
        console.log('Conductor cargado:', this.conductorDTO);
      },
      error: (error) => {
        console.error('Error al cargar el conductor:', error);
        this.mensaje = 'Error al cargar el conductor. Intente de nuevo.';
      },
    });
  }



  actualizarConductor() {
    this.conductorService.actualizarConductor(this.conductorDTO).subscribe({
      next: (data) => {
        console.log(data);
        this.mensaje = 'Conductor actualizado correctamente.';
        this.router.navigate(['/conductores']); // Redirige a la lista de conductores
      },
      error: (error) => {
        console.log(error);
        this.mensaje = 'Hubo un error al actualizar el conductor.';
      },
    });
  }

  verConductores() {
    this.router.navigate(['/conductores']); // Redirige a la lista de conductores
  }
}
