import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-licencias',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-licencias.component.html',
  styleUrls: ['./register-licencias.component.css']
})
export class RegisterLicenciasComponent {

  docenteMateriaId: string | null = null;
  formData: any = {
    motivo: '',
    estado: 'En espera',
    fecha: this.getCurrentDate(), // Método para obtener la fecha actual
    docente_materia_id: 1 // Valor por defecto, ajustar según necesidades
  };
  errorMessage: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly licenciasService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.docenteMateriaId = params['docenteMateriaId'];
      if (!this.docenteMateriaId) {
        // Manejo de error si docenteMateriaId no está presente
        console.error('No se proporcionó un ID de docente materia.');
      } else {
        // Asignación del ID de docente materia a la licencia
        this.formData.docente_materia_id = this.docenteMateriaId;
      }
    });
  }

  async handleSubmit() {

    if (!this.formData.motivo) {
      this.showError('Por favor, ingrese el motivo de la licencia.');
      return;
    }

    // Establecer valores predeterminados
    this.formData.fecha = this.getCurrentDate(); // Obtener fecha actual
    this.formData.estado = 'En espera'; // Estado por defecto

    // Confirmar registro con el usuario
    const confirmRegistration = confirm('¿Está seguro que desea registrar esta licencia?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token');
      }

      const response = await this.licenciasService.registerLicencia(this.formData, token);
      if (response) {
        this.router.navigate(['/licenciasUser']);
      } else {
        this.showError('Hubo un error al registrar la licencia.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
