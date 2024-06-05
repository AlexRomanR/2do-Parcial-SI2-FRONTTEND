import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserslistComponent } from './userslist/userslist.component';
import { UsersListByRoleComponent } from './users-list-by-role/users-list-by-role.component'; // Importar el nuevo componente
import { usersGuard, adminGuard } from './users.guard';
import { MateriaComponent } from './materia/materia.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent, canActivate: [adminGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
    {path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard]},
    {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},
    {path: 'users-by-role', component: UsersListByRoleComponent, canActivate:[adminGuard]}, 
    {path: 'materia', component: MateriaComponent, canActivate:[adminGuard]},
    {path: '**', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];
