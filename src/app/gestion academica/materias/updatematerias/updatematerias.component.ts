import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-materia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatematerias.component.html',
  styleUrl: './updatematerias.component.css'
})
export class UpdateMateriasComponent {

  constructor(private readonly userService: UsersService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  materiaID: any;
  materiaData: any = {};
  errorMessage: string = '';
  carreras: any[] = [];

  ngOnInit(): void {
    this.getMateriaById();
    this.loadCarreras();
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

  async getMateriaById() {
    this.materiaID = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.materiaID || !token) {
      this.showError("Materia ID or Token is required");
      return;
    }

    try {
      let materiaDataResponse = await this.userService.getMateriaById(this.materiaID, token);
      const { sigla, nombre, carrera_id } = materiaDataResponse;
      this.materiaData = { sigla, nombre, carrera_id };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateMateria() {
    const confirm = window.confirm("¿Estás seguro que desea actualizar esta materia?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await this.userService.updateMateria(this.materiaID, this.materiaData, token);
      console.log(res);

      if (res) {
        this.router.navigate(['/materias']);
      } else {
        this.showError(res.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
