import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Authentification } from '../interfaces/interface';
import { MatDialog } from '@angular/material/dialog';
import { ConnexionService } from '../services/connexion.service';
import { ApiService } from '../services/api.service';
import { Student } from 'src/app/interfaces/interface';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  //user: User;
  last_name: string;
  first_name: string;
  item: any;

  role: string;

  error: boolean = false
  errormsg: string

  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public api: ApiService,
    public conne: ConnexionService
  ) { }

  options_bddtoview: object = {
    'icc': 'Ingénierie Cloud Computing',
    'iapau': 'Intelligence Artificielle à Pau',
    'imsi': 'Ingénierie Mathématique et Simulation Numérique',
    'inem': 'Informatique Embarquée',
    'iacergy': 'Intelligence Artificielle à Cergy',
    'vc': 'Visual Computing',
    'fintech': 'Finance et Technologie',
    'erp': 'Intégration ERP',
    'ingfin': 'Ingénierie Financière',
    'ds': 'Data Science',
    'bi': 'Business Intelligence & Analytics',
    'secu': 'Cybersécurité',
  }

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
    this.loading = true
    this.error = false


    this.api.connect(value).subscribe(
      result => {
        this.loading = false


        var res: Authentification = result as Authentification


        this.conne.connection(res);


        this.getUserInfo();


      },
      err => {
        this.loading = false
        this.error = true
        if (err.status == 502 || err.status == 500) {
          this.errormsg = "Connexion impossible avec le serveur."
        } else if (err.status == 400) {
          this.errormsg = "Identifiant et/ou mot de passse incorrect(s)."

        }
      }
    )

  }

  getUserInfo() {
    this.last_name = this.conne.user["last_name"]
    this.first_name = this.conne.user["first_name"]
    if (this.conne.role == 0) {

      this.api.getEtudiant().subscribe(
        result => {

          var res = result as Student

          this.item = res;
          if (this.item.email == "") {
            this.item.email = "Non renseigné"
          }
          if (this.item.promotion == "") {
            this.item.promotion = "Non renseigné"
          }
          if (this.item.option == "") {
            this.item.option = "Non renseigné"
          }
          if (this.item.company == "") {
            this.item.company = "Non renseigné"
          }
          if (this.item.working_city == "") {
            this.item.working_city = "Non renseigné"
          }
          if (isNaN(this.item.wage)) {
            this.item.wage = "Non renseigné"
          }
          this.item.option = this.options_bddtoview[this.item.option];
        },
        err => {
          alert("Erreur lors du chargement des données du profil");
        }
      )
      this.role = "Ancien étudiant"
    } else if (this.conne.role == 1) {
      this.role = "Professseur"
      this.conne.userOption = this.options_bddtoview[this.conne.user["option"]]
    }


    else if (this.conne.role == 2) {
      this.role = "Administrateur"
    }

  }
}
