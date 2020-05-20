import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
  item: any;

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data;
        if (this.item.email == "") {
          this.item.email = "Non renseigné"
        }
        if (this.item.promo == "") {
          this.item.promo = "Non renseigné"
        }
        if (this.item.optionsIng3Control == "") {
          this.item.optionsIng3Control = "Non renseigné"
        }
        if (this.item.entreprise == "") {
          this.item.entreprise = "Non renseigné"
        }
        if (this.item.ville == "") {
          this.item.ville = "Non renseigné"
        }
        if (isNaN(this.item.salaire)) {
          this.item.salaire = "Non renseigné"
        }
        if (this.item.optionsIng3Control == "icc"){
          
          this.item.optionsIng3Control = 'Ingénierie Cloud Computing'
        }
        if (this.item.optionsIng3Control == "iapau"){
          this.item.optionsIng3Control = 'Intelligence Artificielle'
        }
        if (this.item.optionsIng3Control == "imsi"){
          this.item.optionsIng3Control = 'Ingénierie Mathématique et Simulation Numérique' 
        }
        if (this.item.optionsIng3Control == "inem"){
          this.item.optionsIng3Control = 'Informatique Embarquée'
        }
        if (this.item.optionsIng3Control == "iacergy"){
          this.item.optionsIng3Control = 'Intelligence Artificielle'
        }
        if (this.item.optionsIng3Control == "vc"){
          this.item.optionsIng3Control = 'Visual Computing'
        }
        if (this.item.optionsIng3Control == "fintech"){
          this.item.optionsIng3Control = 'Finance et Technologie'
        }
      }
    })
  }

  
}
