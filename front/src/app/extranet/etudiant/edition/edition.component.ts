import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase.service';
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
  option: optionsIng3Group[] = [
    {
      name: 'Pau',
      option: [
        {value: 'icc', viewValue: 'Ingénierie Cloud Computing'},
        {value: 'iapau', viewValue: 'Intelligence Artificielle'},
        {value: 'imsi', viewValue: 'Ingénierie Mathématique et Simulation Numérique'},
      ]
    },
    {
      name: 'Cergy',
      option: [
        {value: 'inem', viewValue: 'Informatique Embarquée'},
        {value: 'iacergy', viewValue: 'Intelligence Artificielle'},
        {value: 'vc', viewValue: 'Visual Computing'},
        {value: 'fintech', viewValue: 'Finance et Technologie'},
      ]
    },
  ];
  item: Student={"email":"...","first_name":"...","last_name":"...","company":"...","wage":"...","option":"...","promotion":0,"working_city":"..."};

  constructor(
    public firebaseService: FirebaseService,
    public api:ApiService,
    public conne: ConnexionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    /*this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })*/
    this.createForm()
    this.api.getEtudiant().subscribe(
      result => {
        console.log(result)

        var res=result as Student

        this.item=res;
        this.createForm()
        
        
      },
      err=>{
        alert("Error");
      }
    )
  }

  createForm() {
    this.exampleForm = this.fb.group({
      email: [{
        value : this.item.email,
        disabled: true
      },Validators.required],
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
      this.router.navigate(['extranet/etudiant/edit/:id']);
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