import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  groupId: string;
  group: Group;
  owner: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.loadGroup();
  }

  /**
   * Load group detail
   */
  loadGroup() {
    this.groupService.loadGroup(this.groupId)
      .subscribe(
        group => {
          this.group = group;

          // Load group owner info
          this.userService.loadUser(group.ownerId)
            .subscribe(user => this.owner = user as User);

        },
        err => console.log(err),
        () => {}
        );
  }


}
