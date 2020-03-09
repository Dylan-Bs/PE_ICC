import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-gestion-des-comptes',
  templateUrl: './gestion-des-comptes.component.html',
  styleUrls: ['./gestion-des-comptes.component.scss']  
})
export class GestionDesComptesComponent implements OnInit {

  promoValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  promo_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
      this.promo_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['extranet/admin/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.promo_filtered_items);
    })
  }

  rangeChange(event){
    this.firebaseService.searchUsersByPromo(event.value)
    .subscribe(result =>{
      this.promo_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}