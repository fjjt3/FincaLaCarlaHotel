import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  gradient: string;
  popular?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero" aria-label="Welcome">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content container">
        <h1 class="hero-title">Finca La Carla</h1>
        <p class="hero-subtitle">A peaceful retreat in the heart of Andalusia</p>
        <p class="hero-location">
          <span aria-hidden="true">&#8212;</span> Antequera, M&aacute;laga <span aria-hidden="true">&#8212;</span>
        </p>
        <a routerLink="/reserve" class="btn hero-cta">Book Your Stay</a>
      </div>
    </section>

    <section class="section" aria-labelledby="welcome-heading">
      <div class="container text-center">
        <span class="section-eyebrow">Bienvenidos</span>
        <h2 id="welcome-heading" class="section-title">Welcome to Our Hotel</h2>
        <div class="andalusian-divider" aria-hidden="true">
          <span class="diamond"></span>
        </div>
        <p class="section-text mx-auto" style="max-width:680px">
          Nestled among olive groves and rolling hills, Finca La Carla offers
          an authentic Andalusian experience &mdash; mountain views, a refreshing pool,
          and the warm hospitality of southern Spain.
        </p>
      </div>
    </section>

    <section class="section section--cream" aria-labelledby="rooms-heading">
      <div class="container">
        <span class="section-eyebrow text-center d-block">Estancias</span>
        <h2 id="rooms-heading" class="section-title text-center">Our Rooms</h2>
        <div class="andalusian-divider" aria-hidden="true">
          <span class="diamond"></span>
        </div>

        <div class="rooms-grid">
          @for (room of rooms; track room.id) {
            <article class="room-card" [class.room-card--popular]="room.popular"
                     [attr.aria-label]="'Room: ' + room.name">
              <div class="room-card__image" [style.background]="room.gradient">
                @if (room.popular) {
                  <span class="room-card__badge">Most popular</span>
                }
                <span class="room-card__ornament" aria-hidden="true">
                  &#x25C7;
                </span>
              </div>
              <div class="room-card__body">
                <h3 class="room-card__title">{{ room.name }}</h3>
                <p class="room-card__desc">{{ room.description }}</p>
                <ul class="room-card__features"                     [attr.aria-label]="'Amenities for ' + room.name">
                  @for (feature of room.features; track feature) {
                    <li class="room-card__feature">{{ feature }}</li>
                  }
                </ul>
                <div class="room-card__footer">
                  <span class="room-card__price">
                    <span class="room-card__amount">&euro;{{ room.price }}</span>
                    <span class="room-card__unit"> / night</span>
                  </span>
                  <a [routerLink]="'/reserve'" [queryParams]="{room: room.id}" class="room-card__cta">
                    Book <span class="visually-hidden">{{ room.name }}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="location-heading">
      <div class="container text-center">
        <span class="section-eyebrow">D&oacute;nde estamos</span>
        <h2 id="location-heading" class="section-title">Find Us</h2>
        <div class="andalusian-divider" aria-hidden="true">
          <span class="diamond"></span>
        </div>
        <p class="section-text">
          Camino Rural s/n &middot; 29200 Antequera, M&aacute;laga &middot; Spain
        </p>
        <p class="section-text section-text--small mt-2">
          +34 952 000 000 &middot;
          <a href="mailto:info&#64;fincalacarla.com" class="contact-link">info&#64;fincalacarla.com</a>
        </p>
      </div>
    </section>

    <footer class="site-footer" role="contentinfo">
      <div class="container text-center">
        <span class="site-footer__brand">Finca La Carla</span>
        <p class="site-footer__copy">&copy; 2026 Finca La Carla Hotel. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #fff;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(135deg, rgba(27,58,92,0.3), rgba(44,24,16,0.4)),
        var(--color-mediterranean);
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6));
    }
    .hero-content {
      position: relative;
      z-index: 2;
      padding: 2rem;
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 0.75rem;
      color: #fff;
      letter-spacing: 0.02em;
    }
    .hero-subtitle {
      font-size: clamp(1rem, 2.5vw, 1.375rem);
      font-weight: 300;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }
    .hero-location {
      font-size: var(--text-sm);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      opacity: 0.7;
      margin-bottom: 2rem;
    }
    .hero-cta {
      background: var(--color-sun);
      color: var(--color-dark-oak);
      font-weight: 600;
      font-size: var(--text-base);
      padding: 1rem 3rem;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border: none;
      transition: background 0.2s, transform 0.2s;
    }
    .hero-cta:hover {
      background: #d4a030;
      transform: translateY(-2px);
      color: var(--color-dark-oak);
    }

    .rooms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-xl);
      margin-top: var(--space-2xl);
    }

    .room-card {
      background: #fff;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.3s, transform 0.3s;
      display: flex;
      flex-direction: column;
    }
    .room-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }
    .room-card--popular {
      box-shadow: var(--shadow-md);
    }
    .room-card__image {
      position: relative;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .room-card__ornament {
      font-size: 4rem;
      color: rgba(255,255,255,0.3);
    }
    .room-card__badge {
      position: absolute;
      top: var(--space-md);
      right: var(--space-md);
      background: var(--color-sun);
      color: var(--color-dark-oak);
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.3rem 0.8rem;
      border-radius: var(--radius-sm);
    }
    .room-card__body {
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .room-card__title {
      font-size: var(--text-xl);
      margin-bottom: var(--space-sm);
    }
    .room-card__desc {
      font-size: var(--text-sm);
      color: var(--color-warm-gray);
      line-height: 1.6;
      margin-bottom: var(--space-md);
    }
    .room-card__features {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-bottom: var(--space-lg);
      padding: 0;
    }
    .room-card__feature {
      font-size: var(--text-xs);
      color: var(--color-olive);
      background: rgba(122, 139, 91, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
      font-weight: 500;
    }
    .room-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: var(--space-md);
      border-top: 1px solid var(--color-stone);
    }
    .room-card__amount {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-mediterranean);
    }
    .room-card__unit {
      font-size: var(--text-sm);
      color: var(--color-warm-gray);
    }
    .room-card__cta {
      font-weight: 600;
      font-size: var(--text-sm);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-terracotta-dark);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-terracotta);
      border-radius: var(--radius-sm);
      transition: background 0.2s, color 0.2s;
    }
    .room-card__cta:hover {
      background: var(--color-terracotta);
      color: #fff;
    }

    .site-footer {
      background: var(--color-mediterranean);
      color: rgba(255,255,255,0.7);
      padding: var(--space-2xl) 0;
    }
    .site-footer__brand {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      color: #fff;
      display: block;
      margin-bottom: var(--space-sm);
    }
    .site-footer__copy {
      font-size: var(--text-xs);
      margin: 0;
    }
  `]
})
export class HomeComponent {
  readonly rooms: Room[] = [
    {
      id: 'SINGLE',
      name: 'Single Room',
      description: 'A cozy retreat with countryside views, rustic decor and all essentials.',
      price: 75,
      features: ['countryside view', 'private bathroom', 'free wifi'],
      gradient: 'linear-gradient(135deg, #D4C5A9, #C4956A)'
    },
    {
      id: 'DOUBLE',
      name: 'Double Room',
      description: 'Spacious room with king-size bed, olive grove views and elegant details.',
      price: 120,
      features: ['king-size bed', 'olive grove view', 'private balcony', 'free wifi'],
      gradient: 'linear-gradient(135deg, #7A8B5B, #5A6B3B)',
      popular: true
    },
    {
      id: 'SUITE',
      name: 'Suite',
      description: 'Our finest room with living area, private balcony and mountain panorama.',
      price: 200,
      features: ['living area', 'private balcony', 'mountain view', 'free wifi', 'minibar'],
      gradient: 'linear-gradient(135deg, #2C5380, #1B3A5C)'
    }
  ];
}
