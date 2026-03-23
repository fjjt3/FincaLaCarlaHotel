import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';

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
              <div class="card-header bg-dark text-white py-4 text-center">
                <h3 class="mb-1 fw-bold">Make a Reservation</h3>
                <p class="mb-0 text-white-50 small">Finca La Carla · Antequera, Málaga</p>
              </div>
              <div class="card-body p-4">

                <!-- Success alert -->
                <div *ngIf="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                  ✅ {{ successMessage }}
                  <button type="button" class="btn-close" (click)="successMessage = ''"></button>
                </div>

                <!-- Error alert -->
                <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                  ❌ {{ errorMessage }}
                  <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
                </div>

                <form (ngSubmit)="onSubmit()" #reservationForm="ngForm">
                  <div class="mb-3">
                    <label for="customerName" class="form-label fw-semibold">Full Name</label>
                    <input type="text" class="form-control form-control-lg" id="customerName"
                           [(ngModel)]="reservation.customerName" name="customerName"
                           placeholder="e.g. Carlos García" required>
                  </div>

                  <div class="mb-3">
                    <label for="customerEmail" class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control form-control-lg" id="customerEmail"
                           [(ngModel)]="reservation.customerEmail" name="customerEmail"
                           placeholder="e.g. carlos@email.com" required>
                  </div>

                  <div class="mb-3">
                    <label for="roomType" class="form-label fw-semibold">Room Type</label>
                    <select class="form-select form-select-lg" id="roomType"
                            [(ngModel)]="reservation.roomType" name="roomType" required>
                      <option value="" disabled>Select a room</option>
                      <option value="SINGLE">Single Room — €75/night</option>
                      <option value="DOUBLE">Double Room — €120/night</option>
                      <option value="SUITE">Suite — €200/night</option>
                    </select>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="checkInDate" class="form-label fw-semibold">Check-in Date</label>
                      <input type="date" class="form-control form-control-lg" id="checkInDate"
                             [(ngModel)]="reservation.checkInDate" name="checkInDate" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="checkOutDate" class="form-label fw-semibold">Check-out Date</label>
                      <input type="date" class="form-control form-control-lg" id="checkOutDate"
                             [(ngModel)]="reservation.checkOutDate" name="checkOutDate" required>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-warning btn-lg w-100 fw-bold py-3 mt-2"
                          [disabled]="loading || !reservationForm.valid">
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ loading ? 'Processing...' : 'Confirm Reservation' }}
                  </button>
                </form>
              </div>
            </div>

            <div class="text-center mt-4">
              <a routerLink="/" class="text-decoration-none text-muted">← Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .reserve-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    .card { border-radius: 16px !important; }
    .form-control:focus, .form-select:focus {
      border-color: #ffc107;
      box-shadow: 0 0 0 0.2rem rgba(255,193,7,0.25);
    }
  `]
})
export class ReserveComponent implements OnInit {
    reservation: Reservation = {
        customerName: '',
        customerEmail: '',
        roomType: '',
        checkInDate: '',
        checkOutDate: ''
    };

    loading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private reservationService: ReservationService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['room']) {
                this.reservation.roomType = params['room'];
            }
        });
    }

    onSubmit() {
        this.loading = true;
        this.successMessage = '';
        this.errorMessage = '';

        this.reservationService.createReservation(this.reservation).subscribe({
            next: (res) => {
                this.successMessage = `Reservation #${res.id} confirmed for ${res.customerName}!`;
                this.loading = false;
                this.resetForm();
            },
            error: (err) => {
                this.errorMessage = err.error?.message || 'An error occurred. Please try again.';
                this.loading = false;
            }
        });
    }

    private resetForm() {
        this.reservation = {
            customerName: '',
            customerEmail: '',
            roomType: this.reservation.roomType,
            checkInDate: '',
            checkOutDate: ''
        };
    }
}
