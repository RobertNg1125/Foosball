import { Injectable } from '@angular/core';

// Angularfire
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  /**
   * Add new user,
   * Get user details from social account
   */
  addUser(user) {
    this.firebase.object('/user/' + user.uid).set(user);
  }

}
