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

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recovery', component: RecoveryComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'boards', component: BoardsComponent },
    { path: 'users', component: UsersTableComponent },
    { path: 'boards/:id', component: BoardComponent },

    
    { path: 'scroll', component: ScrollComponent },
    { path: 'table', component: TableComponent }
];
