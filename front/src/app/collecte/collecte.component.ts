import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ConnexionService } from '../services/connexion.service';

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

  exampleForm: FormGroup;

  optionsIng3Groups: optionsIng3Group[] = [
    {
      name: 'Pau',
      option: [
        { value: 'icc', viewValue: 'Ingénierie Cloud Computing' },
        { value: 'iapau', viewValue: 'Intelligence Artificielle' },
        { value: 'imsi', viewValue: 'Ingénierie Mathématique et Simulation Numérique' },
      ]
    },
    {
      name: 'Cergy',
      option: [
        { value: 'inem', viewValue: 'Informatique Embarquée' },
        { value: 'iacergy', viewValue: 'Intelligence Artificielle' },
        { value: 'vc', viewValue: 'Visual Computing' },
        { value: 'fintech', viewValue: 'Finance et Technologie' },
      ]
    },
  ];

  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'L\' adresse mail est requise' },
      { type: 'email', message: 'Entrez une adresse valide' }
    ],
    'password': [
      { type: 'required', message: 'Le mot de passe est requis' },
      { type: 'minlength', message: 'Le mot de passe doit faire minimum 7 caractères' }
    ],
    'name': [
      { type: 'required', message: 'Le nom est requis' }
    ],
    'surname': [
      { type: 'required', message: 'Le prénom est requis' }
    ],
    'optionsIng3Control': [
      { type: 'required', message: 'L\' option est requise' },
    ],
  };

  constructor(
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
    public conne: ConnexionService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      promo: ['', Validators.required],
      optionsIng3Control: ['', Validators.required],
      entreprise: [''],
      ville: [''],
      salaire: [''],
      autorisationCollecte: ['']
    });
  }


  resetFields() {
    this.exampleForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      promo: new FormControl('', Validators.required),
      optionsIng3Control: new FormControl('', Validators.required),
      entreprise: new FormControl(''),
      ville: new FormControl(''),
      salaire: new FormControl(''),
      autorisationCollecte: new FormControl('')
    });
  }


  onSubmit(value) {
    console.log(value)
    this.firebaseService.createUser(value)
      .then(
        res => {
          this.resetFields();
          this.conne.form_send = true;
          console.log("formulaire envoyé avec succès");
        }
      )
  }
}
