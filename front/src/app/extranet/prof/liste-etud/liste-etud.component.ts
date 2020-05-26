import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../../../services/connexion.service';
import { Student, STATE } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-liste-etud',
  templateUrl: './liste-etud.component.html',
  styleUrls: ['./liste-etud.component.scss']
})
export class ListeEtudComponent implements OnInit {

  max:number=(new Date()).getFullYear();
  min:number=1970;
  promo_min_value: number = 1970;
  promo_max_value: number = this.max;
  searchValue: string = "";
  items: Array<Student>;
  items_name_filtered: Array<Student>;
  items_promo_filtered: Array<Student>;
  items_filtered : Array<Student>;

  loading:boolean=true

  constructor(
    public api : ApiService,
    private router: Router,
    public conne:ConnexionService,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loading=true
    this.api.getEtudByOption(this.conne.user["option"])
    .subscribe(result => {
      this.loading=false
      var res =result as Array<Student>
      res=res.filter(item=>item.hasOwnProperty("id")==true)
      this.items = res;
      this.items_name_filtered = res;
      this.items_promo_filtered = res;
      this.items_filtered=res;
      this.conne.savedinfo=res;
    })
  }

  viewDetails(item){
    this.router.navigate(['extranet/prof/details/'+ item.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.items_name_filtered = this.items.filter(item=> (item.name).toLowerCase().includes(value))
    this.items_filtered = this.combineLists(this.items_name_filtered,this.items_promo_filtered)
  }

  promofilter_change(event){
    this.items_promo_filtered = this.items.filter(item=> (item.promotion>=this.promo_min_value && item.promotion<=this.promo_max_value))
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

  crawlStudent(id){
    
    this.api.crawlStudent(id).subscribe(
      result=>{
        this.conne.crawlers[id]=true
        this.openDialog()
      },err=>{
        alert(err)
      }
    );

    
  }


  openDialog(data={state:STATE.confirm,text:"La demande de mise à jour a été effectué avec succès."},width="300px"): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
    });
  }
}