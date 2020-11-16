import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUser(user){
    localStorage.setItem('user',user)
  }

  getUser(){
    return localStorage.getItem('user')
  }

}
