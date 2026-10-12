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
      <div class="container reserve-layout">
        <div class="row justify-content-center">
          <div class="col-lg-8">

            <div class="reservation-card">
              <div class="reservation-header">
                <span class="reservation-eyebrow">Estancias &middot; Reservations</span>
                <h1 class="reservation-title">Plan your stay</h1>
                <p class="reservation-intro">Choose a room and dates to see your total.</p>
              </div>

              <div class="reservation-body">

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
                  <div class="form-group">
                    <label for="customerName" class="form-label">Full name</label>
                    <input type="text" class="form-control" id="customerName"
                           [(ngModel)]="customerName" name="customerName"
                           placeholder="e.g. Carlos Garc&iacute;a" required
                           autocomplete="name">
                  </div>

                  <div class="form-group">
                    <label for="customerEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="customerEmail"
                           [(ngModel)]="customerEmail" name="customerEmail"
                           placeholder="e.g. carlos@email.com" required
                           autocomplete="email">
                  </div>

                  <div class="form-group">
                    <span class="form-label" id="room-type-label">Room type</span>
                    <div class="room-picker" role="group" aria-labelledby="room-type-label">
                      @for (option of roomOptions; track option.id) {
                        <button type="button"
                                class="room-option"
                                [class.room-option--active]="roomType() === option.id"
                                (click)="roomType.set(option.id)"
                                [attr.aria-pressed]="roomType() === option.id">
                          <div class="room-option__image"
                               [style.backgroundImage]="'url(' + option.image + ')'"></div>
                          <div class="room-option__info">
                            <span class="room-option__name">{{ option.name }}</span>
                            <span class="room-option__price">&euro;{{ option.price }}/night</span>
                          </div>
                        </button>
                      }
                    </div>
                    <input type="hidden" [(ngModel)]="roomType" name="roomType" required>
                  </div>

                  <div class="row date-fields">
                    <div class="col-md-6 form-group">
                      <label for="checkInDate" class="form-label">Check-in</label>
                      <input type="date" class="form-control" id="checkInDate"
                             [(ngModel)]="checkInDate" name="checkInDate"
                             [min]="today" required>
                    </div>
                    <div class="col-md-6 form-group">
                      <label for="checkOutDate" class="form-label">Check-out</label>
                      <input type="date" class="form-control" id="checkOutDate"
                             [(ngModel)]="checkOutDate" name="checkOutDate"
                             [min]="minCheckOutDate()"
                             [attr.aria-describedby]="invalidDateRange() ? 'checkOutDateError' : null"
                             [attr.aria-invalid]="invalidDateRange()"
                             required>
                      @if (invalidDateRange()) {
                        <div id="checkOutDateError" class="date-error" role="alert">
                          Check-out must be at least one day after check-in.
                        </div>
                      }
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

                  <button type="submit" class="btn w-100 btn-submit"
                          [disabled]="loading() || !reservationForm.valid">
                    @if (loading()) {
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      <span>Processing...</span>
                    } @else {
                      <span>Confirm reservation</span>
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
      padding: 7.25rem 0 4rem;
    }
    .reserve-layout {
      max-width: 920px;
    }
    .reservation-card {
      overflow: hidden;
      background: var(--color-white);
      border: 1px solid rgba(44, 24, 16, 0.08);
      border-radius: 12px;
      box-shadow: 0 16px 48px rgba(44, 24, 16, 0.08);
    }
    .reservation-header {
      padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem);
      background: var(--color-mediterranean);
      color: var(--color-white);
    }
    .reservation-eyebrow {
      display: block;
      margin-bottom: var(--space-sm);
      color: var(--color-sun);
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 0.13em;
      text-transform: uppercase;
    }
    .reservation-title {
      margin: 0;
      color: var(--color-white);
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      letter-spacing: -0.025em;
    }
    .reservation-intro {
      margin: var(--space-sm) 0 0;
      color: rgba(255,255,255,0.75);
      font-size: var(--text-sm);
    }
    .reservation-body {
      padding: clamp(1.5rem, 5vw, 3rem);
    }
    .form-group {
      min-width: 0;
      margin-bottom: var(--space-lg);
    }
    .form-label {
      display: block;
      margin-bottom: 0.45rem;
      color: var(--color-dark-oak);
      font-size: var(--text-sm);
      font-weight: 600;
    }
    .form-control {
      min-height: 3.15rem;
      border-color: var(--color-stone);
      border-radius: var(--radius-sm);
      color: var(--color-dark-oak);
      font-size: var(--text-base);
    }
    .form-control:focus {
      border-color: var(--color-mediterranean-light);
      box-shadow: 0 0 0 0.2rem rgba(44, 83, 128, 0.15);
    }
    .date-fields {
      --bs-gutter-x: 1rem;
      margin-bottom: 0.25rem;
    }
    .date-error {
      color: #a34436;
      font-size: var(--text-sm);
      margin-top: var(--space-xs);
    }
    .form-control[aria-invalid="true"] {
      border-color: #a34436;
    }
    .price-summary {
      padding: var(--space-md) var(--space-lg);
      margin: 0 0 var(--space-lg);
      border: 1px solid var(--color-stone);
      border-left: 3px solid var(--color-olive);
      border-radius: var(--radius-sm);
      background: var(--color-whitewash);
    }
    .price-summary__row {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-sm);
      color: var(--color-warm-gray);
      margin-bottom: var(--space-md);
    }
    .price-summary__total {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: var(--text-lg);
      padding-top: var(--space-md);
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
      min-height: 3.5rem;
      background: var(--color-sun);
      color: var(--color-dark-oak);
      border: none;
      border-radius: var(--radius-sm);
      font-size: var(--text-base);
      font-weight: 600;
      letter-spacing: 0.01em;
      transition: background 0.2s, transform 0.2s, opacity 0.2s;
    }
    .btn-submit:hover:not(:disabled) {
      background: var(--color-sun-dark);
      transform: translateY(-1px);
    }
    .btn-submit:disabled {
      opacity: 0.72;
      cursor: not-allowed;
    }
    .back-link {
      color: var(--color-warm-gray);
      text-decoration: none;
      font-size: var(--text-sm);
      text-underline-offset: 3px;
    }
    .back-link:hover {
      color: var(--color-dark-oak);
      text-decoration: underline;
    }
    .room-picker {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
    .room-option {
      flex: 1;
      border: 2px solid var(--color-stone);
      border-radius: var(--radius-md);
      overflow: hidden;
      cursor: pointer;
      background: var(--color-white);
      padding: 0;
      text-align: left;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    }
    .room-option:hover {
      border-color: var(--color-warm-gray);
      transform: translateY(-2px);
    }
    .room-option--active {
      border-color: var(--color-olive);
      box-shadow: 0 0 0 2px rgba(122, 139, 91, 0.2);
    }
    .room-option__image {
      height: clamp(5.5rem, 13vw, 7.5rem);
      background-size: cover;
      background-position: center;
      background-color: var(--color-stone);
    }
    .room-option__info {
      padding: var(--space-sm) var(--space-md);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .room-option__name {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--color-dark-oak);
    }
    .room-option__price {
      font-size: var(--text-xs);
      color: var(--color-warm-gray);
    }
    @media (max-width: 575.98px) {
      .reserve-page {
        padding: 6.25rem 0 2rem;
      }
      .room-picker {
        gap: 0.5rem;
      }
      .room-option__info {
        padding: 0.6rem;
      }
      .room-option__name {
        font-size: var(--text-xs);
      }
      .room-option__price {
        font-size: 0.7rem;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .room-option:hover {
        transform: none;
      }
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

  readonly roomOptions = [
    { id: 'SINGLE', name: 'Single Room', price: 75, image: '/room-single.png' },
    { id: 'DOUBLE', name: 'Double Room', price: 120, image: '/room-double.png' },
    { id: 'SUITE', name: 'Suite', price: 200, image: '/room-suite.png' }
  ];

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
    const checkIn = this.checkInDate();
    if (!checkIn) return this.today;

    const [year, month, day] = checkIn.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
  });

  readonly invalidDateRange = computed(() => {
    const checkIn = this.checkInDate();
    const checkOut = this.checkOutDate();
    return Boolean(checkIn && checkOut && checkOut <= checkIn);
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
    if (this.invalidDateRange()) return;

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
        if (err.status === 429) {
          this.errorMessage.set('Server is waking up. Please wait a moment and try again.');
        } else {
          this.errorMessage.set(err.error?.message || 'An error occurred. Please try again.');
        }
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
