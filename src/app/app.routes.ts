import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './gestion usuarios/usuarios/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateuserComponent } from './gestion usuarios/usuarios/updateuser/updateuser.component';
import { UserslistComponent } from './gestion usuarios/usuarios/userslist/userslist.component';
import { usersGuard, adminGuard } from './users.guard';
import { HomeComponent } from './home/home.component';
import { UpdatefacuComponent } from './gestion academica/facultadess/updatefacu/updatefacu.component';
import { FacultadesComponent } from './gestion academica/facultadess/facultades/facultades.component';
import { RegisterFacuComponent } from './gestion academica/facultadess/register-facu/register-facu.component';
import { ModulosComponent } from './gestion academica/moduloss/modulos/modulos.component';
import { RegisterModuComponent } from './gestion academica/moduloss/register-modu/register-modu.component';
import { UpdatemoduComponent } from './gestion academica/moduloss/updatemodu/updatemodu.component';
import { AulasComponent } from './gestion academica/aulass/aulas/aulas.component';
import { UpdateaulaComponent } from './gestion academica/aulass/updateaula/updateaula.component';
import { RegisterAulaComponent } from './gestion academica/aulass/register-aula/register-aula.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent, canActivate: [adminGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
    {path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard]},
    {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},

    //facultad
    {path: 'facultades', component: FacultadesComponent, canActivate:[adminGuard]},
    {path: 'update-facu/:id', component: UpdatefacuComponent, canActivate: [adminGuard]},
    {path: 'register-facu', component: RegisterFacuComponent, canActivate: [adminGuard]},


    //Modulos
    {path: 'modulos', component: ModulosComponent, canActivate:[adminGuard]},
    {path: 'update-modu/:id', component: UpdatemoduComponent, canActivate: [adminGuard]},
    {path: 'register-modu', component: RegisterModuComponent, canActivate: [adminGuard]},



    //AULAS
    {path: 'aulas', component: AulasComponent, canActivate:[adminGuard]},
    {path: 'update-aula/:id', component: UpdateaulaComponent, canActivate: [adminGuard]},
    {path: 'register-aula', component: RegisterAulaComponent, canActivate: [adminGuard]},




    //homes
    {path: 'home', component: HomeComponent },
    {path: '**', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];





