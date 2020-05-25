import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {
  teacherform: FormGroup;
  loading:boolean=false;
  optionsIng3Groups: optionsIng3Group[] = [
    {
      name: 'Pau',
      option: [
        { value: 'icc', viewValue: 'Ingénierie Cloud Computing' },
        { value: 'iapau', viewValue: 'Intelligence Artificielle' },
        { value: 'imsi', viewValue: 'Ingénierie Mathématique et Simulation Numérique' },
        { value: 'erp', viewValue: 'Intégration ERP'},
      ]
    },
    {
      name: 'Cergy',
      option: [
        { value: 'inem', viewValue: 'Informatique Embarquée' },
        { value: 'iacergy', viewValue: 'Intelligence Artificielle' },
        { value: 'vc', viewValue: 'Visual Computing' },
        { value: 'fintech', viewValue: 'Finance et Technologie' },
        { value: 'ingfin', viewValue: 'Ingénierie Financière'},
        { value: 'ds', viewValue: 'Data Science'},
        { value: 'bi', viewValue: 'Business Intelligence & Analytics'},
        { value: 'secu', viewValue: 'Cybersécurité'},
      ]
    },
  ];


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
    'optionsIng3Control': [
      { type: 'required', message: 'L\' option est requise' },
    ]
  };
  constructor(public dialogRef: MatDialogRef<CreateTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb:FormBuilder, public api:ApiService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.teacherform = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        last_name: ['', Validators.required],
        first_name: ['', Validators.required],
        option: ['', Validators.required]});
    }

    create_teacher(){
      this.loading=true;
      this.api.createTeacher(this.teacherform.value).subscribe(
        result=>{
          this.dialogRef.close(true);
        },err=>{
          this.loading=false
          alert("Erreur lors de la création du compte professeur.")
        }
      )
    }

}
