import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  materias: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  
  ngOnInit(): void {
    this.loadMaterias();

  }

  async loadMaterias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllMaterias(token);
      if (response) {
        this.materias = response;
      } else {
        this.showError('No materias found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteMateria(materiaID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta materia');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteMateria(materiaID, token);
        // Refresh the user list after deletion
        this.loadMaterias();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(materiaID: string) {
    this.router.navigate(['/update-materia', materiaID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
