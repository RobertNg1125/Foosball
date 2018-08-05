import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// AngularFire
import { AngularFireModule } from 'angularfire2';

// Environment variables
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GroupFormComponent } from './group/group-form/group-form.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GroupFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
