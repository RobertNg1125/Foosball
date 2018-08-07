import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {GroupService} from '../../shared/group.service';
import {PlayerService} from '../../shared/player.service';
import {Group} from '../../shared/group.model';
import {Player} from '../../shared/player.model';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  groupId: string;
  playerId: string;
  group: Group;
  player: Player;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.playerId = this.activatedRoute.snapshot.paramMap.get('playerId');
    this.loadGroup();
    this.loadPlayer();
  }

  loadGroup() {
    this.groupService.loadGroup(this.groupId)
      .subscribe(group => this.group = group);
  }

  loadPlayer() {
    this.playerService.loadPlayer(this.playerId)
      .subscribe(player => this.player = { key: player.key, ...player.payload.val()});
  }

}
