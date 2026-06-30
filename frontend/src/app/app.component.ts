import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a href="#main-content" class="skip-link">Skip to content</a>

    <nav class="navbar navbar-expand-lg fixed-top" role="navigation" aria-label="Main navigation">
      <div class="container">
        <a class="navbar-brand" routerLink="/" aria-label="Finca La Carla home">
          Finca La Carla
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
                 ariaCurrentWhenActive="page">Home</a>
            </li>
            <li class="nav-item ms-lg-2">
              <a class="btn nav-cta" routerLink="/reserve" routerLinkActive="active"
                 ariaCurrentWhenActive="page">Book Your Stay</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main id="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      background: rgba(27, 58, 92, 0.95) !important;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding-block: 0.75rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .navbar-brand {
      font-family: var(--font-display);
      font-size: 1.4rem;
      letter-spacing: 0.02em;
      color: var(--color-whitewash) !important;
    }
    .navbar-brand:hover {
      color: var(--color-sun) !important;
    }
    .nav-link {
      color: rgba(255,255,255,0.8) !important;
      font-size: var(--text-sm);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.5rem 1rem !important;
      transition: color 0.2s;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--color-sun) !important;
    }
    .nav-cta {
      background: var(--color-sun);
      color: var(--color-dark-oak) !important;
      font-weight: 600;
      font-size: var(--text-sm);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.5rem 1.5rem;
      border-radius: var(--radius-sm);
      transition: background 0.2s, transform 0.2s;
      border: none;
    }
    .nav-cta:hover {
      background: #d4a030;
      transform: translateY(-1px);
      color: var(--color-dark-oak) !important;
    }
  `]
})
export class AppComponent {}
