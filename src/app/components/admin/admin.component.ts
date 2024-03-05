import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ParticipationModalComponent } from 'src/app/participation-modal/participation-modal.component';
import { PlayService } from 'src/app/play.service';
import { UserAuthService } from 'src/app/user-auth.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', './responsive.component.css' ]
  
})
export class AdminComponent implements OnInit{
  isLoggedIn = false;
  numberWon : number = 0 ;
  numberLeftToWin : number = 0;


  constructor(public userAuthService: UserAuthService,private playService : PlayService,  private router: Router , public dialog: MatDialog) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
       this.router.navigateByUrl('/')
     }else {
      this.loadStats();
     }
   }

  checkLogin(): boolean {
    return this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }  


  loadStats() {
    this.playService.playStatis()
    .then(({data}) => {
      this.numberWon =  data.numberWon;
      this.numberLeftToWin = data.numberLeftToWin
    }).catch(error => {
      return error
    })
  }
}
