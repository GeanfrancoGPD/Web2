import { CommonModule, formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  gmail = '';
  password = ''; 
  ConfirmPassword = '';
  error = '';

  constructor(private authService: AuthService) {}

  register(){
    this.authService.register({username: this.name, email: this.gmail, password: this.password, confirmPassword: this.ConfirmPassword})
    .then((res) => {
      console.log('Registro', res);
    });
  }
}