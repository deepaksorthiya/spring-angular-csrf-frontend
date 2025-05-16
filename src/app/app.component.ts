import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor() {
    console.log('API URL ::', environment.apiUrl);
    console.log('IS PRODUCTION :: ', environment.production);
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit() initialized');
  }

  ngAfterViewInit(): void {
    console.log('AppComponent ngAfterViewInit() initialized');
  }
}
