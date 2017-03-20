import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private authToken: any;
  user: any;

  private baseUrl: string = environment.apiBaseURL;

  constructor(private _http: Http) { 
    this.loadToken();
  }

  authenticateUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.baseUrl + 'users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this._http.get(this.baseUrl + 'users/profile', {headers: headers})
      .map(res => res.json());
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  registerUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.baseUrl + 'users/register', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }



}
