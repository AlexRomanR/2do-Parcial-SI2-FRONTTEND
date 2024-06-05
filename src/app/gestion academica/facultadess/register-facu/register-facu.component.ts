import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-facu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-facu.component.html',
  styleUrl: './register-facu.component.css'
})
export class RegisterFacuComponent {

  formData: any = {
    nombre: '',
    descripcion: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    if (!this.formData.nombre || !this.formData.descripcion) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('¿Estas seguro que desea crear esta facultad?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.registerFacultad(this.formData, token);
      if (response) {
        this.router.navigate(['/facultades']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

}
