import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-updatelicencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatelicencias.component.html',
  styleUrl: './updatelicencias.component.css'
})
export class UpdatelicenciasComponent {
  licenciaId: any;
  licenciaData: any = {};
  errorMessage: string = '';

  constructor(
    private readonly licenciasService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getLicenciaById();
  }

  async getLicenciaById() {
    this.licenciaId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.licenciaId || !token) {
      this.showError("License ID or Token is required");
      return;
    }

    try {
      let licenciaDataResponse = await this.licenciasService.getLicenciaById(this.licenciaId, token);
      this.licenciaData = licenciaDataResponse;
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateLicencia() {
    const confirmUpdate = confirm("¿Estás seguro que desea actualizar esta licencia?");
    if (!confirmUpdate) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }

      this.licenciaData.docente_materia_id = this.licenciaData.docenteMaterias.id

      console.log('Token encontrado:', token);
      console.log('Datos de la licencia a actualizar:', this.licenciaData);

      const res = await this.licenciasService.updateLicencia(this.licenciaId, this.licenciaData, token);
      console.log('Respuesta del servidor:', res);

      if (res) {
        this.router.navigate(['/licenciasUser']);
      } else {
        this.showError('Error en la actualización: ' + res.message);
      }
    } catch (error: any) {
      this.showError('Error en la actualización: ' + error.message);
      console.error('Error en la actualización:', error);
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

}
