import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';

import {Player} from '../../shared/player.model';
import { PlayerService } from '../../shared/player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  groupId: string;
  playerId: string;
  group: Group;
  player: Player;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.loadGroup();

    if(this.playerId = this.activatedRoute.snapshot.paramMap.get('playerId')) {
      // Load player object
    } else {
      this.player = { displayName: '', photoURL: ''};
    }
  }

  loadGroup() {
    this.groupService.loadGroup(this.groupId)
      .subscribe(group => this.group = group as Group);
  }

  newPlayer() {
    const newPlayer = this.playerService.addPlayer(this.player, this.groupId);
    this.router.navigate(['/group/' + this.groupId]);
  }
}
