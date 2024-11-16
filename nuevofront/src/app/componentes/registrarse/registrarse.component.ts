import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  imports: [
    RouterLink,
    FormsModule
  ],
  standalone: true
})
export class RegistrarseComponent {
  nombre: string = '';
  cedula: string = '';
  correo: string = '';
  username: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSend() {
    console.log('Datos enviados al servidor:', {
      nombre: this.nombre,
      cedula: this.cedula,
      correo: this.correo,
      username: this.username,
      contrasena: this.contrasena,
      rol: 'USER',
    });

    this.authService.register({
      nombre: this.nombre,
      cedula: this.cedula,
      correo: this.correo,
      username: this.username,
      contrasena: this.contrasena,
      rol: 'USER',
    }).subscribe({
      next: () => {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario: ' + (err.error || 'Error al registrarse. Inténtalo de nuevo.'));
      },
    });
  }

}
