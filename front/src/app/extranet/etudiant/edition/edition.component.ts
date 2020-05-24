import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnexionService } from '../../../services/connexion.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/interfaces/interface';


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
  item: Student={"email":"...","first_name":"...","last_name":"...","company":"...","wage":"...","option":"...","promotion":0,"working_city":"..."};

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
      company: [this.item.company, Validators.required ],
      working_city: [this.item.working_city, Validators.required ],
      wage: [this.item.wage, Validators.required ],
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
        alert("Error");
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/connexion']);
    });
  }

  popup_email(){

  }

  anonymisation(value){
    /*this.firebaseService.anonymiser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/']);
        this.conne.connecte=false;
      },
      err => {
        console.log(err);
      }
    )*/
  }
}