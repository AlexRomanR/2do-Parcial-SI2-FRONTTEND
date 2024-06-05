import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materias } from './materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'http://localhost:8080/api/materias';

  constructor(private http: HttpClient) { }

  obtenerMaterias(): Observable<Materias[]> {
    return this.http.get<Materias[]>(this.apiUrl);
  }

  eliminarMateria(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  guardarMateria(materia: Materias): Observable<Materias> {
    return this.http.post<Materias>(this.apiUrl, materia);
  }

  actualizarMateria(id: number, materia: Materias): Observable<Materias> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Materias>(url, materia);
  }
}
