import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.css'
})
export class AulasComponent {
  aulas: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  
  ngOnInit(): void {
    this.loadAulas();

  }

  async loadAulas() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllAulas(token);
      if (response) {
        this.aulas = response;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteAula(aulaID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta aula');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteAula(aulaID, token);
        // Refresh the user list after deletion
        this.loadAulas();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(aulaID: string) {
    this.router.navigate(['/update-aula', aulaID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
