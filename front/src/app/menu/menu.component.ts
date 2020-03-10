import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(public conne:ConnexionService, public  parent:AppComponent) { }

  ngOnInit() {
  }

}
