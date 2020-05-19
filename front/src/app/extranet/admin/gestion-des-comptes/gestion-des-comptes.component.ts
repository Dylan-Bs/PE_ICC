import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-gestion-des-comptes',
  templateUrl: './gestion-des-comptes.component.html',
  styleUrls: ['./gestion-des-comptes.component.scss']  
})
export class GestionDesComptesComponent implements OnInit {

  max:number=(new Date()).getFullYear();
  promoValue: number = 0;
  searchValue: string = "";
  items: Array<User>;
  items_filtered: Array<User>;

  loading:boolean=true

  constructor(
    public firebaseService: FirebaseService,
    public api : ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loading=true
    this.api.getUsers()
    .subscribe(result => {
      console.log(result)
      this.loading=false
      var res =result as Array<User>
      this.items = res;
      this.items_filtered = res;
    })
  }

  viewDetails(item){
    this.router.navigate(['extranet/admin/details/'+ item.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.items_filtered = this.items.filter(item=> (item.first_name+item.last_name).toLowerCase().includes(value))
  }

  rangeChange(event){
    /*this.firebaseService.searchUsersByPromo(event.value)
    .subscribe(result =>{
      this.promo_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })*/
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