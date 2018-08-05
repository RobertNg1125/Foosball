import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { GroupFormComponent } from './group/group-form/group-form.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/group/add', pathMatch: 'full'},
  { path: 'group/add', component: GroupFormComponent },
  { path: 'group/:groupId', component: GroupDetailComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
