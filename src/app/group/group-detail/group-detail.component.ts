import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';

import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

import { Player } from '../../shared/player.model';
import { PlayerService } from '../../shared/player.service';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  groupId: string;
  group: Group;
  owner: User;
  players: Player[] = new Array();

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
    private playerService: PlayerService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.loadGroup();
    this.loadPlayers();
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

  /**
   * Load Players of group,
   * perform nested observation
   *
   * TODO: find a way to sort players by name
   */
  loadPlayers() {
    // Load players of group
    this.playerService.loadPlayersByGroup(this.groupId)
      .subscribe(group_players => {
        group_players.map(playerId => {
          // load player
          this.loadPlayer(playerId.payload.val());
        });
      });
  }

  /**
   * Load player object
   *
   * @param playerId
   */
  loadPlayer(playerId) {
    this.playerService.loadPlayer(playerId)
      .subscribe(snapshot => {
        this.players.push(
          {key: snapshot.key, ...snapshot.payload.val()} as Player
        );
      });
  }

}
