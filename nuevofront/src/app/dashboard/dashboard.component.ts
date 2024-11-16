import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule], // Necesario para usar [routerLink]
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Asegúrate de que el nombre esté correcto
})
export class DashboardComponent {
  constructor(private router: Router, private authService:AuthService) {}


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
