import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
// import { SingleDataSet, Label } from 'ng2-charts';
// import { ChartType } from 'chart.js';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  etudiants: Array<any>;
  data: Array<number>;
  canvas: any;
  ctx: any;

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getEtudiants().subscribe(result => {
      this.etudiants = result;
      this.data = new Array(7);
      // pour ne pas avoir à remplir la bdd pour avoir un joli diagramme, je n'initialise pas le tableau avec des 0
      this.data = [0, 20, 40, 50, 60, 70, 80];
      //this.data = [0, 0, 0, 0, 0, 0, 0];
      console.log(this.data)
      this.etudiants.forEach(etudiant => {
        switch (etudiant.payload.doc.data().optionsIng3Control) {
          case "icc":
            this.data[0] += 1;
            break;
          case "iapau":
            this.data[1] += 1;
            break;
          case "imsi":
            this.data[2] += 1;
            break;
          case "inem":
            this.data[3] += 1;
            break;
          case "iacergy":
            this.data[4] += 1;
            break;
          case "vc":
            this.data[5] += 1;
            break;
          case "fintech":
            this.data[6] += 1;
            break;
          default:
            break;
        }
      });
      this.ngAfterViewInit();
    })
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    console.log("der" + this.data)
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["ICC", "IA Pau", "IMSI", "INEM", "IA Cergy", "VC", "FinTech"],
        datasets: [{
          label: 'Options des diplomes',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 106, 6, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(25, 206, 86, 1)',
            'rgba(255, 26, 86, 1)',
            'rgba(255, 206, 156, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

}