import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-progacademica',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './progacademica.component.html',
  styleUrls: ['./progacademica.component.css']
})
export class ProgacademicaComponent implements OnInit {
  docenteMaterias: any[] = [];
  errorMessage: string = '';
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocenteMaterias();
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  async loadDocenteMaterias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllDocenteMaterias(token);
      if (response) {
        this.docenteMaterias = response;
      } else {
        this.showError('No se encontraron registros.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteDocenteMateria(docenteMateriaID: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar este registro?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteDocenteMaterias(docenteMateriaID, token);
        this.loadDocenteMaterias();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(docenteMateriaID: string) {
    this.router.navigate(['/update-progAcademica', docenteMateriaID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  exportToPDF() {
    const doc = new jsPDF();
    const col: string[] = ["ID", "Docente", "Materia", "Horario Inicio", "Horario Fin", "Grupo", "Día", "Carrera", "Aula", "Modulo", "Facultad"];
    const rows: (string | number)[][] = [];
  
    this.docenteMaterias.forEach(element => {
      const temp: (string | number)[] = [
        element.id,
        element.docente.name,
        element.materia.nombre,
        element.horario_inicio,
        element.horario_fin,
        element.grupo,
        element.dia,
        element.carrera.nombre,
        element.aula.numero,
        element.modulo.numero,
        element.facultad.nombre
      ];
      rows.push(temp);
    });
  
    (doc as any).autoTable({
      head: [col],
      body: rows
    });
  
    doc.save('Programacion_Academica.pdf');
  }
  

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.docenteMaterias.map(item => ({
      ID: item.id,
      Docente: item.docente.name,
      Materia: item.materia.nombre,
      "Horario Inicio": item.horario_inicio,
      "Horario Fin": item.horario_fin,
      Grupo: item.grupo,
      Día: item.dia,
      Carrera: item.carrera.nombre,
      Aula: item.aula.numero,
      Modulo: item.modulo.numero,
      Facultad: item.facultad.nombre
    })));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Programacion_Academica');

    XLSX.writeFile(wb, 'Programacion_Academica.xlsx');
  }
}
