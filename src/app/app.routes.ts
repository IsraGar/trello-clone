import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [ redirectGuard ],
    title: 'Iniciar sesión'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./modules/auth/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    title: 'Olvidaste tu contraseña?'
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/auth/pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Registrarse'
  },
  {
    path: 'recovery',
    loadComponent: () => import('./modules/auth/pages/recovery/recovery.component').then(m => m.RecoveryComponent),
    title: 'Recuperar contraseña'
  },
  {
    path: 'app',
    loadComponent: () => import('./modules/layout/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [ authGuard ],
    children: [
      {
        path: 'boards',
        loadComponent: () => import('./modules/boards/pages/boards/boards.component').then(m => m.BoardsComponent),
        title: 'Tableros'
      },
      {
        path: 'board',
        loadComponent: () => import('./modules/boards/pages/board/board.component').then(m => m.BoardComponent),
        title: 'Tablero Ruta Angular'
      }
      ,
      {
        path: 'users',
        loadComponent: () => import('./modules/users/pages/users-table/users-table.component').then(m => m.UsersTableComponent),
        title: 'Tabla de usuarios'
      }
    ]
  }
];
