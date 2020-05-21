import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  etu_promo:Array<any>=[]

  options:Array<any>=[{
    name: 'Etudiants',
    colorByPoint: true,
    data:[]
  }]

  options_bddtoview:object={'icc': 'ICC',
  'iapau': 'IA PAU',
  'imsi': 'IMSI',
'inem': 'INEM',
  'iacergy': 'IA CERGY',
  'vc': 'VC',
  'fintech': 'FINTECH'}

  constructor(public api:ApiService) {

   }

   maj_students(){
    this.api.getEtudiants()
    .subscribe(result => {
      this.update_graph_data(result as Array<any>)
    })
    
   }

   update_graph_data(data:Array<any>){
    for (let k=0;k<data.length;k++){
      
      let id_promo=-1

      let id_option=-1

      for (let i=0;i<this.etu_promo.length;i++){
        if (this.etu_promo[i].name==this.options_bddtoview[data[k].option]){
          id_promo=i
        }
        if (this.options[0]["data"][i].name==this.options_bddtoview[data[k].option]){
          id_option=i
        }
      }

      if (id_option==-1){
        this.options[0]["data"].push({"name":this.options_bddtoview[data[k].option],"y":1})
      }else{
        this.options[0]["data"][id_option].y+=1
      }


      if (id_promo==-1){
        this.etu_promo.push({"name":this.options_bddtoview[data[k].option],"data":[{"x":parseInt(data[k].promotion),"y":1}]})
      }else{
        let id_promo2=-1
        for (let i=0;i<this.etu_promo[id_promo]["data"].length;i++){
          if (this.etu_promo[id_promo]["data"][i].x==parseInt(data[k].promotion)){
            id_promo2=i
          }
        }

        if (id_promo2==-1){
          this.etu_promo[id_promo]["data"].push({"x":parseInt(data[k].promotion),"y":1})
        }else{
          this.etu_promo[id_promo]["data"][id_promo2].y+1
        }
      }
    }
   }
}
