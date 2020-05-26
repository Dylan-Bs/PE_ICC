import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';
import { ApiService } from '../services/api.service';
import { STATE, ANSWER } from '../interfaces/interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  selector: 'app-collecte',
  templateUrl: './collecte.component.html',
  styleUrls: ['./collecte.component.scss']
})



export class CollecteComponent implements OnInit {

  personalForm: FormGroup;
  professionalForm: FormGroup;
  validationForm: FormGroup;

  loading: Boolean = false;

  max: number = (new Date()).getFullYear();
  promo_value: number = this.max;

  optionsIng3Groups: optionsIng3Group[] = [
    {
      name: 'Pau',
      option: [
        { value: 'icc', viewValue: 'Ingénierie Cloud Computing' },
        { value: 'iapau', viewValue: 'Intelligence Artificielle' },
        { value: 'imsi', viewValue: 'Ingénierie Mathématique et Simulation Numérique' },
        { value: 'erp', viewValue: 'Intégration ERP' },
      ]
    },
    {
      name: 'Cergy',
      option: [
        { value: 'inem', viewValue: 'Informatique Embarquée' },
        { value: 'iacergy', viewValue: 'Intelligence Artificielle' },
        { value: 'vc', viewValue: 'Visual Computing' },
        { value: 'fintech', viewValue: 'Finance et Technologie' },
        { value: 'ingfin', viewValue: 'Ingénierie Financière' },
        { value: 'ds', viewValue: 'Data Science' },
        { value: 'bi', viewValue: 'Business Intelligence & Analytics' },
        { value: 'secu', viewValue: 'Cybersécurité' },
      ]
    },
  ];

  indeterminate: boolean = false;
  labelPosition: string = 'after';
  disabled: boolean = false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'L\' adresse mail est requise' },
      { type: 'email', message: 'Entrez une adresse valide' }
    ],
    'password': [
      { type: 'required', message: 'Le mot de passe est requis' },
      { type: 'minlength', message: 'Le mot de passe doit faire minimum 7 caractères' }
    ],
    'last_name': [
      { type: 'required', message: 'Le nom est requis' }
    ],
    'first_name': [
      { type: 'required', message: 'Le prénom est requis' }
    ],
    'optionsIng3Control': [
      { type: 'required', message: 'L\' option est requise' },
    ],
    'promo': [
      { type: 'required', message: 'L\' année de promotion est requise' },
      { type: 'promo', message: 'Entrez une année comprise entre 1990 et l\'année actuelle' }
    ]
  };


  constructor(
    private fb: FormBuilder,
    public conne: ConnexionService,
    public api: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.personalForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      promo: ['', [Validators.required, this.checkPromo]],
      optionsIng3Control: ['', Validators.required]
    });
    this.professionalForm = this.fb.group({
      entreprise: [''],
      ville: [''],
      salaire: [''],
      linkedin_url: ['']
    });
    this.validationForm = this.fb.group({
      autorisationCollecte: ['']
    });
  }


  resetFields() {
    this.personalForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      last_name: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      promo: new FormControl('', [Validators.required, this.checkPromo]),
      optionsIng3Control: new FormControl('', Validators.required)
    });
    this.professionalForm = this.fb.group({
      entreprise: new FormControl(''),
      ville: new FormControl(''),
      salaire: new FormControl(''),
      linkedin_url: new FormControl('')
    });
    this.validationForm = this.fb.group({
      autorisationCollecte: new FormControl('')
    });
  }


  onSubmit() {

    let a: Object = this.personalForm.value
    let b: Object = this.professionalForm.value

    let value: Object = Object.assign({}, a, b);
    this.loading = true

    console.log(value)

    this.api.createUser(value).subscribe(
      result => {
        this.loading = false;
        this.resetFields();
        this.conne.form_send = true;
        this.openDialog()
      },
      err => {
        alert("Error")
      }
    )

  }

  openDialog(data = { state: STATE.confirm, text: "Vos données ont été transmises, merci pour votre coopération" }): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == ANSWER.ok) {
        this.router.navigate(['/connexion']);
      }

    });
  }

  checkPromo(control: FormControl) {
    let maxi: number;
    maxi = (new Date()).getFullYear();
    return control.value >= 1990 && control.value <= maxi ? null : { 'promo': true };
  }

}