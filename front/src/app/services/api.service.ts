import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  deleteUser(data) {
    var options=this.httpOptions
    options["body"]=JSON.stringify(data)
    return this.http.delete(`${this.apiUrl}/user`,options);
  }

  uploadCSVFile( file) {
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let options = this.httpOptions;
    options.headers=options.headers.set("Content-Type","multipart/form-data");
    options.headers=options.headers.set("Accept","application/json");
    return this.http.post(`${this.apiUrl}/import`, formData, options)
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
      "wage": parseInt(value.salaire)
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

  getEtudiants() {
    return this.http.get(`${this.apiUrl}/students`,this.httpOptions);
  }

  getEtudByOption(optioning3) {
    return this.http.get(`${this.apiUrl}/students?option=${optioning3}`);
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

  clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

}
