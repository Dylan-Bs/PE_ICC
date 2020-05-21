import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts';
import { HighchartsService } from 'src/app/services/highcharts.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {


  

  constructor(
    public api: ApiService,public hc:HighchartsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart'; // optional string, defaults to 'chart'

  option_option :Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Proportion des étudiants par option'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
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
  series: this.hc.options,
  credits:{
    enabled:false
  }
  }


  option_promo: Highcharts.Options = {
    chart: {
      backgroundColor: '#00000000',
      type: 'column'
    },
    title: {
      text: 'Etudiants par promotion'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
        min: 0,
        title: {
            text: "Nombres d'étudiants par promotion"
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
  },
  plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      }
  },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{point.x}</span><br>',
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>Total: {point.stackTotal}'
    },
    series: this.hc.etu_promo,
    credits:{
      enabled:false
    }
  };



  chartCallback = function (chart) {  } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = false; // optional boolean, defaults to false

}