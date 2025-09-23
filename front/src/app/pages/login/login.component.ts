import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  gmail = '';
  password = '';
  error = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ gmail: this.gmail, password: this.password })
      .subscribe({
        next: (res) => {
          console.log('Login correcto', res);
          // aquí guardas el token en localStorage, etc.
        },
        error: (err) => {
          console.error('Error en login', err);
        }
      });
  }
}
