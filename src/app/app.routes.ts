import { Routes } from '@angular/router';
import { BoardsComponent } from './modules/boards/pages/boards/boards.component';
import { BoardComponent } from './modules/boards/pages/board/board.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TableComponent } from './pages/table/table.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { RecoveryComponent } from './modules/auth/pages/recovery/recovery.component';
import { ProfileComponent } from './modules/profile/pages/profile/profile.component';
import { UsersTableComponent } from './modules/users/pages/users-table/users-table.component';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';
import { LayoutComponent } from './modules/layout/components/layout/layout.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'app', pathMatch: 'full' },
    // { path: 'app', component: LayoutComponent },
    // { path: 'login', component: LoginComponent, canActivate: [ redirectGuard ] },
    // { path: 'forgot-password', component: ForgotPasswordComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'recovery', component: RecoveryComponent },
    // { path: 'profile', component: ProfileComponent, canActivate: [ authGuard ] },
    // { path: 'boards', component: BoardsComponent, canActivate: [ authGuard ] },
    // { path: 'users', component: UsersTableComponent, canActivate: [ authGuard ] },
    // { path: 'boards/:id', component: BoardComponent, canActivate: [ authGuard ] },
    
    // { path: 'scroll', component: ScrollComponent },
    // { path: 'table', component: TableComponent }

    {
        path: '',
        loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
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
        ]
      }

];
