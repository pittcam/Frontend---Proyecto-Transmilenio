import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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
  onSubmit() {
    if (this.usuario === 'admin' && this.password === 'admin') {
      this.router.navigate(['/dashboard']);
    } else if (this.usuario === 'coordinador' && this.password === 'coordinador') {
      this.router.navigate(['/dashboard']);
    } else if (this.usuario === 'usuario' && this.password === 'usuario') {
      this.router.navigate(['/usuario']);
    } else {
      console.log('Login incorrecto');
    }
  }

  usuario?: string;
  password?: string;

  constructor(private router: Router) {}
}
