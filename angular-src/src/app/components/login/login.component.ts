import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    public _formBuilder: FormBuilder, 
    private _authservice: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { 
    // Build the form group
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.form.value['username'],
      password: this.form.value['password']
    }

    this._authservice.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this._authservice.storeUserData(data.token, data.user);
        this._flashMessage.show('You are now logged in!', {cssClass: 'notification is-success', timeout: 3000});
        this._router.navigate(['dashboard'])

      } else {
        this._flashMessage.show('An error occured while trying to log in: ' + String.prototype.toLowerCase.apply(data.msg), {cssClass: 'notification is-danger', timeout: 6000});
      }
    });


  }

}
