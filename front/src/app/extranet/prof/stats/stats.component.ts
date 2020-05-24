import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts';
import { HighchartsService } from 'src/app/services/highcharts.service';
import * as HighchartsMore from "highcharts/highcharts-more";
import { Student } from 'src/app/interfaces/interface';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {


    item:Student={"email":"...","first_name":"...","last_name":"...","company":"...","wage":"...","option":"...","promotion":0,"working_city":"..."};

  constructor(
    public api: ApiService,public hc:HighchartsService
  ) {
    
   }

  ngOnInit() {
    this.updateFlag=false
    this.api.getEtudiants()
    .subscribe(result => {
      var res=result as Array<any>
      if (res!=this.hc.data){
        this.hc.data=res
        this.hc.update_graph_data(this.hc.data)
        this.updateFlag=true
      }
      
    })
  }

  ngAfterViewInit() {
    

  }

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chart
  option_option :Highcharts.Options = {
    chart: {
        backgroundColor: '#00000000',
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
  series: [{
    name: 'Etudiants',
    colorByPoint: true,
    data:this.hc.etu_options
  }] as Array<any>,
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


  option_wage: Highcharts.Options = {

    chart: {
        backgroundColor: '#00000000',
        type: 'column'
    },
    
    plotOptions: {
    	column:{
      	allowPointSelect: true,
        cursor: 'pointer',states: {
                select: {
                    color: "#a6cdf2"
                }
            }
      },
      series: {
        cursor: 'pointer',
        point: {
            events: {
                click: function (e) {
                    const p = e.point
                   
                    this.get_detail(p["id"])
                }.bind(this),
            }
        }
    }
    },
    title: {
        text: 'Salaire par an des étudiants'
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
            text: 'Salaire par an (€)'
        },
        plotLines: [{
        label: {
                text:'<b>Moyenne</b> '+this.hc.mean_etu_wage(),
                align: 'left',
                style: {
                    color: 'red',
                    fontWeight: 'bold'
                }
            },
        color: 'red',
        value : this.hc.mean_etu_wage(),
        zIndex: 5 // To not get stuck below the regular plot lines
    }]
    },
    
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Salaire: <b>{point.y:.1f} €</b>'
    },
    series: [{name: 'Etudiants',color : "#7cb5ec",
        data: this.hc.etu_wage,
        
        
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
        
    }] as Array<any>
    ,credits:{
        enabled:false
      }

  }

  option_company: Highcharts.Options = {
    chart: {
        backgroundColor: '#00000000',
      type: 'packedbubble'

    },
    title: {
      text: "Etudiants par entreprise"
    },
    subtitle:{
        text:"Regroupé par ville"
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} Etudiants'
    },
    plotOptions: {
      packedbubble: {
        minSize: '10%',
        maxSize: '100%',
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: true,
          parentNodeLimit: true,
          enableSimulation: false
        } as object,
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 0
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal'
          }
        }
      } as object
    },
    series:this.hc.etu_company,
    credits:{
        enabled:false
      }
}

  get_detail(id){
    this.item=this.hc.get_detail(id)
  }

  tabchange($event){
      if($event.index==2 && this.item.email=="..."){
        this.get_detail(this.hc.etu_wage[0].id)
        
      }

  }
  

  chartCallback = function (chart) {
      console.log(chart)
    } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false

}