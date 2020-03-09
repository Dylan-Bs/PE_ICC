import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EtudiantService } from '../../services/etudiant.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: '#00000000',
      type: 'column'
    },
    title: {
      text: 'Proportion des promotions'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      allowDecimals:false,
      title: {
        text: "Nombre d'étudiants par promotion"
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y} étudiant(s)'
        }
      }
    },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
    },
    series: [{
      data: this.etuServ.promos,
      type: 'column',
      name:"Promotions"
    }],
    credits:{
      enabled:false
    }
  };



  chartOptions2: Highcharts.Options = {
    chart: {
      backgroundColor: '#00000000',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: "Proportion des entreprises"
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      data: this.etuServ.entreprises,
      type: 'pie',
      name:"Entreprises"
    }],
    credits:{
      enabled:false
    }
  };
  chartCallback = function (chart) {  } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  constructor(public etuServ:EtudiantService) {
   }

  ngOnInit() {
  }

}
