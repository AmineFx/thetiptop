import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constantURL } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http:HttpClient) { }


  getParticipation(){
    return this.http.get(`${constantURL.apiEndpoint}/api/participation`)
  }
}
