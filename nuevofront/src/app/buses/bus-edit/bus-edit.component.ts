import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'; // Importa ActivatedRoute para obtener parámetros de la ruta
import { FormsModule } from '@angular/forms';
import { BusDTO } from '../../dto/bus-dto'; // Asegúrate de que esta ruta sea correcta
import { BusService } from '../../shared/bus.service';
import {Observable} from 'rxjs';
import {RutaDTO} from '../../dto/ruta-dto';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-bus-edit',
  standalone: true,
    imports: [FormsModule, AsyncPipe, NgIf, NgForOf, RouterLink],
  templateUrl: './bus-edit.component.html',
  styleUrls: ['./bus-edit.component.css'],
})
export class BusEditComponent implements OnInit {
  busDTO: BusDTO; // Inicializa el busDTO
  error: any;
  allRutas$!: Observable<RutaDTO[]>; // Observable para las rutas

  constructor(
    private busService: BusService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.busDTO = new BusDTO(null, '', ''); // Inicializa el busDTO
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; // Obtiene el ID del bus de la URL
    this.busService.recuperarBusPorId(id).subscribe({
      next: (data) => {
        this.busDTO = data; // Asigna el bus recuperado al busDTO
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  actualizarBus() {
    this.busService.actualizarBus(this.busDTO).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/buses']); // Redirige a la lista de buses
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  verBuses() {
    this.router.navigate(['/buses']); // Redirige a la lista de buses
  }

  verRuta(id: number | null) {

  }

  seleccionarDias(id: number) {

  }
}
