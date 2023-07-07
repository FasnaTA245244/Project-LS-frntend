import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../modal/login';
import { AuthServiceService } from '../service/auth-service.service';
import { RouterServiceService } from '../service/router-service.service';

import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  login: Login = new Login();
  loginForm: FormGroup;
  submitMessage!: string;
  flag: boolean = false;
  username: string|undefined;
  userPassword:string='';

  showuserPassword: boolean = false;

togglePasswordVisibility() {
  this.showuserPassword = !this.showuserPassword;
}

  constructor(private routerService: RouterServiceService, private authservice: AuthServiceService,
    private userService: UserService, private userAuthService: UserAuthService, private router: Router
    ) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      userPassword: new FormControl(),
      //type: new FormControl()
    });
  }

  ngOnInit(): void {
    // if (sessionStorage.getItem('key') != null) {
    //   this.routerService.tohome();
    // }
  }

  onSubmit() {

    console.log("hi from loginsubmit");
  //   // if (this.loginForm.valid){
    this.login.username = this.loginForm.value.username;
   this.login.userPassword = this.loginForm.value.userPassword;

    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.user.role[0].roleName;
        //console.log(response);
        alert("Login Successful " + this.login.username);

        if (role === 'Admin') 
        {
          this.router.navigate(['/homeadmin']);
        } else 
        {
          this.router.navigate(['/homeuser']);
        }
      },

      (error) => 
      {
        console.log(error);
        alert('You have entered incorrect Username or Password!');
        this.submitMessage = "Incorrect Username or Password";
      }
    );
  }

  }