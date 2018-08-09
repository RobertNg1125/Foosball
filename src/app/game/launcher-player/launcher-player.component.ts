import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';

import { PlayerService } from '../../shared/player.service';
import {Player} from '../../shared/player.model';

@Component({
  selector: 'app-launcher-player',
  templateUrl: './launcher-player.component.html',
  styleUrls: ['./launcher-player.component.scss']
})
export class LauncherPlayerComponent implements OnInit {
  players: Player[] = new Array();

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.getAllPlayers();
  }

  getAllPlayers() {
    // TODO: get groupID from the component that call Launcher
    this.playerService.loadPlayersByGroup('-LJB0iL6J4nU9sG912_E')
      .subscribe(snapshots => {
        snapshots.map(snapshot => {
          this.loadPlayer(snapshot.payload.val());
        });
      });
  }

  loadPlayer(playerId: string) {
    this.playerService.loadPlayer(playerId)
      .subscribe(snapshot => {
        this.players.push(
          {key: snapshot.key, ...snapshot.payload.val()} as Player
        );

      });
  }

  @Output() selectPlayerEvent = new EventEmitter<any>();

  onSelectedPlayer(player) {
    this.selectPlayerEvent.emit(player);
    $('.launcher').toggleClass('js-open');
  }
}
