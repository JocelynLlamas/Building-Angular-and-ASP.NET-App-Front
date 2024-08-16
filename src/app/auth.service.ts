import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, User } from './interfaces/User.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://localhost:44363/auth/';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<Token> {
    return this.http.post<Token>(this.baseUrl + 'register', user);
  }

  login(user: any){
    return this.http.post(this.baseUrl + 'login', user);
  }

  logout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('token_value');
    this.router.navigate(['/login'])
  }

  get getUserName(){
    return localStorage.getItem('userName');
  }

  get isAuthenticated(){
    return !!localStorage.getItem('token_value');
  }
}
