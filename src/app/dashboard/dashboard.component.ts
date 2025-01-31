import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  imports: [JsonPipe, AsyncPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  currentUser$: any;

  constructor(private authService: AuthenticationService) {
    this.currentUser$ = this.authService.currentUser;
  }
}
