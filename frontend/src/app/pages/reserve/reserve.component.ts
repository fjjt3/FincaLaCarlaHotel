import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="reserve-page">
      <div class="container py-5" style="margin-top: 70px;">
        <div class="row justify-content-center">
          <div class="col-lg-7">

            <div class="card shadow border-0 rounded-4 overflow-hidden">
              <div class="card-header py-4 text-center card-header--brand">
                <h3 class="mb-1 fw-bold text-white">Make a Reservation</h3>
                <p class="mb-0 text-white-50 small">Finca La Carla &middot; Antequera, M&aacute;laga</p>
              </div>

              <div class="card-body p-4">

                @if (successMessage(); as msg) {
                  <div class="alert alert-success alert-dismissible fade show" role="alert" aria-live="polite">
                    {{ msg }}
                    <button type="button" class="btn-close" (click)="successMessage.set('')" aria-label="Close"></button>
                  </div>
                }

                @if (errorMessage(); as msg) {
                  <div class="alert alert-danger alert-dismissible fade show" role="alert" aria-live="assertive">
                    {{ msg }}
                    <button type="button" class="btn-close" (click)="errorMessage.set('')" aria-label="Close"></button>
                  </div>
                }

                <form (ngSubmit)="onSubmit()" #reservationForm="ngForm">
                  <div class="mb-3">
                    <label for="customerName" class="form-label fw-semibold">Full Name</label>
                    <input type="text" class="form-control form-control-lg" id="customerName"
                           [(ngModel)]="customerName" name="customerName"
                           placeholder="e.g. Carlos Garc&iacute;a" required
                           autocomplete="name">
                  </div>

                  <div class="mb-3">
                    <label for="customerEmail" class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control form-control-lg" id="customerEmail"
                           [(ngModel)]="customerEmail" name="customerEmail"
                           placeholder="e.g. carlos@email.com" required
                           autocomplete="email">
                  </div>

                  <div class="mb-3">
                    <label for="roomType" class="form-label fw-semibold">Room Type</label>
                    <select class="form-select form-select-lg" id="roomType"
                            [(ngModel)]="roomType" name="roomType" required>
                      <option value="" disabled>Select a room</option>
                      <option value="SINGLE">Single Room &mdash; &euro;75/night</option>
                      <option value="DOUBLE">Double Room &mdash; &euro;120/night</option>
                      <option value="SUITE">Suite &mdash; &euro;200/night</option>
                    </select>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="checkInDate" class="form-label fw-semibold">Check-in</label>
                      <input type="date" class="form-control form-control-lg" id="checkInDate"
                             [(ngModel)]="checkInDate" name="checkInDate"
                             [min]="today" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="checkOutDate" class="form-label fw-semibold">Check-out</label>
                      <input type="date" class="form-control form-control-lg" id="checkOutDate"
                             [(ngModel)]="checkOutDate" name="checkOutDate"
                             [min]="minCheckOutDate()" required>
                    </div>
                  </div>

                  @if (totalNights() > 0) {
                    <div class="price-summary">
                      <div class="price-summary__row">
                        <span>{{ roomLabel() }} &times; {{ totalNights() }} night{{ totalNights() > 1 ? 's' : '' }}</span>
                        <span>&euro;{{ pricePerNight() }} / night</span>
                      </div>
                      <div class="price-summary__total">
                        <span>Total</span>
                        <span class="price-summary__amount">&euro;{{ calculatedPrice() }}</span>
                      </div>
                    </div>
                  }

                  <button type="submit" class="btn btn-lg w-100 fw-bold py-3 mt-3 btn-submit"
                          [disabled]="loading() || !reservationForm.valid">
                    @if (loading()) {
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      <span>Processing...</span>
                    } @else {
                      <span>Confirm Reservation</span>
                    }
                  </button>
                </form>
              </div>
            </div>

            <div class="text-center mt-4">
              <a routerLink="/" class="back-link">&larr; Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reserve-page {
      min-height: 100vh;
      background: var(--color-whitewash);
    }
    .card {
      border-radius: 16px !important;
    }
    .card-header--brand {
      background: var(--color-mediterranean) !important;
    }
    .form-control:focus, .form-select:focus {
      border-color: var(--color-sun);
      box-shadow: 0 0 0 0.2rem rgba(232, 184, 75, 0.25);
    }
    .price-summary {
      background: #F0EAE2;
      border-radius: var(--radius-md);
      padding: var(--space-md) var(--space-lg);
      margin-top: var(--space-md);
    }
    .price-summary__row {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-sm);
      color: var(--color-warm-gray);
      margin-bottom: var(--space-sm);
    }
    .price-summary__total {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: var(--text-lg);
      padding-top: var(--space-sm);
      border-top: 1px solid var(--color-stone);
      color: var(--color-dark-oak);
    }
    .price-summary__amount {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-mediterranean);
    }
    .btn-submit {
      background: var(--color-sun);
      color: var(--color-dark-oak);
      border: none;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      transition: background 0.2s, transform 0.2s;
    }
    .btn-submit:hover:not(:disabled) {
      background: #d4a030;
      transform: translateY(-1px);
    }
    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .back-link {
      color: var(--color-warm-gray);
      text-decoration: none;
      font-size: var(--text-sm);
    }
    .back-link:hover {
      color: var(--color-dark-oak);
      text-decoration: underline;
    }
  `]
})
export class ReserveComponent implements OnInit, OnDestroy {
  private reservationService = inject(ReservationService);
  private route = inject(ActivatedRoute);
  private querySub?: Subscription;

  readonly customerName = signal('');
  readonly customerEmail = signal('');
  readonly roomType = signal('');
  readonly checkInDate = signal('');
  readonly checkOutDate = signal('');

  readonly loading = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  readonly today = new Date().toISOString().split('T')[0];

  private readonly roomPrices: Record<string, number> = {
    SINGLE: 75,
    DOUBLE: 120,
    SUITE: 200
  };

  readonly pricePerNight = computed(() => this.roomPrices[this.roomType()] ?? 0);

  readonly totalNights = computed(() => {
    const checkIn = this.checkInDate();
    const checkOut = this.checkOutDate();
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  });

  readonly calculatedPrice = computed(() => this.totalNights() * this.pricePerNight());

  readonly minCheckOutDate = computed(() => {
    return this.checkInDate() || this.today;
  });

  readonly roomLabel = computed(() => {
    const labels: Record<string, string> = {
      SINGLE: 'Single Room',
      DOUBLE: 'Double Room',
      SUITE: 'Suite'
    };
    return labels[this.roomType()] || 'Room';
  });

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params['room']) {
        this.roomType.set(params['room']);
      }
    });
  }

  ngOnDestroy() {
    this.querySub?.unsubscribe();
  }

  onSubmit() {
    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const reservation: Reservation = {
      customerName: this.customerName(),
      customerEmail: this.customerEmail(),
      roomType: this.roomType(),
      checkInDate: this.checkInDate(),
      checkOutDate: this.checkOutDate()
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        this.successMessage.set(`Reservation #${res.id} confirmed for ${res.customerName}!`);
        this.loading.set(false);
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'An error occurred. Please try again.');
        this.loading.set(false);
      }
    });
  }

  private resetForm() {
    const currentRoom = this.roomType();
    this.customerName.set('');
    this.customerEmail.set('');
    this.roomType.set(currentRoom);
    this.checkInDate.set('');
    this.checkOutDate.set('');
  }
}
