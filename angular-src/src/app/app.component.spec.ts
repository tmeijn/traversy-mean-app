import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
/* tslint:disable:no-unused-variable */

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockAuthService {
}

let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

fdescribe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: mockRouter },
        FlashMessagesService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
