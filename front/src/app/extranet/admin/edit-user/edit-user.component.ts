import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ConnexionService } from 'src/app/services/connexion.service';
import { ApiService } from 'src/app/services/api.service';
import { Student, User } from 'src/app/interfaces/interface';

export interface option {
  value: string;
  viewValue: string;
}

export interface optionsIng3Group {
  disabled?: boolean;
  name: string;
  option: option[];
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  optionsIng3Groups: optionsIng3Group[] = [
    {
      name: 'Pau',
      option: [
        {value: 'icc', viewValue: 'Ingénierie Cloud Computing'},
        {value: 'iapau', viewValue: 'Intelligence Artificielle'},
        {value: 'imsi', viewValue: 'Ingénierie Mathématique et Simulation Numérique'},
      ]
    },
    {
      name: 'Cergy',
      option: [
        {value: 'inem', viewValue: 'Informatique Embarquée'},
        {value: 'iacergy', viewValue: 'Intelligence Artificielle'},
        {value: 'vc', viewValue: 'Visual Computing'},
        {value: 'fintech', viewValue: 'Finance et Technologie'},
      ]
    },
  ];
  item: User={"id":0,"email":"...","first_name":"...","last_name":"...","company":"...","wage":"...","option":"...","promotion":0,"working_city":"...","role":0};
  loading:boolean=false;

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public conne:ConnexionService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        
          this.loading=true;
          this.createForm()
          
          this.api.getUserByID(data).subscribe(
            result => {
              this.loading=false;
    
              var res=result as User
    
              this.item=res;
              console.log(res)
              this.createForm()
              
              
            },
            err=>{
              alert("Error");
            }
          )
      }
    })
    
  }

  createForm() {
    this.exampleForm = this.fb.group({
      email: [this.item.email],
      password: [this.item.password],
      first_name: [this.item.first_name],
      last_name: [this.item.last_name],
      promotion: [this.item.promotion],
      option: [this.item.option],
      company: [this.item.company],
      working_city: [this.item.working_city],
      wage: [this.item.wage],
      role: [this.item.role],
    });
  }

  onSubmit(value){
    this.api.updateEtudiant(value)
    .subscribe(
      result => {
        this.openDialog()
      },
      err=>{
        alert("Error");
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['extranet/admin']);
    });
  }

  delete(){
    this.api.deleteUser(this.item.id)
    .subscribe(
      result => {
        this.router.navigate(['extranet/admin']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['extranet/admin']);
  }

}
