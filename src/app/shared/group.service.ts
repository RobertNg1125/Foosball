import { Injectable } from '@angular/core';

// Angularfire
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { Group } from './group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private firebase: AngularFireDatabase
  ) { }

  /**
   * Add new Group
   *
   * @param string name
   *    group name
   * @param string ownerId
   *    current user UID
   */
  addGroup(name: string, ownerId: string) {
    const newGroup = this.firebase.list('/group')
      .push({
        name: name,
        ownerId: ownerId,
        created: Date.now()
      });

    this.firebase.list('/group_watchers/' + newGroup.key).push(ownerId);
    this.firebase.list('/user_groups/' + ownerId).push({ groupId: newGroup.key });

    return newGroup;
  }

  /**
   * Get group by Id
   *
   * @param string groupId
   *    group ID
   */
  loadGroup(groupId: string): Observable<Group> {
    return this.firebase.object('/group/' + groupId).valueChanges() as Observable<Group>;
  }

}
