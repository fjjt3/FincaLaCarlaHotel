package com.example.datedemo.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        List<Reservation> overlapping = reservationRepository.findOverlappingReservations(
                reservation.roomType(),
                reservation.checkInDate(),
                reservation.checkOutDate());

        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("Room is not available for the selected dates");
        }

        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Long id, Reservation updated) {
        Reservation existing = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));

        if (existing.status() == ReservationStatus.CANCELLED) {
            throw new IllegalStateException("Cannot update a cancelled reservation");
        }

        Reservation toSave = new Reservation(
                id,
                updated.customerName(),
                updated.customerEmail(),
                updated.roomType(),
                updated.checkInDate(),
                updated.checkOutDate(),
                existing.status()
        );

        // Check overlapping excluding the current reservation
        List<Reservation> overlapping = reservationRepository.findOverlappingReservations(
                toSave.roomType(),
                toSave.checkInDate(),
                toSave.checkOutDate());

        boolean hasConflict = overlapping.stream().anyMatch(r -> !r.id().equals(id));
        if (hasConflict) {
            throw new IllegalStateException("Room is not available for the selected dates");
        }

        return reservationRepository.save(toSave);
    }

    public Reservation cancelReservation(Long id) {
        Reservation existing = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));

        if (existing.status() == ReservationStatus.CANCELLED) {
            throw new IllegalStateException("Reservation is already cancelled");
        }

        Reservation cancelled = new Reservation(
                existing.id(),
                existing.customerName(),
                existing.customerEmail(),
                existing.roomType(),
                existing.checkInDate(),
                existing.checkOutDate(),
                ReservationStatus.CANCELLED
        );

        return reservationRepository.save(cancelled);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
