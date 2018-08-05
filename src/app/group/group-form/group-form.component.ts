import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';

// Service
import { GroupService } from '../../shared/group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  currentUser: any;
  name: string;

  constructor(
    private afAuth: AngularFireAuth,
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  /**
   * Load current logged in user
   */
  loadCurrentUser(): void {
    this.currentUser = this.afAuth.auth.currentUser;
  }

  /**
   * Add new group, called on submit form
   */
  addGroup() {
   this.groupService.addGroup(
     this.name,
     this.currentUser.uid
   );
   //   .then(
   //   group => this.router.navigate(['/group/' + group.key])
   // )
  }

}
