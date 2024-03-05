import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isLoggedIn = false; // Vous pouvez déterminer cela en vérifiant un service d'authentification ou un token stocké

  constructor(public userAuthService: UserAuthService,private router: Router) {}

  onSeConnecter() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/login']);
      this.deconnecter();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }  

  deconnecter() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.userAuthService.logout().then(()=>{
      localStorage.setItem('token', "")
      this.router.navigateByUrl('/')
    }).catch(()=>{
      localStorage.setItem('token', "")
      this.router.navigateByUrl('/')
    })
   
  }

  openStats(){
    this.router.navigate(['/admin']);
  }
}
