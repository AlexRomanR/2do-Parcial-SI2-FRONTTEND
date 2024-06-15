import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-licencia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-licencia.component.html',
  styleUrls: ['./crear-licencia.component.css']
})
export class CrearLicenciaComponent implements OnInit {
  motivo: string = '';
  errorMessage: string = '';
  docenteMateriaId: number = 0;

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.docenteMateriaId = +params['id'];
    });
  }

  async handleSubmit() {
    if (!this.motivo) {
      this.showError('Por favor, rellene el motivo.');
      return;
    }
  
    const confirmCreate = confirm('¿Estás seguro que deseas crear esta licencia?');
    if (!confirmCreate) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const licenciaData = {
        motivo: this.motivo,
        docenteMateriaId: this.docenteMateriaId
      };
  
      console.log('Datos a enviar:', licenciaData); // Agrega esta línea para verificar los datos
  
      const response = await this.userService.createLicencia(licenciaData, token);
      if (response) {
        console.log('Respuesta del servidor:', response); // Agrega esta línea para verificar la respuesta
        this.router.navigate(['/progacademicaUser']);
      } else {
        this.showError('Error al crear la licencia');
      }
    } catch (error: any) {
      this.showError(error.message || 'Error desconocido');
    }
  }
  

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
