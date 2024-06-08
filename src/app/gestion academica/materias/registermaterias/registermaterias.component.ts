import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-materia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registermaterias.component.html',
  styleUrls: ['./registermaterias.component.css']
})
export class RegistermateriasComponent implements OnInit {
  formData: any = {
    sigla: '',
    nombre: '',
    carrera_id: ''
  };
  errorMessage: string = '';
  carreras: any[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadCarreras();
  }

  async loadCarreras() {
    try {
      const token: any = localStorage.getItem('token');
      const carreras = await this.userService.getAllCarreras(token);
      this.carreras = carreras;
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {
    if (!this.formData.sigla || !this.formData.nombre || !this.formData.carrera_id) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }

    const confirmRegistration = confirm('¿Estás seguro que desea crear esta materia?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.createMateria(this.formData, token);
      if (response) {
        this.router.navigate(['/materia']);
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
      this.errorMessage = '';
    }, 3000);
  }
}
