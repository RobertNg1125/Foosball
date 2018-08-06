import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

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
    this.firebase.list('/user_groups/' + ownerId).push(newGroup.key);

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

  /**
   * Get all group
   */
  loadGroupMultiple() {
    return this.firebase.list('/group').snapshotChanges();
  }

  /**
   * Get groups by user
   *
   * @param string userId
   */
  loadGroupByUser(userId: string): Observable<any> {
    return this.firebase.list('/user_groups/' + userId).valueChanges();
  }

  /**
   * Toggle joining group
   *
   * @param string groupId
   * @param string userUid
   */
  toggleJoiningGroup(groupId: string, userUid: string) {
    this.firebase.list('/user_groups/' + userUid,
      ref => ref.orderByValue().equalTo(groupId)
    ).valueChanges().pipe(take(1))
      .subscribe(data => {
      if(data.length === 0) {
        // user is watching this group
        // let's stop watching it
        this.firebase.list('/group_watchers/' + groupId).push(userUid);
        this.firebase.list('/user_groups/' + userUid).push(groupId);
      } else {
        // user is not watching this group
        // let's start watching it

        // 1. remove record in /group_watchers
        // this.firebase.list('/group_watchers/' + groupId).remove()
        this.firebase.list('/group_watchers/' + groupId,
          ref => ref.orderByValue().equalTo(userUid)
        ).snapshotChanges()
          .subscribe(group_users => {
            group_users.map(group_user => {
              this.firebase.list('/group_watchers/' + groupId + '/' + group_user.key).remove();
            });
          });

        // 2. remove record in /user_groups
        this.firebase.list('/user_groups/' + userUid,
          ref => ref.orderByValue().equalTo(groupId)
        ).snapshotChanges()
          .subscribe(user_groups => {
            user_groups.map(user_group => {
              this.firebase.list('/user_groups/' + userUid + '/' + user_group.key).remove();
            });
          });
      }
    });
  }
}
