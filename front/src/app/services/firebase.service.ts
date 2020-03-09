import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByPromo(value) {
    return this.db.collection('users', ref => ref.orderBy('promo').startAt(value)).snapshotChanges();
  }

  createUser(value) {
    return this.db.collection('users').add({
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
    });
  }

  connect(value) {
    return this.db.collection('users', ref => ref.where('email', '==', value.email)
      .where('password', '==', value.password))
      .snapshotChanges();
  }

  getEtudiants() {
    return this.db.collection('users', etudiant => etudiant
      .where('role', '==', 0))
      .snapshotChanges();
  }

  getEtudByOption(optioning3) {
    return this.db.collection('users', ref => ref.where('optionsIng3Control', '==', optioning3))
      .snapshotChanges()
  }

  anonymiser(userKey, value) {
    value.email = 'anonymous';
    value.password = '';//un mot de passe vide, empeche les gens de valider un formulaire de connexion 
    value.name = 'anonymous';
    value.nameToSearch = 'anonymous';
    value.surname = 'anonymous';
    return this.db.collection('users').doc(userKey).set(value);
  }
}
