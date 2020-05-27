import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnexionService } from '../../../services/connexion.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { User, STATE, ANSWER } from 'src/app/interfaces/interface';


@Component({
  selector: 'app-edition-prof',
  templateUrl: './edition-prof.component.html',
  styleUrls: ['./edition-prof.component.scss']
})
export class EditionProfComponent implements OnInit {
  exampleForm: FormGroup;
  loading: boolean = false;

  item: User = { "id": 0, "email": "...", "first_name": "...", "last_name": "...", "company": "...", "wage": "...", "option": "...", "promotion": 0, "working_city": "...", "role": 2 };

  validation_messages = {
    'email': [
      { type: 'required', message: 'L\' adresse mail est requise' },
      { type: 'email', message: 'Entrez une adresse valide' }
    ],
    'password': [
      { type: 'required', message: 'Le mot de passe est requis' },
      { type: 'minlength', message: 'Le mot de passe doit faire minimum 7 caractères' }
    ],
    'last_name': [
      { type: 'required', message: 'Le nom est requis' }
    ],
    'first_name': [
      { type: 'required', message: 'Le prénom est requis' }
    ],
  };

  constructor(
    public api: ApiService,
    public conne: ConnexionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.conne.savedinfo === undefined) {
      this.loading = true;
      this.createForm()
      console.log(this.conne.user);

      this.item.email = this.conne.user["email"]
      this.item.last_name = this.conne.user["last_name"]
      this.item.first_name = this.conne.user["first_name"]
      this.item.password = ''
      this.createForm()
      this.conne.savedinfo = this.item
      this.loading = false;
    } else {
      this.item = this.conne.savedinfo
      this.createForm();
    }
  }

  createForm() {
    this.exampleForm = this.fb.group({
      email: [this.item.email, [Validators.email, Validators.required]],
      password: [this.item.password, [Validators.required, Validators.minLength(7)]],
      last_name: [this.item.last_name, Validators.required],
      first_name: [this.item.first_name, Validators.required],
    });
  }

  onSubmit(value) {

    this.api.updateUser(value)
      .subscribe(
        result => {
          this.conne.savedinfo = value
          this.openDialog()
        },
        err => {
          alert("Erreur lors de l'update");
        }
      )
  }

  openDialog(data = { state: STATE.confirm, text: "Vos changements ont bien été sauvegardés." }, width = "300px"): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == ANSWER.ok) {
        this.router.navigate(['connexion']);
      }
    });
  }
}
