package com.example.datedemo.infrastructure;

import com.example.datedemo.domain.Reservation;
import com.example.datedemo.domain.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class ReservationRepositoryAdapter implements ReservationRepository {
    private final JpaReservationRepository jpaRepository;

    @Override
    public Reservation save(Reservation reservation) {
        ReservationEntity entity = toEntity(reservation);
        ReservationEntity savedEntity = jpaRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public List<Reservation> findAll() {
        return jpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Reservation> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Reservation> findOverlappingReservations(String roomType, Date checkIn, Date checkOut) {
        return jpaRepository.findOverlapping(roomType, checkIn, checkOut).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private ReservationEntity toEntity(Reservation domain) {
        return new ReservationEntity(
                domain.id(),
                domain.customerName(),
                domain.customerEmail(),
                domain.roomType(),
                domain.checkInDate(),
                domain.checkOutDate(),
                domain.status());
    }

    private Reservation toDomain(ReservationEntity entity) {
        return new Reservation(
                entity.getId(),
                entity.getCustomerName(),
                entity.getCustomerEmail(),
                entity.getRoomType(),
                entity.getCheckInDate(),
                entity.getCheckOutDate(),
                entity.getStatus());
    }
}
