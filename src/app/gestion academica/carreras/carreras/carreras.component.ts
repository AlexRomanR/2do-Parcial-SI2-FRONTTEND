import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  carreras: any[] = [];
  errorMessage: string = ''
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  
  ngOnInit(): void {
    this.loadCarreras();

  }

  async loadCarreras() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllCarreras(token);
      if (response) {
        this.carreras = response;
      } else {
        this.showError('No carreras found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteCarrera(carreraID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta carrera');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteCarrera(carreraID, token);
        // Refresh the user list after deletion
        this.loadCarreras();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(carreraID: string) {
    this.router.navigate(['/update-carreras', carreraID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
