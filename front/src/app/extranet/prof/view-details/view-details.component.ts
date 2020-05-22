import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  item: any;

  constructor(
    public api: ApiService,
    private route: ActivatedRoute
  ) { }

  options_bddtoview:object={'icc': 'Ingénierie Cloud Computing',
  'iapau': 'Intelligence Artificielle Pau',
  'imsi': 'Ingénierie Mathématique et Simulation Numérique',
'inem': 'Informatique Embarquée',
  'iacergy': 'Intelligence Artificielle Cergy',
  'vc': 'Visual Computing',
  'fintech': 'Finance et Technologie'}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data;
        console.log(this.item)
        if (this.item.email == "") {
          this.item.email = "Non renseigné"
        }
        if (this.item.promotion == "") {
          this.item.promotion = "Non renseigné"
        }
        if (this.item.option == "") {
          this.item.option = "Non renseigné"
        }
        if (this.item.company == "") {
          this.item.company = "Non renseigné"
        }
        if (this.item.working_city == "") {
          this.item.working_city = "Non renseigné"
        }
        if (isNaN(this.item.wage)) {
          this.item.wage = "Non renseigné"
        }
        this.item.option = this.options_bddtoview[this.item.option]
      }
    })
  }

  
}
