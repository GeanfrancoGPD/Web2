import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  name = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ name: this.name, password: this.password })
      .subscribe({
        next: (res) => {
          console.log('Login correcto', res);
        },
        error: (err) => {
          console.error('Error en login', err);
        }
      });
  }

  goToForgotPassword() {
    // Establecer flag para permitir navegación
    sessionStorage.setItem('navigatedFromLogin', 'true');
    this.router.navigate(['/forgot-password']);
  }
}
