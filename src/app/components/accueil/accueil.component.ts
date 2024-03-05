import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ParticipationModalComponent } from 'src/app/participation-modal/participation-modal.component';
import { PlayService } from 'src/app/play.service';
import { UserAuthService } from 'src/app/user-auth.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css', './responsive.component.css' ]
  
})
export class AccueilComponent implements OnInit{
  isLoggedIn = false;
  numeroControl = new FormControl('');
  private numerosGagnants: string[] = ['1234567890', '1122334455', '2233445566'];
  private numerosDejaUtilises: string[] = ['9988776655', '8877665544', '0000000000'];
  user!:User;

  constructor(public userAuthService: UserAuthService,private playService : PlayService,  private router: Router , public dialog: MatDialog) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
       this.router.navigateByUrl('/')
     }else {
       this.userAuthService.getUser().then(({data})=>{
         this.user = data;
       })
     }
   }

  verifierNumero() {
    if (!this.checkLogin()) {
      this.afficherPopin('Attention', 'Vous devez vous connecter pour participer');
      return;
    }
    const numeroSaisi = this.numeroControl.value;
    let payload = {
      ticket: numeroSaisi
  }

    if (numeroSaisi && numeroSaisi.length === 10) {
      this.playService.play(payload)
      .then(({data}) => {
        if (data.used) {
          this.afficherPopin("Attention", "Ce code est déjà utilisé. Veuillez saisir un autre.");
        } else if (data.winner) {
          this.afficherPopin("Félicitations", this.genererMessage(data.type));
        } else {
          this.afficherPopin("Attention", "Ce code est invalide.");
        }
      // data.gagnant--data.type
      }).catch(error => {
        this.afficherPopin("Attention", "Ce code est invalide.");
      })
    } else {
      alert("Veuillez entrer un numéro de 10 chiffres.");
    }

   
 
  }


  genererMessage(type: string): string {
    if (type ==  "THE") return "Félicitations, vous avez gagné un infuseur à thé!";
    if (type ==  "DTX") return "Félicitations, vous avez gagné une boite de 100g d’un thé détox ou d’infusion!";
    if (type ==  "THS") return "Félicitations, vous avez gagné une boite de 100g d’un thé signature!";
    if (type ==  "C39") return "Félicitations, vous avez gagné un coffret découverte d’une valeur de 39€!";
    return "Félicitations, vous avez gagné un coffret découverte d’une valeur de 69€!";
  }

  afficherPopin(title:string, message: string) {
    this.dialog.open(ParticipationModalComponent, {
      data: {title, message}
    });
  }

  checkLogin(): boolean {
    return this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }  

}
