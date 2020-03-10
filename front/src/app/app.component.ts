import { Component, ViewChild,ElementRef } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-angular-app';
  @ViewChild('snav', { static: false }) snav: ElementRef;

  constructor(public conne:ConnexionService,public app: FirebaseApp) {

  }

  
}