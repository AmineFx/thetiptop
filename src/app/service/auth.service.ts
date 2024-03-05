
import { Injectable } from '@angular/core';
import { constantURL } from '../shared/constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {take, map} from 'rxjs/operators';
import { Router } from '@angular/router';


/*
 "@capacitor/android": "^3.5.1",
    "@capacitor/cli": "^3.5.1",
    "@capacitor/core": "^3.5.1",
*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url: string = constantURL.apiEndpoint ;
  token: string | undefined;
  etat =false;
  userName: string | undefined;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  
  constructor(private http:HttpClient,private router: Router) {

  }
   
  authLogin(model : any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/authenticationtoken`,model, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ``,
      }
    })
    ;
  }
  login(user: any, pass: any) {
    
    
    // localStorage.removeItem('jwt');
    let params = new HttpParams()
      .set('identifiant', user)
      .set('password', pass);

    this.http.post(`${this.url}/api/authenticationtoken`, { "identifiant":user,"password":pass },{responseType:"text"})
      .subscribe((res: any) => {
        this.etat=true;
        this.token = res;
        localStorage.setItem('jwt',res);
        this.router.navigateByUrl('dashboard');
        this._isLoggedIn.next(true);
      });
  }

  // login(user) {
  //   return this.http.post(`${this.url}/api/authenticationtoken`, user, {responseType:"text"}).pipe(
  //     take(1),
  //     map((res: any) => {
  //       this.etat=true;
  //       this.token = res;
  //       localStorage.setItem('jwt',res);
  //       this.router.navigateByUrl('dashboard');
  //       this._isLoggedIn.next(true);
  //     })
  //   );
  // }
  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }
  register(model : any): Observable<any> {
    return this.http.post<any>(`${this.url}/authentication_token`,model, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  isAuthorized() {
    // Just check if token exists
    // It not, user has never logged in current session
    return Boolean(localStorage.getItem('jwt'));
  }
  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('jwt');
    // this.token = null;
    this.router.navigateByUrl('');
  } 
  getAllUsers(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }

  postUser(formData : any) {
    return this.http.post<any>(`${this.url}`, formData)
  }

  put(id : number,data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteUsers(id:number){
    return this.http.delete(this.url+"/"+id);
  }
}
