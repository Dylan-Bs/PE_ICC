import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/interface';
import { ConnexionService } from 'src/app/services/connexion.service';

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
  items_name_filtered: Array<User>;
  items_promo_filtered: Array<User>;
  items_filtered : Array<User>;

  loading:boolean=true

  constructor(
    public api : ApiService,
    private router: Router,
    public conne:ConnexionService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loading=true
    this.api.getUsers()
    .subscribe(result => {
      this.loading=false
      var res =result as Array<User>
      this.items = res;
      this.items_name_filtered = res;
      this.items_promo_filtered = res;
      this.items_filtered=res;
      this.conne.savedinfo=res;
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
    this.items_name_filtered = this.items.filter(item=> (item.first_name+item.last_name).toLowerCase().includes(value))
    this.items_filtered = this.combineLists(this.items_name_filtered,this.items_promo_filtered)
  }

  rangeChange(event){
    let value=event.value
    this.items_promo_filtered = this.items.filter(item=> item.promotion>=value || item.promotion===undefined)
    this.items_filtered = this.combineLists(this.items_name_filtered,this.items_promo_filtered)
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.id == x.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}