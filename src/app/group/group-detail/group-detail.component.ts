import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  groupId: string;
  group: Group;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
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
        group => this.group = group,
        err => console.log(err),
        () => {}
        );
  }
}
