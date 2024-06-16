import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../users.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-licencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.css']
})
export class LicenciasComponent implements OnInit {
  licencias: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly licenciasService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadLicencias();
  }

  async loadLicencias() {
    try {
      const token: any = localStorage.getItem('token');
      const userProfileResponse = await this.licenciasService.getYourProfile(token);

      if (userProfileResponse.statusCode === 200) {
        const currentUserID = userProfileResponse.ourUsers.id;
        const licenciasResponse = await this.licenciasService.getAlllicencias(token);

        if (licenciasResponse) {
          this.licencias = licenciasResponse;
        } else {
          this.showError('No licenses found.');
        }
      } else {
        this.showError('Unable to fetch user profile.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteLicencia(licenciaID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta licencia?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.licenciasService.deleteLicencia(licenciaID, token);
        // Refresh the license list after deletion
        this.loadLicencias();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(licenciaID: string) {
    this.router.navigate(['/update-licencia', licenciaID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  exportToPDF() {
    const doc = new jsPDF();
    const col: string[] = ["ID", "Motivo", "Estado", "Fecha", "Programación Académica ID"];
    const rows: (string | number)[][] = [];

    this.licencias.forEach(element => {
      const temp: (string | number)[] = [
        element.id,
        element.motivo,
        element.estado,
        element.fecha,
        element.docenteMaterias.id // Asegúrate de ajustar esto según la estructura de tus datos
      ];
      rows.push(temp);
    });


    (doc as any).autoTable({
      head: [col],
      body: rows
    });

    doc.save('licencias.pdf');
  }



  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.licencias);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'licencias');
    XLSX.writeFile(wb, 'licencias.xlsx');
  }


  async acceptLicencia(licenciaID: string) {
    const confirmAccept = confirm('¿Estás seguro que desea aceptar esta licencia?');
    if (confirmAccept) {
      try {
        const token: any = localStorage.getItem('token');
        // Encuentra la licencia actual por su ID
        const licencia = this.licencias.find(l => l.id === licenciaID);
        
        if (licencia) {
          // Crea el objeto actualizado con todos los atributos necesarios
          const updatedLicencia = {
            motivo: licencia.motivo,
            fecha: licencia.fecha,
            docente_materia_id: licencia.docenteMaterias.id,
            estado: 'Aceptado'
          };
          
          await this.licenciasService.updateLicencia(licenciaID, updatedLicencia, token);
          // Refresh the license list after updating
          this.loadLicencias();
        } else {
          this.showError('Licencia no encontrada.');
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }


  async RechazarLicencia(licenciaID: string) {
    const confirmAccept = confirm('¿Estás seguro que desea rechazar esta licencia?');
    if (confirmAccept) {
      try {
        const token: any = localStorage.getItem('token');
        // Encuentra la licencia actual por su ID
        const licencia = this.licencias.find(l => l.id === licenciaID);
        
        if (licencia) {
          // Crea el objeto actualizado con todos los atributos necesarios
          const updatedLicencia = {
            motivo: licencia.motivo,
            fecha: licencia.fecha,
            docente_materia_id: licencia.docenteMaterias.id,
            estado: 'Rechazado'
          };
          
          await this.licenciasService.updateLicencia(licenciaID, updatedLicencia, token);
          // Refresh the license list after updating
          this.loadLicencias();
        } else {
          this.showError('Licencia no encontrada.');
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }
  
}
