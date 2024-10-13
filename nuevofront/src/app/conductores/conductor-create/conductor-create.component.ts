import { Component } from '@angular/core';
import { ConductorDTO } from '../../dto/conductor-dto'; // Asegúrate de que la ruta sea correcta
import { ConductorService } from '../../shared/conductor.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-conductor-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './conductor-create.component.html',
  styleUrls: ['./conductor-create.component.css'],
})
export class ConductorCreateComponent {
  conductorDTO: ConductorDTO = new ConductorDTO(null, '', '', '', '');
  error: any;

  constructor(
    private conductorService: ConductorService,
    private router: Router // Inyecta el servicio Router
  ) {}

  crearConductor() {
    this.conductorService.crearConductor(this.conductorDTO).subscribe({
      next: (data) => {
        console.log(data);
        // Redirigir a la lista de conductores cuando se cree el conductor
        this.router.navigate(['/conductores']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  verConductores() {
      this.router.navigate(['/conductores']); // Navega a la lista de conductores
    }
}
