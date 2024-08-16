import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/User.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading: boolean = false;

  loginData = {
    userName: '',
    password: ''
  }

  constructor(private service: AuthService,
    private router: Router
  ) { }

  login() {
    this.isLoading = true;

    this.service.login(this.loginData).subscribe((data:any) => {

      this.isLoading = false;

      console.log(data);
      localStorage.setItem('userName', data.UserName);
      localStorage.setItem('token_value', data.Token);

      this.router.navigate(['/entries']);
    },
      (error) => {
        alert(error.error.Message);
        this.isLoading = false;
      });
  }
}
