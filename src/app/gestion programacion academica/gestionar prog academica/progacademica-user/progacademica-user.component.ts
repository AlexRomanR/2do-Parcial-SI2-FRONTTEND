import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
// Importa el módulo de localización de Angular para el idioma 'es'
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registra el idioma 'es'
registerLocaleData(localeEs);



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
  userLocation: GeolocationPosition | null = null;
  asistencias: any[] = []; // Aquí almacenaremos las asistencias existentes
  markedAttendances: { [key: string]: boolean } = {};
  
  
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
    this.loadUserLocation();
    this.loadAsistencias(); // Cargar las asistencias al iniciar el componente

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

  loadUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.userLocation =  {
            coords: {
              latitude: -17.776296,
              longitude: -63.195083,
              accuracy: 0,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null
            },
            timestamp: Date.now()
          }
 
      );

      
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Establecer la ubicación por defecto cuando no se soporta la geolocalización
      this.userLocation = {
        coords: {
          latitude: -17.776296,
          longitude: -63.195083,
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: Date.now()
      };
    }
  }
  
  
  

  

  getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Radio de la Tierra en metros
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  canMarkAttendance(ubicacionModulo: string): boolean {
    if (!this.userLocation) {
      console.error('User location not available');
      return false;
    }
      // Log para verificar la ubicación del usuario
      console.log('User location:', this.userLocation.coords.latitude, this.userLocation.coords.longitude);

    const [lat1, lon1] = [this.userLocation.coords.latitude, this.userLocation.coords.longitude];
    const [lat2, lon2] = ubicacionModulo.split(',').map(Number);
    console.log('Module location:', lat2, lon2);

    const distance = this.getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2);
    console.log('Calculated distance (meters):', distance);
  
    return distance <= 20;
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

  async marcarAsistencia(docenteMateriaId: string, horaInicios: string, ubicacionModulo: string) {
    const token: any = localStorage.getItem('token');
    const fechaActual = formatDate(new Date(), 'd/MM/yyyy', 'es');
    const horaActual = formatDate(new Date(), 'HH:mm', 'es');

    console.log(fechaActual);
  
    // Verificar si ya existe una asistencia para este docenteMateriaId y fechaActual
    const existeAsistencia = this.asistencias.some(asistencia =>
      (asistencia.docenteMaterias.id === docenteMateriaId) && (asistencia.fecha === fechaActual));
  
    if (existeAsistencia) {
      alert('Ya existe una asistencia marcada para hoy en este horario.');
      return;
    }
  
    if (this.canMarkAttendance(ubicacionModulo)) {
      // Obtener la hora de inicio y sumarle 30 minutos para el estado "Retrasado"
      const horaInicio = horaInicios;
      const horaInicioDate = new Date();
      horaInicioDate.setHours(parseInt(horaInicio.split(':')[0], 10));
      horaInicioDate.setMinutes(parseInt(horaInicio.split(':')[1], 10));
      horaInicioDate.setSeconds(0);
      horaInicioDate.setMilliseconds(0);
  
      const horaLimiteRetraso = new Date(horaInicioDate.getTime());
      horaLimiteRetraso.setMinutes(horaLimiteRetraso.getMinutes() + 15);
  
      const horaActualDate = new Date();
  
      let estado = 'Puntual';
      if (horaActualDate > horaLimiteRetraso) {
        estado = 'Retraso';
      }
  
      const asistenciaData = {
        docente_materia_id: docenteMateriaId,
        estado: estado,
        fecha: fechaActual,
        hora_marcada: horaActual
      };
  
      try {
        const response = await this.userService.registerAsistencia(asistenciaData, token);
        console.log('Asistencia registrada:', response);
        this.markedAttendances[docenteMateriaId] = true; // Marcar la asistencia como registrada
        alert('Asistencia marcada con éxito');
        console.log('Asistencia marcada para:', docenteMateriaId);
        window.location.reload();
      } catch (error: any) {
        this.showError('Error al marcar la asistencia.');
      }
    } else {
      alert('Estás demasiado lejos del módulo para marcar asistencia.');
    }
  }
  

  isWithinTimeRange(horarioInicio: string, horarioFin: string, dia: string): boolean {
    const startTimeParts = horarioInicio.split(':').map(part => parseInt(part, 10));
    const endTimeParts = horarioFin.split(':').map(part => parseInt(part, 10));
  
    const startHour = startTimeParts[0];
    const startMinute = startTimeParts[1];
    const endHour = endTimeParts[0];
    const endMinute = endTimeParts[1];
  
    const now = new Date();
    const currentDay = now.getDay(); // 0 (domingo) a 6 (sábado)
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
  
    // Convertir los días de la semana a números
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const diaIndex = daysOfWeek.indexOf(dia);
  
    // Verificar si el día actual es el mismo y si la hora actual está dentro del rango
    const isSameDay = currentDay === diaIndex;
    const isWithinRange = isSameDay && (
      (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
      (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))
    );
  
    console.log('¿Está dentro del rango?', isWithinRange);
  
    return isWithinRange;
  }



}
