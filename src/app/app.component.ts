import { Component } from '@angular/core';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AngularFireAuth]
})
export class AppComponent {
  title = 'app';

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  loginWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  logOut(): void {
    this.afAuth.auth.signOut()
  }
}
