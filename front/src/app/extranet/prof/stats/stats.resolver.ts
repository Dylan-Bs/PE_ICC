import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from "@angular/router";
import { ConnexionService } from 'src/app/services/connexion.service';
import { ApiService } from 'src/app/services/api.service';
import { HighchartsService } from 'src/app/services/highcharts.service';


@Injectable()
export class StatsResolver implements Resolve<any> {

  constructor(public conne:ConnexionService,public api:ApiService,public hc:HighchartsService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
        
        this.api.getEtudiants()
        .subscribe(result => {
          var res=result as Array<any>
          if (res!=this.hc.data){
            this.hc.data=res
            this.hc.update_graph_data(this.hc.data)
            resolve(true)
          }
          
        })
      
    })
  }
}