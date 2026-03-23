package com.example.datedemo.domain;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository {
    Reservation save(Reservation reservation);

    List<Reservation> findAll();

    Optional<Reservation> findById(Long id);

    List<Reservation> findOverlappingReservations(String roomType, Date checkIn, Date checkOut);
}
