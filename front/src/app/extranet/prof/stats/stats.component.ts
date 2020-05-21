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

  /*save
  Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    
    plotOptions: {
    	column:{
      	allowPointSelect: true,
        cursor: 'pointer',states: {
                select: {
                    color: "#003399"
                }
            }
      }
    },
    title: {
        text: 'World\'s largest cities per 2017'
    },
    subtitle: {
        text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        },
        plotLines: [{
        label: {
                text: 'Moyenne',
                align: 'right',
                style: {
                    color: 'red',
                    fontWeight: 'bold'
                }
            },
        color: 'red',
        value : test(),
        zIndex: 10 // To not get stuck below the regular plot lines
    }]
    },
    
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        color : "#3366AA",
        data: [
            {"name":'Shanghai', "y":24.2, selected: true},
            {"name":'a', "y":4.2}
        ],
        
        
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        },
        point: {
                events: {
                    select: function(event) {
                        
                    },
                    unselect: function(event) {
                        event.preventDefault();
                    }
                }
            }
        
    }]
});

function test(){
	return 10
}

*/

  chartCallback = function (chart) {  } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = false; // optional boolean, defaults to false

}