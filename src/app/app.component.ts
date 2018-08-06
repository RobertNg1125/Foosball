import { Component } from '@angular/core';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

// User
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AngularFireAuth]
})
export class AppComponent {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  loginWithGoogle(): void {
    const provider = new auth.GoogleAuthProvider();
    this.socialLogIn(provider);
  }

  private socialLogIn(provider) {
    this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        const userInfo = {
          uid: credential.user.uid,
          displayName: credential.user.displayName,
          email: credential.user.email,
          lastLoggedIn: Date.now()
        };

        this.userService.addUser(userInfo);

      })
      .catch(err => console.log(err));
  }

}
