import { Component, OnInit } from '@angular/core';
import { BusDTO } from '../../dto/bus-dto'; // Asegúrate de que la ruta sea correcta
import { BusService } from '../../shared/bus.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RutaDTO } from '../../dto/ruta-dto'; // Importa el servicio Router
import { RutaService } from '../../shared/ruta.service';

@Component({
  selector: 'app-bus-create',
  standalone: true,
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.css'],
  imports: [FormsModule, AsyncPipe, NgForOf, NgIf], // Asegúrate de incluir estos módulos aquí
})
export class BusCreateComponent  {
  busDTO: BusDTO = new BusDTO(null, '', ''); // Inicializa el modelo del bus
  error: any;

  constructor(
    private busService: BusService,  // Inyecta el servicio de bus
    private router: Router,
    private rutaService: RutaService // Inyecta el servicio de ruta
  ) {}


  crearBus(): void {
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

  verBuses(): void {
    this.router.navigate(['/buses']); // Navegar a la lista de buses
  }


}
