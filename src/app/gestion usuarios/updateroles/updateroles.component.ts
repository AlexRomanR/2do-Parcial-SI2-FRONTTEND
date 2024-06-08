import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-updateroles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './updateroles.component.html',
  styleUrls: ['./updateroles.component.css']
})
export class UpdaterolesComponent implements OnInit {

  formData = {
    nombre: '',
    permissions: [] as string[]
  };
  errorMessage = '';
  permissions: any[] = [];
  rolId: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadpermissions();
    this.loadRolDetails();
  }

  async loadpermissions() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllPermisos(token);
      if (response) {
        this.permissions = response.map((permiso: { id: string, nombre: string }) => ({ ...permiso, seleccionado: false }));
      } else {
        this.showError('No se encontraron permissions.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadRolDetails() {
    try {
      const token: any = localStorage.getItem('token');
      const roleId = this.route.snapshot.paramMap.get('id');
      if (roleId) {
        this.rolId = roleId;
        const response = await this.userService.getRolById(this.rolId, token);
        console.log('Rol Details:', response); // Log rol details
        if (response) {
          this.formData.nombre = response.nombre || '';
          const rolepermissions = response.permissions.map((permiso: { id: string }) => permiso.id);
          this.permissions.forEach(permiso => {
            permiso.seleccionado = rolepermissions.includes(permiso.id);
          });
        } else {
          this.showError('No se encontraron detalles del rol.');
        }
      } else {
        this.showError('No se proporcionó un ID de rol.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {
    if (!this.formData.nombre) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }

    // Confirmar actualización con el usuario
    const confirmUpdate = confirm('¿Estás seguro de que deseas actualizar este rol?');
    if (!confirmUpdate) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token');
      }

      // Filtrar los permissions seleccionados
      const permissionsSeleccionados = this.permissions.filter(permiso => permiso.seleccionado);
      this.formData.permissions = permissionsSeleccionados.map(permiso => permiso.id);

      console.log('Updating Role:', this.rolId, this.formData); // Log update data

      const response = await this.userService.updateRol(this.rolId, this.formData, token);
      console.log('Update Response:', response); // Log response

      if (response) {
        this.router.navigate(['/roles']);
      } else {
        this.showError('Error al actualizar el rol.');
      }
    } catch (error: any) {
      console.error('Update Error:', error); // Log error
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Limpiar el mensaje de error después de la duración especificada
    }, 3000);
  }

  togglePermiso(permisoId: string) {
    const permiso = this.permissions.find(p => p.id === permisoId);
    if (permiso) {
      permiso.seleccionado = !permiso.seleccionado;
    }
  }
}
