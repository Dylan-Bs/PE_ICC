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
      email: [this.item.email, Validators.required ],
      password: [this.item.password, Validators.required ],
      name: [this.item.name, Validators.required ],
      surname: [this.item.surname, Validators.required ],
      promo: [this.item.promo, Validators.required ],
      optionsIng3Control: [this.item.optionsIng3Control, Validators.required ],
      entreprise: [this.item.entreprise, Validators.required ],
      ville: [this.item.ville, Validators.required ],
      salaire: [this.item.salaire, Validators.required ],
    });
  }
}
