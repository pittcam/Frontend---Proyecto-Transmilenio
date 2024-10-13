import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule], // Necesario para usar [routerLink]
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Asegúrate de que el nombre esté correcto
})
export class DashboardComponent {
  constructor(private router: Router) {}

  abrirCrearConductor() {
    this.router.navigate(['/conductores']); // Navega a la pantalla de crear conductor
  }

  abrirGestionarBuses() {
    this.router.navigate(['/buses']); // Navega a la pantalla de gestionar buses
  }

  abrirGestionarRutas() {
    this.router.navigate(['/rutas']); // Navega a la pantalla de gestionar rutas
  }
}
