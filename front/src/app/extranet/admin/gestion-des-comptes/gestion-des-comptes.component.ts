import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User, STATE, ANSWER } from 'src/app/interfaces/interface';
import { ConnexionService } from 'src/app/services/connexion.service';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ImportUsersComponent } from '../import-users/import-users.component';

@Component({
  selector: 'app-gestion-des-comptes',
  templateUrl: './gestion-des-comptes.component.html',
  styleUrls: ['./gestion-des-comptes.component.scss']  
})
export class GestionDesComptesComponent implements OnInit {

  max:number=(new Date()).getFullYear();
  min:number=1970;
  promo_min_value: number = 1970;
  promo_max_value: number = this.max;
  searchValue: string = "";
  items: Array<User>;
  items_name_filtered: Array<User>;
  items_promo_filtered: Array<User>;
  items_filtered : Array<User>;
  items_filtered_prof : Array<User>;
  items_filtered_etu : Array<User>;

  options_bddtoview: object = {
    'icc': 'Ingénierie Cloud Computing',
    'iapau': 'Intelligence Artificielle à Pau',
    'imsi': 'Ingénierie Mathématique et Simulation Numérique',
    'inem': 'Informatique Embarquée',
    'iacergy': 'Intelligence Artificielle à Cergy',
    'vc': 'Visual Computing',
    'fintech': 'Finance et Technologie',
    'erp': 'Intégration ERP',
    'ingfin': 'Ingénierie Financière',
    'ds': 'Data Science',
    'bi': 'Business Intelligence & Analytics',
    'secu': 'Cybersécurité',
  }

  loading:boolean=true

  constructor(
    public api : ApiService,
    private router: Router,
    public dialog: MatDialog,
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
      this.set_items_filtered()
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
    this.set_items_filtered()
    
  }

  promofilter_change(event){
    this.items_promo_filtered = this.items.filter(item=> (item.promotion>=this.promo_min_value && item.promotion<=this.promo_max_value) || item.role==1)
    this.set_items_filtered()
  }

  set_items_filtered(){
    this.items_filtered = this.combineLists(this.items_name_filtered,this.items_promo_filtered)
    this.items_filtered_prof=this.items_filtered.filter(item=>item.role==1)
    this.items_filtered_etu=this.items_filtered.filter(item=>item.role!=1)
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

  tabchange($event){

  }

  create_teacher(){
    this.openDialogTeacher()
  }


  openDialog(data={state:STATE.confirm,text:"Le compte professeur a bien été créé"}): void {
    this.getData()
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  open_import(){
    const dialogRef = this.dialog.open(ImportUsersComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData()
    });

  }

  openDialogTeacher(): void {
    const dialogRef = this.dialog.open(CreateTeacherComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.openDialog()
      }
      
    });
  }

}