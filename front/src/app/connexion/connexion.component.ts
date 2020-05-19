import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Authentification } from '../interfaces/interface';
import { MatDialog } from '@angular/material/dialog';
import { ConnexionService } from '../services/connexion.service';
import { FirebaseService } from '../services/firebase.service';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  //user: User;
  name: string;
  surname: string;
  role: string;

  loading:boolean=false

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    public api:ApiService,
    public conne: ConnexionService
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.conne.connecte) {
      this.getUserInfo();
    }
  }

  createForm() {
    this.connexionForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  resetFields() {
    this.connexionForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.loading=true
    

      
    this.api.connect(value).subscribe(
      result => {
        this.loading=false

        var res:Authentification=result as Authentification
        
        console.log(res)

        this.conne.connection(res);

        this.getUserInfo();

        
        
      },
      err => {
        this.loading=false
        console.log(err)
        alert(err);
      }
    )
    
  }

  getUserInfo() {
    //ajout des infos utilisateurs dans des variables
    //this.user = this.conne.user;
    this.name = this.conne.user["first_name"]
    this.surname = this.conne.user["last_name"]
    if (this.conne.role==0) {
        this.role = "Ancien étudiant"
    }else if (this.conne.role==1){
      this.role = "Professseur"
    }
        
    
  else if (this.conne.role==2){
    this.role = "Administrateur"
  }
        
  }
}
