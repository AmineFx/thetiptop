import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailControl  = new FormControl('');
  passwordControl   = new FormControl('');
  errorMessage = '';

  username:string = ''
  password:string = ''
  isSubmitting:boolean = false
  validationErrors:Array<any> = []

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard')
    }
  }

  onLoginOld(): void {
    console.log();
    console.log(this.passwordControl.value);
    console.log(this.passwordControl .value === 'admin');
    console.log(this.emailControl.value === 'admin@admin.com');
    if (this.emailControl.value == 'admin@admin.com' && this.passwordControl.value == 'admin') {
      this.router.navigate(['/accueil']);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      this.errorMessage = 'Invalid login or password';
    }
  }

  onLogin() {
    this.isSubmitting = true;
    let payload = {
      username:this.emailControl.value,
      password: this.passwordControl .value,
  }
    this.userAuthService.login(payload)
    .then(({data}) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username)
      this.router.navigateByUrl('/accueil')
      return data
    }).catch(error => {
      this.errorMessage = 'Invalid login or password';
      this.isSubmitting = false;
      if (error.response.data.errors != undefined) {
        this.validationErrors = error.response.data.message
      }
      if (error.response.data.error != undefined) {
        this.validationErrors = error.response.data.error
      }
      return error
    })
  }

  onRegister() {
    this.router.navigateByUrl('/register')
  }

}
