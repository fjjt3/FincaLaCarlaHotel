package com.example.datedemo.domain;

import java.util.Date;

public record Reservation(
        Long id,
        String customerName,
        String customerEmail,
        String roomType,
        Date checkInDate,
        Date checkOutDate) {
    public Reservation {
        if (checkInDate == null || checkOutDate == null) {
            throw new IllegalArgumentException("Check-in and check-out dates are required");
        }
        if (checkOutDate.before(checkInDate)) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }
    }
}
