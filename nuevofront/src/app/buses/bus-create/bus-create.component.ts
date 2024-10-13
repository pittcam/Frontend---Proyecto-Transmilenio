import { Component } from '@angular/core';
import { BusDTO } from '../../dto/bus-dto'; // Asegúrate de que la ruta sea correcta
import { BusService } from '../../shared/bus.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-bus-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.css'],
})
export class BusCreateComponent {
  busDTO: BusDTO = new BusDTO(null, '', ''); // Inicializa el modelo del bus
  error: any;

  constructor(
    private busService: BusService,  // Inyecta el servicio de bus
    private router: Router  // Inyecta el router
  ) {}

  crearBus() {
    this.busService.crearBus(this.busDTO).subscribe({
      next: (data) => {
        console.log(data);
        // Redirigir a la lista de buses después de la creación
        this.router.navigate(['/buses']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  verBuses() {
    this.router.navigate(['/buses']); // Navegar a la lista de buses
  }
}
