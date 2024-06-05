import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  modulos: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  
  ngOnInit(): void {
    this.loadModulos();

  }

  async loadModulos() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllModulos(token);
      if (response) {
        this.modulos = response;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteModulo(moduID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta modulo?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteModulo(moduID, token);
        // Refresh the user list after deletion
        this.loadModulos();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(moduID: string) {
    this.router.navigate(['/update-modu', moduID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
