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
// export class SignupComponent implements OnInit{
//   signup: Signup = new Signup();

//   signUpArray: Array<Signup> = [];

//   signupForm: FormGroup;
  

//   constructor(private routerService: RouterServiceService, private authenticateService: AuthServiceService, public formBuilder: FormBuilder) {
//     this.signupForm = new FormGroup({
//       username: new FormControl(),
//       password: new FormControl(),
//       conpassword: new FormControl(),
//       name: new FormControl(),
//       type: new FormControl()
//     });
//   }

//   ngOnInit(): void {
//     if (sessionStorage.getItem('key') != null) {
//       this.routerService.tohome();  
//     }
//     else {
//       console.log("hi")
//       this.signupForm = new FormGroup({

//         type: new FormControl(),
//         name: new FormControl('', Validators.required),
//         username: new FormControl('', Validators.required),
//         password: new FormControl('', Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/")),
//         conpassword: new FormControl('', Validators.required),
//         email: new FormControl('',  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))
        
//       });
//     }
//   }

//   get f() 
//   { 
//     return this.signupForm.controls; 
//   }

//   onSubmit(){
//     console.log("Hi");
//     this.signup.password = this.signupForm.value.password;
//     console.log("password== " + this.signup.password)
//     this.signup.username = this.signupForm.value.username;
//     console.log("username== " + this.signupForm.value.username)
//     this.signup.name = this.signupForm.value.name;
//     console.log("name== " + this.signupForm.value.name)
//     this.signup.email = this.signupForm.value.email;
//     console.log("email== " + this.signupForm.value.email)
//     this.signup.conpassword = this.signupForm.value.conpassword;
//     console.log("conpassword== " + this.signupForm.value.conpassword)
//     this.signup.type = this.signupForm.value.type;
//     console.log("password== " + this.signupForm.value.type)

//     this.signUpArray.push(this.signup);
//     this.authenticateService.addUser(this.signup).subscribe((data) => {
//       // console.log("inside regsiter angular")
//       console.log(data)
//       this.routerService.tologin();
//       alert("Register Successful " + data.name);

//     },
//       (error: any) => {
//         console.log(error);
//         alert("Oops! Already registered try Login Instead");
//       });
//   }


// }
export class SignupComponent implements OnInit {
  signup: Signup = new Signup();
  signUpArray: Array<Signup> = [];
  signupForm: FormGroup;
  
  // Inside your LoginComponent class
showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


  constructor(private routerService: RouterServiceService, private authenticateService: AuthServiceService, public formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")],
      conpassword: ['', Validators.required],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('key') != null) {
      this.routerService.tohome();  
    }
  }

  get f() {
    return this.signupForm.controls;
  }

  // onSubmit() {
    // this.signup.password = this.signupForm.value.password;
    // this.signup.username = this.signupForm.value.username;
    // this.signup.name = this.signupForm.value.name;
    // this.signup.email = this.signupForm.value.email;
    // this.signup.conpassword = this.signupForm.value.conpassword;
    // this.signup.type = this.signupForm.value.type;

    // this.signUpArray.push(this.signup);

    // this.authenticateService.addUser(this.signup).subscribe((data) => {
    //   this.routerService.tologin();
    //   alert("Register Successful " + data.name);
    // },
    // (error: any) => {
    //   console.log(error);
    //   alert("Oops! Already registered. Try logging in instead.");
    // });
    
  // }
  onSubmit() {
     this.signup.password = this.signupForm.value.password;
     this.signup.username = this.signupForm.value.username;
     this.signup.name = this.signupForm.value.name;
     this.signup.email = this.signupForm.value.email;
     this.signup.conpassword = this.signupForm.value.conpassword;
     this.signup.type = this.signupForm.value.type;

    this.signUpArray.push(this.signup);
    if (this.signupForm.valid) {
      this.signup = this.signupForm.value;
    
      this.authenticateService.addUser(this.signup).subscribe(
        (data) => {
          this.routerService.tologin();
          alert("Registration Successful: " + data.name);
          this.signupForm.reset(); // Reset the form after successful submission
        },
        (error: any) => {
          console.log(error);
          alert("Oops! Already registered. Try logging in instead.");
        }
    );
      }
      else {
      alert("Please fill in all fields.");
    }
  }
  
  

  // Custom validation function to check if password and confirm password match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const conpassword = control.get('conpassword')?.value;

    if (password !== conpassword) {
      control.get('conpassword')?.setErrors({ passwordMatch: true });
    } else {
      control.get('conpassword')?.setErrors(null);
    }
  }
}
