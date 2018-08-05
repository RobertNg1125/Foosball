import { Injectable } from '@angular/core';

// Angularfire
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private firebase: AngularFireDatabase
  ) { }

  /**
   * Add new Group
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
}
