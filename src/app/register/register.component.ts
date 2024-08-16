import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Token } from '../interfaces/User.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private service: AuthService,
    private fb: FormBuilder
  ) {
    this.registerForm = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: matchingFields('password', 'confirmPassword') })
  }

  onSubmit() {
    this.isLoading = true;
    delete this.registerForm.value.confirmPassword;

    this.service.register(this.registerForm.value).subscribe((data: Token) => {
      this.isLoading = false;
      console.log(data)
      localStorage.setItem('userName', data.UserName);
      localStorage.setItem('token_value', data.Token);
    },
      (error) => {
        alert(error.error.Message);
        this.isLoading = false;
      });
  }
}

function matchingFields(field1: string, field2: string) {
  return (form: FormGroup) => {
    const control1 = form.controls[field1];
    const control2 = form.controls[field2];

    if (control1.value !== control2.value) {
      return { matchingFields: true };
    }
    return null;

  }
}