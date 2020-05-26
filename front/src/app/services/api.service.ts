import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:string="/api";


  httpOptions =
{   
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  }),
    withCredentials: true
}

  constructor(private http: HttpClient) {
    
   }


  getUser() {
    return this.http.get(`${this.apiUrl}/user`,this.httpOptions);
  }

  getUserByID(id) {
    var idstring=id.toString()
    return this.http.get(`${this.apiUrl}/users?id=`+idstring,this.httpOptions);
  }

  deleteUserAdmin(data) {
    var options=this.httpOptions
    options["body"]=JSON.stringify(data)
    return this.http.delete(`${this.apiUrl}/user`,options);
  }

  deleteUser() {
    return this.http.delete(`${this.apiUrl}/user`,this.httpOptions);
  }

  uploadCSVFile( file,token) {
    /*
    var options=this.httpOptions
    //options.headers=options.headers.set("Content-Type","text/csv");
    return this.http.put(`${this.apiUrl}/import`, file, options)*/

    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', token);
    let options = { headers: headers,withCredentials: true };
    return this.http.put(`${this.apiUrl}/import`, formData, options)
    
}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`,this.httpOptions);
  }

  searchUsersByPromo(value) {
    return this.http.get(`${this.apiUrl}?promotion=${value}`);
  }

  //Register

  updateUser(value) {
    return this.http.post(`${this.apiUrl}/user`,JSON.stringify(value),this.httpOptions);
  }

  createUser(value) {
    var info:object={
      "email": value.email,
      "password": value.password,
      "first_name": value.first_name,
      "last_name": value.last_name,
      "promotion": parseInt(value.promo),
      "option": value.optionsIng3Control,
      "company": value.entreprise,
      "working_city": value.ville,
      "wage": parseInt(value.salaire),
      "linkedin_url": value.linkedin_url
    }
    return this.http.put(`${this.apiUrl}/register`,info,this.httpOptions);
  }

  //Login

  connect(value) {
    return this.http.post(`${this.apiUrl}/authenticate`,JSON.stringify(value),this.httpOptions);
  }

  //Students

  getEtudiant() {

    return this.http.get(`${this.apiUrl}/student`,this.httpOptions);
  }

  updateEtudiant(value) {
    return this.http.post(`${this.apiUrl}/student`,JSON.stringify(value),this.httpOptions);
  }

  updateEtudiantAdmin(value,id) {
    this.clean(value)
    value["id"]=id
    return this.http.post(`${this.apiUrl}/student`,JSON.stringify(value),this.httpOptions);
  }

  getEtudiants(filter:string="") {
    return this.http.get(`${this.apiUrl}/students`+filter,this.httpOptions);
  }

  getEtudByOption(optioning3) {
    return this.http.get(`${this.apiUrl}/students?option=${optioning3}`,this.httpOptions);
  }

  getEtudByPromo(promo) {
    return this.http.get(`${this.apiUrl}/students?promotion=${promo}`);
  }

  anonymize() {
    return this.http.post(`${this.apiUrl}/anonymize`,{},this.httpOptions);
  }

  //teacher

  updateTeacher(value,id){
    this.clean(value)
    value["id"]=id
    return this.http.post(`${this.apiUrl}/teacher`,JSON.stringify(value),this.httpOptions);
  }

  createTeacher(value){
    return this.http.put(`${this.apiUrl}/teacher`,JSON.stringify(value),this.httpOptions);
  }

  crawlStudent(id){

    return this.http.get(`${this.apiUrl}/crawl?id=`+id,this.httpOptions)
  }

  clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

 

}
