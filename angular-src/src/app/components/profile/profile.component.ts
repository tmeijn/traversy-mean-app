import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      this._flashMessage.show('Not allowed!', {cssClass: 'notification is-danger', timeout: 10000});
      this._router.navigate(['login']);
      console.log(err);
    })
  }

}
