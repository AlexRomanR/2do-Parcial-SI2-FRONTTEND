import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-progacademica',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './progacademica.component.html',
  styleUrl: './progacademica.component.css'
})
export class ProgacademicaComponent {
  docenteMaterias: any[] = [];
  errorMessage: string = '';
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

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
    console.log(this.docenteMaterias);
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

}
