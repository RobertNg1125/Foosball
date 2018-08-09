import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { ActivatedRoute } from '@angular/router';

// Angularfire
import { AngularFireAuth } from 'angularfire2/auth';

import { Player } from '../../shared/player.model';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  groupId: string;
  teamAStriker: Player;
  teamADefender: Player;
  teamBStriker: Player;
  teamBDefender: Player;

  playerEditing: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
  }

  showSelectPlayer(position: string) {
    this.playerEditing = position
    $('.launcher').toggleClass('js-open');
  }

  onLauncherSelected($event) {
    switch (this.playerEditing) {
      case 'AStriker':
        this.teamAStriker = $event;
        break
      case 'ADefender':
        this.teamADefender = $event;
        break
      case 'BStriker':
        this.teamBStriker = $event;
        break
      case 'BDefender':
        this.teamBDefender = $event;
        break
    }
  }
}
