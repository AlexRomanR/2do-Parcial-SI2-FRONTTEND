import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateaula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateaula.component.html',
  styleUrl: './updateaula.component.css'
})
export class UpdateaulaComponent {

  constructor(private readonly userService:UsersService,
    private readonly router: Router,
    private readonly route:ActivatedRoute){}



    aulaID: any;
    aulaData: any = {}
    errorMessage:string = ''
    modulos: any[] = []; // Lista de fodulo


    ngOnInit(): void {
    this.getAulaById()
    this.loadModulo();
    
  
    }
  

  
    async loadModulo() {
      try {
          const token: any = localStorage.getItem('token');
          const modulo = await this.userService.getAllModulos(token);
          this.modulos = modulo;
      } catch (error: any) {
          this.showError(error.message);
      }
    }

  

  async getAulaById(){
      this.aulaID = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('token')
      if(!this.aulaID || !token){
          this.showError("User ID or TOken is Required")
          return;
      }

      try {
        let aulaDataResponse = await this.userService.getAulaById(this.aulaID, token)
        const {capacidad, numero, piso, descripcion, modulo_id} = aulaDataResponse
        this.aulaData = { capacidad, numero, piso, descripcion, modulo_id };
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updateAula(){
    const confitm = confirm("Estás seguro que desea actualizar esta aula?")
    if(!confirm) return
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Token not found")
      }
      const res = await this.userService.updateAula(this.aulaID, this.aulaData, token);
      console.log(res)

      if(res){
        this.router.navigate(['/aulas'])
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
