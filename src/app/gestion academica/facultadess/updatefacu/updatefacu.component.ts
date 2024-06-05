import { Component } from '@angular/core';
import { UsersService } from '../../../users.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatefacu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatefacu.component.html',
  styleUrl: './updatefacu.component.css'
})
export class UpdatefacuComponent {
  constructor(private readonly userService:UsersService,
    private readonly router: Router,
    private readonly route:ActivatedRoute){}


    facuId: any;
    facuData: any = {}
    errorMessage:string = ''


    ngOnInit(): void {
    this.getFacuById()
      
    }

  async getFacuById(){
      this.facuId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('token')
      if(!this.facuId || !token){
          this.showError("User ID or TOken is Required")
          return;
      }

      try {
        let facuDataResponse = await this.userService.getFacuById(this.facuId, token)
        const {nombre, descripcion} = facuDataResponse
        this.facuData = {nombre, descripcion};
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updateFacu(){
    const confitm = confirm("Estás seguro que desea actualizar esta facultad?")
    if(!confirm) return
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Token not found")
      }
      const res = await this.userService.updateFacultad(this.facuId, this.facuData, token);
      console.log(res)

      if(res){
        this.router.navigate(['/users'])
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
