import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ConnexionService } from './services/connexion.service';

import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule, MatRadioModule, MatCheckboxModule, MatCardModule, MatSliderModule} from '@angular/material';
import { RgpdComponent } from './rgpd/rgpd.component';
import { NotfoundComponent } from './notfound/notfound.component';


import { EtudiantsPipe } from './services/etudiants.pipe';
import { environment } from 'src/environments/environment';
import { CreateEtudiantComponent } from './create-etudiant/create-etudiant.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConnexionComponent,
    FooterComponent,
    TopbarComponent,
    
    RgpdComponent,
    NotfoundComponent,
    CreateEtudiantComponent,
    EtudiantsPipe
    
  ],
  entryComponents: [
    CreateEtudiantComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    
    AngularFireModule,
    AngularFirestoreModule
  ],
  providers: [ConnexionService,
    { provide: FirebaseOptionsToken, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
