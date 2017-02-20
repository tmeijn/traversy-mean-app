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
      ]],
      username: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]]
    })
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log('test');
  }

}
