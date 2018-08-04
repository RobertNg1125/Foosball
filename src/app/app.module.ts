import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// AngularFire
import { AngularFireModule } from 'angularfire2';

// Environment variables
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
