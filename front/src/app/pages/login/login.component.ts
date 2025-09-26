import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  name = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.authService.login({ username: this.name, password: this.password })
      .then((res) => {
        console.log('Login correcto', res);
      })
      .catch((err) => {
        console.error('Error en login', err);
      });
  }

  goToForgotPassword() {
    // Establecer flag para permitir navegación
    sessionStorage.setItem('navigatedFromLogin', 'true');
    this.router.navigate(['/forgot-password']);
  }
}
