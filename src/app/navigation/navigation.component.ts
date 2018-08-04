import { Component, OnInit } from '@angular/core';

// jQuery
import * as $ from 'jquery';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [AngularFireAuth]
})
export class NavigationComponent implements OnInit {
  title = "La cour<br/>des Grands";
  currentUser: any;

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  /**
   * Load the current logged in user
   */
  loadCurrentUser(): void {
    this.currentUser = this.afAuth.auth.currentUser;
  }

  /**
   * Sign out the current user
   */
  logOUt(): void {
    this.afAuth.auth.signOut();
  }

  /**
   * Toggle Navbar
   */
  toggleNavbar(): void {
    $('body').toggleClass('js-nav-open');
  }

  /**
   * Close Navbar
   */
  closeNavbar(): void {
    $('body').removeClass('js-nav-open');
  }


}
