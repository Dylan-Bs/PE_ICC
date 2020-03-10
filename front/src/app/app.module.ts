import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//Formulaire
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
//Lecture de fichiers dans les assets
import { HttpClientModule } from '@angular/common/http';
//Composants
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CollecteComponent } from './collecte/collecte.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Erreur404Component } from './erreur404/erreur404.component';
//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtranetfRoutingModule } from './extranet/extranet-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { PathResolveService } from './path-resolve.service';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilComponent,
    CollecteComponent,
    RgpdComponent,
    ConnexionComponent,
    Erreur404Component,
    FooterComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSliderModule,
    HttpClientModule,
    ExtranetfRoutingModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [PathResolveService]
})
export class AppModule { }
