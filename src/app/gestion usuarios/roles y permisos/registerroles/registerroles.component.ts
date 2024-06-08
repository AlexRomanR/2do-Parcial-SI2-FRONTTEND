import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerroles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registerroles.component.html',
  styleUrls: ['./registerroles.component.css']
})
export class RegisterrolesComponent {

  formData = {
    nombreRol: '',
    permisos: [] as number[]
  };
  errorMessage = '';
  permisos: any[] = [];

  constructor(private readonly userService: UsersService, private readonly router: Router) { }
  
  ngOnInit(): void {
    this.loadPermisos();
  }

  async loadPermisos() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllPermisos(token);
      if (response) {
        this.permisos = response.map((permiso: { id: number, nombre: string }) => ({ ...permiso, seleccionado: false }));
      } else {
        this.showError('No permissions found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {
    if (!this.formData.nombreRol) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }
  
    const confirmRegistration = confirm('¿Estas seguro que desea crear este rol?');
    if (!confirmRegistration) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      // Filtrar los permisos seleccionados y mapearlos a string
      const permisosSeleccionados = this.permisos.filter(permiso => permiso.seleccionado);
      this.formData.permisos = permisosSeleccionados.map(permiso => permiso.id.toString());
  
      // Verifica la estructura del formData antes de enviarlo
      console.log('formData antes de enviarlo:', this.formData);
  
      const response = await this.userService.registerRol({
        nombre: this.formData.nombreRol,
        permissions: this.formData.permisos
      }, token);
  
      if (response) {
        this.router.navigate(['/roles']);
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

  togglePermiso(id: number) {
    const index = this.permisos.findIndex(permiso => permiso.id === id);
    if (index !== -1) {
      this.permisos[index].seleccionado = !this.permisos[index].seleccionado;
    }
  }
}
