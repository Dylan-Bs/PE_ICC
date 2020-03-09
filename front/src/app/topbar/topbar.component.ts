import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class TopbarComponent implements OnInit {

  lowWidth:boolean=false
  image:string;
  constructor(public connexion:ConnexionService,public router:Router,public etuServ:EtudiantService) {
    this.image="../../assets/logo.png";
   }
  onResize(event){
    this.lowWidth=event.target.innerWidth<700
  }
  ngOnInit() {
    this.lowWidth=window.innerWidth<700
  }

}
