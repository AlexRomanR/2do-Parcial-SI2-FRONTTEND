import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MapComponent } from '../map/map.component'; 

@Component({
  selector: 'app-register-modu',
  standalone: true,
  imports: [FormsModule, CommonModule, MapComponent],
  templateUrl: './register-modu.component.html',
  styleUrl: './register-modu.component.css'
})
export class RegisterModuComponent {

  formData: any = {
    numero: '',
    descripcion: '',
    ubicacion: '',
    facultad_id: ''
  };
  errorMessage: string = '';
  facultades: any[] = []; // Lista de facultades

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadFacultades(); //aca cargo la lista de facultades
  }


  //aca obtengo la lista de facultades
  async loadFacultades() {
    try {
        const token: any = localStorage.getItem('token');
        const facultades = await this.userService.getAllFacultades(token);
        this.facultades = facultades;
    } catch (error: any) {
        this.showError(error.message);
    }
  }

  updateLocation(location: string) {
    this.formData.ubicacion = location;
  }

  async handleSubmit() {

    if (!this.formData.numero || !this.formData.descripcion || !this.formData.facultad_id || !this.formData.ubicacion) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('¿Estas seguro que desea crear este modulo?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.registerModulo(this.formData, token);
      if (response) {
        this.router.navigate(['/modulos']);
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


