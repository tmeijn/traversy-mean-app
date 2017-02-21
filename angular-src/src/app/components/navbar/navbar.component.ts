import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this._authService.logout();
    this._flashMessage.show('You are now logged out', {cssClass: 'notification is-info', timeout: 3000});
    this._router.navigate(['/login']);
    return false;
  }

}
