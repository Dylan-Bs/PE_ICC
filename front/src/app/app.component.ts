import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ConnexionService } from './services/connexion.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

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

  open:boolean=false;
  constructor(public conne:ConnexionService,public app: FirebaseApp,public router:Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        this.close()
      }
  });

  iconRegistry.addSvgIcon(
    'logoPEICC',
    sanitizer.bypassSecurityTrustResourceUrl('assets/img/logoPEICC_blanc.svg'));
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