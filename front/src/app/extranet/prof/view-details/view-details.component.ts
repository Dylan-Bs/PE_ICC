import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

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
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  exampleForm: FormGroup;
  optionsIng3Groups: optionsIng3Group[] = [
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
  item: any;

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      email: [{
        value : this.item.email,
        disabled: true
      }, Validators.required ],
      password: [{
        value : this.item.password,
        disabled: true
      }, Validators.required ],
      name: [{
        value : this.item.name,
        disabled: true
      }, Validators.required ],
      surname: [{
        value : this.item.surname,
        disabled: true
      }, Validators.required ],
      promo: [{
        value : this.item.promo,
        disabled: true
      }, Validators.required ],
      optionsIng3Control: [{
        value : this.item.optionsIng3Control,
        disabled: true
      }, Validators.required ],
      entreprise: [{
        value : this.item.entreprise,
        disabled: true
      }, Validators.required ],
      ville: [{
        value : this.item.ville,
        disabled: true
      }, Validators.required ],
      salaire: [{
        value : this.item.salaire,
        disabled: true
      }, Validators.required ],
    });
  }
}
