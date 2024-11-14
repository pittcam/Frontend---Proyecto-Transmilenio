import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  onSend() {
    this.router.navigate(['/dashboardGeneral']);
  }

  nombre?: String ;
  cedula?: String;
  correo?: String ;
  usuario?: String;
  contrasena?: String;

  constructor(private router: Router) { }

}
