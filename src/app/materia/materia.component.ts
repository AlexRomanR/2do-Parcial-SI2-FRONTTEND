import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../materia/materia.service';
import { Materias } from './materia.model';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  materias: Materias[] = [];
  nuevaMateria: Materias = { id: 0, sigla: '', nombre: '' };

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.obtenerMaterias();
  }

  obtenerMaterias(): void {
    this.materiaService.obtenerMaterias().subscribe(
      (materias: Materias[]) => {
        this.materias = materias;
      },
      (error) => {
        console.error('Error al obtener las materias:', error);
      }
    );
  }

  editarMateria(materia: Materias): void {
    // Aquí puedes implementar la lógica para editar una materia
  }

  eliminarMateria(id: number): void {
    this.materiaService.eliminarMateria(id).subscribe(
      () => {
        this.obtenerMaterias();
      },
      (error) => {
        console.error('Error al eliminar la materia:', error);
      }
    );
  }

  guardarMateria(): void {
    this.materiaService.guardarMateria(this.nuevaMateria).subscribe(
      () => {
        this.obtenerMaterias();
        this.nuevaMateria = { id: 0, sigla: '', nombre: '' };
      },
      (error) => {
        console.error('Error al guardar la materia:', error);
      }
    );
  }
}