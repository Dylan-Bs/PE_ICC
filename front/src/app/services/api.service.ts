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

  deleteUser(id) {
    var idstring=id.toString()
    return this.http.delete(`${this.apiUrl}/users?id=`+idstring,this.httpOptions);
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`,this.httpOptions);
  }

  searchUsersByPromo(value) {
    return this.http.get(`${this.apiUrl}?promotion=${value}`);
  }

  //Register

  updateUser(userKey, value) {
    value.id=userKey
    return this.http.put(`${this.apiUrl}/register`,value);
  }

  createUser(value) {
    var info:object={
      "email": value.email,
      "password": value.password,
      "first_name": value.name,
      "last_name": value.surname,
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

  getEtudiants() {
    return this.http.get(`${this.apiUrl}/students`);
  }

  getEtudByOption(optioning3) {
    return this.http.get(`${this.apiUrl}/students?option=${optioning3}`);
  }

  getEtudByPromo(promo) {
    return this.http.get(`${this.apiUrl}/students?promotion=${promo}`);
  }

  anonymiser(userKey, value) {
    value.id=userKey;
    value.email = 'anonymous';
    value.password = '';//un mot de passe vide, empeche les gens de valider un formulaire de connexion 
    value.first_name = 'anonymous';
    value.last_name = 'anonymous';
    return this.http.put(`${this.apiUrl}/anonymiser`,value);
  }

}
