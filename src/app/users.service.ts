import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = "http://localhost:6060";

  constructor(private http: HttpClient) { }


  async login(email:string, password:string):Promise<any>{
    const url = `${this.BASE_URL}/auth/signin`;
    try{
      const response =  this.http.post<any>(url, {email, password}).toPromise()
      return response;

    }catch(error){
      throw error;
    }
  }

  async register(userData:any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/auth/signup`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getAllUsers(token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-all-users`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }




  async getYourProfile(token:string):Promise<any>{
    const url = `${this.BASE_URL}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getUsersById(userId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteUser(userId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateUSer(userId: string, userData: any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(url, userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  /***AUTHEMNTICATION METHODS */
  logOut():void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }

  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;

  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'ADMIN'
    }
    return false;

  }

  isUser(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'USER'
    }
    return false;

  }


  //FACULTADES
  async getAllFacultades(token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-all-facultades`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getFacuById(facuID: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-facultad/${facuID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async registerFacultad(facuData:any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/create-facultad`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, facuData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }


  async deleteFacultad(facuID: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/delete-facultad/${facuID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateFacultad(facuID: string, facuData: any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/update-facultad/${facuID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(url, facuData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }


  //MODULOS

  async getAllModulos(token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-all-modulos`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getModuById(moduID: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-modulo/${moduID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async registerModulo(moduData:any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/create-modulo`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, moduData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteModulo(moduID: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/delete-modulo/${moduID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateModulo(moduID: string, moduData: any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/update-modulo/${moduID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(url, moduData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }






    //AULAS

    async getAllAulas(token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/get-all-aulas`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.get<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async getAulaById(aulaID: string, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/get-aula/${aulaID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.get<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async registerAula(aulaData:any, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/create-aula`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.post<any>(url, aulaData, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async deleteAula(aulaID: string, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/delete-aula/${aulaID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.delete<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async updateAula(aulaID: string, moduData: any, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/update-aula/${aulaID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.put<any>(url, moduData, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }




    //ROLES

    async getAllRoles(token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/get-all-roles`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.get<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async getRolById(rolID: string, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/get-rol/${rolID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.get<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async registerRol(rolData:any, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/create-rol`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.post<any>(url, rolData, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async deleteRol(rolID: string, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/delete-rol/${rolID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.delete<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async updateRol(rolID: string, rolData: any, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/update-rol/${rolID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.put<any>(url, rolData, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
    

     //PERMISOS

    async getAllPermisos(token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/get-all-permisos`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.get<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }
  
    async getPermisoById(permisoID: string, token:string):Promise<any>{
      const url = `${this.BASE_URL}/admin/get-permiso/${permisoID}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      try{
        const response =  this.http.get<any>(url, {headers}).toPromise()
        return response;
      }catch(error){
        throw error;
      }
    }


}