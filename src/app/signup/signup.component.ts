import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Signup } from '../modal/signup';
import { AuthServiceService } from '../service/auth-service.service';
import { RouterServiceService } from '../service/router-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
{
  signup: Signup = new Signup();

  signUpArray: Array<Signup> = [];

  signupForm: FormGroup;
  showuserPassword: boolean = false;
  

  constructor(private routerService: RouterServiceService, private authenticateService: AuthServiceService, public formBuilder: FormBuilder) 
  {
    this.signupForm = new FormGroup({
      username: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      userPassword: new FormControl(),
      // type: new FormControl('user')
    });
  }
  

ngOnInit(): void 
{
  if (sessionStorage.getItem('key') != null) 
  {
    this.routerService.tohome();  
  } 
  else 
  {
    console.log("hi");
    this.signupForm = this.formBuilder.group({
      // type: ['user'], // Set the default value for type to "user"
      name: ['', Validators.required],
      username: ['', Validators.required],
      userPassword: ['', Validators.required],
      // email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
      email: ['', Validators.required],
    });
  }
}
  get f() 
  { 
    return this.signupForm.controls; 
  }

  togglePasswordVisibility() {
       this.showuserPassword = !this.showuserPassword;
      
    }

  onSubmit()
  {
    console.log("Hi");
    this.signup.userPassword = this.signupForm.value.userPassword;
    console.log("userPassword== " + this.signupForm.value.userPassword)
    this.signup.username = this.signupForm.value.username;
    console.log("username== " + this.signupForm.value.username)
    this.signup.name = this.signupForm.value.name;
    console.log("name== " + this.signupForm.value.name)
    this.signup.email = this.signupForm.value.email;
    console.log("email== " + this.signupForm.value.email)
    // this.signup.type = this.signupForm.value.type;
    // console.log("type== " + this.signupForm.value.type)

    this.signUpArray.push(this.signup);
    this.authenticateService.addUser(this.signup).subscribe((data) => 
    {
      // console.log("inside regsiter angular")
      console.log(data)
      this.routerService.tologin();
      alert("User registered succesfully " + data.username);
    },
     (error: any) => 
      {
        console.log(error);
        alert("User already Registered!");
      });
  }
}
