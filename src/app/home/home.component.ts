import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [JsonPipe, AsyncPipe, RouterLink],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  currentUser$: any;
  serverInfo: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        alert('Logout successful');
        this.router.navigateByUrl('/login');
      },
    });
  }

  getBackendServerInfo(): void {
    this.authService.getBackendServerInfo().subscribe({
      next: (response) => {
        this.serverInfo = response;
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Request failed, check the console log for details');
      },
    });
  }

  performPostRequest(): void {
    this.authService.performPostRequest().subscribe({
      next: (response) => {
        console.log('Response:', response);
        alert('Post request successful');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Post request failed, check the console log for details');
      },
    });
  }
}
