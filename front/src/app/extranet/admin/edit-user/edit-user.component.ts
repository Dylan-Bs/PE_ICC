import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ConnexionService } from 'src/app/services/connexion.service';
import { ApiService } from 'src/app/services/api.service';
import { Student, User, STATE, ANSWER } from 'src/app/interfaces/interface';

export interface option {
  value: string;
  viewValue: string;
}

export interface optionsIng3Group {
  disabled?: boolean;
  name: string;
  option: option[];
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  optionsIng3Groups: optionsIng3Group[] = [
    {
      name: 'Pau',
      option: [
        { value: 'icc', viewValue: 'Ingénierie Cloud Computing' },
        { value: 'iapau', viewValue: 'Intelligence Artificielle' },
        { value: 'imsi', viewValue: 'Ingénierie Mathématique et Simulation Numérique' },
        { value: 'erp', viewValue: 'Intégration ERP'},
      ]
    },
    {
      name: 'Cergy',
      option: [
        { value: 'inem', viewValue: 'Informatique Embarquée' },
        { value: 'iacergy', viewValue: 'Intelligence Artificielle' },
        { value: 'vc', viewValue: 'Visual Computing' },
        { value: 'fintech', viewValue: 'Finance et Technologie' },
        { value: 'ingfin', viewValue: 'Ingénierie Financière'},
        { value: 'ds', viewValue: 'Data Science'},
        { value: 'bi', viewValue: 'Business Intelligence & Analytics'},
        { value: 'secu', viewValue: 'Cybersécurité'},
      ]
    },
  ];
  item: User={"id":0,"email":"...","first_name":"...","last_name":"...","company":"...","wage":"...","option":"...","promotion":0,"working_city":"...","linkedin_url":"...","role":0};
  loading:boolean=false;
  role:number=1

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public conne:ConnexionService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        
          this.loading=true;
          this.item=data;
          this.createForm()
          this.loading=false;
          this.role=this.item.role
      }
    })
    
  }

  createForm() {
    if (this.item.linkedin_url == "Non renseigné") {
      this.item.linkedin_url =''
    }
    this.exampleForm = this.fb.group({
      email: [this.item.email],
      password: [this.item.password],
      first_name: [this.item.first_name],
      last_name: [this.item.last_name],
      promotion: [this.item.promotion],
      option: [this.item.option],
      company: [this.item.company],
      working_city: [this.item.working_city],
      wage: [this.item.wage],
      linkedin_url: [this.item.linkedin_url],
      role: [this.item.role],
    });
  }

  onSubmit(value){
    if (this.role==1){
      this.api.updateTeacher(value,this.item.id)
    .subscribe(
      result => {
        this.openDialog()
      },
      err=>{
        alert("Error");
      }
    )
    }else{
      this.api.updateEtudiantAdmin(value,this.item.id)
    .subscribe(
      result => {
        this.openDialog()
      },
      err=>{
        alert("Error");
      }
    )
    }
    
  }

  openDialog(data={state:STATE.confirm,text:"Les changements ont bien été sauvegardés."}): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==ANSWER.yes){
        this.api.deleteUserAdmin({"id":this.item.id})
        .subscribe(
          result => {
            this.openDialog({state:STATE.confirm,text:"Le compte a bien été supprimé."})
            this.router.navigate(['extranet/admin']);
          },
          err => {
            console.log(err);
          }
        )
      }else if (result==ANSWER.ok){
        this.router.navigate(['extranet/admin']);
      }
      
    });
  }

  delete(){
    this.openDialog({state:STATE.warning,text:"Etes vous sur de supprimer ce compte et ainsi perdre toutes ses données."})
  }

  cancel(){
    this.router.navigate(['extranet/admin']);
  }

}
