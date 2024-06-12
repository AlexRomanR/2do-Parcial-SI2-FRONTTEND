import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';

import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatprogacademica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatprogacademica.component.html',
  styleUrl: './updatprogacademica.component.css'
})

export class UpdatprogacademicaComponent {

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  docenteMateriaID: any;
  docenteMateriaData: any = {};
  errorMessage: string = '';
  docentes: any[] = [];
  materias: any[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  carreras: any[] = [];
  aulas: any[] = [];
  modulos: any[] = [];
  facultades: any[] = [];



  ngOnInit(): void {
    this.getDocenteMateriaById();
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

  async getDocenteMateriaById() {
    this.docenteMateriaID = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.docenteMateriaID || !token) {
      this.showError("User ID or Token is Required");
      return;
    }
  
    try {
      // Llama al servicio y guarda la respuesta en una variable
      const docenteMateriaDataResponse = await this.userService.getDocenteMateriasById(this.docenteMateriaID, token);
  
      // Log para depurar la respuesta del servicio
      console.log('Response from getDocenteMateriasById:', docenteMateriaDataResponse);
  
      // Asigna los datos a la propiedad docenteMateriaData
      this.docenteMateriaData = { 
        docente_id: docenteMateriaDataResponse.docente.id, 
        materia_id: docenteMateriaDataResponse.materia.id, 
        horario_inicio: docenteMateriaDataResponse.horario_inicio, 
        horario_fin: docenteMateriaDataResponse.horario_fin, 
        grupo: docenteMateriaDataResponse.grupo, 
        dia: docenteMateriaDataResponse.dia, 
        carrera_id: docenteMateriaDataResponse.carrera.id, 
        aula_id: docenteMateriaDataResponse.aula.id, 
        modulo_id: docenteMateriaDataResponse.modulo.id, 
        facultad_id: docenteMateriaDataResponse.facultad.id 
      };
  
      // Log para verificar los datos asignados
      console.log('Assigned docenteMateriaData:', this.docenteMateriaData);
    } catch (error: any) {
      this.showError(error.message);
    }
  }
  

  async updateDocenteMateria() {
    const confitm = confirm("Estás seguro que desea actualizar esta aula?")
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await this.userService.updateDocenteMaterias(this.docenteMateriaID, this.docenteMateriaData, token);
      console.log(res);

      if (res) {
        this.router.navigate(['/progacademica']);
      } else {
        this.showError(res.message);
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
