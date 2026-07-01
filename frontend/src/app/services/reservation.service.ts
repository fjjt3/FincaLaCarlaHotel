import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

export interface Reservation {
    id?: number;
    customerName: string;
    customerEmail: string;
    roomType: string;
    checkInDate: string;
    checkOutDate: string;
    status?: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = '/api/reservations';

    createReservation(reservation: Reservation, onRetry?: (attempt: number) => void): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiUrl, reservation).pipe(
            retry({
                count: 3,
                delay: (error: HttpErrorResponse, retryCount: number) => {
                    if (error.status === 429) {
                        const delayMs = Math.pow(2, retryCount) * 1000;
                        onRetry?.(retryCount);
                        return timer(delayMs);
                    }
                    throw error;
                }
            })
        );
    }

    getAllReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.apiUrl);
    }
}
