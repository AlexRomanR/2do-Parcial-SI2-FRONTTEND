import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facultades',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './facultades.component.html',
  styleUrl: './facultades.component.css'
})
export class FacultadesComponent {
  facultades: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  
  ngOnInit(): void {
    this.loadFacultades();

  }

  async loadFacultades() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllFacultades(token);
      if (response) {
        this.facultades = response;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteFacultad(facuID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta facultad?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteFacultad(facuID, token);
        // Refresh the user list after deletion
        this.loadFacultades();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(facuID: string) {
    this.router.navigate(['/update-facu', facuID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
