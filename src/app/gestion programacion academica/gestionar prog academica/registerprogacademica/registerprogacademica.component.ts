import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registerprogacademica',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registerprogacademica.component.html',
  styleUrl: './registerprogacademica.component.css'
})
export class RegisterprogacademicaComponent {
  formData: any = {
    docente_id: '',
    materia_id: '',
    horario_inicio: '',
    horario_fin: '',
    grupo: '',
    dia: '',
    carrera_id: '',
    aula_id: '',
    modulo_id: '',
    facultad_id: ''
  };
  errorMessage: string = '';
  docentes: any[] = [];
  materias: any[] = [];
  carreras: any[] = [];
  aulas: any[] = [];
  modulos: any[] = [];
  facultades: any[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadDocentes();
    this.loadMaterias();
    this.loadCarreras();
    this.loadAulas();
    this.loadModulos();
    this.loadFacultades();
  }

  async loadDocentes() {
    try {
        const token: any = localStorage.getItem('token');
        const docentes = await this.userService.getAllUsersV2(token);
        this.docentes = docentes;
    } catch (error: any) {
        this.showError(error.message);
    }
  }

  async loadMaterias() {
    try {
        const token: any = localStorage.getItem('token');
        const materias = await this.userService.getAllMaterias(token);
        this.materias = materias;
    } catch (error: any) {
        this.showError(error.message);
    }
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

  async loadAulas() {
    try {
        const token: any = localStorage.getItem('token');
        const aulas = await this.userService.getAllAulas(token);
        this.aulas = aulas;
    } catch (error: any) {
        this.showError(error.message);
    }
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

  async loadFacultades() {
    try {
        const token: any = localStorage.getItem('token');
        const facultades = await this.userService.getAllFacultades(token);
        this.facultades = facultades;
    } catch (error: any) {
        this.showError(error.message);
    }
  }

  async handleSubmit() {
    if (!this.formData.docente_id || !this.formData.materia_id || !this.formData.horario_inicio || !this.formData.horario_fin || !this.formData.grupo || !this.formData.dia || !this.formData.carrera_id || !this.formData.aula_id || !this.formData.modulo_id || !this.formData.facultad_id) {
      this.showError('Por favor, rellene todos los campos solicitados.');
      return;
    }

    const confirmRegistration = confirm('¿Estas seguro que desea crear esta asignación de docente y materia?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.registerDocenteMaterias(this.formData, token);
      if (response) {
        this.router.navigate(['/progacademica']);
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
