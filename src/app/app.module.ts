import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

// Environment variables
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GroupFormComponent } from './group/group-form/group-form.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { GameFormComponent } from './game/game-form/game-form.component';
import { LauncherPlayerComponent } from './game/launcher-player/launcher-player.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GroupFormComponent,
    GroupDetailComponent,
    GroupListComponent,
    PlayerFormComponent,
    PlayerDetailComponent,
    GameFormComponent,
    LauncherPlayerComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
