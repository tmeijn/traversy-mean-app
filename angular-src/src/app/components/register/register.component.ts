import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  

  constructor(public _formBuilder: FormBuilder) { 
    // Build the form group
    this.form = this._formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^(?=.*\d).{7,99}$/)
      ]]
    })

    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  //Declare form entries and corresponding error messages here
  formErrors = {
    'name': '',
    'username': '',
    'email': '',
    'password': ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'pattern': 'Username can only contain alphanumeric characters'
    },
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 2 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
      'pattern': 'Username can only contain alphanumeric characters and underscores.'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Please enter a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 7 characters long.',
      'pattern': 'Password must contain at least 1 numeric digit.'
    }
  };

  ngOnInit() {
  }

  onRegisterSubmit() {

    // TODO: Logic when form is not valid
    if(!this.form.valid) {
      console.log('Not valid');
      return;
    }

    // Handle the submitted data
    const user = {
      name: this.form.value['name'],
      username: this.form.value['username'],
      email: this.form.value['email'],
      password: this.form.value['password'],
    }

    console.log('submit');


  }

}
