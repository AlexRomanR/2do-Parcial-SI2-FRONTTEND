import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  roles: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService, 
    private readonly router: Router) {}

    ngOnInit(): void {
      this.loadRoles();
    }

    async loadRoles() {
      try {
        const token: any = localStorage.getItem('token');
        const response = await this.userService.getAllRoles(token);
        console.log(response); // Agrega este console.log para inspeccionar los datos
        if (response) {
          this.roles = response;
        } else {
          this.showError('No users found.');
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
    

  navigateToUpdate(roleId: String) {
    this.router.navigate(['update-rol', roleId]);
  }

  async deleteRol(rolID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar este Rol?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteRol(rolID, token);
        // Refresh the user list after deletion
        this.loadRoles();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }


  
}

export interface Permiso {
  id: number;
  nombre: string;
}

export interface Role {
  id: number;
  nombre: string;
  permisos: Permiso[];
}

