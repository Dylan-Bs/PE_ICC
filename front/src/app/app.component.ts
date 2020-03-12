import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ConnexionService } from './services/connexion.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'projet-angular-app';

  open:boolean=false;
  constructor(public conne:ConnexionService,public app: FirebaseApp) {

  }

  _toggle(){
    this.open=!this.open;
  }

  
}