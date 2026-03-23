import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    template: `
    <!-- Hero Section -->
    <section class="hero-section d-flex align-items-center justify-content-center text-white text-center">
      <div class="hero-overlay"></div>
      <div class="container position-relative z-1">
        <h1 class="display-2 fw-bold mb-3">Finca La Carla</h1>
        <p class="lead fs-4 mb-2">A peaceful retreat in the heart of Andalusia</p>
        <p class="fs-5 mb-4">
          <i class="bi bi-geo-alt"></i> Antequera, Málaga — Spain
        </p>
        <a routerLink="/reserve" class="btn btn-warning btn-lg px-5 py-3 fw-semibold shadow">
          Book Your Stay
        </a>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-5 bg-light">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">Welcome to Our Hotel</h2>
        <p class="text-muted mx-auto" style="max-width:700px">
          Nestled among the olive groves and rolling hills of Antequera, Finca La Carla offers
          an authentic Andalusian experience. Enjoy breathtaking views of the mountains,
          a refreshing pool, and the warm hospitality of southern Spain.
        </p>
      </div>
    </section>

    <!-- Room Types -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Our Rooms</h2>
        <div class="row g-4">

          <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0 overflow-hidden">
              <img src="room-single.png" class="card-img-top room-img" alt="Single Room">
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">Single Room</h5>
                <p class="text-muted">A cozy retreat with countryside views, rustic decor and all essentials.</p>
                <p class="fs-5 fw-semibold text-success">€75 / night</p>
                <a routerLink="/reserve" [queryParams]="{room: 'SINGLE'}" class="btn btn-outline-dark">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow border-0 overflow-hidden position-relative">
              <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Popular</span>
              <img src="room-double.png" class="card-img-top room-img" alt="Double Room">
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">Double Room</h5>
                <p class="text-muted">Spacious room with king-size bed, olive grove views and elegant details.</p>
                <p class="fs-5 fw-semibold text-success">€120 / night</p>
                <a routerLink="/reserve" [queryParams]="{room: 'DOUBLE'}" class="btn btn-dark">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0 overflow-hidden">
              <img src="room-suite.png" class="card-img-top room-img" alt="Suite">
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">Suite</h5>
                <p class="text-muted">Our finest room with living area, private balcony and mountain panorama.</p>
                <p class="fs-5 fw-semibold text-success">€200 / night</p>
                <a routerLink="/reserve" [queryParams]="{room: 'SUITE'}" class="btn btn-outline-dark">
                  Book Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-1 fw-bold">Finca La Carla Hotel</p>
        <p class="mb-1 text-white-50 small">Camino Rural s/n, 29200 Antequera, Málaga, Spain</p>
        <p class="mb-0 text-white-50 small">📞 +34 952 000 000 · ✉️ info&#64;fincalacarla.com</p>
      </div>
    </footer>
  `,
    styles: [`
    .hero-section {
      min-height: 100vh;
      background: url('/hotel-hero.png') center/cover no-repeat;
      position: relative;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
    }
    .z-1 { z-index: 1; }
    .room-img {
      height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .card:hover .room-img {
      transform: scale(1.05);
    }
    .card { transition: box-shadow 0.3s ease; border-radius: 12px; }
    .card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.15) !important; }
  `]
})
export class HomeComponent { }
