import { Component, signal } from '@angular/core';
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
        <button class="navbar-toggler" type="button" aria-controls="navbarNav"
                [attr.aria-expanded]="navigationExpanded()" aria-label="Toggle navigation"
                (click)="toggleNavigation()">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" [class.show]="navigationExpanded()" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
                 ariaCurrentWhenActive="page" (click)="navigationExpanded.set(false)">Home</a>
            </li>
            <li class="nav-item ms-lg-2">
              <a class="btn nav-cta" routerLink="/reserve" routerLinkActive="active"
                 ariaCurrentWhenActive="page" (click)="navigationExpanded.set(false)">Book Your Stay</a>
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
    .navbar-toggler {
      border-color: rgba(255,255,255,0.2);
    }
    .navbar-toggler:focus {
      box-shadow: 0 0 0 0.2rem rgba(232,184,75,0.35);
    }
    .navbar-toggler-icon {
      transition: transform 180ms ease-out;
    }
    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
      transform: rotate(90deg);
    }
    .navbar-collapse.show {
      animation: navigation-arrive 180ms ease-out both;
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
      background: var(--color-sun-dark);
      transform: translateY(-1px);
      color: var(--color-dark-oak) !important;
    }
    @media (max-width: 991.98px) {
      .navbar-collapse {
        padding-top: var(--space-sm);
      }
      .navbar-nav {
        align-items: stretch !important;
        gap: var(--space-xs);
      }
      .nav-cta {
        display: block;
        margin-top: var(--space-xs);
        text-align: center;
      }
    }
    @keyframes navigation-arrive {
      from {
        opacity: 0;
        transform: translateY(-0.35rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class AppComponent {
  readonly navigationExpanded = signal(false);

  toggleNavigation() {
    this.navigationExpanded.update(isExpanded => !isExpanded);
  }
}
