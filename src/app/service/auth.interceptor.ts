import { 
  HttpErrorResponse,
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest 
} from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  
  // BUG Angular 4.3: we cannot inject the provider
  // constructor(private authService: AuthService) {}

  // FIX: we need to manually use the injector
  constructor(
    private injector: Injector,
    private router: Router,
  ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add auth header with jwt if account is logged in and request is to the api url
//     // const account = this.accountService.accountValue;
//     const isLoggedIn = this.authService.token;
//     // const isApiUrl = request.url.startsWith(environment.apiUrl);
//     if (isLoggedIn/* && isApiUrl*/) {
//         request = request.clone({
//             setHeaders: { Authorization: `Bearer ${this.authService.token}` }
//         });
//     }

//     return next.handle(request);
// }

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log('Intercepted!', req);
    const authService = this.injector.get(AuthService);
    const copiedReq = req.clone({
      headers: req.headers.set(
        'authorization', 'Bearer ' + authService.token
      )
    });
    
    if (!authService.token) {
      this.router.navigateByUrl('login');
    }
    

    return next.handle(copiedReq).pipe(
            catchError(err => {
                // onError
                console.log(err);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    console.log(err.statusText);
                    if (err.status === 401) {
                      localStorage.removeItem('jwt');
                      this.router.navigate(['/login']);
                    }
                }
                return throwError(err);
            })) as any;
  }
}
