import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatemodu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatemodu.component.html',
  styleUrl: './updatemodu.component.css'
})
export class UpdatemoduComponent {
  constructor(private readonly userService:UsersService,
    private readonly router: Router,
    private readonly route:ActivatedRoute){}



    moduId: any;
    moduData: any = {}
    errorMessage:string = ''
    facultades: any[] = []; // Lista de facultades


    ngOnInit(): void {
    this.getModuById()
    this.loadFacultades(); //aca cargo la lista de facultades
    
  
    }
  

     //aca obtengo la lista de facultades
    async loadFacultades() {
      try {
          const token: any = localStorage.getItem('token');
          const facultades = await this.userService.getAllFacultades(token);
          this.facultades = facultades;
      } catch (error: any) {
          this.showError(error.message);
      }
    }

  

  async getModuById(){
      this.moduId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('token')
      if(!this.moduId || !token){
          this.showError("User ID or TOken is Required")
          return;
      }

      try {
        let moduDataResponse = await this.userService.getModuById(this.moduId, token)
        const {numero, descripcion, facultad_id} = moduDataResponse
        this.moduData = { numero , descripcion, facultad_id };
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updateModu(){
    const confitm = confirm("Estás seguro que desea actualizar este modulo?")
    if(!confirm) return
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Token not found")
      }
      const res = await this.userService.updateModulo(this.moduId, this.moduData, token);
      console.log(res)

      if(res){
        this.router.navigate(['/modulos'])
      }else{
        this.showError(res.message)
      }

    }catch(error:any){
      this.showError(error.message)
    }

  }


  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
