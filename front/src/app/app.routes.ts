import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswodComponent } from './pages/forgot-password/forgot-passwod.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        title: 'login'
    },
    {
        path: "register",
        component: RegisterComponent,
        title: 'register'
    },
    {
        path: "forgot",
        component: ForgotPasswodComponent,
        title: "fotgot-password"

    }
   
];
