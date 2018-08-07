import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { GroupFormComponent } from './group/group-form/group-form.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/group', pathMatch: 'full'},
  { path: 'group', component: GroupListComponent },
  { path: 'group/add', component: GroupFormComponent },
  { path: 'group/:groupId', component: GroupDetailComponent },
  { path: 'group/:groupId/player/add', component: PlayerFormComponent },
  { path: 'group/:groupId/player/:playerId', component: PlayerDetailComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
