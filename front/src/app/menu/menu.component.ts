import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class MenuComponent implements OnInit {
  constructor(public conne:ConnexionService, public  parent:AppComponent,public router:Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'logoPEICC',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/logoPEICC_blanc.svg'));
  }
  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    if (w < breakpoint) {
      return true;
    } else {
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
