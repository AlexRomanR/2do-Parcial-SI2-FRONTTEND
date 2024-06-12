import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-progacademica-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './progacademica-user.component.html',
  styleUrl: './progacademica-user.component.css'
})
export class ProgacademicaUserComponent {
  

  

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
      const userProfileResponse = await this.userService.getYourProfile(token);
      if (userProfileResponse.statusCode === 200) {
        const currentUserID = userProfileResponse.ourUsers.id;
        console.log(currentUserID);
        const response = await this.userService.getAllDocenteMaterias(token);
        console.log(response);
        if (response) {
          // Filtrar los docenteMaterias por el ID del usuario actual
          for (const docenteMateria of response) {
            console.log("comienza");
            console.log(docenteMateria.docente.id.toString());
            console.log(currentUserID.toString());
            if (docenteMateria.docente.id.toString() === currentUserID.toString()) {
              this.docenteMaterias.push(docenteMateria);
            }
          }
          console.log(this.docenteMaterias);
        } else {
          this.showError('No se encontraron registros.');
        }
      } else {
        this.showError('Error al obtener el perfil del usuario.');
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
