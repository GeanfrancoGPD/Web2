import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passwod',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-passwod.component.html',
  styleUrls: ['./forgot-passwod.component.css']
})
export class ForgotPasswodComponent implements OnInit {
  step = 1;
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      // verificationCode: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {
    const isDirectAccess = sessionStorage.getItem('navigatedFromLogin') !== 'true';
    
    if (isDirectAccess) {
      this.router.navigate(['/']);
    } else {
      sessionStorage.removeItem('navigatedFromLogin');
    }
  }

  // Validar que el correo sea de Gmail
  gmailValidator(control: any) {
    const value = control.value;
    if (value && !value.endsWith('@gmail.com')) {
      return { notGmail: true };
    }
    return null;
  }

  // Validar que las contraseñas coincidan
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  nextStep() {
    if (this.step < 4) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  finish() {
    this.router.navigate(['/']);
    // if (this.forgotForm.valid) {
    //   console.log('Formulario válido:', this.forgotForm.value);
    //   // Navegar de vuelta al login después de finalizar
    // } else {
    //   console.log('Formulario inválido');
    // }
  }
}
