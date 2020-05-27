import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts';
import { HighchartsService } from 'src/app/services/highcharts.service';
import * as HighchartsMore from "highcharts/highcharts-more";
import { Student } from 'src/app/interfaces/interface';
import { ActivatedRoute } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

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


  options_bddtoview:object={'icc': 'ICC',
  'iapau': 'IA PAU',
  'imsi': 'IMSI',
'inem': 'INEM',
  'iacergy': 'IA CERGY',
  'vc': 'VC',
  'fintech': 'FINTECH'}

    item:Student={"email":"","first_name":"","last_name":"","company":"","wage":"0","option":"","promotion":0,"working_city":"","linkedin_url":"..."};

  constructor(
    public api: ApiService,public hc:HighchartsService,private route: ActivatedRoute,public conne:ConnexionService
  ) {
    
   }

   ngOnInit() {
    this.route.data.subscribe(routeData => {})
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
      text: 'Proportion des diplômés par option'
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
    name: 'Diplômés',
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
      text: 'Diplômés par promotion'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
        min: 0,
        title: {
            text: "Nombres de diplômés par promotion"
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
                  color: "#DDDDDD"
              }
          }
    },
    series: {
      stacking: 'normal',
      cursor: 'pointer',
      point: {
          events: {
              click: function (e) {
                  const p = e.point
                 this.get_detail(p["name"])
                  
              }.bind(this),
          }
      }
  }
  },
  title: {
      text: 'Salaire par an des diplômés'
  },
  xAxis: {
      type: 'category',
      title: {
          text: 'Diplomés'
      },
      labels: {
          enabled:false
      }
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Salaire par an (€)'
      },
      plotLines: [{
      label: {
              text:'<b>Moyenne</b> '+(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.hc.mean_etu_wage())),
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
  tooltip: {
      headerFormat: "Cliquez pour plus d'informations",
      pointFormat: '<br>Salaire: <b>{point.y:,.2f} €</b>'
  },
  series: this.hc.etu_wage_option
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
      text: "Diplômés par entreprise"
    },
    subtitle:{
        text:"Regroupé par ville"
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} Diplômés'
    },
    plotOptions: {
      packedbubble: {
        minSize: '10%',
        maxSize: '100%',
        zMin: 0,
        zMax: 10,
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

  get_detail(email){
    this.item=this.hc.get_detail(email)
  }

  tabchange($event){
      if($event.index==2 && this.item.email==""){
        //this.get_detail(this.hc.etu_wage[0].name)
        
      }

  }
  

  chartCallback = function (chart) {
      console.log(chart)
    } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false


check_detail(item){
  let type=0
  if (item.hasOwnProperty("id") && item.name!=undefined && this.item.email!=''){
    if (item.option==this.conne.userOption){
      type=1
    }else{
      type=2
    }
  }
   return type
}

}