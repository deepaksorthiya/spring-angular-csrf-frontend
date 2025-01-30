import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {
    console.log('AppComponent ngOnInit() initialized');
  }

  ngAfterViewInit(): void {
    console.log('AppComponent ngAfterViewInit() initialized');
  }
}
