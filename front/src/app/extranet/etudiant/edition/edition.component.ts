import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnexionService } from '../../../services/connexion.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Student, STATE, ANSWER } from 'src/app/interfaces/interface';


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
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  exampleForm: FormGroup;
  loading:boolean=false;
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
  item: Student={"email":"...","first_name":"...","last_name":"...","company":"...","wage":"...","option":"...","promotion":0,"working_city":"...","linkedin_url":"..."};

  constructor(
    public api:ApiService,
    public conne: ConnexionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.conne.savedinfo === undefined){
      this.loading=true;
      this.createForm()
      this.api.getEtudiant().subscribe(
        result => {
          this.loading=false;

          var res=result as Student

          this.item=res;
          this.conne.savedinfo=this.item;
          this.createForm()
          
          
        },
        err=>{
          alert("Error");
        }
      )
    }else{
      this.item=this.conne.savedinfo;
      this.createForm();
    }
    
  }

  createForm() {
    this.exampleForm = this.fb.group({
      email: [this.item.email,Validators.required],
      first_name: [this.item.first_name, Validators.required ],
      last_name: [this.item.last_name, Validators.required ],
      promotion: [this.item.promotion, Validators.required ],
      option: [this.item.option, Validators.required ],
      company: [this.item.company],
      working_city: [this.item.working_city],
      wage: [this.item.wage],
      linkedin_url: [this.item.linkedin_url],
      role: [0, Validators.required ],
    });
  }

  onSubmit(value){
    
    this.api.updateEtudiant(value)
    .subscribe(
      result => {
        this.conne.savedinfo=value
        this.openDialog()
      },
      err=>{
        alert("Erreur lors de l'update");
      }
    )
  }

  openDialog(data={state:STATE.confirm,text:"Vos changements ont bien été sauvegardés."},width="300px"): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==ANSWER.anonym){
        this.api.anonymize()
        .subscribe(
          result => {
            this.openDialog({state:STATE.confirm,text:"Votre compte a bien été anonymisé."})
            //this.conne.deconnecte()
          },
          err=>{
            alert("Erreur lors de l'anonymisation");
          }
        )
      }else if (result==ANSWER.suppr){
        this.api.deleteUser()
        .subscribe(
          result => {
            this.openDialog({state:STATE.confirm,text:"Votre compte a bien été supprimé."})
            this.conne.deconnecte()
          },
          err=>{
            alert("Erreur lors de la suppression");
          }
        )
      }else if (result==ANSWER.ok){
        this.router.navigate(['/connexion']);
      }
      
    });
  }

  popup_email(){

  }

  anonymisation(){
    this.openDialog({state:STATE.warning,text:"Êtes-vous sûr de vouloir anonymiser votre compte? Votre nom et votre prénom seront supprimés et dissociés de vos données."})
    
  }

  supprimer(){
    this.openDialog({state:STATE.warning_suppr,text:"Êtes-vous sur de vouloir supprimer votre compte et supprimer toutes vos données? A la place vous pouvez l'anonymiser, votre nom et votre prénom seront supprimés et dissociés de vos données."},"600px")
  }
}