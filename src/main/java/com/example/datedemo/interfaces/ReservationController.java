package com.example.datedemo.interfaces;

import com.example.datedemo.domain.Reservation;
import com.example.datedemo.domain.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@Tag(name = "Reservations", description = "API for managing hotel reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    @Operation(summary = "Create a new reservation")
    public ResponseEntity<Reservation> createReservation(@RequestBody CreateReservationRequest request) {
        Reservation reservation = new Reservation(
                null,
                request.customerName(),
                request.customerEmail(),
                request.roomType(),
                request.checkInDate(),
                request.checkOutDate());
        return ResponseEntity.ok(reservationService.createReservation(reservation));
    }

    @GetMapping
    @Operation(summary = "Get all reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }
}

record CreateReservationRequest(
        String customerName,
        String customerEmail,
        String roomType,
        Date checkInDate,
        Date checkOutDate) {
}
