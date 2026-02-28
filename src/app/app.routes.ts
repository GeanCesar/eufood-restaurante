import { Routes } from '@angular/router';
import { Login } from './controller/login/login';
import { Restaurantes } from './controller/restaurantes/restaurantes';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
    {path: "controller/login", component : Login},
    {path: "controller/restaurantes", component : Restaurantes, canActivate: [AuthGuard]},
    {path: "", redirectTo: "controller/login", pathMatch: "full"}
];
