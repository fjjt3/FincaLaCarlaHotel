import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">🏨 Finca La Carla</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn btn-outline-warning btn-sm px-3 ms-2" routerLink="/reserve">Book Now</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [`
    .navbar { backdrop-filter: blur(10px); background: rgba(33,37,41,0.9) !important; }
  `]
})
export class AppComponent { }
