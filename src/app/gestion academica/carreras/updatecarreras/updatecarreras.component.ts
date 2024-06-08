import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatecarreras.component.html',
  styleUrls: ['./updatecarreras.component.css']
})
export class UpdatecarrerasComponent {

  constructor(private readonly userService: UsersService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  carreraID: any;
  carreraData: any = {};
  errorMessage: string = '';

  ngOnInit(): void {
    this.getCarreraById();
  }

  async getCarreraById() {
    this.carreraID = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.carreraID || !token) {
      this.showError("Carrera ID or Token is required");
      return;
    }

    try {
      let carreraDataResponse = await this.userService.getCarreraById(this.carreraID, token);
      const { codigo, nombre } = carreraDataResponse;
      this.carreraData = { codigo, nombre };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateCarrera() {
    const confirm = window.confirm("¿Estás seguro que deseas actualizar esta carrera?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await this.userService.updateCarrera(this.carreraID, this.carreraData, token);
      console.log(res);

      if (res) {
        this.router.navigate(['/carreras']);
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
