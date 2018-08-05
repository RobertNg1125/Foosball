import { Component, OnInit } from '@angular/core';

// Angularfire
import { AngularFireAuth } from 'angularfire2/auth';

// Group
import { GroupService } from '../../shared/group.service';
import {Group} from '../../shared/group.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  currentUser: any;
  groups: Group[];
  userGroupIds: string[]; // group ID only

  constructor(
    private afAuth: AngularFireAuth,
    private groupservice: GroupService,
  ) { }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadGroupsByUser();
    this.loadGroupMultiple();
  }

  /**
   * Load current user
   */
  loadCurrentUser() {
    this.currentUser = this.afAuth.auth.currentUser;
  }

  /**
   * Load all groups
   */
  loadGroupMultiple() {
    this.groupservice.loadGroupMultiple()
      .subscribe(
        groups => {
          this.groups = groups.map(group => {
            return { key: group.key, ...group.payload.val()} as Group;
          });
        },
        err => console.log(err),
        () => {}
      );
  }

  /**
   * Toogle following
   */
  toggleJoiningGroup(groupId: string) {
    //this.groupservice.testFunction(groupId, this.currentUser.uid)

    this.groupservice.toggleJoiningGroup(groupId, this.currentUser.uid);
  }

  /**
   * Load groups watched by user
   * Get groupID only
   */
  loadGroupsByUser() {
    this.groupservice.loadGroupByUser(this.currentUser.uid)
      .subscribe(
        groups => this.userGroupIds = groups,
        err => console.log(err),
        () => {}
      );
  }
}
