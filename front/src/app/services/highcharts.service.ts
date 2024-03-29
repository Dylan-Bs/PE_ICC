import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  etu_promo:Array<any>=[]

  etu_options:Array<any>=[]

  etu_wage:Array<any>=[]

  etu_wage_option:Array<any>=[]

  etu_company:Array<any>=[]

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

   /*maj_students(){
    this.api.getEtudiants()
    .subscribe(result => {
      this.data=result as Array<any>
      this.update_graph_data(this.data)
    })
   }*/

   

   update_graph_data(data:Array<any>){
    this.etu_promo=[]

    this.etu_options=[]
  
    this.etu_wage=[]
    this.etu_wage_option=[]
  
    this.etu_company=[]

    for (let k=0;k<data.length;k++){
      
      let id_promo=-1

      let id_option=-1

      let id_company=-1
      
      let id_wage=-1

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

      for (let i=0;i<this.etu_company.length;i++){
        if (this.etu_company[i].name==this.data[k].working_city){
          id_company=i
        }
      }

      

      if (id_company==-1){
        this.etu_company.push({"name":this.data[k].working_city,"data":[{"name":this.data[k].company,"value":1}]})
      }else{
        let id_company2=-1
        for (let i=0;i<this.etu_company[id_company]["data"].length;i++){
          if (this.etu_company[id_company]["data"][i].name==this.data[k].company){
            id_company2=i
          }
        }

        if (id_company2==-1){
          this.etu_company[id_company]["data"].push({"name":this.data[k].company,"value":1})
        }else{
          this.etu_company[id_company]["data"][id_company2].value+=1
        }

      }


      if (! isNaN(parseInt(data[k].wage))){

        for (let i=0;i<this.etu_wage_option.length;i++){
          if (this.etu_wage_option[i].name==this.options_bddtoview[data[k].option]){
            id_wage=i
          }
        }

        if (id_wage==-1){
          this.etu_wage_option.push({"name":this.options_bddtoview[data[k].option],"data":[{x:-1,y:parseFloat(data[k].wage),"name":data[k].email,selected:false}]})
        }else{
          this.etu_wage_option[id_wage]["data"].push({x:-1,y:parseFloat(data[k].wage),"name":data[k].email,selected:false})
        }

        this.etu_wage.push({"name":data[k].email,"y":parseFloat(data[k].wage),selected:false,currency:':val €'})
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
          this.etu_promo[id_promo]["data"][id_promo2].y+=1
        }
      }
    }

    this.etu_wage.sort(function(a, b) {
      return a.y - b.y;
    });


    let max_length=0
    let current_wage=9999999
    for (let i=0;i<this.etu_wage_option.length;i++){
      this.etu_wage_option[i]["data"].sort(function(a, b) {
        return a.y - b.y;
      });
      this.etu_wage_option[i]["point"]={
        events: {
            select: function(event) {

            },
            unselect: function(event) {
                event.preventDefault();
            }
        }
    }
    let current_data_min=this.etu_wage_option[i]["data"][0].y
    for (let k=0;k<this.etu_wage_option[i]["data"].length;k++){
      current_data_min=Math.min(this.etu_wage_option[i]["data"][k].y,current_data_min)
    }
    current_wage=Math.min(current_wage,current_data_min)
      max_length+=this.etu_wage_option[i]["data"].length
    }


    let iterator=0
    let min_wage=9999999.0
    let min_ids=[0,0]
    for (let n=0;n<max_length;n++){
      min_wage=9999999.0
      for (let i=0;i<this.etu_wage_option.length;i++){
        for (let k=0;k<this.etu_wage_option[i]["data"].length;k++){
          if (this.etu_wage_option[i]["data"][k].x==-1){
            if (this.etu_wage_option[i]["data"][k].y<min_wage){
              min_wage=this.etu_wage_option[i]["data"][k].y
              min_ids=[i,k]
            }
            
          }
          
        }
        
      }
      this.etu_wage_option[min_ids[0]]["data"][min_ids[1]].x=iterator
      if (iterator==0){
        //this.etu_wage_option[min_ids[0]]["data"][min_ids[1]].selected=true
      }
      iterator+=1
      
    }
    

    this.etu_wage[0].selected=true

   }

   get_detail(email){
     var index=0
    for (let i=0;i<this.data.length;i++){
      
      if (this.data[i].email==email){
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

     return (acc/this.etu_wage.length)
   }
}
