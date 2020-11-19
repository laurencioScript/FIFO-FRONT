import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QueueService {
  developmentUrl = environment.developmentUrl;
  constructor(private http: HttpClient) { }

  async getQueues() {
    try {
      const responseRequest: any = await this.http
        .get(`${this.developmentUrl}/Fila`)
        .toPromise();
      return responseRequest;
    } catch (error) {
      return null;
    }
  }
  async getactivity() {
    try {
      const responseRequest: any = await this.http
        .get(`${this.developmentUrl}/Atividade`)
        .toPromise();
      return responseRequest;
    } catch (error) {
      return null;
    }
  }
  
  async getQueue(id) {
    try {
      
      const responseRequest: any = await this.http
        .get(`${this.developmentUrl}/Atividade/${id}`)
        .toPromise();
      return responseRequest;
    } catch (error) {
      return null;
    }
  }

  async createQueue(data){
    try{
      const responseRequest: any = await this.http
        .post(`${this.developmentUrl}/Atividade`, data)
        .toPromise();
      return responseRequest;
    } catch(e) {
      console.log('>>> error', e);
      throw e;
      return null;
    }
  }

  async enterQueue(data){
    try{
      const responseRequest: any = await this.http
        .post(`${this.developmentUrl}/Fila`, data)
        .toPromise();
      return responseRequest;
    } catch(e) {
      console.log('>>> error', e);
      throw e;
      return null;
    }
  } 

  async updateQueue(data) {
    try {
      const responseRequest: any = await this.http
        .put(`${this.developmentUrl}/Atividade/${data.id}`, data)
        .toPromise();
      return responseRequest;
    } catch (e) {
      console.log('>>> error', e);
      throw e;
    }
  }

  async leaveQueue(id,data) {
    try {
      const responseRequest: any = await this.http
        .put(`${this.developmentUrl}/Fila/${id}`, data)
        .toPromise(); 
      return responseRequest;
    } catch (e) {
      console.log('>>> error', e);
      throw e;
    }
  }

  async deleteQueue(id){
    try{
      const responseRequest: any = await this.http
        .delete(`${this.developmentUrl}/Atividade/${id}`)
        .toPromise();
      return responseRequest;
    }catch(e){
      console.log('>>>> error', e);
      return null;
    }
  }


}
