import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(public db: AngularFirestore) { 

    /*this.createUser({
      pseudo: 'admin',
      mdp: 'admin',
      nom:'admin',
      prenom:'admin',
      promo:'admin',
      entreprise:'admin',
      showpromo:false,
      showentreprise:false,
      admin:true

    }) */
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  getUserByPseudo(pseudo) {
    return this.db.collection('users', ref => ref.where('pseudo', '==', pseudo))
      .snapshotChanges()
  }

  updateUser(userKey, value) {
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  deleteUserByPseudo(pseudo) {
    return this.db.collection('users', ref => ref.where('pseudo', '==', pseudo))
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }




  createUser(value) {
    return this.db.collection('users').add({
      pseudo: value.pseudo,
      mdp: value.mdp,
      nom:value.nom,
      prenom:value.prenom,
      promo:value.promo,
      entreprise:value.entreprise,
      showpromo:value.showpromo,
      showentreprise:value.showentreprise,
      admin:value.admin

    });
  }

  connect(pseudo,mdp) {
    return this.db.collection('users', ref => ref.where('pseudo', '==', pseudo)
      .where('mdp', '==', mdp))
      .snapshotChanges();
  }

  getEtudiants() {
    return this.db.collection('users', etudiant => etudiant
      .where('admin', '==', false))
      .snapshotChanges();
  }

}
