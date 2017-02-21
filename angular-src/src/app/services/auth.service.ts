import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }

  authenticateUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  registerUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }



}
