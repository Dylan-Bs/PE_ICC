import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:string="";

  httpOptions =
{   

    withCredentials: true
}

  constructor(private http: HttpClient) {
    
   }


  getUser(userKey) {
    return this.http.get(`${this.apiUrl}/users?id=${userKey}`,this.httpOptions);
  }

  deleteUser(userKey) {
    return this.http.delete(`${this.apiUrl}/user/id/${userKey}`);
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
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
      email: value.email,
      password: value.password,
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      promo: parseInt(value.promo),
      optionsIng3Control: value.optionsIng3Control,
      entreprise: value.entreprise,
      ville: value.ville,
      salaire: parseInt(value.salaire),
      role: parseInt('0')
    }
    return this.http.post(`${this.apiUrl}/register`,info);
  }

  //Login

  connect(value) {
    return this.http.post(`${this.apiUrl}/login`,value);
  }

  //Students

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
