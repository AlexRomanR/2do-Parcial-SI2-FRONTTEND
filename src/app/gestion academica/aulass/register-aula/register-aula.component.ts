import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-aula',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-aula.component.html',
  styleUrl: './register-aula.component.css'
})
export class RegisterAulaComponent {
  formData: any = {
    capacidad: '',
    numero: '',
    piso: '',
    descripcion: '',
    modulo_id: ''
  };
  errorMessage: string = '';
  modulos: any[] = []; // Lista de facultades

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadModulos();
  }

  async loadModulos() {
    try {
        const token: any = localStorage.getItem('token');
        const modulos = await this.userService.getAllModulos(token);
        this.modulos = modulos;
    } catch (error: any) {
        this.showError(error.message);
    }
  }

  async handleSubmit() {

    if (!this.formData.capacidad || !this.formData.numero || !this.formData.piso || !this.formData.descripcion || !this.formData.modulo_id) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('¿Estas seguro que desea crear esta aula');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.registerAula(this.formData, token);
      if (response) {
        this.router.navigate(['/aulas']);
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
