import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private apiUrl = 'http://localhost:8080/api/reservations';

    constructor(private http: HttpClient) { }

    createReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiUrl, reservation);
    }

    getAllReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.apiUrl);
    }
}
