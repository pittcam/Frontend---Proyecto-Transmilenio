import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {Role} from '../../dto/role';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario?: string;
  password?: string;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.usuario || !this.password) {
      console.log('Por favor ingresa las credenciales');
      return;
    }

    console.log('Antes de auth service...');
    this.authService.login(this.usuario, this.password).subscribe({
      next: (data) => {
        console.log('Después de auth service...');
        console.log(data);
        if (data === 'ADMIN' || data === 'COORDINADOR') {
          this.router.navigate(['/dashboard']);
          console.log('Login admin');
        } else if (data === 'USER') {
          this.router.navigate(['/usuario']);
          console.log('Login usuario');
        }
      },
      error: () => {
        console.log('Login incorrecto');
      }
    });
  }
}
