import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  developmentUrl = environment.developmentUrl;

  constructor(private http: HttpClient) { }

  async getUsers() {
    try {
      const users: any = await this.http
        .get(`${this.developmentUrl}/Usuario`)
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
        .post(`${this.developmentUrl}/Usuario/register`, data)
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
