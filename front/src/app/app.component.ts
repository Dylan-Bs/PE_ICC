import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ConnexionService } from './services/connexion.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent implements OnInit {
  title:string = 'projet-angular-app';

  enable_overflowy:boolean=true;

  @ViewChild("main", {read: ElementRef}) main: ElementRef;

  open:boolean=false;
  constructor(public conne:ConnexionService,public app: FirebaseApp,public router:Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        this.close()
        console.log(this.main.nativeElement.style);
      }
  });

  }

  _toggle(){
    this.open=!this.open;
  }

  close(){
    this.open=false;
  }

  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    if (w < breakpoint) {
      return true;
    } else {
      this.close()
      return false;

    }
  }

  onResize(event){
    this.isMobile = this.getIsMobile();
  }

  ngOnInit() {
    this.isMobile = this.getIsMobile();
  }

  
}