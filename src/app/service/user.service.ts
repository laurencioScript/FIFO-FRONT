import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  developmentUrl = environment.developmentUrl;

  constructor(private http: HttpClient,private readonly authService : AuthService) { }

  async getUsers() {
    try {
      const users: any = await this.http
        .get(`${this.developmentUrl}/Usuario`,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.authService.getToken()}`,
          }),
        })
        .toPromise();
      return users;
    } catch (error) {
      return null;
    }
  }

  async login(data) {
    try {
      const users: any = await this.http
        .post(`${this.developmentUrl}/Conta/Login`,data)
        .toPromise();
      return users;
    } catch (error) {
      return null;
    }
  }
  
  async getUser(id) {
    try {
      
      const { result }: any = await this.http
        .get(`${this.developmentUrl}/Usuario/${id}`)
        .toPromise();
      return result[0];
    } catch (error) {
      return null;
    }
  }

  async createUser(data){
    try{
      const responseRequest: any = await this.http
        .post(`${this.developmentUrl}/Usuario`, data)
        .toPromise();
    } catch(e) {
      console.log('>>> error', e);
      throw e;
      return null;
    }
  }

  async updateUser(data) {
    try {
      const requestResult: any = await this.http
        .put(`${this.developmentUrl}/Usuario/${data.id}`, data)
        .toPromise();
        return true;
    } catch (e) {
      console.log('>>> error', e);
      throw e;
    }
  }

  async deleteUser(id){
    try{
      const responseRequest: any = await this.http
        .delete(`${this.developmentUrl}/Usuario/${id}`)
        .toPromise();
    }catch(e){
      console.log('>>>> error', e);
      return null;
    }
  }

}
