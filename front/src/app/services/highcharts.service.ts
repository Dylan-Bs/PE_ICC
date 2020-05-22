import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  etu_promo:Array<any>=[]

  etu_options:Array<any>=[]

  etu_wage:Array<any>=[]

  data:Array<any>=[]

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
      this.data=result as Array<any>
      this.update_graph_data(this.data)
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
        
      }
      for (let i=0;i<this.etu_options.length;i++){
        if (this.etu_options[i].name==this.options_bddtoview[data[k].option]){
          id_option=i
        }
      }
      if (! isNaN(parseInt(data[k].wage))){
        if (this.etu_wage.length==0){
        
          this.etu_wage.push({"name":data[k].name,"y":parseInt(data[k].wage),selected:false,"id":data[k].id})
        }else{
          this.etu_wage.push({"name":data[k].name,"y":parseInt(data[k].wage),selected:false,"id":data[k].id})
        }
      }
      

      if (id_option==-1){
        this.etu_options.push({"name":this.options_bddtoview[data[k].option],"y":1})
      }else{
        this.etu_options[id_option].y+=1
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

    this.etu_wage.sort(function(a, b) {
      return a.y - b.y;
    });

    this.etu_wage[0].selected=true

   }

   get_detail(id){
     var index=0
    for (let i=0;i<this.data.length;i++){
      if (this.data[i].id==id){
        index=i
      }
   }
    return this.data[index]
   }


   mean_etu_wage(){
     var acc=0.0
     for (let i=0;i<this.etu_wage.length;i++){
        acc+=this.etu_wage[i].y
     }

     return acc/this.etu_wage.length
   }
}
