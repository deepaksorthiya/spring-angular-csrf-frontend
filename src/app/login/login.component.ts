import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm?: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['user', Validators.required],
      password: ['password', Validators.required],
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      alert('The login form is invalid');
      return;
    }

    this.authService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: () => {
          alert('Login successful');
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.error(err);
          alert('Login failed, check the console log for details');
        },
      });
  }
}
