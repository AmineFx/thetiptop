import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})
export class PlayService {
  apiUrl = environment.apiUrl;
  
  constructor() { }
 
  play(data:any): Promise<any>{
    let payload = {
      username: localStorage.getItem('username'),
      ticket: data.ticket
    }
  
    return axios.post(this.apiUrl+'/play/tip', payload, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }


  playStatis(): Promise<any>{
    return axios.get(this.apiUrl+'/play/tipStats', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }


}