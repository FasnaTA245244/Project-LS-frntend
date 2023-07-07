import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Login } from '../modal/login';
import { Signup } from '../modal/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  addUser(signup: Signup): Observable<Signup> {
    return this.httpClient.post<Signup>('http://localhost:8090/api/auth/registerNewUser', signup);
  }

  constructor(private httpClient: HttpClient) {}

 
  // getusers(userr: Login) {
  //   console.log("GET USER");
  //   console.log(userr.username);
  //   console.log(userr.userPassword);
    //console.log(userr.type);

    // return this.httpClient.post<any>(`http://localhost:8098/api/users/login`, userr, { headers: new HttpHeaders().set('responseType', 'text') }).pipe(
    //   map(
    //     userData => {
    //       sessionStorage.setItem('username', userr.username);
    //       let tokenStr = userData.token;
    //       console.log("Token string: " + tokenStr);
    //       localStorage.setItem('token', tokenStr);
    //       return userData;
    //     }
    //   )
    // );
  

  // setBearerToken(token: string) {
  //   sessionStorage.setItem('token', token);
  // }
}