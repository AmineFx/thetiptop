import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  apiUrl = environment.apiUrl;
  constructor() { }
 
  login(data:any): Promise<any>{
    console.log("this.apiUrl"+this.apiUrl);
    let payload = {
      username: data.username,
      password: data.password
    }
  
    return axios.post(this.apiUrl+'/auth/signin', payload)
  }
 
  register(data:any): Promise<any>{
    let payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: ['user']
    }
     
    return axios.post(this.apiUrl+'/auth/signup', payload, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
 
  getUser(): Promise<any>{
 
    return axios.get(this.apiUrl+'/api/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
 
  logout(): Promise<any>{
 
    return axios.post(this.apiUrl+'/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
}