import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  asistencias: any[] = [];
  errorMessage: string = '';
  docenteMaterias: any[] = [];
  asistenciasContador: any[] = [];
  licencias: any[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocenteMaterias();
  }

  async loadDocenteMaterias() {
    try {
      const token: any = localStorage.getItem('token');
      const userProfileResponse = await this.userService.getYourProfile(token);
      if (userProfileResponse.statusCode === 200) {
        const currentUserID = userProfileResponse.ourUsers.id;
        const response = await this.userService.getAllDocenteMaterias(token);
        if (response) {
          // Filtrar los docenteMaterias por el ID del usuario actual
          for (const docenteMateria of response) {
            if (docenteMateria.docente.id.toString() === currentUserID.toString()) {
              this.docenteMaterias.push(docenteMateria);
            }
          }
          // Contar la cantidad de asistencias esperadas por materia y grupo
          this.contarAsistenciasEsperadas();
          // Cargar las asistencias
          this.loadAsistencias();
          // Cargar las licencias
          this.loadLicencias();
        } else {
          this.showError('No se encontraron registros.');
        }
      } else {
        this.showError('Error al obtener el perfil del usuario.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadLicencias() {
    try {
      const token: any = localStorage.getItem('token');
      const userProfileResponse = await this.userService.getYourProfile(token);

      if (userProfileResponse.statusCode === 200) {
        const currentUserID = userProfileResponse.ourUsers.id;
        const licenciasResponse = await this.userService.getAllLicenciasByDocente(currentUserID, token);
        this.licencias=licenciasResponse;

        // Contar las licencias aceptadas por materia y grupo
        this.licencias.forEach(licencia => {
          if (licencia.estado === 'Aceptado') {
            const materiaNombre = licencia.docenteMaterias.materia.nombre;
            const grupo = licencia.docenteMaterias.grupo;
            const key = `${materiaNombre}-${grupo}`;
            const contador = this.asistenciasContador.find(ac => ac.key === key);
            if (contador) {
              if (!contador.licenciasAceptadas) {
                contador.licenciasAceptadas = 0;
              }
              contador.licenciasAceptadas++;
            }
          }
        });

        // Log the updated asistenciasContador with licencias
        console.log('Asistencias Contador with Licencias:', this.asistenciasContador);
      } else {
        this.showError('No se encontraron licencias.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadAsistencias() {
    try {
      const token: any = localStorage.getItem('token');
      const userProfileResponse = await this.userService.getYourProfile(token);
      if (userProfileResponse.statusCode === 200) {
        const currentUserID = userProfileResponse.ourUsers.id;
        const asistenciasResponse = await this.userService.getAsistenciasByDocenteID(currentUserID, token);
        if (asistenciasResponse) {
          this.asistencias = asistenciasResponse;
  
          // Contar las asistencias marcadas por materia y grupo
          this.asistencias.forEach(asistencia => {
            const materiaNombre = asistencia.docenteMaterias.materia.nombre;
            const grupo = asistencia.docenteMaterias.grupo;
            const key = `${materiaNombre}-${grupo}`;
            const contador = this.asistenciasContador.find(ac => ac.key === key);
            if (contador) {
              contador.marcadas++;
            }
          });
  
          // Log the updated asistenciasContador
          console.log('Asistencias Contador after counting:', this.asistenciasContador);
        } else {
          this.showError('No se encontraron asistencias.');
        }
      } else {
        this.showError('Error al obtener el perfil del usuario.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  contarAsistenciasEsperadas() {
    const semanasPorMes = 4;
    const mesesPorSemestre = 6;
    this.asistenciasContador = [];

    this.docenteMaterias.forEach(docenteMateria => {
      const key = `${docenteMateria.materia.nombre}-${docenteMateria.grupo}`;
      let contador = this.asistenciasContador.find(ac => ac.key === key);
      if (!contador) {
        contador = {
          key: key,
          materia: docenteMateria.materia,
          grupo: docenteMateria.grupo,
          esperadas: 0,
          marcadas: 0
        };
        this.asistenciasContador.push(contador);
      }
      contador.esperadas += semanasPorMes * mesesPorSemestre;
    });
  }

  async deleteAsistencia(asistenciaID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta asistencia?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteAsistencia(asistenciaID, token);
        // Refrescar la lista de asistencias después de eliminar
        this.loadAsistencias();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Limpiar el mensaje de error después de la duración especificada
    }, 3000);
  }

  exportToPDF() {
    const doc = new jsPDF();
    const col: string[] = ["ID", "Estado", "Hora Marcada", "Fecha", "Programación Académica ID"];
    const rows: (string | number)[][] = [];

    this.asistencias.forEach(element => {
      const temp: (string | number)[] = [
        element.id,
        element.estado,
        element.horaMarcada,
        element.fecha,
        element.docenteMaterias.id // Asegúrate de ajustar esto según la estructura de tus datos
      ];
      rows.push(temp);
    });

    // Agregar el resumen de asistencias al PDF
    this.asistenciasContador.forEach(contador => {
      const resumenTemp: (string | number)[] = [
        '',
        '',
        

        `${contador.materia.nombre} - ${contador.grupo}`,
        `${contador.marcadas} / ${contador.esperadas} asistencias`,
          contador.licenciasAceptadas ? `Licencias aceptadas: ${contador.licenciasAceptadas}` : '' 
      ];
      rows.push(resumenTemp);
          // Console.log para verificar los valores de marcadas y esperadas
    console.log(`Marcadas: ${contador.marcadas}, Esperadas: ${contador.esperadas}`);
    });

    (doc as any).autoTable({
      head: [col],
      body: rows
    });

    doc.save('Asistencias.pdf');
  }



  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.asistencias);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencias');
    XLSX.writeFile(wb, 'Asistencias.xlsx');
  }
}
