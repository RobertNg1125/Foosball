import { Injectable } from '@angular/core';

// Angularfire
import { AngularFireDatabase } from 'angularfire2/database';
import {Player} from './player.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  /**
   * Create new Player
   *
   * @param player
   */
  addPlayer(player: Player, groupId: string) {
    const newPlayer = this.firebase.list('/player').push(player);
    this.firebase.list('/group_players/' + groupId).push(newPlayer.key);
    return newPlayer;
  }

  /**
   * Load all players in a group
   *
   * @param groupId
   */
  loadPlayersByGroup(groupId: string): Observable<any> {
    return this.firebase.list('/group_players/' + groupId)
      .snapshotChanges() as Observable<any>;
  }

  /**
   * Load Player by ID
   *
   * @param playerId
   * @return Observable<Player>
   */
  loadPlayer(playerId: string): Observable<any> {
    return this.firebase.object('/player/' + playerId).snapshotChanges() as Observable<any>;
  }

}
